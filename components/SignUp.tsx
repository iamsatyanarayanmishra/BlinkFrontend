import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Modal } from 'react-native';
import { GlobalContext } from './GlobalContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const SignUp = ({ navigation, route }) => {
  const { username } = route.params;
  const { updateUserData } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [error, setError] = useState('');

  const validateInputs = () => {
    let errorMessage = '';
    if (!name) {
      errorMessage = 'Name cannot be empty.';
    } else if (!email) {
      errorMessage = 'Email cannot be empty.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage = 'Please enter a valid email address.';
    }
    setError(errorMessage);
    return errorMessage === '';
  };

  const handleNext = async () => {
    if (validateInputs()) {
      try {
        // Send signup request
        const response = await fetch('http://192.168.1.226:8080/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, name, email }),
        });

        if (response.ok) {
          // Save user data
          updateUserData({ name, email, username});
          // Navigate to the next screen
          navigation.navigate('FindFriends', { username });
        } else {
          const error = await response.text();
          setError(error || 'Failed to signup. Please try again.');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      }
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5f5f5" />
      <View style={{ paddingVertical: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={styles.title}>SignUp to Chat</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="info" size={22} color="#0073e6" />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          This name will be visible to your friends when you ping them.
        </Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <AntDesign name="user" size={20} color="#3498db" />
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={20} color="#3498db" />
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none' // Prevents automatic capitalization
          />
        </View>
      </View>
      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

      {/* Info Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              The nickname is used in push notifications on some devices or as an additional means of identifying you to users who do not yet have you in their address book. We recommend providing only your first name or a pseudonym.
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[styles.wideButton, isButtonPressed ? styles.okayButtonActive : null]}
            >
              <Text style={[styles.okayButtonText, isButtonPressed ? styles.okayButtonTextActive : null]}>Okay</Text>
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
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  okayButtonActive: {
    backgroundColor: '#1F6ED4',
  },
  okayButtonTextActive: {
    color: '#fff',
  },
  wideButton: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});

export default SignUp;
