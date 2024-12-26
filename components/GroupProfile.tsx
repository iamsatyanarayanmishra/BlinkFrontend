import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const { width, height } = Dimensions.get('window');

const GroupProfile = ({navigation}) => {
  const members = [
    { id: '1', name: 'Me', role: 'Admin', image: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Jenny', role: '', image: 'https://via.placeholder.com/50' },
  ];

  const renderMember = ({ item }) => (
    <View style={styles.memberContainer}>
      <Image source={{ uri: item.image }} style={styles.memberImage} />
      <Text style={styles.memberName}>{item.name}</Text>
      {item.role === 'Admin' && <Text style={styles.adminBadge}>Admin</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
    <View style={styles.imageContainer}>
        <Image
        source={require('@/assets/images/Default-Image.png')}
        style={styles.image}
        />
        <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                  <Ionicons name="chevron-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.rightIconsContainer}>
                  <TouchableOpacity style={styles.iconButton}>
                    <SimpleLineIcons name="picture" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                  </TouchableOpacity>
                </View>
        </View>
        <View style={styles.bottomRow}>
                <Text style={styles.bottomText}>Group Name</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Entypo name="edit" size={20} color="white" />
                </TouchableOpacity>
        </View>
    </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16}}>
      <TouchableOpacity style={styles.addMembersButton}>
        <Text style={styles.addMembersText}>Add more members</Text>
      </TouchableOpacity>
      <Text style={styles.membersCount}>{members.length} members</Text>
      </View>
      <FlatList
        data={members}
        renderItem={renderMember}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.membersList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    // padding: 16,
    paddingVertical:40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 20,
  },
  menuButton: {
    fontSize: 20,
  },
  groupHeader: {
    alignItems: 'center',
    marginVertical: 16,
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#E6F0FF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupImage: {
    width: 50,
    height: 50,
    tintColor: '#007AFF',
  },
  groupNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  groupName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  editButton: {
    marginLeft: 8,
  },
  addMembersButton: {
    marginTop: 16,
    alignSelf: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
  },
  addMembersText: {
    color: '#007AFF',
  },
  membersCount: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  membersList: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 5
  },
  memberImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  memberName: {
    fontSize: 16,
    flex: 1,
  },
  adminBadge: {
    backgroundColor: '#1F6ED4',
    color: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 12,
  },
  imageContainer: {
    position: 'relative',
    height: height * 0.4, // Set to 40% of the screen height
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    justifyContent: 'space-between',
  },
  rightIconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  bottomRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomText: {
    color: 'black',
    fontSize: 18, // Adjusted font size
    fontWeight: 'bold',
  },
  editButton: {
    padding: 6,
    backgroundColor: '#1F6ED4',
    borderRadius: 5,
  },
});

export default GroupProfile;
