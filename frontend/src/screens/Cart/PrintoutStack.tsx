import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FirstPageGenerator from './FirstPageScreen';
import PrintoutCostCalculatorScreen from './PrintoutCost';

const Stack = createStackNavigator();

const PrintoutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PrintoutCostCalculator"
        component={PrintoutCostCalculatorScreen} // Fix the import typo here
        options={{
          headerShown: false, // Hide the back button title
        }}
      />
      <Stack.Screen
        name="FirstPageGenerator"
        component={FirstPageGenerator}
        options={{
          headerShown: false, // Hide the back button title
        }}
      />
    </Stack.Navigator>
  );
};

export default PrintoutStack;
