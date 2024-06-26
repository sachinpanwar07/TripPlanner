import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale, textScale } from '../Style/responsive';
import Colors from '../Style/Colors';
import ImagePath from '../constants/ImagePath';
import { useAuth } from '../UserProvider';
import { useFocusEffect } from '@react-navigation/native';
const RecentTrip = ({ navigation }) => {
  const { userData } = useAuth();
  const [tripData, setTripData] = useState([]);
 const fetchTripData = useCallback(async () => {
    if (userData) {
      try {
        const storedTrips = await AsyncStorage.getItem(`recentTrips-${userData.uid}`);
        if (storedTrips) {
          const parsedTrips = JSON.parse(storedTrips);
          setTripData(parsedTrips);
        } else {
          setTripData([]);
        }
      } catch (error) {
        console.error('Error fetching recent trips:', error);
      }
    }
  }, [userData]);

  // useEffect to fetch data initially
  useEffect(() => {
    fetchTripData();
  }, [fetchTripData]);

  // useFocusEffect to fetch data when screen focused
  useFocusEffect(
    useCallback(() => {
      fetchTripData();
    }, [fetchTripData])
  );

  const handleDelete = async (tripId) => {
    try {
      const updatedTrips = tripData.filter(trip => trip.id !== tripId);
      await AsyncStorage.setItem(`recentTrips-${userData.uid}`, JSON.stringify(updatedTrips));
      setTripData(updatedTrips);
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const handleMarkAsDone = async (tripId) => {
    try {
      const tripToMove = tripData.find(trip => trip.id === tripId);
      const updatedRecentTrips = tripData.filter(trip => trip.id !== tripId);
      const storedPastTrips = await AsyncStorage.getItem(`pastTrips-${userData.uid}`);
      const pastTrips = storedPastTrips ? JSON.parse(storedPastTrips) : [];
      pastTrips.push(tripToMove);

      await AsyncStorage.setItem(`recentTrips-${userData.uid}`, JSON.stringify(updatedRecentTrips));
      await AsyncStorage.setItem(`pastTrips-${userData.uid}`, JSON.stringify(pastTrips));
      setTripData(updatedRecentTrips);
    } catch (error) {
      console.error('Error marking trip as done:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.TripView}>
      <Text style={styles.textsyle}>Name: {item.name}</Text>
      <Text style={styles.textsyle}>Destination: {item.destination}</Text>
      <Text style={styles.textsyle}>{item.description}</Text>
      <View style={styles.dateView}>
        <Text style={styles.textsyle1}>{item.date}</Text>
        <Text style={styles.textsyle1}>{item.enddate}</Text>
      </View>
      <View style={styles.deleteDoneView}>
        <TouchableOpacity onPress={() => handleMarkAsDone(item.id)}>
          <Image source={ImagePath.ic_done} style={styles.ingIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Image source={ImagePath.ic_delete} style={styles.ingIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.MainContainer}>
      <FlatList
        data={tripData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  TripView: {
    flex: 1,
    margin: moderateScale(12),
    backgroundColor: Colors.whiteColor,
    borderRadius: moderateScale(12),
    shadowOffset: { width: 0, height: 10 },
    shadowColor: Colors.blueColor,
    elevation: 5,
    padding: moderateScale(20),
    backgroundColor: Colors.whiteColorOpacity70,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(6),
  },
  textsyle: {
    fontSize: textScale(17),
    color: Colors.blackOpacity90,
  },
  textsyle1: {
    fontSize: textScale(13),
    color: Colors.blackOpacity90,
  },
  deleteDoneView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(19),
  },
  ingIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
});

export default RecentTrip;
