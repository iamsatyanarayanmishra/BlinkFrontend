import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Button, TouchableOpacity, SafeAreaView, StatusBar, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const BackupScreen = ({navigation}) => {
  const [isSafeEnabled, setIsSafeEnabled] = useState(true);
  const [isNotificationVisible, setIsNotificationVisible] = useState(true); // New state for notification visibility
  const [activeTab, setActiveTab] = useState('Blink Safe');

  const toggleSafeSwitch = () => setIsSafeEnabled((previousState) => !previousState);
  const toggleNotification = () => setIsNotificationVisible(false); // Function to hide notification

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Backups</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.container}>
        {/* Notification Message */}
        {isNotificationVisible && ( // Conditionally render notification box
          <View style={styles.notificationBox}>
            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={toggleNotification}>
              <Entypo name="cross" size={24} color="grey" />
            </TouchableOpacity>
            <Text style={styles.notificationText}>
              If you switch or lose your device, nobody can restore your Blink ID or your chats if you don’t have a backup. Please save your data using the appropriate backup options.
            </Text>
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('Blink Safe')}>
            <Text style={[styles.tab, activeTab === 'Blink Safe' && styles.activeTab]}>
              Blink Safe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Data Backup')}>
            <Text style={[styles.tab, activeTab === 'Data Backup' && styles.activeTab]}>
              Data Backup
            </Text>
          </TouchableOpacity>
        </View>

        {/* Backup Safe Section */}
        <View style={styles.safeSection}>
          <Text style={styles.safeText}>Blink Safe</Text>
          <Switch
            onValueChange={toggleSafeSwitch}
            value={isSafeEnabled}
          />
        </View>

        {activeTab === 'Blink Safe' ? (
          <>
        {/* Server Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { fontWeight: 'bold', marginBottom: 10 }]}>Server name</Text>
            <Text style={[styles.infoValue, { fontWeight: 'bold', marginBottom: 10 }]}>Use default server</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Max backup size</Text>
            <Text style={styles.infoValue}>2.10 MB</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Backup retention</Text>
            <Text style={styles.infoValue}>180 days</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { fontWeight: 'bold', marginBottom: 10, marginTop: 10 }]}>Last backup</Text>
            <Text style={[styles.infoValue, { fontWeight: 'bold', marginBottom: 10, marginTop: 10 }]}>Yesterday, 15:25</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Backup size</Text>
            <Text style={styles.infoValue}>23.44kB</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { marginBottom: 40 }]}>Backup result</Text>
            <Text style={[styles.successText, { marginBottom: 40 }]}>Successful</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.passwordButton}>
            <Text style={styles.passwordButtonText}>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backupButton}>
            <MaterialIcons name="backup" size={24} color="white" />
            <Text style={styles.backupButtonText}>Backup Now</Text>
          </TouchableOpacity>
        </View>
        </>
        ) : (
          // Display "Hi" text for Data Backup tab
          <View style={styles.dataBackupContainer}>
            
              {/* Backup Icon */}
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.icon}>
                <Ionicons name="reload" size={24} color="white"   />
                </TouchableOpacity>
              </View>

              {/* Backup Text */}
              <Text style={styles.title}>Create a data backup to save all your data, including your chat and media.</Text>

              {/* Backup Path */}
              <View style={styles.backupPathContainer}>
                <View style={{flexDirection: 'column', gap: 10}}>
                <Text style={styles.backupPathLabel}>Backup path</Text>
                <Text style={styles.notSetText}>Not set</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>

      {/* Not set text */}
      

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Learn more</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Restore</Text>
        </TouchableOpacity>
      </View>

      {/* Create Data Backup Button */}
      <TouchableOpacity style={styles.dataBackupButton}>
        <Text style={styles.dataBackupButtonText}>+ Create Data Backup</Text>
      </TouchableOpacity>
    </View>
          
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
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
  },
  container: {
    padding: 16,
    backgroundColor: '#f5f6fa',
    height: '300%',
  },
  notificationBox: {
    backgroundColor: '#e7f2ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  notificationText: {
    fontSize: 14,
    color: '#6b7990',
    textAlign: 'left',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 10,
    textAlign: 'center',
    color: '#6b7990',
  },
  activeTab: {
    color: '#007aff',
    borderBottomWidth: 2,
    borderBottomColor: '#007aff',
    
  },
  safeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  safeText: {
    fontSize: 18,
    fontWeight: '500',
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    color: '#6b7990',
  },
  infoValue: {
    color: '#000',
  },
  successText: {
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#007aff',
  },
  passwordButtonText: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  backupButton: {
    flexDirection: 'row',
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    gap: 10,
    alignItems: 'center',
  },
  backupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dataBackupContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F5F7FB',   
  },
  hiText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  iconContainer: {
    marginBottom: 40,
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0088FF', // Placeholder for the icon background
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  backupPathContainer: {
    width: '90%',
    height: 80,
    backgroundColor: '#F1F2F6',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  backupPathLabel: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  changeText: {
    color: '#0088FF',
    fontSize: 14,
    // alignSelf: 'flex-end'
    // bottom:0
  },
  notSetText: {
    color: '#AAB0BC',
    marginBottom: 20,
    fontSize: 14,
    // paddingTop: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 30,
  },
  button: {
    borderWidth: 1,
    borderColor: '#E5E7EA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: '#0088FF',
    fontSize: 14,
  },
  dataBackupButton: {
    backgroundColor: '#0088FF',
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  dataBackupButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BackupScreen;
