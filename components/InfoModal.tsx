import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InfoModal = ({ isVisible, onClose }) => {
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [isButtonPressed, setButtonPressed] = useState(false);

  // Function to handle transitioning to the second modal
  const handleFirstModalClose = () => {
    setButtonPressed(true);
    setTimeout(() => {
      setButtonPressed(false);
      setSecondModalVisible(true);
    }, 100);
  };

  // Function to handle closing the second modal and the whole modal component
  const handleSecondModalClose = () => {
    setSecondModalVisible(false);
    onClose(); // Close the entire InfoModal
  };

  return (
    <>
      {/* First Modal */}
      <Modal
        transparent={true}
        visible={isVisible && !isSecondModalVisible}
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
        visible={isSecondModalVisible}
        animationType="fade"
        onRequestClose={handleSecondModalClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              All you need to chat is stored only on your device. You don’t have an account with us and we cannot help you out if you lose your phone or accidentally delete your data.
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
});

export default InfoModal;
