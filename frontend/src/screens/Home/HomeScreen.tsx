import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import tw from 'twrnc';

const styles = {
  container: tw`flex-1 p-4 bg-gray-200`,
  heading: tw`text-2xl font-bold mb-4`,
  productContainer: tw`bg-white rounded-lg p-4 mb-4 items-center`,
  productImage: tw`w-40 h-40 mb-2 rounded-md`,
  productName: tw`text-gray-500 font-bold mb-2`,
  productCategory: tw`text-gray-500`,
  addToCartButton: tw`bg-blue-500 text-white px-4 py-2 rounded-full mt-2`,
  modalContainer: tw`flex-1 justify-center items-center`,
  modalContent: tw`bg-white p-4 rounded-lg w-80 h-80`,
};

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const url = "http://192.168.239.198:8000";

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access_token');

        if (accessToken) {
          const responseUser = await axios.get(`${url}/auth/user-details/`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
          setUser(responseUser.data);

          const responseItems = await axios.get(`${url}/stationery/item-list/`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
          setItems(responseItems.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    };

    loadCartItems();
  }, []);

  const addToCart = async (item) => {
    try {
      const existingCartItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

      if (existingCartItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingCartItemIndex].quantity += 1;
        setCartItems(updatedCartItems);
      } else {
        const updatedCartItems = [...cartItems, { ...item, quantity: 1, editing: false }];
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const updateQuantity = (itemIndex, quantityChange) => {
    try {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity = Math.max(0, updatedCartItems[itemIndex].quantity + quantityChange);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };


  const saveCartItems = async () => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  };

  useEffect(() => {
    saveCartItems();
  }, [cartItems]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const calculateTotal = () => {
    // Calculate the total cost of items in the cart
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleBuyNow = () => {
    // Implement your logic for handling the "Buy Now" action
    // This can include navigating to a checkout screen or processing the order.
    console.log('Buy Now clicked!');
    // Close the modal after processing the "Buy Now" action
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>E-Commerce HomeScreen</Text>
      {user && (
        <View>
          <Text>User Details:</Text>
          <Text>Name: {user.name}</Text>
        </View>
      )}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const cartItem = cartItems.find((cartItem) => cartItem.id === item.id) || { quantity: 0, editing: false };

          return (
            <View style={styles.productContainer}>
              <Image source={{ uri: url + '/' + item.display_image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.item}</Text>
              <Text style={styles.productCategory}>{`INR${item.price}`}</Text>
              {cartItem.editing ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <TouchableOpacity onPress={() => updateQuantity(cartItems.indexOf(cartItem), 1)}>
                    <Text style={styles.addToCartButton}>+</Text>
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 8 }}>{cartItem.quantity}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(cartItems.indexOf(cartItem), -1)}>
                    <Text style={styles.addToCartButton}>-</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => addToCart(item)}
                >
                  <Text>{`Add to Cart (${cartItem.quantity})`}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={toggleModal}
        >
          <Text>{`Buy Now (${calculateTotal()})`}</Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        {/* Wrap your modal content in a View to control its styles */}
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { zIndex: 2 }]}>
            <Text>Review Your Order</Text>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View>
                  <Text>{`${item.quantity} x ${item.itemName} - $${item.price * item.quantity}`}</Text>
                </View>
              )}
            />
            <Button title="Buy Now" onPress={handleBuyNow} />
            <Button title="Cancel" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
