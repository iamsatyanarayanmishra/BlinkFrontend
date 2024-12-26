import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, StatusBar, SafeAreaView, Dimensions, Platform, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatModal from './ChatModal';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const { width, height } = Dimensions.get('window');

// Dummy Data for conversation
type Message = {
  id: string;
  text?: string;
  time: string;
  type: 'sent' | 'received';
  image?: { uri: string };
};

const messagesData: Message[] = [
  // ...existing messagesData...
];

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ChatScreen: { chatData: any };
  VoiceCallScreen: { chatData: any };
  StarredMessagesScreen: undefined;
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;
type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatScreen'>;

const ChatScreen = ({ route, navigation }: { route: ChatScreenRouteProp; navigation: ChatScreenNavigationProp }) => {
  const { chatData } = route.params;
  const [messages, setMessages] = useState(messagesData);
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [starredMessages, setStarredMessages] = useState({});
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS('http://192.168.1.226:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('Connected');
        client.subscribe('/user/queue/messages', (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const handleSend = () => {
    if (text && stompClient) {
      const newMessage = {
        id: Math.random().toString(),
        text,
        time: new Date().toLocaleTimeString(),
        type: 'CHAT',
        recipient: chatData.userName, // Assuming chatData contains recipient's username
      };
      stompClient.publish({
        destination: '/app/chat.sendToUser',
        body: JSON.stringify(newMessage),
      });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setText('');
    }
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

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
  sentMessageText: {
    color: '#fff',
  },
  receivedMessageText: {
    color: '#000',
  },
  sentTime: {
    fontSize: width * 0.03,
    color: '#fff',
    alignSelf: 'flex-end',
    marginTop: height * 0.005,
  },
  receivedTime: {
    fontSize: width * 0.03,
    color: '#000',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  attachmentOptions: {
    width: width * 0.95,
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