import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { create } from 'react-test-renderer';
import { moderateScale } from '../Style/responsive';
import Colors from '../Style/Colors';
const NearbyPlace = ({ location }) => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`https://overpass-api.de/api/interpreter?data=[out:json];(node(around:5000,${location});way(around:5000,${location});relation(around:5000,${location}););out 2000;`);
        const data = response.data.elements;

        const filteredPlaces = data.filter(element => element.tags && element.tags.name);

        setPlaces(filteredPlaces);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, [location]);

  const renderItem = ({ item }) => (
    <View style={styles.renderList}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.tags.name}</Text>
      <Text>{item.tags.description || 'No description available'}</Text>
    </View>
  );

  return (
    <View style={styles.flatListStyle}>
   
    <FlatList
      data={places}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
     horizontal={true}
     showsHorizontalScrollIndicator={false}
    /> 
    </View>
   
  );
};
 const styles=StyleSheet.create({

    flatListStyle:{
     
      marginBottom:moderateScale(70)
    },
    renderList:{
       flex:1,
        width:moderateScale(200),
        height:moderateScale(100),
        borderRadius:12,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        margin:moderateScale(12),
        backgroundColor:Colors.blueColor,
        shadowOffset: {width: 0, height: 2},
       elevation:10  
      }
 })
export default NearbyPlace;
