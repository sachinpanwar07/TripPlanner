import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NearbyPlace from '../components/NearbyPlace'
import { moderateScale, textScale } from '../Style/responsive';
const HomeScreen = () => {
    
    const location = '30.3165,78.0322';
    return (
    <View style={styles.HomeContainer}>
      <Text style={{color:"black",fontSize:textScale(24)}}>Reconmended Place for you</Text>
      <NearbyPlace location={location}/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({HomeContainer:{
  flex:1,

}})