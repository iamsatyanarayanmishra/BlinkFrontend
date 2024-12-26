import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import Header from './Header';
import BottomNavigationBar from './BottomNavigationBar';

const { width, height } = Dimensions.get('window');
const scaleSize = size => (width / 375) * size;

const contactsList = [
  { id: '1', name: 'Jane Doe', phone: '(603) 555-0123', idCode: 'EBKSJ67SKS', image: require('@/assets/images/Avatar3.jpg') },
  { id: '2', name: 'Jane Doe', phone: '(603) 555-0123', idCode: 'EBKSJ67SKS', image: require('@/assets/images/Avatar3.jpg') },
  { id: '3', name: 'Leslie Alexander', phone: '(684) 555-0102', idCode: 'EBKSJ67SKS', image: require('@/assets/images/Avatar3.jpg') },
  { id: '4', name: 'Nguyen, Shane', phone: '(702) 555-0122', idCode: 'EBKSJ67SKS', image: require('@/assets/images/Avatar3.jpg') },
  { id: '5', name: 'Bessie', phone: '(229) 555-0109', idCode: 'EBKSJ67SKS', image: require('@/assets/images/Avatar3.jpg') },
  { id: '6', name: 'Pásztor Kíra', phone: '(239) 555-0108', idCode: 'EBKSJ67SKS', image: require('@/assets/images/Avatar3.jpg') },
  { id: '7', name: 'Cooper Kristin', phone: '(907) 555-0101', idCode: 'EBKSJ67SKS', image: require('@/assets/images/Avatar3.jpg') },
];

const Contacts = ({navigation}) => {
  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Image source={ item.image } style={styles.avatar} />
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.idCode}>{item.idCode}</Text>
      </View>
      <Text style={styles.phone}>{item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#f5f5f5'}/>
        <Header />
      <View >
        <TouchableOpacity style={styles.header}>
        <Feather name="share-2" size={24} color="#007aff" />
        <Text style={styles.headerText}>Invite a Friend</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contactsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton}>
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
      {/* <BottomNavigationBar /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingVertical:scaleSize(40),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    color: '#007aff',
    fontSize: 16,
    marginLeft: 8,
  },
  list: {
    paddingHorizontal: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  idCode: {
    fontSize: 14,
    color: '#666',
  },
  phone: {
    fontSize: 14,
    color: '#007aff',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Contacts;
