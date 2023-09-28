
import {saveUserData} from '../reducer/auth';
import auth from '@react-native-firebase/auth';
import store from '../store';
import types from '../types';


export const login = (email,password) => {
  return async dispatch => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: userCredential.user });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message });
    }
  };
};
