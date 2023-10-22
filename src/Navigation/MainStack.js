import {View, Text} from 'react-native';
import React from 'react';
import NavigationString from './NavigationString';
import * as Screens from '../Screen';
import TabRoutes from './TabRoutes';
import Trip from '../Screen';
export default function (Stack) {
 
  return (
    <>
          <Stack.Screen
        name={NavigationString.TAB_ROUTES}
        component={TabRoutes}
        options={{ headerShown: false }}
      
      />
      
    </>
  );
}