import React from 'react';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import ShopSelectionScreen from './src/screens/shop/ShopSelectionScreen';
import ProductSelectionScreen from './src/screens/shop/ProductSelectionScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BuyProductScreen from './src/screens/shop/BuyProductScreen';
import PrintoutProductScreen from './src/screens/shop/PrintoutProductScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ShopSelection" component={ShopSelectionScreen} />
        <Stack.Screen name="ProductSelection" component={ProductSelectionScreen} /> 
        <Stack.Screen name="BuyProductScreen" component={BuyProductScreen} /> 
        <Stack.Screen name="PrintoutProductScreen" component={PrintoutProductScreen} /> 
      </Stack.Navigator> 
    </NavigationContainer>
  );
};

export default App;
