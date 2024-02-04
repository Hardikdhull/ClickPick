import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const url = "http://192.168.1.43:8000";
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

  // ... (Previous code)

const handleLogout = async () => {
  const refresh_token = await AsyncStorage.getItem('refresh_token');

  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {

            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('refresh_token');

            const response = await axios.post(`${url}/auth/logout/`,
              { 'refresh_token' : refresh_token }
            );

            if (response.status === 200) {
              // Successfully logged out on the server
              // navigation.navigate('Login');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } else {
              // Handle other status codes if needed
              // Proceed with logout actions
              // navigation.navigate('Login');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }
          } catch (error) {
            // Handle errors during logout
            console.error('Error during logout:', error);
            // Proceed with logout actions even if there's an error
            // navigation.navigate('Login');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        },
      },
    ],
    { cancelable: false }
  );
};




  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.profileDetails}>
          <Text style={styles.detailText}>{`Name: ${user.name}`}</Text>
          <Text style={styles.detailText}>{`Email: ${user.email}`}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ActiveOrders')}
          >
            <Text style={styles.buttonText}>Active Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PastOrders')}
          >
            <Text style={styles.buttonText}>Past Orders</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.bottomContainer}>
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: tw`flex-1 p-4 bg-gray-200`,
  profileDetails: tw`bg-white rounded-lg p-4 mb-4`,
  detailText: tw`text-gray-500 mb-2`,
  button: tw`bg-blue-500 text-white px-4 py-2 rounded-full mt-2`,
  buttonText: tw`text-center`,
  bottomContainer: tw`flex-1 justify-end`,
  logoutButton: tw`bg-red-500 text-white px-4 py-2 rounded-full mt-2`,
};

export default ProfileScreen;
