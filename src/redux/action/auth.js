import {FORGOT_PASSWORD, LOGIN_API, SIGNUP_API} from '../../config/urls';

import {saveUserData} from '../reducer/auth';
import store from '../store';
import types from '../types';
const {dispatch} = store;

export const login = data => {
  dispatch(saveUserData(data));
};

export function logout() {
  dispatch({type: types.CLEAR_REDUX_STATE});
}
