import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Switch } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChatsSettings({ navigation }) {
  const [enterToSend, setEnterToSend] = useState(false);
  const [enterToSendMedia, setEnterToSendMedia] = useState(false);
  const [useProximitySensor, setUseProximitySensor] = useState(false);
  const [mediaQuickSelect, setMediaQuickSelect] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      <View style={{ padding: 20 }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={{padding: 10}} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Chats</Text>
          <View style={{ width: 30 }} />
        </View>
        
        <Text style={styles.subSectionTitle}>Keyboard</Text>
        <View style={styles.section}>
          <SettingItem 
            IconComponent={MaterialCommunityIcons} 
            icon="vibrate" 
            showIcon 
            label="Enter to Send" 
            smallLabel="Enter Key Adds a New Line" 
            showSwitch 
            switchValue={enterToSend} 
            onSwitchToggle={() => setEnterToSend(prev => !prev)} 
          />
        </View>

        <Text style={styles.subSectionTitle}>Media</Text>
        <View style={styles.section}>
          <SettingItem 
            IconComponent={MaterialCommunityIcons} 
            icon="vibrate" 
            showIcon 
            label="Enter to Send" 
            showSwitch 
            switchValue={enterToSendMedia} 
            onSwitchToggle={() => setEnterToSendMedia(prev => !prev)} 
          />
          <SettingItem 
            label="Use Proximity Sensor" 
            smallLabel="Use earpiece for voice message playback if proximity sensor is covered" 
            showSwitch 
            switchValue={useProximitySensor} 
            onSwitchToggle={() => setUseProximitySensor(prev => !prev)} 
          />
          <SettingItem 
            IconComponent={MaterialCommunityIcons} 
            icon="vibrate" 
            showIcon 
            label="Media Quick Select" 
            smallLabel="Display a list of recently added images in the attachments popup"  
            showSwitch 
            switchValue={mediaQuickSelect} 
            onSwitchToggle={() => setMediaQuickSelect(prev => !prev)} 
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
  label: {
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
