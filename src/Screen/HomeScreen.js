import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NearbyPlace from '../components/NearbyPlace';
import {moderateScale, textScale} from '../Style/responsive';
import Upcoming_task from '../components/Upcoming_task';
import Trip from './Trip';

const HomeScreen = () => {
  const [activeTrips, setActiveTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex:0.8}}>
        <Trip />
      </View>
      <View style={styles.HomeContainer}>
        <Text style={{color: 'black', fontSize: textScale(24),paddingLeft:moderateScale(10)}}>
         Near by Place
        </Text>
        <NearbyPlace location={'30.3165,78.0322'} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HomeContainer: {
    flex:0.4
  },
});
