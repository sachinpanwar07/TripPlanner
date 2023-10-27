import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import React, {useState,useEffect} from 'react';
import TextInputCompo from '../components/CustomComponets/TextInputCompo';
import {moderateScale, textScale} from '../Style/responsive';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePath from '../constants/ImagePath';
import Colors from '../Style/Colors';
import NavigationString from '../Navigation/NavigationString';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CreateTrip = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const [time,setTime]=useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  
  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
    
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(new Date());
  //   }, 1000); // Update every second

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };
  const handleNameChange = text => {
    setName(text);
  };

  const handleDestinationChange = text => {
    setDestination(text);
  };

  const handleDescriptionChange = text => {
    setDescription(text);
  };
  const handleAddTrip = async () => {
    try {
      const newTrip = {
        name,
        destination,
        description,
        date,
        enddate,
        time,
        isDone:false
        
      };
      const existingTrips = await AsyncStorage.getItem('trips');
      const trips = existingTrips ? JSON.parse(existingTrips) : [];
      trips.push(newTrip);
      await AsyncStorage.setItem('trips', JSON.stringify(trips));
      console.log('Data stored successfully:', JSON.stringify(trips));
      // navigation.navigate(NavigationString.TRIP_SCREEN);
Alert.alert("Trip is Added")
    } catch (error) {
      console.error(error);
    }
  };
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
  
  return (
    <View style={{flex: 1}}>
      <View style={styles.ImagetextView}>
        <Image
          source={ImagePath.ic_traveler}
          style={{width: moderateScale(230), height: moderateScale(200)}}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="trip name"
          style={styles.textinput}
          onChangeText={handleNameChange}
          value={name}
          multiline={true}
          numberOfLines={1}
        />
        <TextInput
          placeholder="Destination"
          style={styles.textinput}
          onChangeText={handleDestinationChange}
          value={destination}
          multiline={true}
          numberOfLines={2}
        />
        <TextInput
          placeholder="Description"
          style={styles.textinput}
          onChangeText={handleDescriptionChange}
          value={description}
          multiline={true}
          numberOfLines={4}
        />
        <View style={styles.datebtnstyle}>
          {/* <Button onPress={() => setShow(true)} title="Start date" /> */}
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
            <Image source={ImagePath.ic_date} style={styles.dateimg} />
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeStartDate}
            />
          )}
          <Text style={{fontWeight:'bold'}}>{formatDate(date)}</Text>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
            <Image source={ImagePath.ic_date} style={styles.dateimg} />
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={enddate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeEndDate}
            />
          )}
             <Text style={{fontWeight:'bold'}}>{formatDate(enddate)}</Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: moderateScale(12),
        }}>
        <TouchableOpacity style={styles.addbtn} onPress={handleAddTrip}>
          <Text style={{fontSize: textScale(20)}}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateTrip;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',

    justifyContent: 'space-around',
  },
  textinput: {
    width: moderateScale(300),
    color: 'black',
    marginHorizontal: moderateScale(12),
    padding: 12,
    fontWeight:'bold'
    
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