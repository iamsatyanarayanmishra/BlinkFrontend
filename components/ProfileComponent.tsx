import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Share, FlatList, StatusBar, Dimensions, Modal, Animated } from 'react-native';
import { Ionicons, Entypo, AntDesign, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import BottomNavigationBar from './BottomNavigationBar';
import Header from './Header';
import PublicKeyModal from './PublicKeyModal';
import { GlobalContext } from './GlobalContext';

const { width, height } = Dimensions.get('window');
const scaleSize = size => (width / 375) * size;

const gridSize = 8; // Number of rows and columns
const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Alphanumeric characters

// Generate random alphanumeric characters for the grid
const generateRandomGrid = () => {
  const grid = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    grid.push(alphanumericChars[randomIndex]);
  }
  return grid;
};

// Profile Screen Component
const ProfileComponent = ({ navigation, route }) => {
  // const { id, name, email, number, selectedCountry } = route.params;
  const gridCharacters = useMemo(() => generateRandomGrid(), []);
  const [modalVisible, setModalVisible] = useState(false);
  const { userData, updateUserData } = useContext(GlobalContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditEmailModalOpen, setIsEditEmailModalOpen] = useState(false);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { username } = route.params; // Ensure `params` exists
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isEditModalOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isEditModalOpen]);

  useEffect(() => {
    if (isEditEmailModalOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isEditEmailModalOpen]);

  useEffect(() => {
    if (isEditNameModalOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isEditNameModalOpen]);

  // Function to handle share
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Hi, it's me! Sharing my Blink profile: ${userData.id}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log(`Shared with: ${result.activityType}`);
        } else {
          // Shared
          console.log('Content shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  const updateUserNumber = async () => {
    try {
      const body = {
        userName: username, // Pass the user's ID
        phoneNumber: number, // Match the backend field name
      };
      // Send the PUT request
      const response = await fetch('http://192.168.77.102:8080/api/users/update-number', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log("Response:", response);

      // Read the response once
      const responseData = await response.json();
      console.log("Response data:", responseData);
      if (response.ok) {
        // Update userData state to reflect changes in the UI
        updateUserData({ number })
        console.log("Number updated successfully:", responseData);
      } else {
        console.error("Error updating number:", responseData.message || responseData);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const updateUserEmail = async () => {
    try {
      const body = {
        userName: username, // Pass the user's ID
        email: email, // Match the backend field name
      };
      // Send the PUT request
      const response = await fetch('http://192.168.77.102:8080/api/users/update-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log("Response:", response);

      // Read the response once
      const responseData = await response.json();
      console.log("Response data:", responseData);
      if (response.ok) {
        // Update userData state to reflect changes in the UI
        updateUserData({ email })
        console.log("Email updated successfully:", responseData);
      } else {
        console.error("Error updating Email:", responseData.message || responseData);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const updateUserName = async () => {
    try {
      const body = {
        userName: username, // Pass the user's ID
        name: name, // Match the backend field name
      };
      // Send the PUT request
      const response = await fetch('http://192.168.1.226:8080/api/users/update-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log("Response:", response);

      // Read the response once
      const responseData = await response.json();
      console.log("Response data:", responseData);
      if (response.ok) {
        // Update userData state to reflect changes in the UI
        updateUserData({ name })
        console.log("Name updated successfully:", responseData);
      } else {
        console.error("Error updating Name:", responseData.message || responseData);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const openEditEmailModal = () => setIsEditEmailModalOpen(true);
  const closeEditEmailModal = () => {
    updateUserEmail();
    setIsEditEmailModalOpen(false);
  }
  const cancleEditEmailModal = () => {
    setIsEditModalOpen(false);
  }

  const openEditNameModal = () => setIsEditNameModalOpen(true);
  const closeEditNameModal = () => {
    updateUserName();
    setIsEditNameModalOpen(false);
  }
  const cancleEditNameModal = () => {
    setIsEditNameModalOpen(false);
  }

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => {
    updateUserNumber(); // Call function to update details
    setIsEditModalOpen(false);
  };

  const cancleEditModal = () => {
    setIsEditModalOpen(false);
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleImageModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <Header />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: scaleSize(20), paddingHorizontal: scaleSize(5), paddingVertical: 10 }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Barcode')}>
          <Ionicons name="qr-code-sharp" size={24} color="white" />
          <Text style={styles.buttonText}>Show My QR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QRCodeScannerScreen')}>
          <MaterialCommunityIcons name="line-scan" size={24} color="white" />
          <Text style={styles.buttonText}>Scan ID</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ApostrfyWeb')}>
          <Feather name="monitor" size={24} color="white" />
          <Text style={styles.buttonText}>Blink Web</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 20, color: '#3498db', fontWeight: 'bold', paddingHorizontal: scaleSize(20), }}>
        Profile Picture & ID
      </Text>

      <View style={styles.profileSection}>
        <TouchableOpacity onLongPress={toggleImageModal}>
          <Image source={require('@/assets/images/Avatar.jpg')} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={styles.profileID}>My Blink ID</Text>
          {/* <Text style={styles.profileIDValue}>1KHDSFDF</Text> */}
          <Text style={styles.profileIDValue}>{userData.id}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Entypo name="share" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Image Modal */}
      <Modal
        visible={isImageModalVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.closeModal} onPress={toggleImageModal}>
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
          <Image source={require('@/assets/images/Avatar.jpg')} style={styles.enlargedImage} />
        </View>
      </Modal>

      <View style={styles.privacySection}>
        <Text style={styles.sectionTitle}>Profile picture privacy</Text>
        <Text>Who can see my profile picture?</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.dropdown} onPress={() => navigation.navigate('Contacts')}>
            {/* <TextInput  placeholder="Select contacts only" /> */}
            <Text>Search Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 10,
              padding: 6,
              backgroundColor: '#1F6ED4',
              borderRadius: 5,
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Contacts')}
          >
            <AntDesign name="user" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.linkedDetailsSection}>
        <Text style={styles.sectionTitle}>Linked details</Text>
        <View style={styles.detailRow}>
          <Ionicons name="call" size={24} color="#3498db" />
          <View style={styles.detailTextContainer}>
            <Text>Mobile number</Text>
            {/* <Text style={styles.detailValue}>+91 8323 432 733</Text> */}
            <Text style={styles.detailValue}> {userData.countryCode} {userData.number}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
            <Entypo name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={isEditModalOpen}
          onRequestClose={closeEditModal}
        >
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Number</Text>

              <TouchableOpacity style={styles.imageContainer}>
                <MaterialIcons name="photo-camera" size={50} color="white" />
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={number}
                  onChangeText={setNumber}
                  placeholder="New Number"
                  keyboardType='numeric'
                />
                <TouchableOpacity onPress={() => setNumber('')}>
                  <MaterialIcons name="close" size={24} color="gray" />
                </TouchableOpacity>
              </View>

              <View style={styles.buttonModalContainer}>
                <TouchableOpacity onPress={cancleEditModal}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeEditModal}>
                  <Text style={styles.okButton}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Modal>
        <View style={styles.detailRow}>
          <Ionicons name="mail-open" size={24} color="#3498db" />
          <View style={styles.detailTextContainer}>
            <Text>Email id</Text>
            {/* <Text style={styles.detailValue}>jhonsmith123@blink.in</Text> */}
            <Text style={styles.detailValue}>{userData.email}</Text>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={openEditEmailModal}>
            <Entypo name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={isEditEmailModalOpen}
          onRequestClose={closeEditEmailModal}
        >
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Email</Text>

              <TouchableOpacity style={styles.imageContainer}>
                <MaterialIcons name="photo-camera" size={50} color="white" />
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="New Email"
                  keyboardType='email-address'
                />
                <TouchableOpacity onPress={() => setEmail('')}>
                  <MaterialIcons name="close" size={24} color="gray" />
                </TouchableOpacity>
              </View>

              <View style={styles.buttonModalContainer}>
                <TouchableOpacity onPress={cancleEditEmailModal}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeEditEmailModal}>
                  <Text style={styles.okButton}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Modal>
        <View style={styles.detailRow}>
          <AntDesign name="user" size={24} color="#3498db" />
          <View style={styles.detailTextContainer}>
            <Text>Name</Text>
            {/* <Text style={styles.detailValue}>Jon Doe</Text> */}
            <Text style={styles.detailValue}>{userData.name}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={openEditNameModal}>
            <Entypo name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={isEditNameModalOpen}
          onRequestClose={closeEditNameModal}
        >
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Name</Text>

              <TouchableOpacity style={styles.imageContainer}>
                <MaterialIcons name="photo-camera" size={50} color="white" />
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="New Name"
                  keyboardType='ascii-capable'
                />
                <TouchableOpacity onPress={() => setName('')}>
                  <MaterialIcons name="close" size={24} color="gray" />
                </TouchableOpacity>
              </View>

              <View style={styles.buttonModalContainer}>
                <TouchableOpacity onPress={cancleEditNameModal}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeEditNameModal}>
                  <Text style={styles.okButton}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Modal>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.publicKeyButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.publicKeyText}>Show public key</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalPublicKeyBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Blink ID: {userData.id}</Text>
            <View style={styles.gridContainer}>
              {Array.from({ length: gridSize }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {gridCharacters
                    .slice(rowIndex * gridSize, (rowIndex + 1) * gridSize)
                    .map((char, colIndex) => (
                      <Text key={colIndex} style={styles.cell}>
                        {char}
                      </Text>
                    ))}
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <BottomNavigationBar navigation={navigation} /> */}
      <PublicKeyModal isVisible={isModalVisible} onClose={toggleModal} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingVertical: scaleSize(40),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 40,
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleSize(20),
    // marginBottom: scaleSize(20),
    paddingHorizontal: scaleSize(20),
  },
  profileImage: {
    width: scaleSize(100),
    height: scaleSize(100),
    borderRadius: scaleSize(50),
  },
  profileID: {
    marginTop: scaleSize(10),
    fontSize: scaleSize(16),
    color: '#7A7A7A',
  },
  profileIDValue: {
    fontSize: scaleSize(18),
    fontWeight: 'bold',
    color: '#1F6ED4',
  },
  shareButton: {
    marginTop: scaleSize(10),
    padding: scaleSize(8),
    backgroundColor: '#1F6ED4',
    borderRadius: 5,
  },
  shareText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  privacySection: {
    marginTop: scaleSize(20),
    paddingHorizontal: scaleSize(20),
  },
  sectionTitle: {
    fontSize: scaleSize(18),
    fontWeight: 'bold',
    marginBottom: scaleSize(8),
    color: '#3498db',
  },
  dropdown: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 8,
    padding: scaleSize(14),
    marginTop: 8,
    color: '#7A7A7A',
    width: '87%',
  },
  linkedDetailsSection: {
    marginTop: scaleSize(20),
    marginBottom: scaleSize(10),
    paddingHorizontal: scaleSize(20),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleSize(10),
    alignItems: 'center',
  },
  detailValue: {
    fontWeight: 'bold',
  },
  detailTextContainer: {
    flex: 1,
    paddingLeft: 10
  },
  publicKeyButton: {
    marginTop: scaleSize(20),
    width: scaleSize(250),
    paddingVertical: scaleSize(20),
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3498db',
    alignItems: 'center',
  },
  publicKeyText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F6ED4',
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(8),
    borderRadius: 25,
    // marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: scaleSize(8),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    //marginTop: 20,
  },
  editButton: {
    marginTop: 10,
    padding: 6,
    backgroundColor: '#1F6ED4',
    borderRadius: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enlargedImage: {
    width: scaleSize(300),
    height: scaleSize(300),
    borderRadius: scaleSize(10),
  },
  closeModal: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
  },
  closeModalText: {
    color: '#000',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#e0f0ff',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  buttonModalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    color: '#007aff',
    fontSize: 16,
  },
  okButton: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalPublicKeyBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    height: 370,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  closeButton: {
    backgroundColor: '#1F6ED4',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 300,
    marginBottom: 5,
    paddingHorizontal: 80,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'monospace', // Ensures uniform width for characters
  },
});

export default ProfileComponent;
