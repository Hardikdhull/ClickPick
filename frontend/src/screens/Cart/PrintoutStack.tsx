import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FirstPageGenerator from './FirstPageScreen';
import PrintoutCostCalculatorScreen from './PrintoutCost';
import PrintoutCheckout from './PrintoutCheckout';
import PrintoutStackNavigator from './PrintoutMainStack';

const PrintOutNavigator = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const screenNames = ['Printout Cost Calculator', 'First Page Generator'];

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
          <PrintoutStackNavigator />
        ) : selectedTab === 1 ? (
          <FirstPageGenerator />
        ) :null}
      </View>
    </View>
  );
};

export default PrintOutNavigator;
