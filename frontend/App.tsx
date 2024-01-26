import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RegisterScreen from './src/screens/auth/RegisterScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import ShopSelectionScreen from './src/screens/shop/ShopSelectionScreen';
import ProductSelectionScreen from './src/screens/shop/ProductSelectionScreen';
import BuyProductScreen from './src/screens/shop/BuyProductScreen';
import PrintoutProductScreen from './src/screens/shop/PrintoutProductScreen';
import Dashboard from './src/components/Dashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ShopStack = () => (
  <Stack.Navigator initialRouteName="ShopSelection">
    <Stack.Screen name="ShopSelection" component={ShopSelectionScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductSelection" component={ProductSelectionScreen} options={{ headerShown: false }} />
    <Stack.Screen name="BuyProductScreen" component={BuyProductScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PrintoutProductScreen" component={PrintoutProductScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      setIsLoggedIn(!!accessToken);
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Shop" component={ShopStack} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default App;
