import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from '@expo/vector-icons/Feather';
import { GlobalContext } from './GlobalContext';
import { useDerivedValue } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function ApostrfyIDScreen({ navigation, route }) {
  // const { id } = route.params;
  const { userData } = useContext(GlobalContext);
  const username = userData.id;
  const saveUsernameToBackend = async () => {
    try {
        const response = await fetch('http://192.168.1.226:8080/api/users/save-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }), // Replace id with username
        });
        if (!response.ok) {
            throw new Error('Failed to save username');
            return;
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/Blink__Colorful.png')} resizeMode="contain" style={styles.logo} />
      </View>

      {/* Generated ID Section */}
      <View style={styles.idBox}>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.infoText}>Your generated Blink ID is </Text>
        <TouchableOpacity>
                  <Feather name="info" size={22} color="#0073e6" />
        </TouchableOpacity>
        </View>  
        <TouchableOpacity style={styles.idContainer}>
          {/* <Text style={styles.idText}>{id}</Text> */}
          <Text style={styles.idText}>{userData.id}</Text>
        </TouchableOpacity>
        <Text style={styles.instructionText}>
          Your friend can reach you through this ID, This ID works similar to a phone number
        </Text>
        
      </View>

      {/* "Next" Button at Bottom */}
      <TouchableOpacity
    style={styles.button}
    onPress={() => {
        saveUsernameToBackend();
        navigation.navigate('SignUp', {username});
    }}
>
    <Text style={styles.buttonText}>Next</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: width * 0.05, // 5% padding
  },
  logoContainer: {
    height: height * 0.25, // 25% of screen height
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5, // 50% of screen width
  },
  infoText: {
    fontSize: RFPercentage(2.2),
    color: '#555',
    marginBottom: height * 0.02,
  },
  idContainer: {
    backgroundColor: '#0073e6',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.22,
    borderRadius: 10,
    marginBottom: height * 0.02,
  },
  idText: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#fff',
  },
  instructionText: {
    fontSize: RFPercentage(2),
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: width * 0.1,
  },
  button: {
    position: 'absolute',
    bottom: height * 0.08, // 4% from the bottom
    width: width * 0.8, // 80% of screen width
    height: height * 0.07, // 7% of screen height
    backgroundColor: '#3498db',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
  },
  idBox: {
    alignItems: 'center',
  },
});
