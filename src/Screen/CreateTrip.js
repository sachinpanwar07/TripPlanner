import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, Alert, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePath from '../constants/ImagePath';
import Colors from '../Style/Colors';
import NavigationString from '../Navigation/NavigationString';
import { useAuth } from '../UserProvider';
import { moderateScale, textScale } from '../Style/responsive';

const CreateTrip = ({ navigation }) => {
  const { userData } = useAuth();
  const [date, setDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');

  const today = new Date();
  const mindate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleAddTrip = async () => {
    if (!name.trim() || !destination.trim() || !description.trim() || !date || !enddate) {
      Alert.alert('All fields are required');
      return;
    }
    try {
      const newTrip = {
        id: Date.now().toString(),
        name,
        destination,
        description,
        date: formatDate(date),
        enddate: formatDate(enddate),
        isDone: false,
      };

      const storedTrips = await AsyncStorage.getItem(`recentTrips-${userData.uid}`);
      const recentTrips = storedTrips ? JSON.parse(storedTrips) : [];
      recentTrips.push(newTrip);
      await AsyncStorage.setItem(`recentTrips-${userData.uid}`, JSON.stringify(recentTrips));

      console.log('Trip added successfully');
      Alert.alert('Trip Added');
      setName('');
      setDestination('');
      setDescription('');
      setDate(new Date());
      setEndDate(new Date());
      navigation.navigate(NavigationString.HOME_SCREEN);
    } catch (error) {
      console.error(error);
      Alert.alert('Error adding trip. Please try again.');
    }
  };

  const formatDate = (value) => {
    if (value instanceof Date) {
      const day = value.getDate();
      const month = value.getMonth() + 1;
      const year = value.getFullYear().toString().slice(-2); // Last two digits of the year
      return `${day}/${month}/${year}`;
    }
    return '';
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.ImagetextView}>
        <Image source={ImagePath.ic_traveler} style={{ width: moderateScale(230), height: moderateScale(200) }} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Trip Name"
          style={styles.textinput}
          onChangeText={(text) => setName(text)}
          value={name}
          multiline
          numberOfLines={1}
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Destination"
          style={styles.textinput}
          onChangeText={(text) => setDestination(text)}
          value={destination}
          multiline
          numberOfLines={2}
          placeholderTextColor="black"
        />
        <TextInput
          placeholder="Description"
          style={styles.textinput}
          onChangeText={(text) => setDescription(text)}
          value={description}
          multiline
          numberOfLines={4}
          placeholderTextColor="black"
        />
        <View style={styles.datebtnstyle}>
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
            <Image source={ImagePath.ic_date} style={styles.dateimg} />
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour
              minimumDate={mindate}
              display="default"
              onChange={onChangeStartDate}
            />
          )}
          <Text style={styles.dateText}>{formatDate(date)}</Text>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
            <Image source={ImagePath.ic_date} style={styles.dateimg} />
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={enddate}
              mode="date"
              is24Hour
              minimumDate={date}
              display="default"
              onChange={onChangeEndDate}
            />
          )}
          <Text style={styles.dateText}>{formatDate(enddate)}</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: moderateScale(12) }}>
        <TouchableOpacity style={styles.addbtn} onPress={handleAddTrip}>
          <Text style={{ fontSize: textScale(20) }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateTrip;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  textinput: {
    width: moderateScale(300),
    color: 'black',
    marginHorizontal: moderateScale(12),
    padding: 12,
    fontWeight: 'bold',
  },
  ImagetextView: {
    marginTop: moderateScale(20),
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datebtnstyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  dateimg: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  dateText: {
    color: 'black',
  },
  addbtn: {
    backgroundColor: Colors.blueColor,
    width: '90%',
    height: moderateScale(52),
    alignItems: 'center',
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(12),
    justifyContent: 'center',
  },
});
