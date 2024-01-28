import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const PastOrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Past Orders</Text>
      {/* Add content for the Past Orders screen */}
    </View>
  );
};

const styles = {
  container: tw`flex-1 p-4 bg-gray-200`,
  heading: tw`text-2xl font-bold mb-4`,
};

export default PastOrdersScreen;
