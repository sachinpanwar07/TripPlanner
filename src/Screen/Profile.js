import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import UserContext from '../UserProvider';

const Profile = () => {
  const { userData } = useContext(UserContext);

  return (
    <View style={styles.container}>
      {userData ? (
        <View>
          <Text>Email: {userData.email}</Text>
          {/* Add more user details as needed */}
        </View>
      ) : (
        <Text>User data not available</Text>
      )}
    </View>
  );
};
 export default Profile;
const styles = StyleSheet.create({})
