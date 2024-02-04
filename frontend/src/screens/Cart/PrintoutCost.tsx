import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // Import the DocumentPicker library
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const PrintoutCostCalculatorScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  const [files, setFiles] = useState({ file1: null, file2: null });
  const [pages, setPages] = useState({ pages1: '', pages2: '' });
  const [cost, setCost] = useState(null)
  const url = "http://192.168.1.43:8000";

  const handleFilePick = async (fileNumber) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log('Picked file:', result);

      // Handle the picked file
      const newFiles = { ...files, [`file${fileNumber}`]: result };
      setFiles(newFiles);

      console.log('Updated files state:', newFiles);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled the picker
        console.log('File picking cancelled by user');
      } else {
        console.error('Error picking a file:', error);
        Alert.alert('Error', 'Failed to pick a file. Please try again.');
      }
    }
  };

  const handlePagesChange = (pageNumber, pagesValue) => {
    const newPages = { ...pages, [`pages${pageNumber}`]: pagesValue };
    setPages(newPages);

    console.log('Updated pages state:', newPages);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(files).forEach((key) => {
      const file = files[key];
      const pageKey = key.replace('file', 'pages');
      const pagesValue = pages[pageKey];

      if (file) {
        formData.append('files', file[0]); // Update this line to append file with its name
        formData.append('pages', pagesValue);
      }
    });

    try {
      console.log(formData)
      const response = await fetch(`${url}/stationery/calculate-cost/`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      Alert.alert('Cost Calculation Result', `Total Cost: ${data.cost}`);
      console.log(data);
      // Display the cost in the UI
      setCost(data.cost); // Update the property name according to the server response
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to calculate cost. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Printout Cost Calculator</Text>
      {/* Button to navigate to FirstPageGenerator */}
      <Button
        title="Go to First Page Generator"
        onPress={() => navigation.navigate('FirstPageGenerator')}
        style={styles.navigationButton}
      />

      {/* File input tags */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>File 1:</Text>
        <Button
          title="Choose File"
          onPress={() => handleFilePick(1)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>File 2:</Text>
        <Button
          title="Choose File"
          onPress={() => handleFilePick(2)}
        />
      </View>

      {/* Text input tags for pages */}
      <View style={styles.inputContainer}>
        {/* Display chosen file names */}
        {files.file1 && files.file1[0] && (
          <View style={styles.chosenFileContainer}>
            <Text style={styles.chosenFileLabel}>Chosen File 1:</Text>
            <Text>{files.file1[0].name}</Text>
          </View>
        )}
        {files.file2 && files.file2[0] && (
          <View style={styles.chosenFileContainer}>
            <Text style={styles.chosenFileLabel}>Chosen File 2:</Text>
            <Text>{files.file2[0].name}</Text>
          </View>
        )}

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
      {/* Display the cost */}
      {cost !== null && (
        <View style={styles.costContainer}>
          <Text style={styles.costLabel}>Total Cost:</Text>
          <Text style={styles.costValue}>{cost}</Text>
        </View>
      )}
    </View>
  );
};


const styles = {
  container: tw`p-4 bg-gray-200 flex-1`,
  heading: tw`font-bold text-2xl mb-4`,
  inputContainer: tw`mb-4`,
  label: tw`mb-2`,
  input: tw`bg-white p-2 rounded border border-gray-300`,
  chosenFileContainer: tw`my-4 `,
  chosenFileLabel: tw`font-bold mb-2`,
  costContainer: tw`my-4 `,
  costLabel: tw`font-bold mb-2`,
  costValue: tw`text-xl`,
  navigationButton: tw`mb-4 w-10`,
};

export default PrintoutCostCalculatorScreen;
