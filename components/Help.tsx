import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Help = ({ navigation }) => {

    const [searchQuery, setSearchQuery] = useState('');
  // Sample FAQ data
  const faqData = [
    {
      category: 'App Informative',
      questions: [
        'What do the symbols next to a message mean?',
        'How do I use Blink on desktop computer?',
        'Why are some of my friends missing on my Blink contact list?',
        'How can I reinstall Blink without paying again?',
        'Why are incoming messages sometimes delayed or only arrive once I open the app?',
      ],
    },
    {
      category: 'General Queries',
      questions: [
        'What do the symbols next to a message mean?',
        'How do I use Blink on desktop computer?',
        'Why are some of my friends missing on my Blink contact list?',
      ],
    },
  ];

  const filteredFaqData = faqData.map(section => ({
    ...section,
    questions: section.questions.filter(question =>
      question.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })); 


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help</Text>
        <View style={{ width: 24 }} />
      </View>

    

      <ScrollView style={styles.mainContent}>
        {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search FAQs"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View> 
        {/* FAQ Section */}
        {faqData.map((section, index) => (
          <View key={index}>
            {/* Category Title */}
            <Text style={styles.categoryTitle}>{section.category}</Text>

            {/* Questions List */}
            {section.questions.map((question, qIndex) => (
              <TouchableOpacity key={qIndex} style={styles.questionContainer}>
                <Text style={styles.questionText}>{question}</Text>
                <Icon name="chevron-right" size={24} color="#aaa" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#Fff', // Light grey background for the search bar
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 1,
    // marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F5F6F8', // Light grey background
    padding: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 20,
    marginBottom: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    
  },
  questionText: {
    fontSize: 14,
    color: '#333',
    width: 290
  },
});

export default Help;
