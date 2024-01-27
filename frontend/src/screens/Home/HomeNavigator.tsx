// Import necessary libraries and components
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './Profile';
import ActiveOrdersScreen from '../Cart/ActiveOrders';
import PastOrdersScreen from '../Cart/PastOrders';
import HomeScreen from './HomeScreen';
import PrintoutProductScreen from '../shop/PrintoutProductScreen';
import PrintoutScreen from './PrinoutScreen';


// Create a stack navigator for the Profile screens
const HomeStack = createStackNavigator();

// HomeNavigator component
const HomeNavigator = () => {
    return (
        <HomeStack.Navigator initialRouteName="Profile">
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false, // Hide the header for the Profile screen
                }}
            />
            <HomeStack.Screen
                name="Printout"
                component={PrintoutScreen}
                options={{
                    headerBackTitleVisible: false, // Hide the back button title
                }}
            />
        </HomeStack.Navigator>
    );
};

export default HomeNavigator;
