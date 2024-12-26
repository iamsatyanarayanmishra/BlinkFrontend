import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Switch } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';


export default function PrivacySettings({ navigation }) {
  const [syncContacts, setSyncContacts] = useState(false);
  const [blockUnknown, setBlockUnknown] = useState(false);
  const [readReceipts, setReadReceipts] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [clearSettings, setClearSettings] = useState(false);
  const [noThumbnails, setNoThumbnails] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      <View style={{ padding: 20 }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={{padding: 10}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Privacy</Text>
        <View style={{ width: 30 }} />
        </View>
        <Text style={styles.subSectionTitle}>Contacts</Text>
        <View style={styles.section}>
          <SettingItem IconComponent={MaterialIcons} icon="sync" label="Sync contacts" smallLabel="Keep users in sync with your device's address book" showIcon showSwitch switchValue={syncContacts} onSwitchToggle={() => setSyncContacts(prev => !prev)} />
          <SettingItem IconComponent={MaterialIcons} icon="sync" label="Block unknown" smallLabel="Anybody can send you a message. New contacts will be added automatically when the first message arrives" showIcon showSwitch switchValue={blockUnknown} onSwitchToggle={() => setBlockUnknown(prev => !prev)} />
        </View>

        <Text style={styles.subSectionTitle}>Receipts</Text>
        <View style={styles.section}>
          <SettingItem label="Send read receipts" smallLabel="Allow contacts to see if you’ve read their messages" showSwitch switchValue={readReceipts} onSwitchToggle={() => setReadReceipts(prev => !prev)} />
          <SettingItem label="Send typing indicator" smallLabel="Show when you are typing a message" showSwitch switchValue={typingIndicator} onSwitchToggle={() => setTypingIndicator(prev => !prev)} />
          <SettingItem label="Clear individual settings" smallLabel="Reset contact-specific settings for read receipts and typing indicator to default" showSwitch switchValue={clearSettings} onSwitchToggle={() => setClearSettings(prev => !prev)} />
        </View>

        <Text style={styles.subSectionTitle}>List</Text>
        <View style={styles.section}>
          <SettingItem label="Exclusion list" smallLabel="IDs listed here will be ignored when synchronizing contacts" />
          <SettingItem label="Blacklist" smallLabel="Messages from IDs listed here will be ignored" />
        </View>

        <Text style={styles.subSectionTitle}>Others</Text>
        <View style={styles.section}>
          <SettingItem IconComponent={MaterialIcons} icon="sync" label="No thumbnails and screenshots" smallLabel="Do not show thumbnails in app switcher" showIcon showSwitch switchValue={noThumbnails} onSwitchToggle={() => setNoThumbnails(prev => !prev)} />
        </View>
      </View>
    </ScrollView>
  );
}

function SettingItem({ IconComponent, icon, label, smallLabel, showIcon, showSwitch, switchValue, onSwitchToggle }) {
  return (
    <TouchableOpacity style={styles.item}>
        <View style={styles.iconContainer}>
        {showIcon && ( <IconComponent name={icon} size={24} color="#777" /> )}
        </View>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Text style={styles.label}>{label}</Text>
        <Text>{smallLabel}</Text>
      </View>
      {showSwitch && 
        <Switch
          value={switchValue}
          onValueChange={onSwitchToggle}
        />
      }
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
  subSectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    // marginTop: 20,
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
    paddingVertical: 10,
    gap: 10,
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
});
