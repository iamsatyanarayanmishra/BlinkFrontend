import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VerificationLevelsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <StatusBar />
        <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Verification Levels</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
      <Text style={styles.subHeader}>The dots an indicator for a contact’s verification level.</Text>

      {/* Code Triple - Cyan */}
      <View style={styles.card}>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { backgroundColor: 'green' }]} />
          <View style={[styles.dot, { backgroundColor: 'green' }]} />
          <View style={[styles.dot, { backgroundColor: 'green' }]} />
        </View>
        <Text style={styles.title}>Code Triple - Cyan</Text>
        <Text style={styles.description}>
          Contact whose identity and public key you have personally verified by scanning their QR code.
        </Text>
      </View>

      {/* Code Double Yellow */}
      <View style={styles.card}>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { backgroundColor: 'orange' }]} />
          <View style={[styles.dot, { backgroundColor: 'orange' }]} />
          <View style={[styles.dot, { backgroundColor: 'lightgrey' }]} />
        </View>
        <Text style={styles.title}>Code Double Yellow</Text>
        <Text style={styles.description}>
          Contact whose phone number and/or email address is contained in your address book.
        </Text>
      </View>

      {/* Code Single Red */}
      <View style={styles.card}>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { backgroundColor: 'red' }]} />
          <View style={[styles.dot, { backgroundColor: 'lightgrey' }]} />
          <View style={[styles.dot, { backgroundColor: 'lightgrey' }]} />
        </View>
        <Text style={styles.title}>Code Single Red</Text>
        <Text style={styles.description}>
          Unknown contact either this contact did not link a phone number nor an email address to their ID, or your
          address book does not contain these contact details.
        </Text>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  content: {
    padding: 16,
    backgroundColor: '#f5f6fa',
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#E8F4FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    marginRight: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default VerificationLevelsScreen;
