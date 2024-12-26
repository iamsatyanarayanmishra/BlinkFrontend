import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const GroupSelection = ({ navigation }) => {
  const [sections, setSections] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSections, setFilteredSections] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const chatData = [
    {
      id: '1',
      name: 'Jane Doe',
      message: 'Physiological respiration involves the...',
      time: '12:03 AM',
      status: 'online',
      badge: 12,
      image: require('@/assets/images/Avatar.jpg'),
    },
    {
      id: '2',
      name: 'Annette Black',
      message: 'Hey! I\'m using Blink',
      time: '08:34 AM',
      status: 'online',
      badge: null,
      image: require('@/assets/images/Avatar2.jpg'),
    },
    {
      id: '3',
      name: 'Leslie Alexander',
      message: 'Can you please come to tomorrow’s...',
      time: '08:34 AM',
      status: 'online',
      badge: null,
      image: require('@/assets/images/Avatar3.jpg'),
    },
    {
      id: '4',
      name: 'Jerome Bell',
      message: "Sorry I won't be available tomorrow.",
      time: 'Yesterday',
      status: 'offline',
      badge: null,
      image: require('@/assets/images/Default-Image.png'),
    },
    {
      id: '5',
      name: 'Devon Lane',
      message: "Hey, what's the update on that project?",
      time: 'Yesterday',
      status: 'offline',
      badge: 5,
      image: require('@/assets/images/Avatar4.jpg'),
    },
    {
      id: '6',
      name: 'Cody Fisher',
      message: 'Can you please come to tomorrow’s...',
      time: 'Yesterday',
      status: 'error',
      badge: null,
      image: require('@/assets/images/Avatar4.jpg'),
    },
  ];

  useEffect(() => {
    const groupedData = chatData.reduce((acc, chat) => {
      const firstLetter = chat.name.charAt(0).toUpperCase();
      const section = acc.find((item) => item.title === firstLetter);

      if (section) {
        section.data.push(chat);
      } else {
        acc.push({ title: firstLetter, data: [chat] });
      }
      return acc;
    }, []);

    const sortedSections = groupedData
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((section) => ({
        ...section,
        data: section.data.sort((a, b) => a.name.localeCompare(b.name)),
      }));

    setSections(sortedSections);
    setFilteredSections(sortedSections);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredSections(sections);
    } else {
      const filtered = sections
        .map((section) => ({
          title: section.title,
          data: section.data.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter((section) => section.data.length > 0);

      setFilteredSections(filtered);
    }
  };

  const handleLongPress = (item) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(item.id)) {
      newSelectedItems.delete(item.id);
    } else {
      newSelectedItems.add(item.id);
    }
    setSelectedItems(newSelectedItems);
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      style={[
        styles.chatItem,
        selectedItems.has(item.id) && styles.selectedItem,
      ]}
    >
      <View style={styles.profileImage}>
        <Image source={item.image} style={styles.image} />
        {item.status === 'online' && <View style={styles.onlineDot} />}
        {item.status === 'error' && <View style={styles.errorDot} />}
      </View>
      <View style={styles.chatDetails}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatMessage}>
          <Text
            style={[
              styles.messageText,
              item.message === 'typing...' && styles.typingStyle,
            ]}
            numberOfLines={1}
          >
            {item.message}
          </Text>
          {item.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.searchContainer}>
          <TouchableOpacity >
            <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search members..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <Text style={styles.title}>Select Members to Add in Group</Text>
      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        renderSectionHeader={renderSectionHeader}
      />
      {selectedItems.size > 0 && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('GroupProfile')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <FontAwesome6 name="arrow-right-long" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  title: {
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 10,
    color: '#1F6ED4'
  },
  sectionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#D8E8FF',
  },
  profileImage: {
    position: 'relative',
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00ff00',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  errorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  chatDetails: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatTime: {
    fontSize: 12,
    color: '#888',
  },
  chatMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 14,
    color: '#555',
  },
  typingStyle: {
    fontStyle: 'italic',
    color: '#888',
  },
  badge: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
  },
  continueButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1F6ED4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GroupSelection;
