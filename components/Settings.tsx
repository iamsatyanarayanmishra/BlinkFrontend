import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import BottomNavigationBar from './BottomNavigationBar';

export default function Settings({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

    <View style={{padding: 20,}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={{ width: 30 }} />
      </View>
      
      <View style={styles.section}>
        <SettingItem IconComponent={MaterialIcons} icon="privacy-tip" label="Privacy" smallLabel="Chats, Contacts, List" NextScreen="PrivacySettings" navigation={navigation} />
        <SettingItem IconComponent={MaterialIcons} icon="security" label="Security" smallLabel="Access protection, Encryption of locally stored data" NextScreen="Security" navigation={navigation}/>
        <SettingItem IconComponent={Ionicons} icon="color-palette-outline" label="Appearance" smallLabel="Design theme, Emoji style, Language, Font Size, Contact List"NextScreen="Appearance" navigation={navigation} />
        <SettingItem IconComponent={AntDesign} icon="sound" label="Sound and Notification" smallLabel="Ringtones, Vibrate, Notification light" NextScreen="Sound" navigation={navigation}/>
        <SettingItem IconComponent={Ionicons} icon="chatbubble-ellipses-outline" label="Chat" smallLabel="Keyboard, Media" NextScreen="ChatsSettings" navigation={navigation}/>
        <SettingItem IconComponent={MaterialIcons} icon="perm-media" label="Media & Storage" smallLabel="Image dimensions, Automatically download media, clean up media files and messages"  NextScreen="MediaSettings" navigation={navigation}/>
        <SettingItem IconComponent={AntDesign} icon="videocamera" label="Secure Calls" smallLabel="Blink Calls, Video Calls, Group Calls" NextScreen="SecureCalls" navigation={navigation}/>
        <SettingItem IconComponent={Entypo} icon="star-outlined" label="Rate Blink" smallLabel="Rate our app, if you like using it" />
        <SettingItem IconComponent={Feather} icon="info" label="About Blink" NextScreen="AboutBlinkIOS" navigation={navigation}/>
      </View>

      
      </View>
      {/* <BottomNavigationBar navigation={navigation} /> */}
    </ScrollView>
  );
}

function SettingItem({ IconComponent, icon, label, status, smallLabel, NextScreen, navigation }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => NextScreen && navigation.navigate(NextScreen)}>
      <View style={styles.iconContainer}>
        <IconComponent name={icon} size={24} color="#777" />
      </View>
      <View style={[styles.labelContainer, !smallLabel && { justifyContent: 'center' }]}>
        <Text style={styles.label}>{label}</Text>
        {smallLabel && <Text style={styles.smallLabel}>{smallLabel}</Text>}
      </View>
      <Icon name="chevron-forward" size={20} color="#777" />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingVertical: 20,
    gap: 10,
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
  },
  smallLabel: {
    fontSize: 14,
    color: '#777',
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
  
});

