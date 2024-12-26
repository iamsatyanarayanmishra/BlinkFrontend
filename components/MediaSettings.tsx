import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Switch } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather, Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MediaSettings({ navigation }) {
  const [blockUnknown, setBlockUnknown] = useState(false);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      <View style={{ padding: 20 }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={{padding: 10}} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Media & Storage</Text>
        <View style={{ width: 30 }} />
        </View>
        <Text style={styles.subSectionTitle}>Media</Text>
        <View style={styles.section}>
          <SettingItem IconComponent={Feather} icon="download" label="Auto Save to gallery" smallLabel="Save incoming picture and videos as we outgoing camera picture in unencrypted form" showIcon showSwitch switchValue={blockUnknown} onSwitchToggle={() => setBlockUnknown(prev => !prev)} />
          <SettingItem IconComponent={Entypo} icon="image" showIcon label="Image diamentions" smallLabel="Large (1600x1600)" />
          <SettingItem IconComponent={MaterialIcons} icon="compress" showIcon label="Video compression" smallLabel="Low (more data)" />

        </View>

        <Text style={styles.subSectionTitle}>Automatically download media</Text>
        <View style={styles.section}>
          <SettingItem IconComponent={MaterialIcons} icon="network-wifi" showIcon label="On WiFi" smallLabel="Picture, Voice messages, Videos, Files" />
          <SettingItem IconComponent={MaterialCommunityIcons} icon="network-strength-3" showIcon label="On Mobile Data" smallLabel="Picture, Voice messages, Videos, Files"  />
        </View>

        <Text style={styles.subSectionTitle}>Clean up media, files and messages</Text>
        <View style={styles.section}>
          <SettingItem IconComponent={MaterialIcons} icon="view-list" showIcon label="Storage Management" smallLabel="Manage memory and delete messages or media" />
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
        <View style={[styles.labelContainer, !smallLabel && { justifyContent: 'center' }]}>
        <Text style={styles.label}>{label}</Text>
        {smallLabel && <Text style={styles.smallLabel}>{smallLabel}</Text>}
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
  labelContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  smallLabel: {
    fontSize: 14,
    color: '#777',
  },
});
