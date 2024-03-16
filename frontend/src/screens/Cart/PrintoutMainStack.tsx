// Not is use currently may delete

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PrintoutCheckout from './PrintoutCheckout';
import PrintOutNavigator from './PrintoutStack';
import PrintoutCostCalculatorScreen from './PrintoutCost';
// Create a stack navigator
const Stack = createStackNavigator();

const PrintoutStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PrintoutCost"
        component={PrintoutCostCalculatorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckoutPrintout"
        component={PrintoutCheckout}
        options={{ title: 'Printout Checkout' }}
      />
    </Stack.Navigator>
  );
};

export default PrintoutStackNavigator;
