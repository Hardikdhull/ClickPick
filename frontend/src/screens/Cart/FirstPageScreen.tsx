import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, PermissionsAndroid } from 'react-native';
import tw from 'twrnc';
import RNFetchBlob from 'rn-fetch-blob';
import { useNavigation } from '@react-navigation/native';

const FirstPageGenerator = () => {
  const url = "http://10.0.0.118:8000";
  const [form, setForm] = useState({
    subject_name: '',
    subject_code: '',
    faculty_name: '',
    student_name: '',
    faculty_designation: '',
    roll_number: '',
    semester: '',
    group: '',
  });
  const navigation = useNavigation();
  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const sendFormData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      if (!accessToken) {
        // Handle case where access token is not available
        console.log('Access token not found');
        return;
      }

      const response = await RNFetchBlob.fetch(
        'POST',
        `${url}/stationery/generate-firstpage/`,
        {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        Object.entries(form).map(([field, value]) => ({
          name: field,
          data: value,
        }))
      );

      if (response.respInfo.status === 200) {
        const date = new Date();
        const { filepath } = JSON.parse(response.data);
        const path = RNFetchBlob.fs.dirs.DownloadDir;
        const fileName = `download_${Math.floor(date.getDate() + date.getSeconds() / 2)}.docx`;

        await RNFetchBlob.config({
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            title: fileName,
            description: 'File download in progress',
            path: `${path}/${fileName}`,
            mime: 'application/msword',
            mediaScannable: true,
          },
        }).fetch('POST', `${url}${filepath}`, {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }, Object.entries(form).map(([field, value]) => ({
          name: field,
          data: value,
        })));

        Alert.alert('File Downloaded', 'The file has been downloaded successfully.');
        console.log('File downloaded successfully:', `${path}/${fileName}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Downloader App Storage Permission',
          message:
            'Downloader App needs access to your storage ' +
            'so you can download files',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await sendFormData();
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Stationery Form</Text>
      <Button
        title="Go to Printout Cost Calculator"
        onPress={() => navigation.navigate('PrintoutCostCalculator')}
        style={styles.navigationButton}
      />
      <TextInput
        style={styles.input}
        placeholder="Subject Name"
        value={form.subject_name}
        onChangeText={(text) => handleInputChange('subject_name', text)}
      />

      {/* Add similar TextInput components for other form fields */}
      <TextInput
        style={styles.input}
        placeholder="Subject Code"
        value={form.subject_code}
        onChangeText={(text) => handleInputChange('subject_code', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Faculty Name"
        value={form.faculty_name}
        onChangeText={(text) => handleInputChange('faculty_name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={form.student_name}
        onChangeText={(text) => handleInputChange('student_name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Faculty Designation"
        value={form.faculty_designation}
        onChangeText={(text) => handleInputChange('faculty_designation', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={form.roll_number}
        onChangeText={(text) => handleInputChange('roll_number', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Semester"
        value={form.semester}
        onChangeText={(text) => handleInputChange('semester', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Group"
        value={form.group}
        onChangeText={(text) => handleInputChange('group', text)}
      />

      <Button title="Generate First Page" onPress={sendFormData} />
      {/* Conditionally render the download button */}
      {/* {downloadLink && (
        <TouchableOpacity onPress={()=>
          {
            if (form) {
              // handleDownload
              requestStoragePermission();
            } else {
              alert('Please add required details.')
            }
          }
          } style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Download First Page</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = {
  container: tw`p-4 bg-gray-200 flex-1`,
  heading: tw`font-bold text-2xl mb-4`,
  input: tw`bg-white p-2 rounded border border-gray-300 mb-2`,
  downloadButton: tw`bg-blue-500 p-2 rounded mt-4`,
  downloadButtonText: tw`text-white text-center`,
  inputContainer: tw`mb-4`,
  label: tw`mb-2`,
  chosenFileContainer: tw`my-4 `,
  chosenFileLabel: tw`font-bold mb-2`,
  costContainer: tw`my-4 `,
  costLabel: tw`font-bold mb-2`,
  costValue: tw`text-xl`,
  navigationButton: tw`mb-4 w-10`,

};


export default FirstPageGenerator;