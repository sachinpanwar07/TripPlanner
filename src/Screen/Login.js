import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavigationString from '../Navigation/NavigationString'
const Login = ({navigation}) => {
  console.warn(NavigationString.HOME_SCREEN);
  console.warn(NavigationString.CREATE_TRIP);
  console.warn(NavigationString.PROFILE);
  return (
    <View>
      <Text style={{color:'red'}} onPress={()=>navigation.navigate(NavigationString.HOME_SCREEN)}>Login</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})