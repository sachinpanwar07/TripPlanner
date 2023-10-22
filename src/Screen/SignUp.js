import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, {useState,useContext} from 'react';
import NavigationString from '../Navigation/NavigationString';
import ImagePath from '../constants/ImagePath';
import {TextInput} from 'react-native-gesture-handler';
import TextInputCompo from '../components/CustomComponets/TextInputCompo';
import Strings from '../constants/Strings';
import ButtonComponent from '../components/CustomComponets/ButtonCompo';
import { moderateScale, moderateScaleVertical, textScale } from '../Style/responsive';
import auth from '@react-native-firebase/auth';
import UserContext from '../UserProvider';
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecuretext] = useState(true);
  const [confirmPass,setConfirmPass]=useState('')
  const { userData,setUserData } = useContext(UserContext);
  const handleSignup = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Set user data in context
      setUserData(user);

      // You can also navigate to the profile screen here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgContainer}
        source={ImagePath.ic_background}>
        <View style={styles.textView}>
          <Text style={{fontSize:textScale(24),paddingHorizontal:moderateScale(16),fontWeight:900}}>{Strings.CREATE_NEW_ACCOUNT}</Text>
          <Text style={{fontSize:textScale(16),paddingHorizontal:moderateScale(16),fontWeight:600}}>{Strings.CREATE_AN_ACCOUNT_SO_YOU_CAN_CONTINUE}</Text>
        </View>
        <View style={styles.inputView}>
          <TextInputCompo
            value={email}
            placeholder={Strings.EMAIL}
            onChangeText={value => setEmail(value)}
          />
          <TextInputCompo
            placeholder={Strings.PASSWORD}
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={secureText}
            secureText={secureText ? Strings.SHOW : Strings.HIDE}
            onPressSecure={() => setSecuretext(!secureText)}
          />
           {/* <TextInputCompo
            placeholder={Strings.CONFIRM_PASS}
            value={confirmPass}
            onChangeText={value => setConfirmPass(value)}
            secureTextEntry={secureText}
            secureText={secureText ? Strings.SHOW : Strings.HIDE}
            onPressSecure={() => setSecuretext(!secureText)}
          /> */}
          <ButtonComponent text={Strings.SIGN_UP}  onPress={handleSignup}/>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flex: 1,
  },
  textView: {
    marginVertical:moderateScaleVertical(40),
    flex: 0.3,
   
    
  },
  inputView: {
    flex: 0.6,
  
    justifyContent: 'center',
  },
});
