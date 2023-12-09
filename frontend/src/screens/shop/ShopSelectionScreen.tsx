import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';



const ShopSelectionScreen = () => {
  // Fetch available shops from the backend
  const availableShops = [
    { id: 'canteen1', name: 'Canteen 1' },
    // Add other shops as needed
    { id: 'stationaryShop', name: 'Stationary Shop' },
  ];
  
  const navigation = useNavigation();

  const handleShopSelect = (shopId: string) => {
    // Implement logic to select a shop
    // For demonstration purposes, navigate to a placeholder screen
    navigation.navigate('ProductSelection', { shopId });
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-800`}>
      <Text style={tw`text-white font-semibold text-2xl mb-4`}>Select a Shop</Text>
      {availableShops.map((shop) => (
        <TouchableOpacity
          key={shop.id}
          style={tw`mb-2`}
          onPress={() => handleShopSelect(shop.id)}
        >
          <View style={styles.shopButton}>
            <Text style={tw`text-white`}>{shop.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {/* Add more functionality or buttons as needed */}
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
  shopButton: {
    backgroundColor: '#4CAF50', // You can use Tailwind color classes or specify your own color
    padding: 10,
    borderRadius: 5,
  },
  additionalButton: {
    backgroundColor: '#2196F3', // You can use Tailwind color classes or specify your own color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default ShopSelectionScreen;
