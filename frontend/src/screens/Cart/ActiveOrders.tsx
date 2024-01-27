import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const ActiveOrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Active Orders</Text>
      {/* Add content for the Active Orders screen */}
    </View>
  );
};

const styles = {
  container: tw`flex-1 p-4 bg-gray-200`,
  heading: tw`text-2xl font-bold mb-4`,
};

export default ActiveOrdersScreen;
