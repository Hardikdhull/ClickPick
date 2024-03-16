import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // Import the DocumentPicker library
import { usePrintoutContext } from '../context/PrinoutContext'; // Import the context
import { useNavigation } from '@react-navigation/native';

const PrintoutCostCalculatorScreen = () => {
  const { setPrintout } = usePrintoutContext();
  const [files, setFiles] = useState({ file1: null });
  const [pages, setPages] = useState({ pages1: ''});
  const [colouredPages, setColouredPages] = useState({ colouredPages1: ''});
  const [cost, setCost] = useState(null);
  const navigation = useNavigation();
  const url = "http://panel.mait.ac.in:8005";

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

  const handleColouredPagesChange = (pageNumber, colouredPagesValue) => {
    const newColouredPages = { ...colouredPages, [`colouredPages${pageNumber}`]: colouredPagesValue };
    setColouredPages(newColouredPages);

    console.log('Updated colored pages state:', newColouredPages);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(files).forEach((key) => {
      const file = files[key];
      const pageKey = key.replace('file', 'pages');
      const colouredPageKey = key.replace('file', 'colouredPages');
      const pagesValue = pages[pageKey];
      const colouredPagesValue = colouredPages[colouredPageKey];
      console.log(files)
      if (file) {
        formData.append('files', file[0]); // Update this line to append file with its name
        formData.append('pages', pagesValue);
        formData.append('colouredpages', colouredPagesValue);
      }
    });

    try {
      console.log(formData);
      const response = await fetch(`${url}/stationery/calculate-cost/`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log("Data from calculate cost" ,data)
      // Display the cost in the UI
      setCost(data.cost); // Update the property name according to the server response
      
      // Set printout data in the context
      setPrintout({
        cost: data.cost,
        file: files,
        fileMeta: files.file1,
        colouredPages: colouredPages.colouredPages1,
        blackAndWhitePages: pages.pages1,
      });
      // console.log(data.cost , files,colouredPages,pages)
      
      navigation.navigate('CheckoutPrintout');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to calculate cost. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* File input tags */}
      {[1].map((fileNumber) => (
        <View key={fileNumber} style={styles.inputContainer}>
          <Text style={styles.label}>File {fileNumber}:</Text>
          <View style={styles.filePickerContainer}>
            <Button 
              title="Choose File"
              onPress={() => handleFilePick(fileNumber)}
            />
            {files[`file${fileNumber}`] && files[`file${fileNumber}`][0] && (
              <Text style ={{width: "50%"}}>{files[`file${fileNumber}`][0].name}</Text>
            )}
          </View>

          {/* Text input tags for black and white pages */}
          <Text style={styles.label}>Black and White Pages for File {fileNumber}:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Black and White pages"
            keyboardType="numeric"
            value={pages[`pages${fileNumber}`]}
            onChangeText={(text) => handlePagesChange(fileNumber, text)}
          />

          {/* Text input tags for colored pages */}
          <Text style={styles.label}>Colored Pages for File {fileNumber}:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Colored pages"
            keyboardType="numeric"
            value={colouredPages[`colouredPages${fileNumber}`]}
            onChangeText={(text) => handleColouredPagesChange(fileNumber, text)}
          />
        </View>
      ))}

      <Button title="Calculate Cost" onPress={handleSubmit} />

      {/* Display the cost */}
      {cost !== null && (
        <View style={styles.costContainer}>
          <Text style={styles.costLabel}>Total Cost:</Text>
          <Text style={styles.costValue}>{cost}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = {
  container: {
    padding: 20,
    paddingBottom: 100, // Add padding bottom to leave space for the bottom button
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    height: 40, // Set a fixed height for the input
  },
  filePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
  },
  costContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  costValue: {
    fontSize: 16,
  },
};

export default PrintoutCostCalculatorScreen;
