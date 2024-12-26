import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, PanResponder, Dimensions, Alert, StatusBar } from 'react-native';
import { GlobalContext } from './GlobalContext';

const { width, height } = Dimensions.get('window');

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function GenerateIDScreen({ navigation }) {
  const [progress, setProgress] = useState(0);
  const [randomStrings, setRandomStrings] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]); // New state
  const { updateUserData } = useContext(GlobalContext);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: () => handleTouch(),
  });

  const handleTouch = () => {
    if (progress < 1) {
      setProgress(prev => prev + 0.02);
    }
  };

  const handleCharacterPress = (char) => {
    if (selectedCharacters.length < 8) {
      setSelectedCharacters(prev => [...prev, char]);
    }
  };
  

  useEffect(() => {
    const strings = Array.from({ length: 13 }, () => generateRandomString(16));
    setRandomStrings(strings);
  }, []);

  const handleNextPress = () => {
    if (selectedCharacters.length < 8) {
      Alert.alert("Selection Incomplete", "Please select at least 8 characters to proceed.");
    } else {
      const idString = selectedCharacters.join('');
      console.log('Selected Characters:', idString);
      updateUserData({ id: idString})
      navigation.navigate('ApostrfyIDScreen');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5f5f5" />
      <Text style={styles.title}>Tap your finger on your desired letters to generate your Blink ID</Text>
      <Text style={{fontSize: 16, marginBottom: 20}}>(Minimum 8 characters)</Text>

      <View style={styles.progressContainer} {...panResponder.panHandlers}>
        <View style={[styles.corner, styles.topLeftCorner]} />
        <View style={[styles.corner, styles.topRightCorner]} />
        <View style={[styles.corner, styles.bottomLeftCorner]} />
        <View style={[styles.corner, styles.bottomRightCorner]} />
        
        {randomStrings.map((str, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {str.split('').map((char, charIndex) => (
              <TouchableOpacity key={charIndex} onPress={() => handleCharacterPress(char)}>
                <Text style={styles.text}>{char}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <Text style={styles.subtitle}>
        
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNextPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  title: {
    fontSize: width * 0.075,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: height * 0.04,
    color: '#333',
  },
  progressContainer: {
    width: width * 0.8,
    height: height * 0.35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#3498db',
  },
  topLeftCorner: {
    top: 0,
    left: 0,
    borderLeftWidth: 4,
    borderTopWidth: 4,
  },
  topRightCorner: {
    top: 0,
    right: 0,
    borderRightWidth: 4,
    borderTopWidth: 4,
  },
  bottomLeftCorner: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
  },
  bottomRightCorner: {
    bottom: 0,
    right: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15
  },
  text: {
    fontSize: 16,
    color: '#3498db',
    textAlign: 'center',
    width: 16,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#7F8C8D',
    marginBottom: height * 0.08,
    textAlign: 'center',
  },
  button: {
    width: width * 0.8,
    height: height * 0.065,
    backgroundColor: '#3498db',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});
