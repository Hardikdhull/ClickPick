import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import tw from 'twrnc'; // Import twrnc for styling

const FirstPageGenerator = () => {

  const url = "http://192.168.1.3:8000"
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
  const [downloadLink, setDownloadLink] = useState(null); // State to store the download link
  const REMOTE_IMAGE_PATH =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  const checkPermission = async () => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const sendFormData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      const apiUrl = `${url}/stationery/generate-firstpage/`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to generate file');
      }

      // Assuming the server response contains the file content directly
      const fileContent = await response.blob();

      // Use a Blob URL to trigger the download from the website
      const blobUrl = URL.createObjectURL(fileContent);

      // Create a hidden link and click it to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = 'downloaded_file.docx';
      downloadLink.click();

      // Clean up the Blob URL
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };


  const generateFirstPage = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      const apiEndpoint = `${url}/stationery/generate-firstpage/`;

      console.log('Sending request with form data:', form);

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      console.log('Server response:', response);

      if (!response.ok) {
        throw new Error('Failed to generate first page');
      }

      // Assuming the server response contains the file content directly
      const fileContent = await response.blob();

      // Save the file using react-native-fetch-blob or any other method you prefer
      // Update this with your preferred method for handling file downloads
      const filePath = RNFetchBlob.fs.dirs.DownloadDir + '/downloaded_file.docx';
      await RNFetchBlob.fs.createFile(filePath, fileContent, 'utf8');

      Alert.alert(
        'Success',
        'Your first page is ready for download!',
        [
          {
            text: 'Ok',
            onPress: () => {
              // You may navigate to another screen or perform additional actions here
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  const handleDownload = async () => {
    try {
      // Show an alert to inform the user that the file is ready for download
      Alert.alert(
        'Download Complete',
        'Your file has been downloaded successfully!',
        [
          {
            text: 'Ok',
            onPress: () => {
              // You may open the file with the default app here
              // Note: If the file is not directly supported by the device, you may need to handle it differently
              RNFetchBlob.android.actionViewIntent(filePath, 'application/msword');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to download the file');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Stationery Form</Text>

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
};

export default FirstPageGenerator;