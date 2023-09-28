import { createSlice } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth'; // Import Firebase authentication

const authSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: null, // Change this to null to represent no authenticated user initially
  },
  reducers: {
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export const loginAsync = (email, password) => {
  return async (dispatch) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      dispatch(saveUserData(userCredential.user)); // Dispatch the user data to Redux store
    } catch (error) {
      console.error(error);
      // Handle error here (e.g., dispatch an error action)
    }
  };
};
export const { saveUserData } = authSlice.actions;
export const registerAsync = (email, password) => {
  return async (dispatch) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      dispatch(saveUserData(userCredential.user));
    } catch (error) {
      console.error(error);
      // Handle error here (e.g., dispatch an error action)
    }
  };
};

export default authSlice.reducer;
