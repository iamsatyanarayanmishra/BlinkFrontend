import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StarredMessagesScreen = () => {
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{flex:1, flexDirection: 'row'}}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#6E6E6E" />
        </TouchableOpacity>
            <TextInput 
            placeholder={'Starred messages'}
            style={styles.headerText} />
        <TouchableOpacity>
            <Icon name="search" size={24} color="#6E6E6E" style={styles.searchIcon} />
        </TouchableOpacity>
        </View>
        <TouchableOpacity>
            <Icon name="filter-list" size={24} color="#6E6E6E" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.starsContainer}>
          <Icon name="star" size={40} color="#4A90E2" style={styles.mainStar} />
          <Icon name="star" size={30} color="#A1C3F1" style={styles.leftStar} />
          <Icon name="star" size={20} color="#A1C3F1" style={styles.rightStar} />
        </View>
        <Text style={styles.messageText}>
          No starred message found. To star a message, long tap on it and select the star button
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FA',
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    paddingHorizontal: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6E6E6E',
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  filterIcon: {
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainStar: {
    marginHorizontal: 10,
  },
  leftStar: {
    marginHorizontal: 10,
    // transform: [{ scale: 0.5 }],
  },
  rightStar: {
    marginHorizontal: 10,
    // transform: [{ scale: 0.5 }],
  },
  messageText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#8C8C8C',
  },
});

export default StarredMessagesScreen;
