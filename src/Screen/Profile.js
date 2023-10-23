import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { useAuth } from '../UserProvider';
import ImagePath from '../constants/ImagePath';
import Colors from '../Style/Colors';
import { moderateScale } from '../Style/responsive';
import { launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {
  const { userData } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState(userData.displayName || '');

  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProfileImage({ uri: response.uri });
      }
    });
  };

  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleSaveProfile = () => {
    // Update the user's display name in Firebase Authentication
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

    setIsModalVisible(false); // Close the modal after saving
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.ImageContainer}>
        <Image
          source={profileImage ? profileImage : ImagePath.ic_profile}
          style={styles.imageStyle}
        />
      </View>
      <Text>{newName}</Text>
      <Text>{userData.email}</Text>
      <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <Text>Edit Profile</Text>
          <TextInput
            style={styles.inputField}
            placeholder="New Name"
            value={newName}
            onChangeText={text => setNewName(text)}
          />
          <TouchableOpacity onPress={chooseImage} style={styles.changePhotoButton}>
            <Text style={styles.changePhotoButtonText}>Change Profile Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSaveProfile} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
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
});
