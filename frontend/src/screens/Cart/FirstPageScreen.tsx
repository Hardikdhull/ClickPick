import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, PermissionsAndroid } from 'react-native';
import tw from 'twrnc';
import RNFetchBlob from 'rn-fetch-blob';
import { useNavigation } from '@react-navigation/native';
const FirstPageGenerator = () => {
  const url = "http://panel.mait.ac.in:8005";
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

      <Button title="Generate First Page" onPress={sendFormData} style={styles.button} />

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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
};


export default FirstPageGenerator;