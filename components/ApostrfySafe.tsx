import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { GlobalContext } from './GlobalContext';


const ApostrfySafe = ({ navigation, route }) => {
  // const { id } = route.params;
  const {updateUserData} = useContext(GlobalContext);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const validatePasswords = () => {
    // Reset error message
    setErrorMessage('');

    // Check for minimum length and alphanumeric characters
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return false;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setErrorMessage('Password must be alphanumeric.');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleNextPress = () => {
    if (validatePasswords()) {
      updateUserData({password: password})
      // console.log(updateUserData);
      navigation.navigate('SignUp');
    }
  };

  return (
    <View style={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
     <View style={{ paddingVertical: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={styles.title}>Blink Safe</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="info" size={22} color="#0073e6" />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          Please choose a strong password. You will need this password to restore your blink safe backup.
        </Text>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} color="#3498db" />
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#3498db" />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} color="#3498db" />
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            placeholder="Re-Enter Password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#3498db" />
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

        {/* Expert Setting Text */}
        <TouchableOpacity>
          <Text style={styles.expertSetting}>Expert Setting</Text>
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNextPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* First Modal for info */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              You also create a key pair. The public key has been securely transmitted to our servers. The private key never leaves your device. This ensures that nobody else can read your messages.
            </Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setSecondModalVisible(true);
              }}
              style={[styles.okayButton]}
            >
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Second Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={secondModalVisible}
        onRequestClose={() => setSecondModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              All you need to chat is stored only on your device. you don’t have an account with us and we cannot help you out if you lose your phone or accidentally delete your data.
            </Text>
            <Text style={styles.publicKeyValue}>
              Blink safe creates automatic backups of all the important data, including your keys, your contact list, and your group membership (but no message content) anonymously on a secure server of your choice.
            </Text>

            <TouchableOpacity
              onPress={() => setSecondModalVisible(false)}
              style={[styles.okayButton]}
            >
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    paddingVertical: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a3c79',
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 30,
    color: '#606060',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  expertSetting: {
    textAlign: 'right',
    color: '#3498db',
    marginBottom: 30,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: 300,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    width: 2,
    height: '75%',
    backgroundColor: '#e5e5e5',
    marginHorizontal: 15,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    alignItems: 'center',
  },
  publicKeyValue: {
    fontSize: 16,
    color: 'black',
    marginBottom: 40,
  },
  okayButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  okayButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ApostrfySafe;
