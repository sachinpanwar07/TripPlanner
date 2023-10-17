import React, {useState, useEffect,useCallback} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moderateScale, textScale} from '../Style/responsive';
import Colors from '../Style/Colors';

const Trip = () => {
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
  const Item = ({name, destination, description, date, enddate, time}) => {
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
      </View>
    );
  };

  const renderItem = ({item}) => (
    <Item
      name={item.name}
      destination={item.destination}
      description={item.description}
      date={item.date}
      enddate={item.enddate}
      time={item.time}
    />
  );

  return (
    <View style={styles.MainContainer}>
      <Text style={styles.mytrip}>My Trips</Text>
      <FlatList
        data={tripData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Trip;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    borderWidth: 2,
  },
  TripView: {
    flex: 1,

    margin: moderateScale(12),
    backgroundColor: Colors.whiteColor,
    height: moderateScale(120),
    borderRadius: moderateScale(12),

    shadowOffset: {width: 0, height: 2},

    elevation: 5,
    padding: moderateScale(20),
   
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  textsyle: {
    fontSize:textScale(17),
    color:Colors.blueLight
  },
  textsyle1: {
    fontSize:textScale(13),
    color:Colors.blackColor
  },
  mytrip:{
    fontSize:textScale(24),
    color:Colors.blueColor,
    padding:moderateScale(12)
  }
});
