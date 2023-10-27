import React, { useState ,useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput,Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useAuth } from '../UserProvider';
import ImagePath from '../constants/ImagePath';
import Colors from '../Style/Colors';
import { moderateScale } from '../Style/responsive';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import {ImagePicker,launchImageLibrary} from 'react-native-image-picker';
const Profile = () => {
  const { userData ,signOut} = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState(userData.displayName || '');

  const chooseImage = async() => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
    };

    const result = await launchImageLibrary(options);
    setProfileImage(result.assets[0].uri);
  };

  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleLogOut = () => {
    signOut() // Calling sign out function from UserProvider
      .then(() => {
        // Handle successful sign out
        Alert.alert('Logged out successfully');
      })
      .catch(error => {
        console.error('Error logging out:', error);
        Alert.alert('Error logging out. Please try again.');
      });
  };
  
  const handleImageUpload = async () => {
    if (profileImage) {
      const fileName = `profile_images/${userData.uid}.jpg`;
      const reference = storage().ref(fileName);
  
      try {
        await reference.putFile(profileImage);
        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  
    userData
      .updateProfile({
        displayName: newName,
      })
      .then(() => {
        console.log('User name updated successfully');
      })
      .catch(error => {
        console.error('Error updating user name:', error);
      });
  
    setIsModalVisible(false);
  };
  
  useEffect(() => {
    const getProfileImage = async () => {
      try {
        const reference = storage().ref(`profile_images/${userData.uid}.jpg`);
        const uri = await reference.getDownloadURL();
        setProfileImage(uri);
      } catch (error) {
        console.error('Error retrieving profile image:', error);
      }
    };
  
    getProfileImage();
  }, []);
console.log(profileImage)
  return (
    <View style={styles.MainContainer}>
      <View style={styles.ImageContainer}>
        {profileImage && <Image source={{ uri:profileImage }} style={styles.imageStyle} />}
      </View>
      <Text>{newName}</Text>
      <Text>{userData.email}</Text>
      <View style={styles.EditLogBtns}>
        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOut} style={styles.logoutbtn}>
          <Text style={styles.editButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <Text>Edit Profile</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Edit Name"
            value={newName}
            onChangeText={text => setNewName(text)}
          />
          <TouchableOpacity onPress={chooseImage} style={styles.changePhotoButton}>
            <Text style={styles.changePhotoButtonText}>upload Profile Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageUpload} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
       
        </View>
      </Modal>

    
    </View>
  );
};

export default Profile;


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  ImageContainer: {
    width: moderateScale(200),
    borderWidth: 4,
    alignItems: 'center',
    height: moderateScale(200),
    borderRadius: moderateScale(100),
    marginTop: moderateScale(20),
    borderColor: Colors.blueColor,
    justifyContent: 'center',
    marginBottom: moderateScale(9),
  },
  imageStyle: {
    width: moderateScale(190),
    height: moderateScale(190),
    borderRadius: moderateScale(100),
  },
  editButton: {
    marginTop: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: Colors.blueColor,
    borderRadius: moderateScale(5),
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    alignItems: 'center',
  },
  inputField: {
    width: moderateScale(250),
    height: moderateScale(40),
    borderWidth: 1,
    borderColor: Colors.blueColor,
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  changePhotoButton: {
    backgroundColor: Colors.blueColor,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  changePhotoButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: Colors.blueColor,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  EditLogBtns:{
    flexDirection:'row',
    justifyContent:'space-between',
   
    width:moderateScale(200)
  },
  logoutbtn:{
    marginTop: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: Colors.redColor,
    borderRadius: moderateScale(5),
  }
});
