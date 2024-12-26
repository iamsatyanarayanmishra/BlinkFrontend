import { Image, StyleSheet, Platform, TouchableOpacity, Text, View, StatusBar } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <View style={{flex:1}}>
     <StatusBar barStyle="dark-content" backgroundColor="white" />
     <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.reactLogo}
          resizeMode='contain'
        />
      }>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Let's Get Started</ThemedText>
      </View>
      <View style={styles.stepContainer}>
        <ThemedText>Blink protects your privacy more rigorously than any other messenger. Find out more in our 
          <TouchableOpacity>
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              Privacy Policy.
            </Text>
          </TouchableOpacity>
        </ThemedText>  
      </View>
      
      {/* Main content container */}
      <ThemedView style={styles.contentContainer}>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>
            Start Setup
          </Text>
        </TouchableOpacity>
        <ThemedView style={styles.restoreContainer}>
          <ThemedText>Existing User? </ThemedText>
          <TouchableOpacity>
            <Text style={styles.restoreText}>
              Restore Backup
            </Text>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    top:17,
    height: 350,
    width: 400,
    // position: 'absolute',
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#3498db',  // You can change the color as needed
    paddingVertical: 12,
    paddingHorizontal: 124,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 16,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  restoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: "center"
  },
  restoreText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  contentContainer: {
    marginTop: 174, 
  },
});
