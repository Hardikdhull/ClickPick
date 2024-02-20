import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProfileScreen from './Profile';
import ActiveOrdersScreen from '../Cart/ActiveOrders';
import PastOrdersScreen from '../Cart/PastOrders';

const ProfileNavigator = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const screenNames = ['Profile', 'Active Orders', 'Past Orders'];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 50, backgroundColor: 'lightgray' }}>
        {screenNames.map((name, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedTab(index)}>
            <Text style={{ fontWeight: selectedTab === index ? 'bold' : 'normal' }}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        {selectedTab === 0 ? (
          <ProfileScreen />
        ) : selectedTab === 1 ? (
          <ActiveOrdersScreen />
        ) : selectedTab === 2 ? (
          <PastOrdersScreen />
        ) : null}
      </View>
    </View>
  );
};

export default ProfileNavigator;
