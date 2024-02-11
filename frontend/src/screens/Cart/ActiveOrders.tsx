import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

const ActiveOrdersScreen = () => {
    const [activeOrders, setActiveOrders] = useState([]);
    const url = "http://10.0.0.118:8000";

    useEffect(() => {
        const fetchActiveOrders = async () => {
            const accessToken = await AsyncStorage.getItem('access_token');
            try {
                const response = await axios.get(`${url}/stationery/active-orders/`, {
                  headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                setActiveOrders(response.data);
            } catch (error) {
                console.error('Error fetching active orders:', error);
            }
        };

        fetchActiveOrders();
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
            <Text style={styles.heading}>Active Orders</Text>
            <FlatList
                data={activeOrders}
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

export default ActiveOrdersScreen;
