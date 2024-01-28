import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

import tw from 'twrnc'; // Import the 'tw' utility

const PrintoutCostCalculatorScreen = () => {
  const [files, setFiles] = useState({ file1: null, file2: null });
  const [pages, setPages] = useState({ pages1: '', pages2: '' });

  const handleFilePick = async (fileNumber) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // Handle the picked file
      const newFiles = { ...files, [`file${fileNumber}`]: result };
      setFiles(newFiles);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker
      } else {
        Alert.alert('Error', 'Failed to pick a file. Please try again.');
      }
    }
  };

  const url = "http://192.168.151.198:8000";

  const handlePagesChange = (pageNumber, pagesValue) => {
    const newPages = { ...pages, [`pages${pageNumber}`]: pagesValue };
    setPages(newPages);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(files).forEach((key) => {
      const file = files[key];
      const pageKey = key.replace('file', 'pages');
      const pagesValue = pages[pageKey];

      if (file) {
        formData.append('files', file);
        formData.append('pages', pagesValue);
      }
    });

    try {
      const response = await fetch(`${url}/stationery/calculate-cost/`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      Alert.alert('Cost Calculation Result', `Total Cost: ${data.totalCost}`);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to calculate cost. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Printout Cost Calculator</Text>

      {/* File input tags */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>File 1:</Text>
        <Button
          title="Choose File"
          onPress={() => {/* Implement file picker here */}}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>File 2:</Text>
        <Button
          title="Choose File"
          onPress={() => {/* Implement file picker here */}}
        />
      </View>

      {/* Text input tags for pages */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pages for File 1:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pages"
          keyboardType="numeric"
          value={pages.pages1}
          onChangeText={(text) => handlePagesChange(1, text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pages for File 2:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pages"
          keyboardType="numeric"
          value={pages.pages2}
          onChangeText={(text) => handlePagesChange(2, text)}
        />
      </View>

      <Button title="Calculate Cost" onPress={handleSubmit} />
    </View>
  );
};

const styles = {
  container: tw`p-4 bg-gray-200 flex-1`,
  heading: tw`font-bold text-2xl mb-4`,
  inputContainer: tw`mb-4`,
  label: tw`mb-2`,
  input: tw`bg-white p-2 rounded border border-gray-300`,
};

export default PrintoutCostCalculatorScreen;
