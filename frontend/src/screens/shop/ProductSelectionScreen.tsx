import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const ProductSelectionScreen = ({ route }) => {
  const { shopId } = route.params;
  const navigation = useNavigation();

  // Fetch available products for the selected shop from the backend
  const availableProducts = [
    { id: 'printout', name: 'Print Outs / Photo Copy' },
    // Add other products as needed
    { id: 'buy', name: 'Buy' },
  ];

  const handleProductSelect = (productId: string) => {
    // Implement logic to select a product
    // For demonstration purposes, you can navigate to another screen with the selected product details
    if (productId === 'buy') {
      navigation.navigate('BuyProductScreen', { shopId });
    } else if (productId === 'printout') {
      navigation.navigate('PrintoutProductScreen', { shopId });
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-800`}>
      <Text style={tw`text-white font-semibold text-2xl mb-4`}>Select a Product</Text>
      {availableProducts.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={tw`mb-2`}
          onPress={() => handleProductSelect(product.id)}
        >
          <View style={styles.productButton}>
            <Text style={tw`text-white`}>{product.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.additionalButton}
        onPress={() => {
          // Implement additional functionality
        }}
      >
        <Text style={tw`text-white`}>Additional Functionality</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 5,
  },
  additionalButton: {
    backgroundColor: '#9C27B0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default ProductSelectionScreen;