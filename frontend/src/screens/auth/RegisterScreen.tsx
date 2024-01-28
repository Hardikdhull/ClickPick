import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import tw from 'twrnc';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const url = "http://192.168.151.198:8000"
  const handleRegister = async () => {
    try {
      const response = await axios.post(`${url}/auth/register/`, {
        username: email, // Assuming your Django User model uses 'username' instead of 'email'
        email: email,
        password: password,
        name: name,
        number: number,
        role: 'STUDENT', // Assuming 'STUDENT' is the correct role
      });

      if (response.status === 201) {
        // Registration successful, automatically login after registration
        await handleLogin();
      } else if (response.status === 400) {
        Alert.alert('Registration Failed', 'User with this email already exists.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

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
        navigation.navigate('Dashboard');
      } else {
        // Login failed, handle errors
        console.error('Login Error:', loginResponse.data);
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-black p-6`}>
      <View style={tw`flex-row mb-4`}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Register" disabled={true} />
      </View>
      <Text style={tw`text-white font-semibold text-4xl mb-8`}>Register</Text>
      <View style={tw`w-4/5 mb-4`}>
        <Text style={tw`text-white mb-2`}>Name</Text>
        <TextInput
          style={tw`border-b border-white text-white p-3`}
          placeholder="Enter your name"
          placeholderTextColor="#A0AEC0"
          value={name}
          onChangeText={setName}
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
        <Text style={tw`text-white mb-2`}>Number</Text>
        <TextInput
          style={tw`border-b border-white text-white p-3`}
          placeholder="Enter your number"
          placeholderTextColor="#A0AEC0"
          value={number}
          onChangeText={setNumber}
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
