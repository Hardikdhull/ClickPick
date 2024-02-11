import {View, Text} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import { store } from './src/screens/redux/store/Store';
import MainContainer from './src/screens/Home/MainContainer';



const App = () => {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

export default App;
