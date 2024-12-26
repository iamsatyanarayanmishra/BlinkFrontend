import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PrivacySettings = ({navigation}) => {
  const [syncContactsToggle, setSyncContactsToggle] = useState(false);
  const [blockUnknownToggle, setBlockUnknownToggle] = useState(false);
  const [readReceiptsToggle, setReadReceiptsToggle] = useState(false);
  const [typingIndicatorToggle, setTypingIndicatorToggle] = useState(false);
  const [clearSettingsToggle, setClearSettingsToggle] = useState(false);
  const [noThumbnailsToggle, setNoThumbnailsToggle] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Privacy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.mainContent}>
        <View style={styles.section}>
          <Text style={styles.linkText}>Contacts</Text>
          <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Sync contacts</Text>
              <Text style={styles.smallText}>Keep users in sync with your device's address book</Text>
            </View>
            <Switch
              style={styles.toggleButton}
              onValueChange={() => setSyncContactsToggle(prev => !prev)}
              value={syncContactsToggle}
            />
          </View>
          
          <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Block unknown</Text>
              <Text style={styles.smallText}>Anybody can send you a message. New contacts will be added automatically when the first message arrives</Text>
            </View>
            <Switch
              style={styles.toggleButton}
              onValueChange={() => setBlockUnknownToggle(prev => !prev)}
              value={blockUnknownToggle}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.linkText}>Receipts</Text>
          <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Send read receipts</Text>
              <Text style={styles.smallText}>Allow contacts to see if you’ve read their messages</Text>
            </View>
            <Switch
              style={styles.toggleButton}
              onValueChange={() => setReadReceiptsToggle(prev => !prev)}
              value={readReceiptsToggle}
            />
          </View>
          
          <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Send typing indicator</Text>
              <Text style={styles.smallText}>Show when you are typing a message</Text>
            </View>
            <Switch
              style={styles.toggleButton}
              onValueChange={() => setTypingIndicatorToggle(prev => !prev)}
              value={typingIndicatorToggle}
            />
          </View>
          
          <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Clear individual settings</Text>
              <Text style={styles.smallText}>Reset contact-specific settings for read receipts and typing indicator to default</Text>
            </View>
            <Switch
              style={styles.toggleButton}
              onValueChange={() => setClearSettingsToggle(prev => !prev)}
              value={clearSettingsToggle}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.linkText}>Lists</Text>
          <TouchableOpacity >
        <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Exclusion list</Text>
              <Text style={styles.smallText}>The IDs listed here will be ignored when synchronizing contacts</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity >
        <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>Blacklist</Text>
              <Text style={styles.smallText}>Messages from IDs listed here will be ignored</Text>
            </View>
          </View>
        </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.linkText}>Others</Text>
          <View style={styles.row}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.text}>No thumbnails and screenshots</Text>
              <Text style={styles.smallText}>Do not show thumbnails in app switcher</Text>
            </View>
            <Switch
              style={styles.toggleButton}
              onValueChange={() => setNoThumbnailsToggle(prev => !prev)}
              value={noThumbnailsToggle}
            />
          </View>
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
  headerText: {
    fontSize: 20,
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F5F6F8', // Light grey background
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  linkText: {
    color: '#007AFF', // Blue for links
    fontSize: 18,
    marginBottom: 8,
    paddingHorizontal: 20
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  smallText: {
    paddingBottom: 10,
    width: 250,
  },
  toggleButton: {
    fontSize: 30,
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingLeft: 20,
  }
});

export default PrivacySettings;
