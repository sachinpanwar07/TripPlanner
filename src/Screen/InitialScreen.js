import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavigationString from '../Navigation/NavigationString'

const InitialScreen = ({navigation}) => {
  return (
    <View>
      <Text style={{color:"red"}} onPress={()=>navigation.navigate(NavigationString.LOGIN)}>InitialScreen</Text>
    </View>
  )
}

export default InitialScreen

const styles = StyleSheet.create({})