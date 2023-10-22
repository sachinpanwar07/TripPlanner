import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, Image,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moderateScale, textScale} from '../Style/responsive';
import Colors from '../Style/Colors';
import ImagePath from '../constants/ImagePath';
import { create } from 'react-test-renderer';

const PastTrips = () => {
  const [pastTrips, setPastTrips] = useState([]);

  useEffect(() => {
    const fetchPastTrips = async () => {
      try {
        const data = await AsyncStorage.getItem('pastTrips');
        if (data) {
          const parsedData = JSON.parse(data);
          setPastTrips(parsedData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPastTrips();
  }, []);

  const Item = ({name, destination, description, date, enddate, time,index}) => {
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
    const handleDelete = async (index) => {
      try {
        const updatedTrips = [...pastTrips.slice(0, index), ...pastTrips.slice(index + 1)];
        await AsyncStorage.setItem('pastTrips', JSON.stringify(updatedTrips));
        setPastTrips(updatedTrips);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <View style={styles.TripView}>
        <Text style={styles.textstyle}>Name: {name}</Text>
        <Text style={styles.textstyle}>Destination: {destination}</Text>
        <Text style={styles.textstyle}>{description}</Text>
        <View style={styles.dateView}>
          <Text style={styles.textstyle1}>{formatDate(date)}</Text>
          <Text style={styles.textstyle1}>{formatDate(enddate)}</Text>
          <Text style={styles.textstyle1}>{formatTime(time)}</Text>
        </View>
        <View style={styles.deleteDoneView}>
          <TouchableOpacity onPress={() => handleDelete(index)}>
            <Image source={ImagePath.ic_dlt} style={styles.ingIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({item,index}) => (
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
        data={pastTrips}
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
    elevation: 5,
    padding: moderateScale(20),
    backgroundColor:Colors.whiteColorOpacity70,
    shadowColor:Colors.blueColor
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textstyle: {
    fontSize: textScale(17),
    color: Colors.blackOpacity90,
  },
  textstyle1: {
    fontSize: textScale(13),
    color: Colors.blackColor,
  },
  mytrip: {
    fontSize: textScale(24),
    color: Colors.blueColor,
    padding: moderateScale(12),
  },
  deleteDoneView: {
    justifyContent: 'center',
    alignItems:"center",
    marginTop: moderateScale(19),
  },
  ingIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
});

export default PastTrips;
