
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { initializeApp } from '@react-native-firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyC1ggXTs0PB3LN2S_Nv0j8DnZNlA9JB6XQ",
  authDomain: "tripplanner-aea1a.firebaseapp.com",
  projectId: "tripplanner-aea1a",
  storageBucket: "tripplanner-aea1a.appspot.com",
  messagingSenderId: "42688111019",
  appId: "1:42688111019:web:3f84611c51819ba55db2ee"
};

initializeApp(firebaseConfig);

  
AppRegistry.registerComponent(appName, () => App);
