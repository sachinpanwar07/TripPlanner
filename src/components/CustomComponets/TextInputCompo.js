import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale,textScale } from '../../Style/responsive'
import Colors from '../../Style/Colors'

const TextInputCompo= ({
  value='',
  onChangeText,
  placeholder='',
  secureText=false,
  onPressSecure=()=>{},
  inputStyle={},
  textStyle={},
  placeholderTextColor=Colors.whiteColorOpacity70,
  ...props
}) => {
  return (
    <View style={{
      ...styles.inputStyle,...inputStyle
    }}>
     <TextInput style={{...styles.textStyle}}
     value={value}
     onChangeText={onChangeText}
     placeholder={placeholder}
     placeholderTextColor={placeholderTextColor}
     {...props}
     />
     {!!secureText?<Text style={{...styles.textStyle,flex:0}} onPress={onPressSecure}>{secureText}</Text>:null}
    </View>
  )
}

export default TextInputCompo

const styles = StyleSheet.create({
  inputStyle:{
    height:moderateScale(52),
   
    borderRadius:moderateScale(10),
    flexDirection:"row",
    justifyContent:'space-between',
    paddingHorizontal:moderateScale(16),
    alignItems:'center',
    backgroundColor:Colors.gray2,
    marginBottom:moderateScale(16)

  },
  textStyle:{
    fontSize:textScale(14),
    flex:1,
    color:Colors.whiteColor
  }
})