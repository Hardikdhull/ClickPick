import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const url = "http://panel.mait.ac.in:8005";
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      try {
        const responseUser = await axios.get(`${url}/auth/user-details/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        setUser(responseUser.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    const refresh_token = await AsyncStorage.getItem('refresh_token');

    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('access_token');
              await AsyncStorage.removeItem('refresh_token');

              const response = await axios.post(`${url}/auth/logout/`,
                { 'refresh_token': refresh_token }
              );

              if (response.status === 200) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              }
            } catch (error) {
              console.error('Error during logout:', error);
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.profileDetails}>
          <Text style={styles.detailText}>{`Name: ${user.name}`}</Text>
          <Text style={styles.detailText}>{`Email: ${user.email}`}</Text>
        </View>
      )}

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#E5E7EB',
  },
  profileDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  detailText: {
    color: '#6B7280',
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
  },
});

export default ProfileScreen;
