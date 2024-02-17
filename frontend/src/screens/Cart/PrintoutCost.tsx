import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // Import the DocumentPicker library
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const PrintoutCostCalculatorScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  const [files, setFiles] = useState([{ file: null, pages: '' }]);
  const [cost, setCost] = useState(null)
  const url = "http://panel.mait.ac.in:8005";
  const handleFilePick = async (index) => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log('Picked file:', result);

      // Handle the picked file
      const newFiles = [...files];
      newFiles[index].file = result;
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

  const handlePagesChange = (index, pagesValue) => {
    const newFiles = [...files];
    newFiles[index].pages = pagesValue;
    setFiles(newFiles);

    console.log('Updated pages state:', newFiles);
  };

  const handleAddFile = () => {
    setFiles([...files, { file: null, pages: '' }]);
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
      {files.map((item, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>File {index + 1}:</Text>
          <Button
            title="Choose File"
            onPress={() => handleFilePick(index)}
          />

          {/* Display chosen file name */}
          {item.file && item.file[0] && (
            <View style={styles.chosenFileContainer}>
              <Text style={styles.chosenFileLabel}>Chosen File:</Text>
              <Text>{item.file[0].name}</Text>
            </View>
          )}

          <Text style={styles.label}>Pages:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pages"
            keyboardType="numeric"
            value={item.pages}
            onChangeText={(text) => handlePagesChange(index, text)}
          />
        </View>
      ))}

      <Button title="Add" onPress={handleAddFile} />
      <Button title="Calculate Cost" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    fontSize: 16,
  },
  chosenFileContainer: {
    marginBottom: 8,
  },
  chosenFileLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },
  navigationButton: {
    marginBottom: 16,
    width: 200,
    alignSelf: 'center',
  },
});

export default PrintoutCostCalculatorScreen;
