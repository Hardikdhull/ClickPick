import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CartScreen from './CartScreen';
import Checkout from './Checkout';
import OrderSucess from './OrderSuccess';

const Stack = createStackNavigator();

const CartNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSucess}
        options={{ headerShown :false }}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator