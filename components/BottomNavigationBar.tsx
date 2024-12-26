import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const BottomNavigationBar = () => {
  const [activeTab, setActiveTab] = useState('Contacts');
  const navigation = useNavigation(); 
  const handlePress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('Contacts')}
      >
        <Ionicons
          name="people-outline"
          size={24}
          color={activeTab === 'Contacts' ? 'black' : 'gray'}
        />
        <Text style={activeTab === 'Contacts' ? styles.navText : styles.navTextInactive}>
          Contacts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('Chats')}
      >
        <Ionicons
          name="chatbubble-outline"
          size={24}
          color={activeTab === 'Chats' ? 'black' : 'gray'}
        />
        <Text style={activeTab === 'Chats' ? styles.navText : styles.navTextInactive}>
          Chats
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('ProfileComponent')}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={activeTab === 'ProfileComponent' ? 'black' : 'gray'}
        />
        <Text style={activeTab === 'ProfileComponent' ? styles.navText : styles.navTextInactive}>
          Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress('Settings')}
      >
        <Ionicons
          name="settings-outline"
          size={24}
          color={activeTab === 'Settings' ? 'black' : 'gray'}
        />
        <Text style={activeTab === 'Settings' ? styles.navText : styles.navTextInactive}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'black',
    fontSize: 12,
    marginTop: 4,
  },
  navTextInactive: {
    color: 'gray',
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavigationBar;
