// styles.js
import { StyleSheet } from 'react-native';

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
  tripView: {
    backgroundColor: 'white',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
  tripView: {
    backgroundColor: '#333', // Slightly lighter black for contrast
  },
});

export { lightStyles, darkStyles };
