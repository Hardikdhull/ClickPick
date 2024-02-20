import {
    View,
    Text,
    FlatList,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../common/CommonButton';
import RazorpayCheckout from 'react-native-razorpay';
import { useNavigation } from '@react-navigation/native';
// import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@env'
import { addOrder } from '../redux/actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = () => {
    const cartData = useSelector(state => state.Reducers);
    console.log(cartData)
    const addressList = useSelector(state => state.AddressReducers);
    const [selectedAddress, setSelectedAddress] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const url = "http://panel.mait.ac.in:8005"; // Update with your API URL
    // let razorpayKeyId = RAZORPAY_KEY_ID
    // let razorpayKeySecret = RAZORPAY_KEY_SECRET

    console.log("Cart Data:", cartData);
    const orders = cartData.map(item => ({
        item: item.item,
        quantity: item.quantity, // Use the quantity from the cart directly
        cost: parseFloat(item.price) * parseFloat(item.quantity), // Calculate cost based on item price and quantity
        custom_message: ""
    }));
    orders.forEach(order => {
        order.cost = parseFloat(order.cost).toFixed(2);
    });
    console.log(orders)
    console.log("Address List:", addressList);
    const getTotal = () => {
        let tempTotal = 0;
        cartData.forEach(item => {
            // Convert the price string to a number and add it to tempTotal
            tempTotal += parseFloat(item.price) * item.quantity * 100; // Convert to paise
        });
        return tempTotal; // Return the total amount in paise as an integer
    };

    const accessToken = AsyncStorage.getItem('access_token');

    console.log("Total:", getTotal());

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>Checkout</Text>
                <View style={{ flex: 1, maxHeight: '90%' }}>
                    <FlatList
                        data={cartData}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={{
                                        width: '100%',
                                        height: 70,
                                        flexDirection: 'row',
                                        marginTop: 10,
                                    }}>
                                    <Image
                                        source={{ uri: url + item.display_image }}
                                        style={{ width: 70, height: 70, marginLeft: 10 }}
                                    />
                                    <View style={{ }}>
                                        <Text style={{ fontSize: 18 }}>{item.item}</Text>
                                        <Text style={{ marginTop: 5 }}>Quantity: <Text style={{ fontWeight: 'bold', color: '#000' }}>{item.quantity}</Text></Text>
                                        <Text style={{ marginTop: 5 }}>{'रु ' + item.price}</Text>
                                    </View>
                                </View>
                            );
                        }}
                    />

                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingLeft: 20,
                        paddingRight: 20,
                        borderTopWidth: 0.5,
                        height: 50,
                        borderTopColor: '#8e8e8e',
                    }}>
                    <Text>Total :</Text>
                    <Text>{'रु ' + getTotal() / 100}</Text>
                </View>
                {/* <View>
                    <FlatList
                        data={addressList}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={{
                                        width: '100%',

                                        borderWidth: 0.2,
                                        borderColor: '#8e8e8e',
                                        alignSelf: 'center',

                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <View>
                                        <Text style={{ marginLeft: 20 }}>{'City: ' + item.city}</Text>
                                        <Text style={{ marginLeft: 20 }}>
                                            {'Building: ' + item.building}
                                        </Text>
                                        <Text style={{ marginLeft: 20, marginBottom: 10 }}>
                                            {'Pincode: ' + item.pincode}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{ borderWidth: 0.2, padding: 7, marginRight: 20 }}
                                        onPress={() => {
                                            setSelectedAddress(
                                                'City :' +
                                                item.city +
                                                ' ' +
                                                ',Building: ' +
                                                item.building +
                                                ',Pincode: ' +
                                                item.pincode,
                                            );
                                        }}>
                                        <Text>Select address</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View> */}
                {/* <Text style={{ margin: 20, fontSize: 18 }}>Select Address</Text>
                <Text style={{ marginLeft: 20, fontSize: 16 }}>
                    {selectedAddress == ''
                        ? 'Please Select Address From Above List'
                        : selectedAddress}
                </Text> */}
                <View style={{ marginBottom: 100 }}>
                    <CustomButton
                        bgColor={'#000'}
                        textColor={'#fff'}
                        title={'Place Order'}
                        onPress={() => {


                            console.log('Sending request to create order:', orders);

                            fetch(`${url}/stationery/create-order/`, {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ orders }),
                            })
                                .then(response => {
                                    if (response.ok) {
                                        return response.json();
                                    }
                                    throw new Error('Failed to create order');
                                })
                                .then(data => {
                                    console.log('Order created successfully:', data);
                                    // Handle success, e.g., navigate to a success page
                                })
                                .catch(error => {
                                    console.error('Error creating order:', error);
                                    // Handle error, e.g., show an alert
                                    Alert.alert('Error', 'Failed to create order. Please try again.');
                                });
                        }}
                    />
                </View>

            </View>
        </SafeAreaView>
    );
};

export default Checkout;
