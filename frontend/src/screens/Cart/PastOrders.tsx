import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

const PastOrdersScreen = () => {
    const [pastOrders, setPastOrders] = useState([]);
    const url = "http://192.168.1.43:8000";

    useEffect(() => {
        const fetchPastOrders = async () => {
            const accessToken = await AsyncStorage.getItem('access_token');
            try {
                const response = await axios.get(`${url}/stationery/past-orders/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                setPastOrders(response.data);
            } catch (error) {
                console.error('Error fetching past orders:', error);
            }
        };

        fetchPastOrders();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.orderItemContainer}>
            <Text style={styles.orderText}>{`Order ID: ${item.order_id}`}</Text>
            <Text style={styles.orderText}>{`Quantity: ${item.quantity}`}</Text>
            <Text style={styles.orderText}>{`Cost: $${item.cost}`}</Text>
            <Text style={styles.orderText}>{`Custom Message: ${item.custom_message}`}</Text>
            <Text style={styles.orderText}>{`Order Time: ${item.order_time}`}</Text>
            <Text style={styles.orderText}>{`User ID: ${item.user}`}</Text>
            <Text style={styles.orderText}>{`Item ID: ${item.item}`}</Text>
            {/* Add more details as needed */}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Past Orders</Text>
            <FlatList
                data={pastOrders}
                renderItem={renderItem}
                keyExtractor={(item) => item.order_id.toString()}
            />
        </View>
    );
};

const styles = {
    container: tw`flex-1 p-4 bg-gray-200`,
    heading: tw`text-2xl font-bold mb-4`,
    orderItemContainer: tw`bg-white rounded-lg p-4 mb-4`,
    orderText: tw`text-gray-500 mb-2`,
};

export default PastOrdersScreen;
