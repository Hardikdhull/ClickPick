import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CartScreen from './CartScreen';
import Checkout from './Checkout';
import OrderSucess from './OrderSuccess';

// Create a stack navigator
const Stack = createStackNavigator();

// Define the CartNavigator component
const CartNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Define screens */}
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false }} // Hide header for the Cart screen
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }} // Set title for the Checkout screen
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSucess}
        options={{ headerShown :false }} // Set title for the Checkout screen
      />
    </Stack.Navigator>
  );
};

export default CartNavigator