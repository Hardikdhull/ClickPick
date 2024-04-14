import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItemToCart, addToWishlist } from '../redux/actions/Actions';
import ProductItem from '../common/ProductItem';
import Header from '../common/Header';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const url = "http://panel.mait.ac.in:8005";

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('access_token');
        console.log(accessToken)
        if (accessToken) {
          const responseItems = await axios.get(`${url}/stationery/item-list/`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
          setItems(responseItems.data);
          console.log(responseItems.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <Header />
        <Image
          source={require('../../assets/stat_banner.jpg')}
          style={{
            width: '94%',
            height: 200,
            alignSelf: 'center',
            borderRadius: 10,
            marginTop: 10,
          }}
        />
        <View style={{ marginTop: 20 }}>
          {/* Render your category list here */}
        </View>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <ProductItem
              url = {url}
              item={item}
              onAddWishlist={(x) => dispatch(addToWishlist(x))}
              onAddToCart={(x) => dispatch(addItemToCart(x))}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true} // Set to true if you want horizontal scrolling
          // numColumns={2} // Change the number of columns as needed
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
