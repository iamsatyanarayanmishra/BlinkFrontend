import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar, Switch, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const AboutBlink = ({navigation}) => {
  const [toggleValue, setToggleValue] = useState(false);

  const handleToggle = () => {
    setToggleValue(previousValue => !previousValue);
  };


  return (
    <SafeAreaView style={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="white" />
     {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Blink</Text>
        <View style={{ width: 24 }} />
      </View>



      <View style={styles.mainContent}>
      <View style={styles.section}>
          <Text style={styles.linkText}>Legal</Text>
        <TouchableOpacity onPress={() => navigation.navigate('License')}>
        <Text style={styles.text}>Licenses</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Text style={styles.text}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TnS')}>
        <Text style={styles.text}>Terms of services</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EndUserLicense')}>
        <Text style={styles.text}>End-User License Agreement</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Version</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.text}>Version 5.5 Build 3000996 Google Play</Text>
        <Text style={styles.smallText}>Copyright 2013-2024 Blink GmbH</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.text}>Nothing A063</Text>
        <Text style={styles.smallText}>Nothing/Spacewar/Spacewar:14/UP1A.453445.435/45435345:user/release-key</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Version</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={styles.text}>Translators</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
          <Text style={styles.linkText}>Advanced options</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('AdvanceOptions')}>

          {/* <View style={styles.icon}> */}
            {/* Add your icon here */}
          {/* </View> */}
          
          <Text style={styles.text}>Advanced options</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <Text style={styles.footerText}>Help?</Text>
        </TouchableOpacity>
      </View>
    </View>
      
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
    marginTop: Platform.OS === 'ios' ? 0 : 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  backButton: {
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
    paddingTop: 16,
    paddingLeft: 60,
    // height: 2000
  },
  section: {
    marginBottom: 24,
  },
  linkText: {
    color: '#007AFF', // Blue for links
    fontSize: 18,
    marginBottom: 8,
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
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
    paddingTop:-5
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingRight: 40
  },
  footerText: {
    color: '#007AFF',
    fontSize: 18,
  },
});

export default AboutBlink;
