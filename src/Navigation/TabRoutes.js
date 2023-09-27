import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Colors from '../Style/Colors';
import {Image, StyleSheet} from 'react-native';

import imagePath from '../constants/ImagePath';

import NavigationString from './NavigationString';
import  *as  Screens from '../Screen';
import HomeScreen from '../Screen';
import CreateTrip from '../Screen';
import Profile from '../Screen';

const BottomTab = createBottomTabNavigator();

const TabRoutes = props => {
  console.warn(NavigationString.HOME_SCREEN);
console.warn(NavigationString.CREATE_TRIP);
console.warn(NavigationString.PROFILE);

  return (
    <BottomTab.Navigator
      tabBar={tabsProps => (
        <>
          <BottomTabBar {...tabsProps} />
        </>
      )}
      initialRouteName={NavigationString.HOME_SCREEN}
      screenOptions={{
        headerShown: false,
        style: styles.customBottomtabsStyle,
        tabBarActiveTintColor: Colors.black,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: Colors.theme},
      }}>
      <BottomTab.Screen
        name={NavigationString.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={imagePath.homeIcon}
                style={[styles.icon, {tintColor: focused ? 'red' : 'grey'}]}
              />
            );
          },
          tabBarStyle: {
            tabBarActiveTintColor: 'grey',
          },
        }}
      />
     
      <BottomTab.Screen
        name={NavigationString.CREATE_TRIP}
        component={CreateTrip}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={imagePath.createIcon}
                style={[styles.icon, {tintColor: focused ? 'red' : 'grey'}]}
              />
            );
          },
          tabBarStyle: {},
        }}
      />
     
      <BottomTab.Screen
        name={NavigationString.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={imagePath.profileIcon}
                style={[styles.icon, {tintColor: focused ? 'red' : 'grey'}]}
              />
            );
          },
          tabBarStyle: {},
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  customBottomtabsStyle: {},
  icon: {
    width: 30,
    height: 30,
  },
});

export default TabRoutes;
