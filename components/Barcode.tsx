import React from 'react';
import { StyleSheet, View, Text, Dimensions, StatusBar, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg'; 
// Get screen dimensions
const { width, height } = Dimensions.get('window');

const Barcode = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.innerContainer}>
      
        {/* QR Scanner Overlay */}
        <Text style={styles.headingText}>Blink Unique ID</Text>

        <View style={styles.scannerContainer}>
          <View style={styles.scanFrame} >
          <QRCode
            value="http://awesome.link.qr"
            size={230}          
            />
            </View>

          <View style={styles.instructionContainer}>
            {/* Instructions text */}
            <Text style={styles.instructions}>
              Share the QR to connect with people.
            </Text>

            {/* Footer Text */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Powered by</Text>
              {/* <Text style={styles.apostrfyText}>Blink</Text> */}
              <Image
                source={require('@/assets/images/Blink-Vertical.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scanFrame: {
    width: width * 0.6,
    height: width * 0.6,
    // borderWidth: 2,
    borderColor: '#007AFF',
    bottom: 100,
  },
  instructionContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    gap: 80,
    paddingHorizontal: 30,
  },
  instructions: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
  },
  headingText: {
    // top: 150,
    color: '#007AFF',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerText: {
    marginTop: 20,
    color: '#aaa',
    fontSize: 14,
  },
  apostrfyText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  header: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
  },
  dotsButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    flex: 1,
    textAlign: 'center',
    // fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Barcode;
