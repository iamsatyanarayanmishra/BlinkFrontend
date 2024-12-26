import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const AdvanceOptions = ({navigation}) => {
  const [pushToggle, setPushToggle] = useState(false);
  const [loggingToggle, setLoggingToggle] = useState(false);
  const [ipv6MessagesToggle, setIpv6MessagesToggle] = useState(false);
  const [ipv6CallsToggle, setIpv6CallsToggle] = useState(false);

  const handlePushToggle = () => setPushToggle(prev => !prev);
  const handleLoggingToggle = () => setLoggingToggle(prev => !prev);
  const handleIpv6MessagesToggle = () => setIpv6MessagesToggle(prev => !prev);
  const handleIpv6CallsToggle = () => setIpv6CallsToggle(prev => !prev);


  return (
    <SafeAreaView style={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="white" />
     {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Advance Options</Text>
        <View style={{ width: 24 }} />
      </View>



      <ScrollView style={styles.mainContent}>
      <View style={styles.section}>
          <Text style={styles.linkText}>Push service</Text>
          <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Use Blink Push</Text>
              <Text style={styles.smallText}>Check for messages using system service.</Text>
            </View>
            <Switch 
            style={styles.toggleButton}
            onValueChange={handlePushToggle}
            value={pushToggle}/>
        </View>
        <TouchableOpacity >
        <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Reset push token</Text>
              <Text style={styles.smallText}>Re-register the device for push notification with FCM/HSM</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>


      <View style={styles.section}>
          <Text style={styles.linkText}>BackUps</Text>
          <TouchableOpacity onPress={() => navigation.navigate('BackupScreen')}>
        <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>BackUp Chats</Text>
            </View>
          </View>
        </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.linkText}>Verification Levels</Text>
          <TouchableOpacity onPress={() => navigation.navigate('VerificationLevelsScreen')}>
        <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Verification Levels</Text>
            </View>
          </View>
        </TouchableOpacity>
        </View>

      <View style={styles.section}>
          <Text style={styles.linkText}>Logging</Text>
          <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Log to file</Text>
              <Text style={styles.smallText}>Events will not be logged</Text>
            </View>
            <Switch 
            style={styles.toggleButton}
            onValueChange={handleLoggingToggle}
            value={loggingToggle}/>
        </View>
        <TouchableOpacity >
        <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Send Log</Text>
              <Text style={styles.smallText}>Events will not be logged </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
          <Text style={styles.linkText}>Network</Text>
          <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>IPv6 for messages</Text>
              <Text style={styles.smallText}>Use IPv4 connections only</Text>
            </View>
            <Switch 
            style={styles.toggleButton}
            onValueChange={handleIpv6MessagesToggle}
            value={ipv6MessagesToggle}/>
        </View>
        <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>IPv6 for calls and web</Text>
              <Text style={styles.smallText}>Allow IPv6 for Blink Calls and Blink Web</Text>
            </View>
            <Switch 
            style={styles.toggleButton}
            onValueChange={handleIpv6CallsToggle}
            value={ipv6CallsToggle}/>
        </View>
      </View>

      <View style={styles.section}>
          <Text style={styles.linkText}>Fix device configuration problems</Text>
          <TouchableOpacity >
        <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Disable power restrictions</Text>
              <Text style={[styles.smallText, {width: 320}]}>Allow blink to run in the background so it can recieve messages even when it s not active</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity >
        <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Unused app settings</Text>
              <Text style={[styles.smallText, {width: 320}]}>To prevent that blink gets paused by the system after longer inactivity,To prevent that blink gets paused by the 
              system after longer inactivity,To prevent that blink gets paused by the system after longer inactivity,</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  mainContent:{
    flex: 1,
    backgroundColor: '#F5F6F8', // Light grey background
    padding: 16,
    // paddingHorizontal: 60,
    // marginHorizontal:20
  },
  section: {
    marginBottom: 24,
  },
  linkText: {
    color: '#007AFF', // Blue for links
    fontSize: 18,
    marginBottom: 8,
    paddingHorizontal:20
  },
  text: {
    fontSize: 20,
    color: '#333',
    // marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: '#C0C0C0', // Placeholder for the icon
    // marginRight: 8,
    borderRadius: 12,
  },
  smallText:{
    paddingBottom:10,
    width: 250
  },
  toggleButton: {
    fontSize: 30,
  },
  row:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingLeft:20,
    // backgroundColor: 'black'
  }
});

export default AdvanceOptions;
