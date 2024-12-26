import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ChatModal from './ChatModal';


const { width, height } = Dimensions.get('window');

const VideoCallScreen = ({ route,  }) => {
    const { chatData } = route.params;
    const [facing, setFacing] = useState('front');
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState(false);
    const [isBluetoothOn, setIsBluetoothOn] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isVisible, setIsVisible] = useState(true); // State to control visibility of UI elements

    const navigation = useNavigation();

    const handleMute = () => setIsMuted(!isMuted);
    const handleEndCall = () => navigation.goBack();
    const handleSpeaker = () => setIsSpeakerOn(!isSpeakerOn);
    const handleBluetooth = () => setIsBluetoothOn(!isBluetoothOn);
    const handleVideo = () => console.log('Switch to video call');
    const handleMessage = () => console.log('Open chat');
    const toggleVisibility = () => setIsVisible(!isVisible); // Toggle visibility of UI elements

    // New function to switch camera
    const handleCameraSwitch = () => {
        setFacing((prevFacing) => (prevFacing === 'front' ? 'back' : 'front'));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.background} onPress={toggleVisibility} activeOpacity={1}>
                <CameraView style={styles.camera} facing={facing}>
                    {isVisible && (
                        <View style={styles.topContainer}>
                            {/* <Text style={styles.callerName}>Kaira Jason</Text> */}
                            <Text style={styles.callerName}>{chatData.name}</Text>
                            <Text style={styles.callStatus}>Ongoing call</Text>
                            <View style={styles.callStatusDots}>
                                <View style={styles.dot} />
                                <View style={styles.dot} />
                                <View style={styles.dot} />
                            </View>
                            <Text style={styles.timer}>{formatTime(seconds)}</Text>
                        </View>
                    )}
                    {isVisible && (
                        <View style={styles.controlsContainer}>
                            <TouchableOpacity onPress={handleCameraSwitch}>
                                <MaterialIcons name="cameraswitch" size={30} color="white" />
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
                            <TouchableOpacity onPress={() => navigation.navigate('VoiceCallScreen', { chatData})}>
                                <Ionicons name="call" size={26} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                </CameraView>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: width,
        height: height,
    },
    camera: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    topContainer: {
        position: 'absolute',
        top: 150,
        alignItems: 'center',
        width: '100%',
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
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        position: 'absolute',
        bottom: 100,
        marginHorizontal: 60,
    },
    endCallButton: {
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 50,
    },
});

export default VideoCallScreen;
