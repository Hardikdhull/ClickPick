import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const url = "http://panel.mait.ac.in:8005";

  useEffect(() => {
    const fetchSearchResults = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');

      try {
        const response = await axios.get(`${url}/stationery/item-list/`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
        const items = response.data;

        // Filter items based on the search term
        const filteredResults = items.filter(item =>
          item.item.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for items"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <Text style={styles.heading}>Search Results</Text>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text>{item.item}</Text>
            {/* Add more details as needed */}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = {
  container: tw`flex-1 p-4 bg-gray-200`,
  searchContainer: tw`mb-4`,
  searchInput: tw`border border-gray-300 p-2 rounded-md`,
  heading: tw`text-2xl font-bold mb-4`,
  resultItem: tw`bg-white rounded-lg p-4 mb-4`,
};

export default SearchScreen;
