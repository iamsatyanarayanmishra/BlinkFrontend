import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text, Image, StatusBar } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import BottomNavigationBar from './BottomNavigationBar';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

const Chats = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [connections, setConnections] = useState([]);
  const [archivedConnections, setArchivedConnections] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = route.params; // Ensure `params` exists


  // Sort connections by time
  // const sortConnectionsByTime = (connections) => {
  //   return connections.slice().sort((a, b) => {
  //     const [hourA, minuteA] = a.time.split(':').map(Number);
  //     const [hourB, minuteB] = b.time.split(':').map(Number);
  //     return hourB - hourA || minuteB - minuteA; // Compare hours first, then minutes
  //   });
  // };

  // Fetch connections from the API with search query
  const fetchConnections = async (search = '') => {
    try {
      const response = await fetch(`http://192.168.1.226:8080/api/chats/${username}?search=${search}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setConnections(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const archiveChat = async (itemId) => {
    try {
      const response = await fetch(`http://192.168.1.226:8080/api/chats/${itemId}/archive`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`Failed to archive chat: ${response.statusText}`);
      }

      const updatedConnections = connections.filter((connection) => connection.id !== itemId);
      const selectedChat = connections.find((connection) => connection.id === itemId);

      if (selectedChat) {
        setArchivedConnections((prev) => [...prev, selectedChat]);
      }

      setConnections(sortConnectionsByTime(updatedConnections));
    } catch (err) {
      setError('Could not archive chat. Please try again.');
    }
  };

  const deleteChat = async (itemId) => {
    try {
      const response = await fetch(`http://192.168.1.226:8080/api/chats/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete chat: ${response.statusText}`);
      }

      setConnections((prevConnections) =>
        prevConnections.filter((connection) => connection.id !== itemId)
      );
    } catch (err) {
      setError('Could not delete chat. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery !== '') {
        console.log(`Fetching filtered connections for query: ${searchQuery}`);
        await fetchConnections(searchQuery); // Fetch filtered connections
      } else {
        console.log('Fetching all connections');
        await fetchConnections(); // Fetch all connections
      }
    };

    fetchData();
  }, [searchQuery]); // Monitor searchQuery changes


  const renderChatItem = ({ item }) => {
    const renderRightActions = () => (
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity onPress={() => archiveChat(item.id)} style={styles.archiveButton}>
          <Foundation name="archive" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteChat(item.id)} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreOptionsButton}>
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity
          style={[styles.chatItem, { backgroundColor: selectedIds.includes(item.id) ? '#ADD8E6' : '#F9F9F9' }]}
          onPress={() => navigation.navigate('MessageScreen', { chatData: item })}
        >
          {/* Use default placeholder image if `profileImage` isn't in the response */}
          <Image
            source={{ uri: item.profileImage || 'https://via.placeholder.com/150' }}
            style={styles.profilePicture}
          />
          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.chatTime}>{item.phoneNumber || ''}</Text>
            </View>
            <Text style={styles.lastMessage}>{item.email || 'No message available'}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };


  const renderArchivedSection = () => (
    <TouchableOpacity
      style={styles.archiveSection}
      onPress={() =>
        navigation.navigate('ArchivedChats', {
          archivedChats: archivedConnections,
          setArchivedChats: setArchivedConnections,
          setConnections: setConnections,
        })
      }
    >
      <Foundation name="archive" size={20} color="black" />
      <Text style={styles.archiveText}>Archived ({archivedConnections.length})</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Loading chats...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.contentContainer}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.searchContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('GroupSelection')}>
              <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {archivedConnections.length > 0 && renderArchivedSection()}

        <FlatList
          data={connections}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.chatContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* <BottomNavigationBar navigation={navigation} /> */}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingVertical: 40,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  archiveButton: {
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: '100%',
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: '100%',
  },
  moreOptionsButton: {
    backgroundColor: '#757575',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: '100%',
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  archiveSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E0E0E0',
  },
  archiveText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  chatContainer: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  chatTime: {
    fontSize: 12,
    color: '#888',
  },
  lastMessage: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});

export default Chats;
