import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Splash = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const url = "http://10.0.0.118:8000"; // Update this URL if necessary

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      console.log('Checking logged-in status...');

      const accessToken = await AsyncStorage.getItem('access_token');

      if (accessToken) {
        try {
          console.log('Fetching user details...');
          const responseUser = await axios.get(`${url}/auth/user-details/`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          console.log('User details fetched successfully:');
          setIsLoggedIn(true);
          navigation.navigate('BottomTabs');
        } catch (error) {
          console.error('Error fetching user details:', error);
          setIsLoggedIn(false);
          navigation.navigate('Login');
        }
      } else {
        setIsLoggedIn(false);
        navigation.navigate('Login');
      }
    };

    // Call the function immediately after component mount
    checkLoggedInStatus();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../../assets/demo_1.jpg')}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          resizeMode: 'cover', // Changed from 'center' to 'cover'
        }}
      />
    </View>
  );
};

export default Splash;
