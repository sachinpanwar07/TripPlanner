import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import NavigationString from '../Navigation/NavigationString';
import ImagePath from '../constants/ImagePath';
import ButtonComponent from '../components/CustomComponets/ButtonCompo';
import Strings from '../constants/Strings';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../Style/responsive';
const InitialScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imgbackg} source={ImagePath.ic_background}>
        <View style={styles.tetxStyle}>
          <Text style={{fontSize: textScale(30), fontWeight: 900}}>
            Travel With Me
          </Text>
        </View>
        <View style={styles.btnstyl}>
          <ButtonComponent
            text="Login"
            onPress={() => navigation.navigate(NavigationString.LOGIN)}
          />
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: textScale(18),
            }}>
            OR
          </Text>
          <ButtonComponent
            text={Strings.SIGN_UP}
            onPress={() => navigation.navigate(NavigationString.SIGNUP_SCREEN)}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default InitialScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgbackg: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tetxStyle: {
    flex: 0.2,
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(12),
    marginTop: moderateScale(40),
  },
  btnstyl: {
    marginTop:moderateScaleVertical(80),
    flex: 0.5,
    
    // justifyContent: 'space-evenly',
    
  },
});
