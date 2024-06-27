import {View, Text} from 'react-native';
import React from 'react';
import NavigationString from './NavigationString';
import * as Screens from '../Screen';

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={NavigationString.INITIAL_SCREEN}
        component={Screens.InitialScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={NavigationString.LOGIN}
        component={Screens.Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationString.SIGNUP_SCREEN}
        component={Screens.Signup}
        options={{headerShown: false}}
      />
     
    </>
  );
}