import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username === 'test' && password === 'test') {
      navigation.navigate('ShopSelection');
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-800`}>
      <Text style={tw`text-red-700 font-semibold text-2xl mb-4 text-white`}>Login</Text>
      <View style={tw`w-4/5 mb-4`}>
        <Text style={tw`text-white mb-2`}>Username</Text>
        <TextInput
          style={tw`border border-gray-300 p-2 rounded text-white`}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={tw`w-4/5 mb-4`}>
        <Text style={tw`text-white mb-2`}>Password</Text>
        <TextInput
          style={tw`border border-gray-300 p-2 rounded text-white`}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={tw`w-4/5`}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default LoginScreen;
