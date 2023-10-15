import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../Style/Colors'
import { moderateScale,textScale } from '../../Style/responsive'


const ButtonComponent = ({onPress=()=>{},
text='',
style={},
textStyle={},
leftimg=null
}) => {
  
  return (
   <TouchableOpacity style={{...styles.container,...style}}
   onPress={onPress}
   >
    {!!leftimg?<Image source={leftimg} style={{width:30,height:30,}}/>:<View/>}
    <Text style={{...styles.textStyle,...textStyle}}>{text}</Text>
    <View/>
   </TouchableOpacity>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({
container:{
    backgroundColor:Colors
    .redColor,
    height:moderateScale(52),
    justifyContent:'space-between',
    alignItems:"center",
   borderRadius:moderateScale(10),
   flexDirection:'row',
   paddingHorizontal:moderateScale(12)
  
},
textStyle:{
    fontSize:textScale(16),
    color:'white',
    fontWeight:'700',
    textAlign:'center',
    
    
   
} 
})