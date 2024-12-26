import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Switch } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SecureCalls({ navigation }) {
  const [enableApostrfyCalls, setEnableApostrfyCalls] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);
  const [alwaysRelayCalls, setAlwaysRelayCalls] = useState(false);
  const [enableGroupCalls, setEnableGroupCalls] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Secure Calls</Text>
          <View style={{ width: 30 }} />
        </View>

        <Text style={styles.subSectionTitle}>Blink Calls</Text>
        <View style={styles.section}>
          <SettingItem 
            IconComponent={MaterialIcons} 
            icon="call" 
            showIcon
            label="Enable Blink Calls" 
            showSwitch 
            switchValue={enableApostrfyCalls} 
            onSwitchToggle={() => setEnableApostrfyCalls(prev => !prev)} 
          />
          <SettingItem 
            IconComponent={Feather} 
            icon="video" 
            showIcon
            label="Allow video" 
            showSwitch 
            switchValue={allowVideo} 
            onSwitchToggle={() => setAllowVideo(prev => !prev)} 
          />
          <SettingItem 
            label="Always relay calls" 
            smallLabel="Establish a direct connection, if possible, and only relay calls to unverified contacts through Blink servers. May expose your IP address."
            showSwitch 
            switchValue={alwaysRelayCalls} 
            onSwitchToggle={() => setAlwaysRelayCalls(prev => !prev)} 
          />
          <SettingItem 
            label="Preferred image quality" 
            smallLabel="Balanced (recommended)" 
          />
        </View>

        <Text style={styles.subSectionTitle}>Group Calls</Text>
        <View style={styles.section}>
          <SettingItem 
            IconComponent={MaterialIcons} 
            icon="call" 
            showIcon
            label="Enable group calls" 
            showSwitch 
            switchValue={enableGroupCalls} 
            onSwitchToggle={() => setEnableGroupCalls(prev => !prev)} 
          />
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
      <View style={[styles.labelContainer, !smallLabel && { justifyContent: 'center' }]}>
        <Text style={styles.label}>{label}</Text>
        {smallLabel && <Text style={styles.smallLabel}>{smallLabel}</Text>}
      </View>
      {showSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchToggle}
        />
      )}
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
  label: {
    fontSize: 16,
  },
  smallLabel: {
    color: '#777',
  },
});
