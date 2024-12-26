import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const ChatModal = ({ visible, onClose, chatData }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.imageContainer}>
              <Image
                source={chatData.profileImage} // Replace with your image URL
                style={styles.image}
              />
              <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={onClose}>
                  <Ionicons name="chevron-back-outline" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.rightIconsContainer}>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="qr-code-sharp" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="share-social-outline" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.bottomRow}>
                <Text style={styles.bottomText}>{chatData.name}</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Entypo name="edit" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.headerTextContainer}>
              <View style={styles.idSection}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.idText}>Blink ID : 09EJH49KJ</Text>
                  <View style={styles.statusDots}>
                    <View style={[styles.dot, { backgroundColor: '#4689F5' }]} />
                    <View style={[styles.dot, { backgroundColor: '#D94E45' }]} />
                    <View style={[styles.dot, { backgroundColor: '#2D3436' }]} />
                  </View>
                </View>
                <TouchableOpacity>
                  <Feather name="info" size={22} color="black" />
                </TouchableOpacity>
              </View>

              <View style={styles.profileSection}>
                <View>
                  <Text>Nickname</Text>
                  <Text style={styles.nickname}>Mee Kaira</Text>
                </View>
                <TouchableOpacity style={styles.publicKeyButton}>
                  <Text style={styles.publicKeyText}>Show public key</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.mediaSectionContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.hiText}>Media Shared</Text>
                </View>
                <ScrollView horizontal={true} style={styles.mediaSection}>
                  <Image source={require('@/assets/images/Gallery.jpg')} style={styles.mediaImage} />
                  <Image source={require('@/assets/images/Gallery2.jpg')} style={styles.mediaImage} />
                  <Image source={require('@/assets/images/Gallery3.jpg')} style={styles.mediaImage} />
                  <Image source={require('@/assets/images/Gallery3.jpg')} style={styles.mediaImage} />
                  <TouchableOpacity style={styles.mediaOverlay}>
                    <Text style={styles.moreMediaText}>23+</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              <View style={styles.privacySection}>
                <Text style={styles.privacyHeading}>Privacy</Text>
                <Text style={styles.privacyLabel}>Send read receipts</Text>
                <View style={styles.pickerWrapper}>
                  <Picker style={styles.picker}>
                    <Picker.Item label="Default (Send)" value="send" />
                    <Picker.Item label="Don't Send" value="dontSend" />
                  </Picker>
                </View>

                <Text style={styles.privacyLabel}>Send typing indicator</Text>
                <View style={styles.pickerWrapper}>
                  <Picker style={styles.picker}>
                    <Picker.Item label="Default (Send)" value="send" />
                    <Picker.Item label="Don't Send" value="dontSend" />
                  </Picker>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: height * 0.9, // Set to 90% of the screen height
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: height * 0.4, // Set to 40% of the screen height
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    justifyContent: 'space-between',
  },
  rightIconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  bottomRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomText: {
    color: 'white',
    fontSize: 18, // Adjusted font size
    fontWeight: 'bold',
  },
  editButton: {
    padding: 6,
    backgroundColor: '#1F6ED4',
    borderRadius: 5,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  idSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    margin: 20,
  },
  idText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
  },
  statusDots: {
    flexDirection: 'row',
    marginLeft: 8,
    gap: 3,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 10,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  nickname: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D3436',
  },
  publicKeyButton: {
    backgroundColor: '#1F6ED4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  publicKeyText: {
    color: '#fff',
    fontSize: 14,
  },
  mediaSectionContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: 'black',
    borderRadius: 5,
    width: '90%',
  },
  textContainer: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  hiText: {
    color: 'grey',
    fontSize: 14,
  },
  mediaSection: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  mediaImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 5,
  },
  mediaOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  moreMediaText: {
    fontSize: 20,
    color: '#2D3436',
  },
  privacySection: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    width: '90%',
  },
  privacyHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  privacyLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
});

export default ChatModal;
