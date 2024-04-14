import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // Install this package first
import tw from 'twrnc';

const PrintoutProductScreen = ({ route }) => {
  const { shopId } = route.params;

  // Implement state for file and print preferences
  const [selectedFile, setSelectedFile] = useState(null);
  const [colorPreference, setColorPreference] = useState('blackAndWhite');
  const [printType, setPrintType] = useState('a4');

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  const calculatePrice = () => {
    // Implement logic to calculate the price based on print preferences
    // For demonstration purposes, let's assume a simple calculation
    let basePrice = 5; // Base price for printing
    if (colorPreference === 'color') {
      basePrice += 3; // Additional cost for color printing
    }
    if (printType === 'poster') {
      basePrice += 7; // Additional cost for poster printing
    }
    // Add more logic based on your pricing model
    return basePrice;
  };

  const handleAddToCart = () => {
    // Implement logic for adding to cart and navigating to payment gateway
    const price = calculatePrice();
    // Use the selectedFile, colorPreference, printType, and price for further processing
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-800`}>
      <Text style={tw`text-white font-semibold text-2xl mb-4`}>Printout Product</Text>
      <Text style={tw`text-white mb-2`}>Product: Print Outs / Photo Copy</Text>
      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded mb-4`}
        onPress={handleFilePick}
      >
        <Text style={tw`text-white`}>Select File</Text>
      </TouchableOpacity>
      {selectedFile && (
        <View style={tw`mb-4`}>
          <Text style={tw`text-white`}>{`Selected File: ${selectedFile.name}`}</Text>
        </View>
      )}
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>Color Preference</Text>
        <TextInput
          style={tw`border-b border-white text-white p-3`}
          placeholder="Color Preference (e.g., blackAndWhite, color)"
          placeholderTextColor="#A0AEC0"
          value={colorPreference}
          onChangeText={setColorPreference}
        />
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>Print Type</Text>
        <TextInput
          style={tw`border-b border-white text-white p-3`}
          placeholder="Print Type (e.g., a4, poster)"
          placeholderTextColor="#A0AEC0"
          value={printType}
          onChangeText={setPrintType}
        />
      </View>
      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded`}
        onPress={handleAddToCart}
      >
        <Text style={tw`text-white`}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrintoutProductScreen;