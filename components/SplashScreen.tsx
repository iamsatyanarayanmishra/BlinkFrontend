import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // Animated value for size
  const size = useRef(new Animated.Value(0)).current; // Start scale at 0 for pop effect

  useEffect(() => {
    // Start pop animation
    Animated.sequence([
      Animated.timing(size, {
        toValue: 1.0, // Slightly larger to create a pop effect
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.spring(size, {
        toValue: 1,
        friction: 5, // Creates a slight bounce back to original scale
        useNativeDriver: false,
      }),
    ]).start();

    // Shrink animation after pop effect
    setTimeout(() => {
      Animated.timing(size, {
        toValue: 0.5,
        duration: 2000,
        useNativeDriver: false,
      }).start();

      // Navigate to HomeScreen after the full animation
      setTimeout(() => {
        navigation.replace('HomeScreen'); // Use replace to avoid going back to splash
      }, 2000);
    }, 500);

  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('@/assets/images/Blink__Colorful.png')}
        style={[
          styles.image,
          {
            transform: [
              { scale: size },
            ],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default SplashScreen;
