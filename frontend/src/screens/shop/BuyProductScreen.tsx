import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import tw from 'twrnc';

const BuyProductScreen = ({ route }) => {
  const { shopId } = route.params;

  // Implement state for quantity
  const [quantity, setQuantity] = React.useState('');

  // Implement logic for adding to cart and navigating to the payment gateway

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-800`}>
      <Text style={tw`text-white font-semibold text-2xl mb-4`}>Buy Product</Text>
      <Text style={tw`text-white mb-2`}>Product: Buy</Text>
      <TextInput
        style={tw`border-b border-white text-white p-3 mb-4`}
        placeholder="Enter quantity"
        placeholderTextColor="#A0AEC0"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={tw`bg-blue-500 p-3 rounded`}
        onPress={() => {
          // Implement logic for adding to cart and navigating to payment gateway
        }}
      >
        <Text style={tw`text-white`}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BuyProductScreen;