import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useAuth } from '../UserProvider'; // Adjust the path as necessary
import Colors from '../Style/Colors';
import { moderateScale } from '../Style/responsive';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {
  const { userData, signOut } = useAuth();
  const [profileImage, setProfileImage] = useState(userData?.photoURL || null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState(userData?.displayName || '');

  useEffect(() => {
    if (!profileImage && userData?.photoURL) {
      setProfileImage(userData.photoURL);
    }
  }, [userData]);

  const chooseImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 300,
      maxHeight: 300,
    };

    const result = await launchImageLibrary(options);
    if (!result.didCancel) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleLogOut = () => {
    signOut()
      .then(() => {
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
        const uri = await reference.getDownloadURL();
        setProfileImage(uri);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    userData
      .updateProfile({
        displayName: newName,
        photoURL: profileImage,
      })
      .then(() => {
        console.log('User name and photo updated successfully');
      })
      .catch(error => {
        console.error('Error updating user name and photo:', error);
      });

    setIsModalVisible(false);
  };

  const firstLetter = userData?.email?.charAt(0).toUpperCase();

  return (
    <View style={styles.MainContainer}>
      <View style={styles.ImageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.imageStyle} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>{firstLetter}</Text>
          </View>
        )}
      </View>
      <Text style={{ color: 'black' }}>{newName}</Text>
      <Text style={{ color: 'black' }}>{userData?.email}</Text>
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
          <Text style={{ color: 'black' }}>Edit Profile</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Edit Name"
            value={newName}
            onChangeText={text => setNewName(text)}
          />
          <TouchableOpacity onPress={chooseImage} style={styles.changePhotoButton}>
            <Text style={styles.changePhotoButtonText}>Upload Profile Photo</Text>
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
  placeholderContainer: {
    width: moderateScale(190),
    height: moderateScale(190),
    borderRadius: moderateScale(100),
    backgroundColor: Colors.blueColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: 'white',
    fontSize: moderateScale(60),
    fontWeight: 'bold',
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
    color: 'black',
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
  EditLogBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: moderateScale(200),
  },
  logoutbtn: {
    marginTop: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: Colors.redColor,
    borderRadius: moderateScale(5),
  },
});
