import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
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

      // Assuming the server response contains the download link
      const data = await response.json();
      console.log('Server response data:', data);

      // Update the download link state
      setDownloadLink(data.downloadLink);

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
      // Make a request to the download link
      const downloadResponse = await fetch(downloadLink);

      if (!downloadResponse.ok) {
        throw new Error('Failed to download the file');
      }

      // Get the file name from the response headers
      const contentDisposition = downloadResponse.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition && contentDisposition.match(/filename="?([^"]+)"?/);

      const filename = filenameMatch ? filenameMatch[1] : 'downloaded_file';

      // Save the file using react-native-fetch-blob or any other method you prefer
      // Update this with your preferred method for handling file downloads
      const filePath = RNFetchBlob.fs.dirs.DownloadDir + `/${filename}`;
      await RNFetchBlob.fs.createFile(filePath, await downloadResponse.blob(), 'utf8');

      // Show an alert to inform the user that the file is ready for download
      Alert.alert(
        'Download Complete',
        'Your file has been downloaded successfully!',
        [
          {
            text: 'Open',
            onPress: () => {
              // You may open the file with the default app here
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

      <Button title="Generate First Page" onPress={generateFirstPage} />
      {/* Conditionally render the download button */}
      {downloadLink && (
        <TouchableOpacity onPress={handleDownload} style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Download First Page</Text>
        </TouchableOpacity>
      )}
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