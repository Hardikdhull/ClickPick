import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const PrintoutScreen = () => {
  const [colouredPages, setColouredPages] = useState('');
  const [blackAndWhitePages, setBlackAndWhitePages] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  // Assuming these are the costs per page
  const costPerColouredPage = 0.50;
  const costPerBlackAndWhitePage = 0.20;

  const calculateCost = () => {
    const colouredCost = parseFloat(colouredPages) * costPerColouredPage;
    const blackAndWhiteCost = parseFloat(blackAndWhitePages) * costPerBlackAndWhitePage;
    return colouredCost + blackAndWhiteCost;
  };

  const handlePayNow = async () => {
    // Assuming you have an API endpoint for creating printout orders
    const apiUrl = 'http://your-api-url/make-printout/';

    try {
      const response = await axios.post(apiUrl, {
        coloured_pages: colouredPages,
        black_and_white_pages: blackAndWhitePages,
        cost: calculateCost(),
        custom_message: customMessage,
      });

      // Assuming the API returns a success message
      Alert.alert('Success', response.data.message);
    } catch (error) {
      console.error('Error making printout order:', error);
      Alert.alert('Error', 'Failed to make printout order. Please try again.');
    }
  };

  return (
    <View>
      <Text>Make Printout Order</Text>
      <TextInput
        placeholder="Coloured Pages"
        keyboardType="numeric"
        value={colouredPages}
        onChangeText={setColouredPages}
      />
      <TextInput
        placeholder="Black and White Pages"
        keyboardType="numeric"
        value={blackAndWhitePages}
        onChangeText={setBlackAndWhitePages}
      />
      <TextInput
        placeholder="Custom Message"
        multiline
        numberOfLines={4}
        value={customMessage}
        onChangeText={setCustomMessage}
      />
      <Text>Total Cost: ${calculateCost().toFixed(2)}</Text>
      <Button title="Pay Now" onPress={handlePayNow} />
    </View>
  );
};

export default PrintoutScreen;
