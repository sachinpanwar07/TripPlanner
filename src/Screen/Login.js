import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert, Modal, TouchableOpacity, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import UserContext from '../UserProvider';
import ImagePath from '../constants/ImagePath';
import Strings from '../constants/Strings';
import ButtonComponent from '../components/CustomComponets/ButtonCompo';
import TextInputCompo from '../components/CustomComponets/TextInputCompo';
import { moderateScaleVertical, textScale, moderateScale } from '../Style/responsive';
import Colors from '../Style/Colors';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const { setUserData, resetPassword } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Enter Email and Password');
        return;
      }

      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      setUserData(user);
      console.log('User Data:', user);

      navigation.navigate('Home');
    } catch (error) {
      console.error('Login Error:', error);
      let errorMessage = 'Wrong email or password';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password. Please try again.';
      }
      Alert.alert('Login Error', errorMessage);
    }
  };

  const handleForgotPassword = () => {
    if (forgotEmail) {
      resetPassword(forgotEmail)
        .then(() => {
          setModalVisible(false);
          Alert.alert('Password reset email sent!', 'Check your email for instructions to reset your password.');
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    } else {
      Alert.alert('Error', 'Please enter a valid email address.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imgContainer} source={ImagePath.ic_background}>
        <View style={styles.textView}>
          <Text style={styles.title}>{Strings.WelCome_BACk}</Text>
          <Text style={styles.subtitle}>{Strings.WE_ARE_HAPPY_TO_SEE}</Text>
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
          <Text style={styles.forgotpassstyle} onPress={() => setModalVisible(true)}>Forgot Password?</Text>
          <ButtonComponent text={Strings.LOGIN} onPress={handleLogin} />
        </View>
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter your email to reset your password</Text>
            <TextInput
              placeholder="Enter your email"
              value={forgotEmail}
              onChangeText={setForgotEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleForgotPassword}
            >
              <Text style={styles.buttonText}>Send Reset Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  forgotpassstyle: {
    color: Colors.blackColor,
    fontSize: textScale(16),
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: moderateScale(20),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width: '80%',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    width: '80%',
  },
  buttonClose: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
