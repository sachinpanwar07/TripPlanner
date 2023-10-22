import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecentTrip from '../components/RecentTrip';
import PastTrips from '../components/Past';

const MaterialTopTab = createMaterialTopTabNavigator();

const Trip = () => {
  return (
    <MaterialTopTab.Navigator>
      <MaterialTopTab.Screen 
        name="Recent Trips"
        component={props => <RecentTrip />}
      />
      <MaterialTopTab.Screen 
        name="Past Trips"
        component={props => <PastTrips/>}
      />
    </MaterialTopTab.Navigator>
  );
};

export default Trip;
