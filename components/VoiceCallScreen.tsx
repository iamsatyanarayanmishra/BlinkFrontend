import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ChatModal from './ChatModal';

const VoiceCallScreen = ({ route  }) => {
    const { chatData } = route.params;
  const [isMuted, setIsMuted] = useState(false);
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const navigation = useNavigation();

  const handleMute = () => setIsMuted(!isMuted);
  const handleEndCall = () => navigation.goBack();
  const handleBluetooth = () => setIsBluetoothOn(!isBluetoothOn);
  const handleMessage = () => console.log('Open chat');

  useEffect(() => {
    // Start the timer
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Clear the timer on unmount
    return () => clearInterval(timer);
  }, []);

  // Function to format the time as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.callerName}>Kaira Jason</Text> */}
      <Text style={styles.callerName}>{chatData.name}</Text>
      <Text style={styles.callStatus}>Ongoing call</Text>
      <View style={styles.callStatusDots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>

      <Icon name="group" size={150} color="#4A90E2" style={styles.profileIcon} />

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('MessageScreen',{ chatData})} >
          <Icon name="message" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMute}>
          <Icon name={isMuted ? "mic-off" : "mic"} size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEndCall} style={styles.endCallButton}>
          <Icon name="call-end" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBluetooth}>
          <Icon name="bluetooth" size={30} color={isBluetoothOn ? "#4A90E2" : "white"} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleSpeaker}>
          <Icon name={isSpeakerOn ? "volume-up" : "volume-mute"} size={30} color="white" />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('VideoCallScreen',{ chatData})} >
          <Icon name="videocam" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A4A73',
    alignItems: 'center',
    paddingTop: 150,
    // justifyContent: 'center',
  },
  callerName: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  callStatus: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  callStatusDots: {
    flexDirection: 'row',
    marginTop: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginHorizontal: 2,
  },
  timer: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  profileIcon: {
    marginVertical: 20,
    padding: 100
    // alignSelf: 'center'
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    position: 'absolute',
    bottom: 100,
  },
  endCallButton: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 50,
  },
});

export default VoiceCallScreen;
