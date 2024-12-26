import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Switch } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Entypo } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Sound({ navigation }) {
  // Independent state variables for each switch
  const [notificationVibrateSingle, setNotificationVibrateSingle] = useState(false);
  const [notificationVibrateGroup, setNotificationVibrateGroup] = useState(false);
  const [useSystemRingtoneBlink, setUseSystemRingtoneBlink] = useState(false);
  const [vibrateBlink, setVibrateBlink] = useState(false);
  const [useSystemRingtoneGroupCalls, setUseSystemRingtoneGroupCalls] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      <View style={{ padding: 20 }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={{padding: 10}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Sound & Notification</Text>
        <View style={{ width: 30 }} />
        </View>
        
        <Text style={styles.subSectionTitle}>Single Chat</Text>
        <View style={styles.section}>
          <SettingItem IconComponent={MaterialIcons} icon="notifications-active" showIcon label="Notification Sound" smallLabel="Default (Bulb One)" />
          <SettingItem IconComponent={MaterialCommunityIcons} icon="vibrate" label="Vibrate" smallLabel="Vibrate on incoming message" showIcon showSwitch switchValue={notificationVibrateSingle} onSwitchToggle={() => setNotificationVibrateSingle(prev => !prev)} />
          <SettingItem IconComponent={Entypo} icon="light-up" showIcon label="Notification Light" smallLabel="Orange" />
        </View>

        <Text style={styles.subSectionTitle}>Group Chat</Text>
        <View style={styles.section}>
          <SettingItem IconComponent={MaterialIcons} icon="notifications-active" showIcon label="Notification Sound" smallLabel="Default (Bulb One)" />
          <SettingItem IconComponent={MaterialCommunityIcons} icon="vibrate" label="Vibrate" smallLabel="Vibrate on incoming message" showIcon showSwitch switchValue={notificationVibrateGroup} onSwitchToggle={() => setNotificationVibrateGroup(prev => !prev)} />
          <SettingItem IconComponent={Entypo} icon="light-up" showIcon label="Notification Light" smallLabel="Orange" />
        </View>

        <Text style={styles.subSectionTitle}>Blink Calls</Text>
        <View style={styles.section}>
          <SettingItem label="Use System Ringtone" smallLabel="Vibrate on incoming message" showSwitch switchValue={useSystemRingtoneBlink} onSwitchToggle={() => setUseSystemRingtoneBlink(prev => !prev)} />
          <SettingItem IconComponent={MaterialIcons} icon="notifications-active" showIcon label="Ringtone" smallLabel="Blink Calls" />
          <SettingItem IconComponent={MaterialCommunityIcons} icon="vibrate" label="Vibrate" smallLabel="Vibrate on incoming message" showIcon showSwitch switchValue={vibrateBlink} onSwitchToggle={() => setVibrateBlink(prev => !prev)} />
        </View>

        <Text style={styles.subSectionTitle}>Group Calls</Text>
        <View style={styles.section}>
          <SettingItem IconComponent={MaterialIcons} icon="sync" label="Use System Ringtone" showIcon showSwitch switchValue={useSystemRingtoneGroupCalls} onSwitchToggle={() => setUseSystemRingtoneGroupCalls(prev => !prev)} />
        </View>
      </View>
    </ScrollView>
  );
}

function SettingItem({ IconComponent, icon, label, smallLabel, showIcon, showSwitch, switchValue, onSwitchToggle }) {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.iconContainer}>
        {showIcon && <IconComponent name={icon} size={24} color="#777" />}
      </View>
      <View style={[styles.labelContainer, !smallLabel && styles.centeredLabel]}>
        <Text style={styles.label}>{label}</Text>
        {smallLabel ? <Text style={styles.smallLabel}>{smallLabel}</Text> : null}
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
  labelContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  centeredLabel: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
  },
  smallLabel: {
    fontSize: 14,
    color: '#777',
  },
});
