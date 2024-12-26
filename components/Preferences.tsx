import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import { GlobalContext } from './GlobalContext';

const Preferences = ({ navigation, route }) => {
  const [selectedPreference, setSelectedPreference] = useState(null);
  const { updateUserData, userData } = useContext(GlobalContext);
  const { username } = route.params || {}; // Ensure `params` exists

  if (!username) {
    console.error("username is undefined.");
    return <Text>Error: userId not found</Text>; // Gracefully handle the error
  }

  const preferenceList = [
    { id: '1', title: 'MERN', description: 'Web development stack' },
    { id: '2', title: 'MEAN', description: 'Web development stack' },
    { id: '3', title: 'LAMP', description: 'Web development stack' },
    { id: '4', title: 'Django', description: 'Python-based web framework' },
    { id: '5', title: 'Ruby on Rails', description: 'Web development framework' },
    { id: '6', title: 'React Native', description: 'Mobile development framework' },
    { id: '7', title: 'Flutter', description: 'Mobile app framework' },
    { id: '8', title: 'Python Data Stack', description: 'Data science stack' },
    { id: '9', title: 'Big Data Stack', description: 'Big data stack' },
    { id: '10', title: 'Data Visualization Stack', description: 'Data visualization stack' },
    { id: '11', title: 'AWS', description: 'Cloud service' },
    { id: '12', title: 'Microsoft Azure', description: 'Cloud service' },
    { id: '13', title: 'Google Cloud', description: 'Cloud service' },
    { id: '14', title: 'CI/CD Stack', description: 'Continuous integration stack' },
    { id: '15', title: 'Ethereum Stack', description: 'Blockchain development' },
    { id: '16', title: 'Binance Smart Chain Stack', description: 'Blockchain development' },
  ];

  const handleSelect = (id) => {
    setSelectedPreference(id);
  };

  const handleFinish = async () => {
    const selected = preferenceList.find((item) => item.id === selectedPreference);
    if (selected) {
      try {
        const response = await fetch(`http://192.168.1.226:8080/api/users/preferences`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: username, // Pass userId in the body
            preference: selected.title,
          }),
        });

        if (response.ok) {
          console.log('Preference saved successfully!');
          updateUserData({ preference: selected.title , username});
          navigation.navigate('BottomTabs', { username });
        } else {
          const result = await response.json();
          console.error('Failed to save preference:', result);
        }
      } catch (error) {
        console.error('Error saving preference:', error);
      }
    }
  };

  const renderPreference = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.preferenceContainer,
        selectedPreference === item.id && styles.selectedPreference,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <Text style={styles.preferenceTitle}>{item.title}</Text>
      <Text style={styles.preferenceDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#f5f5f5'} />
      <Text style={styles.title}>Choose your Preference</Text>
      <Text style={styles.subtitle}>Choose your tech preference, show your interest</Text>
      <FlatList
        data={preferenceList}
        renderItem={renderPreference}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
      />
      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a3c79',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 30,
    color: '#606060',
    marginTop: 20,
  },
  grid: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  preferenceContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
    margin: 5,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  selectedPreference: {
    backgroundColor: '#3498db',
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  preferenceDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  finishButton: {
    position: 'absolute',
    bottom: 50,
    width: 300,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  finishButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Preferences;
