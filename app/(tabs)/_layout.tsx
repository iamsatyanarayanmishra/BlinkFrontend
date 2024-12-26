import { Tabs } from 'expo-router';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


import HomeScreen from '@/components/HomeScreen';
import GenerateIDScreen from '@/components/IdCreation';
import ApostrfyIDScreen from '@/components/ApostrfyIDScreen';
import ApostrfySafe from '@/components/ApostrfySafe';
import SignUp from '@/components/SignUp';
import FindFriends from '@/components/FindFriends';
import ProfileComponent from '@/components/ProfileComponent';
import BottomNavigationBar from '@/components/BottomNavigationBar';
import Chats from '@/components/Chats';
import MessageScreen from '@/components/MessageScreen';
import SplashScreen from '@/components/SplashScreen';
import PublicKeyModal from '@/components/PublicKeyModal';
import ChatModal from '@/components/ChatModal';
import ApostrfyWeb from '@/components/ApostrfyWeb';
import AboutBlink from '@/components/AboutBlink';
import License from '@/components/License';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import TnS from '@/components/TnS';
import EndUserLicense from '@/components/EndUserLicense';
import AdvanceOptions from '@/components/AdvanceOptions';
import BackupScreen from '@/components/BackUpScreen';
import VerificationLevelsScreen from '@/components/VerificationLevelsScreen';
import Help from '@/components/Help';
import QRCodeScannerScreen from '@/components/QRCodeScannerScreen';
import Barcode from '@/components/Barcode';
import VoiceCallScreen from '@/components/VoiceCallScreen';
import VideoCallScreen from '@/components/VideoCallScreen';
import AboutBlinkIOS from '@/components/AboutBlinkIOS';
import AdvanceOptionIOS from '@/components/AdvanceOptionIOS';
import ArchivedChats from '@/components/ArchivedChats';
import StarredMessagesScreen from '@/components/StarredMessagesScreen';
import Settings from '@/components/Settings';
import PrivacySettings from '@/components/PrivacySettings';
import Security from '@/components/Security';
import Appearance from '@/components/Appearance';
import Sound from '@/components/Sound';
import ChatsSettings from '@/components/ChatsSettings';
import MediaSettings from '@/components/MediaSettings';
import SecureCalls from '@/components/SecureCalls';
import { GlobalProvider } from '@/components/GlobalContext';
import Contacts from '@/components/Contacts';
import Preferences from '@/components/Preferences';
import GroupProfile from '@/components/GroupProfile';
import GroupSelection from '@/components/GroupSelection';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator({ route }) {
  const { username } = route.params; // Get userId from navigation params
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 70,
          paddingBottom: 15,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === 'Contact') {
            iconName = 'people-outline';
          } else if (route.name === 'Chats') {
            iconName = 'chatbubble-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={focused ? 28 : 24}
              color={color}
              style={{ transform: [{ translateY: focused ? -5 : 0 }] }}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: color,
              transform: [{ translateY: focused ? -5 : 0 }],
            }}
          >
            {route.name}
          </Text>
        ),
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Contact"
        component={Contacts}
        initialParams={{ username }} // Pass userId to Contact screen
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        initialParams={{ username }} // Pass userId to Chats screen
      />
      <Tab.Screen
        name="Profile"
        component={ProfileComponent}
        initialParams={{ username }} // Pass userId to Profile screen
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        initialParams={{ username }} // Pass userId to Settings screen
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName='SplashScreen' >
          {/* <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} /> */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GenerateIDScreen" component={GenerateIDScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ApostrfyIDScreen" component={ApostrfyIDScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ApostrfySafe" component={ApostrfySafe} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="FindFriends" component={FindFriends} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileComponent" component={ProfileComponent} options={{ headerShown: false }} />
          <Stack.Screen name="BottomNavigationBar" component={BottomNavigationBar} options={{ headerShown: false }} />
          <Stack.Screen name="Chats" component={Chats} options={{ headerShown: false }} />
          <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PublicKeyModal" component={PublicKeyModal} options={{ headerShown: false }} />
          <Stack.Screen name="ChatModal" component={ChatModal} options={{ headerShown: false }} />
          <Stack.Screen name="ApostrfyWeb" component={ApostrfyWeb} options={{ headerShown: false }} />
          <Stack.Screen name="AboutBlink" component={AboutBlink} options={{ headerShown: false }} />
          <Stack.Screen name="AboutBlinkIOS" component={AboutBlinkIOS} options={{ headerShown: false }} />
          <Stack.Screen name="License" component={License} options={{ headerShown: false }} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
          <Stack.Screen name="TnS" component={TnS} options={{ headerShown: false }} />
          <Stack.Screen name="EndUserLicense" component={EndUserLicense} options={{ headerShown: false }} />
          <Stack.Screen name="AdvanceOptions" component={AdvanceOptions} options={{ headerShown: false }} />
          <Stack.Screen name="AdvanceOptionIOS" component={AdvanceOptionIOS} options={{ headerShown: false }} />
          <Stack.Screen name="BackupScreen" component={BackupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VerificationLevelsScreen" component={VerificationLevelsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
          <Stack.Screen name="QRCodeScannerScreen" component={QRCodeScannerScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Barcode" component={Barcode} options={{ headerShown: false }} />
          <Stack.Screen name="VoiceCallScreen" component={VoiceCallScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ArchivedChats" component={ArchivedChats} options={{ headerShown: false }} />
          <Stack.Screen name="StarredMessagesScreen" component={StarredMessagesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
          <Stack.Screen name="PrivacySettings" component={PrivacySettings} options={{ headerShown: false }} />
          <Stack.Screen name="Security" component={Security} options={{ headerShown: false }} />
          <Stack.Screen name="Appearance" component={Appearance} options={{ headerShown: false }} />
          <Stack.Screen name="Sound" component={Sound} options={{ headerShown: false }} />
          <Stack.Screen name="ChatsSettings" component={ChatsSettings} options={{ headerShown: false }} />
          <Stack.Screen name="MediaSettings" component={MediaSettings} options={{ headerShown: false }} />
          <Stack.Screen name="SecureCalls" component={SecureCalls} options={{ headerShown: false }} />
          <Stack.Screen name="Contacts" component={Contacts} options={{ headerShown: false }} />
          <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Preferences" component={Preferences} options={{ headerShown: false }} />
          <Stack.Screen name="GroupProfile" component={GroupProfile} options={{ headerShown: false }} />
          <Stack.Screen name="GroupSelection" component={GroupSelection} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  )
}