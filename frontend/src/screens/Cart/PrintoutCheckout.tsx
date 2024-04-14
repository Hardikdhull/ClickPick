import React from 'react';
import { View, Text, Image, SafeAreaView, Alert } from 'react-native';
import CustomButton from '../common/CommonButton';
import { usePrintoutContext } from '../context/PrinoutContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';

const PrintoutCheckout = () => {
  const { printoutData } = usePrintoutContext();
  console.log(printoutData);
  const getTotal = () => {
    let tempTotal = parseInt(printoutData.cost) * 100; // Convert rupees to paise
    return tempTotal;
  };
  const url = "http://panel.mait.ac.in:8005";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>Checkout</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
          <Image source={{ uri: printoutData.fileMeta[0].uri }} style={{ width: 50, height: 50, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{printoutData.fileMeta[0].name}</Text>
            <Text>Black and White Pages: {printoutData.blackAndWhitePages}</Text>
            <Text>Coloured Pages: {printoutData.colouredPages}</Text>
            <Text>Cost of printout: {printoutData.cost}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, borderTopWidth: 0.5, borderTopColor: '#8e8e8e', height: 50 }}>
          <Text>Total Charges:</Text>
          <Text>INR {printoutData.cost}</Text>
        </View>
        <View style={{ marginBottom: 100 }}>
          <CustomButton
            bgColor={'#000'}
            textColor={'#fff'}
            title={'Place Order'}
            onPress={async () => {
              const accessToken = await AsyncStorage.getItem('access_token');

              var options = {
                description: 'Buy items',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: "rzp_test_1WhP3jEX0u7tb9",
                amount: getTotal(),
                name: 'test order',
                order_id: "", // Replace this with an order_id created using Orders API.
                prefill: {
                  email: 'xyz@gmail.com',
                  contact: '9999999999',
                  name: 'User 1'
                },
                theme: { color: '#F37254' }
              }

              RazorpayCheckout.open(options).then(async (data) => {
                alert(`Success: ${data.razorpay_payment_id}`);

                const orderFormData = new FormData();

                // Append the file and other data to the FormData object
                Object.keys(printoutData.file).forEach((key) => {
                  const file = printoutData.file[key];
                  // const pageKey = key.replace('file', 'pages');
                  // const colouredPageKey = key.replace('file', 'colouredPages');
                  // // const pagesValue = printoutData[pageKey];
                  // // const colouredPagesValue = printoutData[colouredPageKey];

                  orderFormData.append('file', file[0]); // Append the file object
                  // orderFormData.append('pages', pagesValue);
                  // orderFormData.append('colouredpages', colouredPagesValue);
                });

                // Append other non-file data
                orderFormData.append('black_and_white_pages', printoutData.blackAndWhitePages);
                orderFormData.append('coloured_pages', printoutData.colouredPages);
                orderFormData.append('cost', printoutData.cost);
                orderFormData.append('custom_message', 'hi'); // Assuming custom_message is a static value

                // Send the FormData object in the request body
                try {
                  const response = await fetch(`${url}/stationery/create-printout/`, {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${accessToken}`,
                      // Remove the 'Content-Type' header to let the browser set it automatically
                    },
                    body: orderFormData,
                  });
                  console.log("Form for printout: ",orderFormData)
                  if (response.ok) {
                    const data = await response.json();
                    console.log('Order created successfully:', data);
                  } else {
                    throw new Error('Failed to create order');
                  }
                } catch (error) {
                  console.error('Error creating order:', error);
                  Alert.alert('Error', 'Failed to create order. Please try again.');
                }

              }).catch((error) => {
                // handle failure
                console.log(error)
                alert(`Error: ${error.code} | ${error.description}`);
              });
            }}
          />
        </View>
      </View>
    </SafeAreaView >
  );
};

export default PrintoutCheckout;
