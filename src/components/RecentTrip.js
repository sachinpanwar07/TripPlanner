import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moderateScale, textScale} from '../Style/responsive';
import Colors from '../Style/Colors';
import ImagePath from '../constants/ImagePath';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
const RecentTrip = () => {
  const [tripData, setTripData] = useState([]);

  const fetchTripData = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem('trips');
      console.log('Data from AsyncStorage:', data);
      if (data) {
        setTripData(JSON.parse(data));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTripData();
  }, [fetchTripData]);
  console.log('this trip data' + tripData);
  const handleDelete = async index => {
    try {
      const updatedTrips = [
        ...tripData.slice(0, index),
        ...tripData.slice(index + 1),
      ];
      await AsyncStorage.setItem('trips', JSON.stringify(updatedTrips));
      setTripData(updatedTrips);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAsDone = async index => {
    try {
      const updatedTrips = tripData.map((item, i) => {
        if (i === index) {
          return {...item, isDone: true};
        }
        return item;
      });

      // Move the completed trip from recent to past
      const completedTrip = updatedTrips[index];
      const updatedRecentTrips = updatedTrips.filter((item, i) => i !== index);
      const pastTrips = await AsyncStorage.getItem('pastTrips');
      const parsedPastTrips = pastTrips ? JSON.parse(pastTrips) : [];
      parsedPastTrips.push(completedTrip);

      await AsyncStorage.setItem('trips', JSON.stringify(updatedRecentTrips));
      await AsyncStorage.setItem('pastTrips', JSON.stringify(parsedPastTrips));

      setTripData(updatedRecentTrips);
    } catch (error) {
      console.error(error);
    }
  };

  const Item = ({
    name,
    destination,
    description,
    date,
    enddate,
    time,
    index,
  }) => {
    // formate date in mm/dd/yy
    const formatDate = value => {
      if (typeof value === 'string') {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString();
        }
      } else if (value instanceof Date) {
        return value.toLocaleDateString();
      }
      return '';
    };
    // displaying current time
    const formatTime = value => {
      if (typeof value === 'string') {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleTimeString();
        }
      } else if (value instanceof Date) {
        return value.toLocaleTimeString();
      }
      return '';
    };

    return (
      <View style={styles.TripView}>
        <Text style={styles.textsyle}>Name: {name}</Text>
        <Text style={styles.textsyle}>Destination: {destination}</Text>
        <Text style={styles.textsyle}>{description}</Text>
        <View style={styles.dateView}>
          <Text style={styles.textsyle1}>{formatDate(date)}</Text>
          <Text style={styles.textsyle1}>{formatDate(enddate)}</Text>
          <Text style={styles.textsyle1}>{formatTime(time)}</Text>
        </View>
        <View style={styles.deleteDoneView}>
          <TouchableOpacity onPress={() => handleMarkAsDone(index)}>
            <Image source={ImagePath.ic_done} style={styles.ingIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(index)}>
            <Image source={ImagePath.ic_delete} style={styles.ingIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}) => (
    <Item
      name={item.name}
      destination={item.destination}
      description={item.description}
      date={item.date}
      enddate={item.enddate}
      time={item.time}
      index={index}
    />
  );

  return (
    <View style={styles.MainContainer}>
      <FlatList
        data={tripData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
  
    shadowOffset: {width: 0, height: 10},
    shadowColor:Colors.blueColor,
    elevation: 5,
    padding: moderateScale(20),
    backgroundColor:Colors.whiteColorOpacity70
    
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:moderateScale(6)
  },
  textsyle: {
    fontSize: textScale(17),
    color: Colors.blackOpacity90,
  },
  textsyle1: {
    fontSize: textScale(13),
    color: Colors.blackOpacity90,
  },
  mytrip: {
    fontSize: textScale(24),
    color: Colors.blueColor,
    padding: moderateScale(12),
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
