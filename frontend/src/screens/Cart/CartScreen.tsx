import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State to manage refreshing

  const navigation = useNavigation();

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        if (storedCartItems) {
          const parsedCartItems = JSON.parse(storedCartItems);
          // Ensure that each item has an 'itemId' property
          const validCartItems = parsedCartItems.map((item, index) => ({
            ...item,
            itemId: item.itemId || index.toString(),
          }));
          setCartItems(validCartItems);
          console.log('Cart items loaded:', validCartItems);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      } finally {
        setRefreshing(false); // Turn off refreshing when loading is complete
      }
    };

    loadCartItems();
  }, [refreshing]); // Add refreshing as a dependency

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing to true to show the loading indicator
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{`${item.quantity} x ${item.item} - $${item.price * item.quantity}`}</Text>
      {/* You can customize how each item in the cart is displayed */}
    </View>
  );

  const calculateTotal = () => {
    // Calculate the total cost of items in the cart
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleBuyNow = () => {
    // Implement your logic to handle the "Buy Now" action
    // For example, you might want to navigate to a checkout screen
    // or proceed with the payment process.
    console.log('Buy Now clicked!');
  };

  return (
    <View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.itemId.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Text>Total: ${calculateTotal()}</Text>
      <TouchableOpacity onPress={handleBuyNow}>
        <Text>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;
