import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PublicKeyModal = ({ isVisible, onClose }) => {
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [isThirdModalVisible, setThirdModalVisible] = useState(false);
  const [isFourthModalVisible, setFourthModalVisible] = useState(false);
  const [isFifthModalVisible, setFifthModalVisible] = useState(false);
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [isNoButtonPressed, setNoButtonPressed] = useState(false);
  const [isOkayButtonPressed, setOkayButtonPressed] = useState(false);

  // Function to handle transitioning to the second modal
  const handleFirstModalClose = () => {
    setButtonPressed(true); // Button pressed state to trigger color change
    setTimeout(() => {
      setButtonPressed(false); // Reset button pressed state
      setSecondModalVisible(true); // Show second modal
    }, 100);
  };

  // Function to handle transitioning to the third modal
  const handleSecondModalClose = () => {
    setButtonPressed(true);
    setTimeout(() => {
      setButtonPressed(false);
      setSecondModalVisible(false);
      setThirdModalVisible(true);
    }, 100);
  };

  // Function to handle transitioning to the fourth modal
  const handleThirdModalClose = () => {
    setButtonPressed(true);
    setTimeout(() => {
      setButtonPressed(false);
      setThirdModalVisible(false);
      setFourthModalVisible(true);
    }, 100);
  };

  // Function to handle transitioning to the fifth modal
  const handleFourthModalClose = () => {
    setButtonPressed(true);
    setTimeout(() => {
      setButtonPressed(false);
      setFourthModalVisible(false);
      setFifthModalVisible(true);
    }, 100);
  };

  // Function to handle closing the fifth modal
  const handleNoButtonPress = () => {
    setNoButtonPressed(true); // Track No button press separately
    setTimeout(() => {
      setNoButtonPressed(false); // Reset No button state
      setFifthModalVisible(false); // Close the modal
      onClose(); // Optionally handle close after the "No" action
    }, 100);
  };

  const handleOkayButtonPress = () => {
    setOkayButtonPressed(true); // Track Okay button press separately
    setTimeout(() => {
      setOkayButtonPressed(false); // Reset Okay button state
      setFifthModalVisible(false); // Close the modal
      onClose(); // Final close
    }, 100);
  };

  return (
    <>
      {/* First Modal */}
      <Modal
        transparent={true}
        visible={isVisible && !isSecondModalVisible && !isThirdModalVisible && !isFourthModalVisible && !isFifthModalVisible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              You also create a key pair. The public key has been securely transmitted to our servers. The private key never leaves your device. This ensures that nobody else can read your messages.
            </Text>

            <TouchableOpacity
              onPress={handleFirstModalClose}
              style={[styles.okayButton, isButtonPressed ? styles.okayButtonActive : null]}
            >
              <Text style={[styles.okayButtonText, isButtonPressed ? styles.okayButtonTextActive : null]}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Second Modal */}
      <Modal
        transparent={true}
        visible={isSecondModalVisible && !isThirdModalVisible && !isFourthModalVisible && !isFifthModalVisible}
        animationType="fade"
        onRequestClose={handleSecondModalClose}
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
              onPress={handleSecondModalClose}
              style={[styles.okayButton, isButtonPressed ? styles.okayButtonActive : null]}
            >
              <Text style={[styles.okayButtonText, isButtonPressed ? styles.okayButtonTextActive : null]}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Third Modal */}
      <Modal
        transparent={true}
        visible={isThirdModalVisible && !isFourthModalVisible && !isFifthModalVisible}
        animationType="fade"
        onRequestClose={handleThirdModalClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              The nickname is used in push notifications on some devices or as an additional means of identifying you to users who do not yet have you in their address book. We recommend providing only your first name or a pseudonym.
            </Text>

            <TouchableOpacity
              onPress={handleThirdModalClose}
              style={[styles.wideButton, isButtonPressed ? styles.okayButtonActive : null]}
            >
              <Text style={[styles.okayButtonText, isButtonPressed ? styles.okayButtonTextActive : null]}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Fourth Modal */}
      <Modal
        transparent={true}
        visible={isFourthModalVisible && !isFifthModalVisible}
        animationType="fade"
        onRequestClose={handleFourthModalClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              By providing your phone number, Blink can help your friends find you automatically if they have you in their phone’s address book. You can skip this step to use Blink completely anonymously.
            </Text>

            <TouchableOpacity
              onPress={handleFourthModalClose}
              style={[styles.wideButton, isButtonPressed ? styles.okayButtonActive : null]}
            >
              <Text style={[styles.okayButtonText, isButtonPressed ? styles.okayButtonTextActive : null]}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Fifth Modal */}
      <Modal
        transparent={true}
        visible={isFifthModalVisible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              Contact sync helps you find your friends automatically. If you agree, phone numbers and email addresses from your phone book will be encrypted before being sent to our server.
            </Text>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', left: 20 }}>
              <TouchableOpacity onPress={handleNoButtonPress} style={[styles.noButton, isNoButtonPressed ? styles.noButtonActive : null]}>
                <Text style={[styles.noButtonText, isNoButtonPressed ? styles.noButtonTextActive : null]}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleOkayButtonPress}
                style={[styles.fifthOkayButton, isButtonPressed ? styles.okayButtonActive : null]}
              >
                <Text style={[styles.fifthOkayButtonText, isButtonPressed ? styles.okayButtonTextActive : null]}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  noButtonActive: {
    backgroundColor: '#1F6ED4',
  },
  noButtonTextActive: {
    color: '#fff',
  },
  fifthOkayButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  fifthOkayButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noButton: {
    bottom: 10,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 60,
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  noButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
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

export default PublicKeyModal;
