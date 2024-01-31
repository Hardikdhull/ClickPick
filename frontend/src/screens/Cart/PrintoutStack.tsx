import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstPageGenerator from './FirstPageScreen';
import PrintoutCostCalculatorScreen from './PrintoutCost';

const Stack = createStackNavigator();

const PrintoutStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PrintoutCostCalculator">
        <Stack.Screen name="FirstPageGenerator" component={FirstPageGenerator} options={{
            headerBackTitleVisible: false, // Hide the back button title
          }}/>
        <Stack.Screen name="PrintoutCostCalculator" component={PrintoutCostCalculatorScreen} options={{
            headerBackTitleVisible: false, // Hide the back button title
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PrintoutStack;