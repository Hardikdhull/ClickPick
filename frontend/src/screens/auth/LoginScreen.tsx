import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
// import { BACKEND_URL } from "@env"
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Access the API_URL environment variable
  const url = "http://192.168.1.3:8000"

  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post(`${url}/auth/login/`, {
        email: email,
        password: password,
      });

      if (loginResponse.status === 200) {
        // Login successful, save tokens and navigate to the dashboard
        const { access, refresh } = loginResponse.data;
        await AsyncStorage.setItem('access_token', access);
        await AsyncStorage.setItem('refresh_token', refresh);
        navigation.navigate('BottomTabs');
      } else {
        // Login failed, handle errors
        Alert.alert('Login Failed', 'Invalid credentials. Please check your email and password.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Login Error:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-800`}>
      <View style={tw`flex-row mb-4`}>
        <Button title="Login" disabled />
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
      <Text style={tw`text-red-700 font-semibold text-2xl mb-4 text-white`}>Login</Text>
      <View style={tw`w-4/5 mb-4`}>
        <Text style={tw`text-white mb-2`}>Email</Text>
        <TextInput
          style={tw`border border-gray-300 p-2 rounded text-white`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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
