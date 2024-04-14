import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProfileScreen from './Profile';
import ActiveOrdersScreen from '../Cart/ActiveOrders';
import PastOrdersScreen from '../Cart/PastOrders';

const ProfileNavigator = () => {
  const [selectedTab, setSelectedTab] = useState('Profile');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 50, backgroundColor: 'lightgray' }}>
        {['Profile', 'Active Orders', 'Past Orders'].map((name) => (
          <TouchableOpacity key={name} onPress={() => handleTabPress(name)}>
            <Text style={{ fontWeight: selectedTab === name ? 'bold' : 'normal' }}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        {selectedTab === 'Profile' && <ProfileScreen />}
        {selectedTab === 'Active Orders' && <ActiveOrdersScreen />}
        {selectedTab === 'Past Orders' && <PastOrdersScreen />}
      </View>
    </View>
  );
};

export default ProfileNavigator;
