import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import tw from 'twrnc';
import BottomTabNavigator from './BottomTabNavigator';

const styles = {
  container: tw`flex-1 p-4 bg-gray-200`,
  heading: tw`text-2xl font-bold mb-4`,
  productContainer: tw`bg-white rounded-lg p-4 mb-4 items-center`,
  productImage: tw`w-40 h-40 mb-2 rounded-md`,
  productName: tw`text-gray-500 font-bold mb-2`,
  productCategory: tw`text-gray-500`,
  bottomTab: tw`absolute rounded-lg bottom-0 left-0 right-0`,
};

const Dashboard = ()  => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const url = "http://10.0.0.118:8000"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access_token');

        if (accessToken) {
          // Fetch user details
          const responseUser = await axios.get(`${url}/auth/user-details/`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
          setUser(responseUser.data);

          // Fetch items
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
  }, []); // The empty dependency array ensures the effect runs only once on component mount

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>E-Commerce Dashboard</Text>
      {user && (
        <View>
          <Text>User Details:</Text>
          <Text>Name: {user.name}</Text>
          {/* Add more user details as needed */}
        </View>
      )}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()} // Assuming id is a number
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: url + '/' + item.display_image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.item}</Text>
            <Text style={styles.productCategory}>{`INR${item.price}`}</Text>
          </View>
        )}
        // ListFooterComponent={<BottomTabNavigator />}
      />
      <View style={styles.bottomTab}>
        <BottomTabNavigator />
      </View>
    </View>
  );
};

export default Dashboard;
