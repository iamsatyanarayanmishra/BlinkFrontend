import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar, Switch, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install react-native-vector-icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const License = ({navigation}) => {
  const [toggleValue, setToggleValue] = useState(false);

  const handleToggle = () => {
    setToggleValue(previousValue => !previousValue);
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>License </Text>
        <View style={{ width: 24 }} />
      </View>


    
      <View style={styles.mainContent}>
      <Text style={styles.title}>Copyright © 2023-2024 Blink.</Text>
      <Text style={styles.text}>All rights reserved.</Text>
      <Text style={styles.text}>
        This product contains artwork and code from the following rights holders.
      </Text>
        <View style={styles.divider}></View>
      <View style={styles.section}>
        <Text style={styles.subTitle}>Android Fast Scroll</Text>
        <Text style={styles.text}>Android Gesture Detectors Framework</Text>
        <Text style={styles.text}>Copyrights © 2022. Almer Thie</Text>
        <Text style={styles.text}>All rights reserved</Text>

        <Text style={styles.text}>
          Redistribution and use in source and binary forms, with or without modification, 
          are permitted provided that the following conditions are met.
        </Text>

        <Text style={styles.paragraphText}>
          1. Redistribution of source code must retain the above copyright notice, the list 
          of conditions and the following disclaimer.
        </Text>
        <Text style={styles.paragraphText}>
          2. Redistribution in binary form must reproduce the above copyright notice, this 
          list of conditions and the following disclaimer in the documentation and/or other 
          material provided with the distribution.
        </Text>

        <Text style={styles.disclaimerTitle}>
          THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER AND CONTRIBUTORS "AS IS" AND ANY 
          EXPRESS OR IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR 
          PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE 
          LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
          DAMAGES (INCLUDING BUT NOT LIMITED TO PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
          LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY 
          THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
          NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF 
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        </Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.section}>
        <Text style={styles.subTitle}>Android Image Cropper</Text>
      </View>
      </View>
      
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
    marginTop: Platform.OS === 'ios' ? 0 : 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
  },
  dotsButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#000',
    flex: 1,
    textAlign: 'center',
    // fontWeight: 'bold',
  },
  mainContent:{
    flex: 1,
    backgroundColor: '#F5F6F8', // Light grey background
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
  },
  disclaimerTitle: {
    fontSize: 12,
    lineHeight: 18,
    // color: 'gray',
    marginTop: 16,
  },  
  paragraphText:{
    paddingLeft: 20
  },
  divider:{
    width: '100%',
    height: 1.5,
    backgroundColor: '#e5e5e5',
  }
});

export default License;
