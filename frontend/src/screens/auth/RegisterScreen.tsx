import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import tw from 'twrnc';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Implement registration logic here
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-black p-6`}>
      <Text style={tw`text-white font-semibold text-4xl mb-8`}>Register</Text>
      <View style={tw`w-4/5 mb-4`}>
        <Text style={tw`text-white mb-2`}>Username</Text>
        <TextInput
          style={tw`border-b border-white text-white p-3`}
          placeholder="Enter your username"
          placeholderTextColor="#A0AEC0"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={tw`w-4/5 mb-4`}>
        <Text style={tw`text-white mb-2`}>Email</Text>
        <TextInput
          style={tw`border-b border-white text-white p-3`}
          placeholder="Enter your email"
          placeholderTextColor="#A0AEC0"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={tw`w-4/5 mb-4`}>
        <Text style={tw`text-white mb-2`}>Password</Text>
        <TextInput
          style={tw`border-b border-white text-white p-3`}
          placeholder="Enter your password"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={tw`w-4/5 mb-6`}>
        <Button title="Register" onPress={handleRegister} color="#3182CE" />
      </View>
    </View>
  );
};

export default RegisterScreen;