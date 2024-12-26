import { Image, StyleSheet, Platform, TouchableOpacity, Text, View, StatusBar, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({navigation}) {
  return (
    <View style={{flex:1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Blink_BG-Mid.png')}
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
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('GenerateIDScreen')}>
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
    gap: width * 0.02,
  },
  stepContainer: {
    gap: height * 0.01,
    marginBottom: height * 0.01,
    width: width* 0.8
  },
  reactLogo: {
    // top: height * 0.0001,
    height: height * 0.41,
    width: width * 1,
    // position: 'absolute',
  },
  startButton: {
    // flex:1,
    flexDirection: 'row',
    backgroundColor: '#3498db',  // You can change the color as needed
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.3,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: height * 0.02,
  },
  startButtonText: {
    color: '#fff',
    fontSize: width * 0.035,
    fontWeight: 'bold',
  },
  restoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
    justifyContent: "center",
  },
  restoreText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  contentContainer: {
    marginTop: height * 0.20,
  },
});
