import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import NavigationString from '../Navigation/NavigationString';
import ImagePath from '../constants/ImagePath';
import {TextInput} from 'react-native-gesture-handler';
import TextInputCompo from '../components/CustomComponets/TextInputCompo';
import Strings from '../constants/Strings';
import ButtonComponent from '../components/CustomComponets/ButtonCompo';
import { moderateScale, moderateScaleVertical, textScale } from '../Style/responsive';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../redux/reducer/auth';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecuretext] = useState(true);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginAsync(email, password));
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgContainer}
        source={ImagePath.ic_background}>
        <View style={styles.textView}>
          <Text style={{fontSize:textScale(24),paddingHorizontal:moderateScale(16),fontWeight:900}}>{Strings.WelCome_BACk}</Text>
          <Text style={{fontSize:textScale(16),paddingHorizontal:moderateScale(16),fontWeight:600}}>{Strings.WE_ARE_HAPPY_TO_SEE}</Text>
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
          <ButtonComponent text={Strings.LOGIN} onPress={handleLogin} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

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
