// Import necessary libraries and components
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './Profile';
import ActiveOrdersScreen from '../Cart/ActiveOrders';
import PastOrdersScreen from '../Cart/PastOrders';


// Create a stack navigator for the Profile screens
const ProfileStack = createStackNavigator();

// ProfileNavigator component
const ProfileNavigator = () => {
    return (
      <ProfileStack.Navigator initialRouteName="Profile">
        <ProfileStack.Screen
          name="User Info"
          component={ProfileScreen}
          options={{
            headerShown: false, // Hide the header for the Profile screen
          }}
        />
        <ProfileStack.Screen
          name="ActiveOrders"
          component={ActiveOrdersScreen}
          options={{
            headerBackTitleVisible: false, // Hide the back button title
          }}
        />
        <ProfileStack.Screen
          name="PastOrders"
          component={PastOrdersScreen}
          options={{
            headerBackTitleVisible: false, // Hide the back button title
          }}
        />
      </ProfileStack.Navigator>
    );
  };

export default ProfileNavigator;
