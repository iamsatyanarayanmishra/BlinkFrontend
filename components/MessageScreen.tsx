import React, { useState, useEffect, useRef } from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, StatusBar, SafeAreaView, Dimensions, Platform, Modal, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatModal from './ChatModal';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const { width, height } = Dimensions.get('window');

// Dummy Data for conversation
// const messagesData = [
//   {
//     id: '1',
//     text: 'Hello, how are you?',
//     time: '8:24 AM',
//     type: 'received',
//   },
//   {
//     id: '2',
//     text: 'I am good man... You?',
//     time: '8:24 AM',
//     type: 'sent',
//   },
//   {
//     id: '3',
//     text: 'I\'m doing well, thank you for asking! How can I help you today?',
//     time: '8:24 AM',
//     type: 'received',
//   },
//   {
//     id: '4',
//     text: 'Can you send me 12,000 rupees now, I need to purchase a shoe',
//     time: '8:24 AM',
//     type: 'sent',
//   },
//   {
//     id: '5',
//     text: 'Cool I\'m sending now 😎',
//     time: '8:25 AM',
//     type: 'received',
//   },
//   {
//     id: '6',
//     text: 'Nice fit dude... 😎',
//     time: '8:26 AM',
//     type: 'received',
//     image: 'https://images.pexels.com/photos/1387022/pexels-photo-1387022.jpeg?cs=srgb&dl=book-aesthetic-books-old-books-open-books-1387022.jpg&fm=jpg',
//   },
//   {
//     id: '7',
//     // text: 'Nice fit dude... 😎',
//     time: '8:26 AM',
//     type: 'sent',
//     image: require('@/assets/images/Avatar4.jpg'),
//   },
// ];

// Ensure initial dummy data has unique IDs
// const ensureUniqueIds = (data) => {
//   const existingIds = new Set();
//   return data.map(item => {
//     let id = item.id;
//     while (existingIds.has(id)) {
//       id = generateRandomId([...existingIds]);
//     }
//     existingIds.add(id);
//     return { ...item, id };
//   });
// };

// Check for duplicate IDs in the initial dummy data
// const checkForDuplicateIds = (data) => {
//   const ids = data.map(item => item.id);
//   const hasDuplicates = ids.some((id, index) => ids.indexOf(id) !== index);
//   if (hasDuplicates) {
//     console.error("Duplicate IDs found in initial data:", ids);
//   }
// };

const generateRandomId = (existingIds) => {
  let id;
  do {
    id = Math.random().toString(36).substr(2, 9);
  } while (existingIds.includes(id));
  return id;
};

