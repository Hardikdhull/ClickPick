import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/Search';
import CartScreen from '../screens/Cart/CartScreen';
import ProfileScreen from '../screens/Profile/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderScreen from '../screens/Cart/OrderScreen';
import ProfileNavigator from '../screens/Profile/ProfileNavigator';
import PrintoutCostCalculatorScreen from '../screens/Cart/PrintoutCost';
import PrintoutStack from '../screens/Cart/PrintoutStack';
import CartNavigator from '../screens/Cart/CartNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'ProfileNavigaor') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can add more customization if needed

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false, // Hide the header
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false, // Hide the header
        }}
      />
      <Tab.Screen
        name="Printout"
        component={PrintoutStack}
        options={{
          headerShown: false, // Hide the header
        }}
      />
      <Tab.Screen
        name="Cartnav"
        component={CartNavigator}
        options={{
          headerShown: false, // Hide the header
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          headerShown: false, // Hide the header
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
