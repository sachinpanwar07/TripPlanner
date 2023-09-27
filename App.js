import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from './src/components/Auth/Login';
import Routes from './src/Navigation/Routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';
const App = () => {
  return <Provider store={store}>
    <Routes/>
  </Provider>
};

export default App;

const styles = StyleSheet.create({});
