import React, { useState } from 'react';
import { View, Text, TextInput, Button, Linking, Alert } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

const FirstPageGenerator = () => {
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

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const generateFirstPage = async () => {
    try {
      const response = await fetch('http://localhost:8000/stationery/generate-firstpage/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to generate first page');
      }

      // Get the filename from the Content-Disposition header
      const disposition = response.headers.get('Content-Disposition');
      const filenameMatch = disposition && disposition.match(/filename="?([^"]+)"?/);

      if (filenameMatch) {
        const filename = filenameMatch[1];
        const filePath = RNFetchBlob.fs.dirs.DownloadDir + `/${filename}`;

        // Save the file
        await RNFetchBlob.fs.createFile(filePath, await response.blob(), 'utf8');

        // Show an alert to inform the user that the file is ready for download
        Alert.alert(
          'Success',
          'Your first page is ready for download!',
          [
            {
              text: 'Download',
              onPress: () => {
                // Open the file with the default app
                RNFetchBlob.android.actionViewIntent(filePath, 'application/msword');
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        throw new Error('Filename not found in response');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <Text>Stationery Form</Text>
      <TextInput
        placeholder="Subject Name"
        value={form.subject_name}
        onChangeText={(text) => handleInputChange('subject_name', text)}
      />
      {/* Add similar TextInput components for other form fields */}

      <Button title="Generate First Page" onPress={generateFirstPage} />

      {/* Add a download button here if needed */}
    </View>
  );
};

export default FirstPageGenerator;
