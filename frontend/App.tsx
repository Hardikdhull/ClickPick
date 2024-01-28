import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BottomTabNavigator from './src/components/BottomTabNavigator';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const url = "http://192.168.239.198:8000";

  useEffect(() => {
    // Check if the user is logged in
    const checkLoggedInStatus = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');

      if (accessToken) {
        try {
          // Fetch user details
          const responseUser = await axios.get(`${url}/auth/user-details/`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          // If the request is successful, set the user as logged in
          setIsLoggedIn(true);
        } catch (error) {
          // If there's an error (e.g., token expired), set the user as not logged in
          setIsLoggedIn(false);
        }
      } else {
        // If there's no access token, set the user as not logged in
        setIsLoggedIn(false);
      }
    };

    checkLoggedInStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'BottomTabs' : 'Login'}>
            <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
