import reducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: reducer,
  },
});

export default store;

