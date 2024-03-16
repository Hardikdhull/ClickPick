import {View, Text} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import { store } from './src/screens/redux/store/Store';
import MainContainer from './src/screens/Home/MainContainer';
import { PrintoutProvider } from './src/screens/context/PrinoutContext';



const App = () => {
  return (
    <Provider store={store}>
      <PrintoutProvider>
        <MainContainer />
      </PrintoutProvider>
    </Provider>
  );
};

export default App;
