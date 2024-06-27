import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from './src/components/Auth/Login';
import Routes from './src/Navigation/Routes';
import { initializeApp } from '@react-native-firebase/app';
import useColorScheme from './src/Style/useColorScheme';
import { darkStyles, lightStyles } from './src/Style/Styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const firebaseConfig = {
    apiKey: "AIzaSyCB6Vt_RunC6rOQpYjBgwNdSta0nc9v0i4",
    authDomain: "firetrip-b161b.firebaseapp.com",
    projectId: "firetrip-b161b",
    storageBucket: "firetrip-b161b.appspot.com",
    messagingSenderId: "446433615304",
    appId: "1:446433615304:web:badc91a4f20325d926b4fd"
  };
  import { UserProvider } from './src/UserProvider';

  const app = initializeApp(firebaseConfig);
const App = () => {
  const colorScheme = useColorScheme();
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;
  return(
    <GestureHandlerRootView>
    <UserProvider>
      <Routes />
    </UserProvider>
  </GestureHandlerRootView>
  )
   

};

export default App;

const styles = StyleSheet.create({});
