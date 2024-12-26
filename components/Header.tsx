// Header.tsx
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const Header = () => {
  return (
    <View>
        <StatusBar />
    <View style={styles.header}>
      <Image
        source={require('@/assets/images/Blink__Colorful.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity>
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
    </View>
  );
};

// Styles specific to Header
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
    // marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Header;