const ChatScreen = ({ route, navigation }) => {
  const { chatData } = route.params;
  const [messages, setMessages] = useState([]); // Initialize with an empty array
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [starredMessages, setStarredMessages] = useState({});
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const client = useRef(null);

  // Check for duplicate IDs in the initial dummy data
  // useEffect(() => {
  //   checkForDuplicateIds(messages);
  // }, []);

  useEffect(() => {
    // Initialize WebSocket connection using SockJS
    const socket = new SockJS('http://192.168.1.226:8080/ws');
    client.current = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        login: 'user',
        passcode: 'password',
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.current.onConnect = () => {
      console.log('Connected to WebSocket');
      client.current.subscribe('/chatroom/public', (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, receivedMessage];
          const ids = updatedMessages.map(msg => msg.id);
          const hasDuplicates = ids.some((id, index) => ids.indexOf(id) !== index);
          if (hasDuplicates) {
            console.error("Duplicate IDs found:", ids);
          }
          return updatedMessages;
        });
      });
    };

    client.current.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.current.activate();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSend = () => {
    if (text) {
      const existingIds = messages.map(message => message.id);
      const newMessage = {
        id: generateRandomId(existingIds), // Use custom function to generate a unique ID
        type: 'TEXT',
        content: text,
        sender: 'QQYU5ZWG', // Assuming chatData contains senderId
        recipient: 'SV912UKB', // Assuming chatData contains recipientId
        time: new Date().toLocaleTimeString(),
      };
      console.log("New message ID:", newMessage.id); // Log the new message ID
      client.current.publish({
        destination: '/app/message',
        body: JSON.stringify(newMessage),
      });
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        const ids = updatedMessages.map(msg => msg.id);
        const hasDuplicates = ids.some((id, index) => ids.indexOf(id) !== index);
        if (hasDuplicates) {
          console.error("Duplicate IDs found:", ids);
        }
        return updatedMessages;
      });
      setText('');
    }
  };

  const openAttachmentModal = () => setAttachmentModalVisible(true);
  const closeAttachmentModal = () => setAttachmentModalVisible(false);

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // Handle image data here
      console.log("Image selected from gallery:", result.uri);
    }
    closeAttachmentModal();
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // Handle photo data here
      console.log("Photo taken:", result.uri);
    }
    closeAttachmentModal();
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      // Handle document data here
      console.log("Document selected:", result.uri);
    }
    closeAttachmentModal();
  };

  const handleLongPress = (messageId) => {
    setStarredMessages((prevStarredMessages) => ({
      ...prevStarredMessages,
      [messageId]: !prevStarredMessages[messageId],
    }));
  };

  const renderMessage = ({ item }) => {
    const isSent = item.type === 'sent';
    const isStarred = starredMessages[item.id];
  
    return (
      <TouchableOpacity
        onLongPress={() => handleLongPress(item.id)}
        style={[
          styles.messageContainer,
          isSent ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        
        {item.image && (
          <Image 
            source={item.image}
            style={styles.messageImage} 
          />
        )}
        {item.text && (
          <Text style={[
            styles.messageText,
            isSent ? styles.sentMessageText : styles.receivedMessageText
          ]}>
            {item.text}
          </Text>
        )}
        <View style={styles.timeContainer}>
          <Text style={[
            styles.timeText,
            isSent ? styles.sentTime : styles.receivedTime
          ]}>
            {item.time}
          </Text>
          {isStarred && (
            <Ionicons name="star" size={width * 0.04} color="#FFD700" style={styles.starIcon} />
          )}
          {isSent && (
            <View style={styles.timeImageContainer}>
              <Image
                source={chatData.profileImage}
                style={styles.timeImage}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={width * 0.06} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerContent} onPress={openModal}>
          <Image source={chatData.profileImage} style={styles.profilePicture} />
          <View>
            <Text style={styles.headerText}>{chatData.name}</Text>
            <View style={styles.statusDots}>
              <View style={styles.onlineDot} />
              <View style={styles.offlineDot} />
              <View style={styles.offlineDot} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('VoiceCallScreen', { chatData })}>
          <Ionicons name="call" size={width * 0.06} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('StarredMessagesScreen')}>
          <Entypo name="dots-three-vertical" size={width * 0.06} color="black" />
        </TouchableOpacity>
        <ChatModal visible={modalVisible} onClose={closeModal} chatData={chatData} />
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Icon name="emoticon-happy-outline" size={width * 0.06} color="#9e9e9e" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor="#9e9e9e"
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleSend}
          />
          <View style={styles.iconRow}>
            <TouchableOpacity>
              <Icon name="camera-outline" size={width * 0.06} color="#9e9e9e" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openAttachmentModal}>
              <Icon name="link" size={width * 0.06} color="#9e9e9e" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.micButton} onPress={handleSend}>
          {text ? (
            <Ionicons name="send" size={width * 0.07} color="white" />
          ) : (
            <Icon name="microphone" size={width * 0.07} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {/* Attachment Modal */}
      <Modal
        visible={attachmentModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeAttachmentModal}
      >
        <View style={styles.attachmentModalContainer} >
          <View style={styles.attachmentOptions}>
            <TouchableOpacity style={styles.attachmentButton} onPress={pickImageFromGallery}>
              <Icon name="image" size={width * 0.08} color="#3498db" />
              <Text>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachmentButton} onPress={takePhoto}>
              <Icon name="camera" size={width * 0.08} color="#3498db" />
              <Text>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachmentButton} onPress={pickDocument}>
              <Icon name="file-document-outline" size={width * 0.08} color="#3498db" />
              <Text>Document</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    height: height * 0.08,
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.02,
  },
  headerText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  profilePicture: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.03,
    marginRight: width * 0.02,
  },
  statusDots: {
    flexDirection: 'row',
    gap: width * 0.01,
  },
  onlineDot: {
    width: width * 0.03,
    height: width * 0.03,
    backgroundColor: 'green',
    borderRadius: width * 0.015,
  },
  offlineDot: {
    width: width * 0.03,
    height: width * 0.03,
    backgroundColor: 'white',
    borderRadius: width * 0.015,
  },
  messagesList: {
    padding: width * 0.03,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: height * 0.005,
    padding: width * 0.03,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
    borderRadius: width * 0.03,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'grey',
    borderRadius: width * 0.03,
  },
  messageText: {
    fontSize: width * 0.04,
  },
  timeText: {
    fontSize: width * 0.03,
    color: '#fff',
    alignSelf: 'flex-end',
    marginTop: height * 0.005,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timeImageContainer: {
    paddingLeft: width * 0.01,
  },
  timeImage: {
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: width * 0.02,
  },
  starIcon: {
    marginLeft: width * 0.02,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.035,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.04,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    paddingVertical: 10,
    color: '#000',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.02,
  },
  micButton: {
    backgroundColor: '#3498db',
    borderRadius: width * 0.08,
    width: width * 0.13,
    height: width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width * 0.03,
  },
  attachmentModalContainer: {
    flex: 1,
    // height: 100,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  attachmentOptions: {
    width: width * 0.95,
    // height: 200,
    padding: 20,
    bottom: 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attachmentButton: {
    alignItems: 'center',
  },
  attachmentModalClose: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  messageImage: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 10,
    marginVertical: height * 0.01,
  }
  
});

export default ChatScreen;