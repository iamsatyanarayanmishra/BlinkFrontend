import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import VideoCallScreen from './VideoCallScreen';
import VoiceCallScreen from './VoiceCallScreen';

const CallContainer = () => {
    const [seconds, setSeconds] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);

    useEffect(() => {
        let timer;

        if (isTimerActive) {
            timer = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isTimerActive]);

    const startTimer = () => setIsTimerActive(true);
    const stopTimer = () => setIsTimerActive(false);
    const resetTimer = () => {
        setSeconds(0);
        setIsTimerActive(false);
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Pass timer state and functions as props to both screens */}
            <VideoCallScreen
                seconds={seconds}
                startTimer={startTimer}
                stopTimer={stopTimer}
                resetTimer={resetTimer}
            />
            <VoiceCallScreen
                seconds={seconds}
                startTimer={startTimer}
                stopTimer={stopTimer}
                resetTimer={resetTimer}
            />
        </View>
    );
};

export default CallContainer;
