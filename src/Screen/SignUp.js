import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import UserContext from '../UserProvider';
import ImagePath from '../constants/ImagePath';
import Strings from '../constants/Strings';
import ButtonComponent from '../components/CustomComponets/ButtonCompo';
import TextInputCompo from '../components/CustomComponets/TextInputCompo';
import { moderateScaleVertical, textScale,moderateScale } from '../Style/responsive';
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [secureText, setSecureText] = useState(true);
  const { setUserData } = useContext(UserContext);

  const handleSignup = async () => {
    try {
    
      if (!validatePassword(password)) {
        Alert.alert('Password Requirements', 'Password should be at least 6 characters long and include special characters.');
        return;
      }

      if (password !== confirmPass) {
        Alert.alert('Password Mismatch', 'Passwords do not match. Please re-enter.');
        return;
      }

      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      
      setUserData(user);

    
      navigation.navigate('Home'); 
    } catch (error) {
      console.error('Signup Error:', error);
      let errorMessage = 'Signup failed. Please try again.';
      
      Alert.alert('Signup Error', errorMessage);
    }
  };

 
  const validatePassword = (password) => {
 
    const regex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imgContainer} source={ImagePath.ic_background}>
        <View style={styles.textView}>
          <Text style={styles.title}>{Strings.CREATE_NEW_ACCOUNT}</Text>
          <Text style={styles.subtitle}>{Strings.CREATE_AN_ACCOUNT_SO_YOU_CAN_CONTINUE}</Text>
        </View>
        <View style={styles.inputView}>
          <TextInputCompo
            value={email}
            placeholder={Strings.EMAIL}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInputCompo
            placeholder={Strings.PASSWORD}
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={secureText}
            secureText={secureText ? Strings.SHOW : Strings.HIDE}
            onPressSecure={() => setSecureText(!secureText)}
          />
          <TextInputCompo
            placeholder={Strings.CONFIRM_PASS}
            value={confirmPass}
            onChangeText={(value) => setConfirmPass(value)}
            secureTextEntry={secureText}
            secureText={secureText ? Strings.SHOW : Strings.HIDE}
            onPressSecure={() => setSecureText(!secureText)}
          />
          <ButtonComponent text={Strings.SIGN_UP} onPress={handleSignup} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flex: 1,
  },
  textView: {
    marginVertical: moderateScaleVertical(40),
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: textScale(24),
    paddingHorizontal: moderateScale(16),
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: textScale(16),
    paddingHorizontal: moderateScale(16),
    fontWeight: '600',
    marginTop: 8,
  },
  inputView: {
    flex: 0.6,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(16),
  },
});

export default SignUp;
