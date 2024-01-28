import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from '../auth/LoginScreen';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const url = "http://192.168.223.198:8000";
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      try {
        const responseUser = await axios.get(`${url}/auth/user-details/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        setUser(responseUser.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear access and refresh tokens from AsyncStorage
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');

      return  <LoginScreen/>
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Profile</Text> */}
      {user && (
        <View style={styles.profileDetails}>
          <Text style={styles.detailText}>{`Name: ${user.name}`}</Text>
          <Text style={styles.detailText}>{`Email: ${user.email}`}</Text>
          {/* Add more details as needed */}

          {/* Button to navigate to Active Orders */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ActiveOrders')}
          >
            <Text style={styles.buttonText}>Active Orders</Text>
          </TouchableOpacity>

          {/* Button to navigate to Past Orders */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PastOrders')}
          >
            <Text style={styles.buttonText}>Past Orders</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: tw`flex-1 p-4 bg-gray-200`,
  heading: tw`text-2xl font-bold mb-4`,
  profileDetails: tw`bg-white rounded-lg p-4 mb-4`,
  detailText: tw`text-gray-500 mb-2`,
  button: tw`bg-blue-500 text-white px-4 py-2 rounded-full mt-2`,
  buttonText: tw`text-center`,
};

export default ProfileScreen;
