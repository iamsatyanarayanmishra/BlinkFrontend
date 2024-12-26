import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

export default function AboutBlinkIOS({navigation}) {
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Blink</Text>
      <Text style={styles.sectionTitle}>Settings</Text>

      <View style={styles.section}>
        <SettingItem IconComponent={MaterialCommunityIcons} icon="license" label="Licenses" NextScreen="License" navigation={navigation} hasBorder />
        <SettingItem IconComponent={MaterialIcons} icon="privacy-tip" label="Privacy Policy" NextScreen="PrivacyPolicy" navigation={navigation} hasBorder/>
        <SettingItem IconComponent={Icon} icon="notifications-outline" label="Terms of services" NextScreen="TnS" navigation={navigation} hasBorder/>
        <SettingItem IconComponent={MaterialCommunityIcons} icon="license" label="End-User License Agreement" NextScreen="EndUserLicense" navigation={navigation} />
      </View>

      <View style={styles.section}>
        <SettingItem IconComponent={Feather} icon="help-circle" label="Help" NextScreen="Help" navigation={navigation}/>
        {/* <SettingItem icon="globe-outline" label="Desktop/Web" /> */}
      </View>

      <View style={styles.section}>
        <SettingItem IconComponent={MaterialIcons} icon="translate" label="Translators" navigation={navigation}/>
        {/* <SettingItem icon="globe-outline" label="Desktop/Web" /> */}
      </View>

      <View style={styles.section}>
        <SettingItem IconComponent={Icon} icon="settings" label="Advanced Options" NextScreen="AdvanceOptionIOS" navigation={navigation} />
        {/* <SettingItem icon="globe-outline" label="Desktop/Web" /> */}
      </View>

      <View style={styles.footer}>
        <NetworkStatus label="Version 5.5 Build 3000996 Google Play" status="Copyright 2013-2024 Blink GmbH" hasBorder/>
        <NetworkStatus label="Nothing A063" status="Nothing/Spacewar/Spacewar:14/UP1A.453445.435/45435345:user/release-key" />
      </View>


    </ScrollView>
    </SafeAreaView>
  );
}

function SettingItem({ IconComponent, icon, label, status, hasBorder, NextScreen, navigation }) {
    return (
      <TouchableOpacity style={[styles.item, hasBorder && styles.itemBorder]} onPress={() => navigation.navigate(NextScreen)}>
        <View style={styles.iconContainer}>
          <IconComponent name={icon} size={24} color="#fff" />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {status && <Text style={styles.status}>{status}</Text>}
          <Icon name="chevron-forward" size={20} color="#777" />
        </View>
        
      </TouchableOpacity>
    );
  }
  

function NetworkStatus({ label, status, hasBorder }) {
  return (
    <View style={[styles.networkItem, hasBorder && styles.itemBorder]}>
      <Text style={styles.networkLabel}>{label}</Text>
      <Text style={styles.networkStatus}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#f3f4f6',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginVertical: 10,
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
    paddingBottom: -10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 10,
    gap: 10,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'grey',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
  },
  label: {
    // flex: 1,
    fontSize: 16,
    
  },
  status: {
    fontSize: 16,
    color: '#777',
    marginRight: 10,
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 5,
  },
  networkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
    
  },
  networkLabel: {
    flex: 1,
    fontSize: 16,
    width: '70%'
  },
  networkStatus: {
    fontSize: 16,
    color: '#777',
    marginRight: 10,
    width: '30%'
  },
});
