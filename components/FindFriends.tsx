import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, FlatList, Modal } from 'react-native';
import { GlobalContext } from './GlobalContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';


const FindFriends = ({ navigation, route }) => {
  // const { id, name, email } = route.params;
  // Extract userId from the route params
  const { username } = route.params;

  // Debugging to ensure userId is passed correctly
  const { updateUserData } = useContext(GlobalContext);
  const [number, setNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [isNoButtonPressed, setNoButtonPressed] = useState(false);
  const [error, setError] = useState('');


  const countries = [
    { name: "Afghanistan", flag: "🇦🇫", code: "+93" },
    { name: "Albania", flag: "🇦🇱", code: "+355" },
    { name: "Algeria", flag: "🇩🇿", code: "+213" },
    { name: "Andorra", flag: "🇦🇩", code: "+376" },
    { name: "Angola", flag: "🇦🇴", code: "+244" },
    { name: "Argentina", flag: "🇦🇷", code: "+54" },
    { name: "Armenia", flag: "🇦🇲", code: "+374" },
    { name: "Australia", flag: "🇦🇺", code: "+61" },
    { name: "Austria", flag: "🇦🇹", code: "+43" },
    { name: "Azerbaijan", flag: "🇦🇿", code: "+994" },
    { name: "Bahamas", flag: "🇧🇸", code: "+1-242" },
    { name: "Bahrain", flag: "🇧🇭", code: "+973" },
    { name: "Bangladesh", flag: "🇧🇩", code: "+880" },
    { name: "Barbados", flag: "🇧🇧", code: "+1-246" },
    { name: "Belarus", flag: "🇧🇾", code: "+375" },
    { name: "Belgium", flag: "🇧🇪", code: "+32" },
    { name: "Belize", flag: "🇧🇿", code: "+501" },
    { name: "Benin", flag: "🇧🇯", code: "+229" },
    { name: "Bhutan", flag: "🇧🇹", code: "+975" },
    { name: "Bolivia", flag: "🇧🇴", code: "+591" },
    { name: "Bosnia and Herzegovina", flag: "🇧🇦", code: "+387" },
    { name: "Botswana", flag: "🇧🇼", code: "+267" },
    { name: "Brazil", flag: "🇧🇷", code: "+55" },
    { name: "Brunei", flag: "🇧🇳", code: "+673" },
    { name: "Bulgaria", flag: "🇧🇬", code: "+359" },
    { name: "Burkina Faso", flag: "🇧🇫", code: "+226" },
    { name: "Burundi", flag: "🇧🇮", code: "+257" },
    { name: "Cabo Verde", flag: "🇨🇻", code: "+238" },
    { name: "Cambodia", flag: "🇰🇭", code: "+855" },
    { name: "Cameroon", flag: "🇨🇲", code: "+237" },
    { name: "Canada", flag: "🇨🇦", code: "+1" },
    { name: "Central African Republic", flag: "🇨🇫", code: "+236" },
    { name: "Chad", flag: "🇹🇩", code: "+235" },
    { name: "Chile", flag: "🇨🇱", code: "+56" },
    { name: "China", flag: "🇨🇳", code: "+86" },
    { name: "Colombia", flag: "🇨🇴", code: "+57" },
    { name: "Comoros", flag: "🇰🇲", code: "+269" },
    { name: "Congo", flag: "🇨🇬", code: "+242" },
    { name: "Costa Rica", flag: "🇨🇷", code: "+506" },
    { name: "Croatia", flag: "🇭🇷", code: "+385" },
    { name: "Cuba", flag: "🇨🇺", code: "+53" },
    { name: "Cyprus", flag: "🇨🇾", code: "+357" },
    { name: "Czech Republic", flag: "🇨🇿", code: "+420" },
    { name: "Democratic Republic of the Congo", flag: "🇨🇩", code: "+243" },
    { name: "Denmark", flag: "🇩🇰", code: "+45" },
    { name: "Djibouti", flag: "🇩🇯", code: "+253" },
    { name: "Dominica", flag: "🇩🇲", code: "+1-767" },
    { name: "Dominican Republic", flag: "🇩🇴", code: "+1-809" },
    { name: "East Timor", flag: "🇹🇱", code: "+670" },
    { name: "Ecuador", flag: "🇪🇨", code: "+593" },
    { name: "Egypt", flag: "🇪🇬", code: "+20" },
    { name: "El Salvador", flag: "🇸🇻", code: "+503" },
    { name: "Equatorial Guinea", flag: "🇬🇶", code: "+240" },
    { name: "Eritrea", flag: "🇪🇷", code: "+291" },
    { name: "Estonia", flag: "🇪🇪", code: "+372" },
    { name: "Eswatini", flag: "🇸🇿", code: "+268" },
    { name: "Ethiopia", flag: "🇪🇹", code: "+251" },
    { name: "Fiji", flag: "🇫🇯", code: "+679" },
    { name: "Finland", flag: "🇫🇮", code: "+358" },
    { name: "France", flag: "🇫🇷", code: "+33" },
    { name: "Gabon", flag: "🇬🇦", code: "+241" },
    { name: "Gambia", flag: "🇬🇲", code: "+220" },
    { name: "Georgia", flag: "🇬🇪", code: "+995" },
    { name: "Germany", flag: "🇩🇪", code: "+49" },
    { name: "Ghana", flag: "🇬🇭", code: "+233" },
    { name: "Greece", flag: "🇬🇷", code: "+30" },
    { name: "Grenada", flag: "🇬🇩", code: "+1-473" },
    { name: "Guatemala", flag: "🇬🇹", code: "+502" },
    { name: "Guinea", flag: "🇬🇳", code: "+224" },
    { name: "Guinea-Bissau", flag: "🇬🇼", code: "+245" },
    { name: "Guyana", flag: "🇬🇾", code: "+592" },
    { name: "Haiti", flag: "🇭🇹", code: "+509" },
    { name: "Honduras", flag: "🇭🇳", code: "+504" },
    { name: "Hungary", flag: "🇭🇺", code: "+36" },
    { name: "Iceland", flag: "🇮🇸", code: "+354" },
    { name: "India", flag: "🇮🇳", code: "+91" },
    { name: "Indonesia", flag: "🇮🇩", code: "+62" },
    { name: "Iran", flag: "🇮🇷", code: "+98" },
    { name: "Iraq", flag: "🇮🇶", code: "+964" },
    { name: "Ireland", flag: "🇮🇪", code: "+353" },
    { name: "Israel", flag: "🇮🇱", code: "+972" },
    { name: "Italy", flag: "🇮🇹", code: "+39" },
    { name: "Jamaica", flag: "🇯🇲", code: "+1-876" },
    { name: "Japan", flag: "🇯🇵", code: "+81" },
    { name: "Jordan", flag: "🇯🇴", code: "+962" },
    { name: "Kazakhstan", flag: "🇰🇿", code: "+7" },
    { name: "Kenya", flag: "🇰🇪", code: "+254" },
    { name: "Kiribati", flag: "🇰🇮", code: "+686" },
    { name: "Kuwait", flag: "🇰🇼", code: "+965" },
    { name: "Kyrgyzstan", flag: "🇰🇬", code: "+996" },
    { name: "Laos", flag: "🇱🇦", code: "+856" },
    { name: "Latvia", flag: "🇱🇻", code: "+371" },
    { name: "Lebanon", flag: "🇱🇧", code: "+961" },
    { name: "Lesotho", flag: "🇱🇸", code: "+266" },
    { name: "Liberia", flag: "🇱🇷", code: "+231" },
    { name: "Libya", flag: "🇱🇾", code: "+218" },
    { name: "Liechtenstein", flag: "🇱🇮", code: "+423" },
    { name: "Lithuania", flag: "🇱🇹", code: "+370" },
    { name: "Luxembourg", flag: "🇱🇺", code: "+352" },
    { name: "Madagascar", flag: "🇲🇬", code: "+261" },
    { name: "Malawi", flag: "🇲🇼", code: "+265" },
    { name: "Malaysia", flag: "🇲🇾", code: "+60" },
    { name: "Maldives", flag: "🇲🇻", code: "+960" },
    { name: "Mali", flag: "🇲🇱", code: "+223" },
    { name: "Malta", flag: "🇲🇹", code: "+356" },
    { name: "Marshall Islands", flag: "🇲🇭", code: "+692" },
    { name: "Mauritania", flag: "🇲🇷", code: "+222" },
    { name: "Mauritius", flag: "🇲🇺", code: "+230" },
    { name: "Mexico", flag: "🇲🇽", code: "+52" },
    { name: "Micronesia", flag: "🇫🇲", code: "+691" },
    { name: "Moldova", flag: "🇲🇩", code: "+373" },
    { name: "Monaco", flag: "🇲🇨", code: "+377" },
    { name: "Mongolia", flag: "🇲🇳", code: "+976" },
    { name: "Montenegro", flag: "🇲🇪", code: "+382" },
    { name: "Morocco", flag: "🇲🇦", code: "+212" },
    { name: "Mozambique", flag: "🇲🇿", code: "+258" },
    { name: "Myanmar", flag: "🇲🇲", code: "+95" },
    { name: "Namibia", flag: "🇳🇦", code: "+264" },
    { name: "Nauru", flag: "🇳🇷", code: "+674" },
    { name: "Nepal", flag: "🇳🇵", code: "+977" },
    { name: "Netherlands", flag: "🇳🇱", code: "+31" },
    { name: "New Zealand", flag: "🇳🇿", code: "+64" },
    { name: "Nicaragua", flag: "🇳🇮", code: "+505" },
    { name: "Niger", flag: "🇳🇪", code: "+227" },
    { name: "Nigeria", flag: "🇳🇬", code: "+234" },
    { name: "North Korea", flag: "🇰🇵", code: "+850" },
    { name: "North Macedonia", flag: "🇲🇰", code: "+389" },
    { name: "Norway", flag: "🇳🇴", code: "+47" },
    { name: "Oman", flag: "🇴🇲", code: "+968" },
    { name: "Pakistan", flag: "🇵🇰", code: "+92" },
    { name: "Palau", flag: "🇵🇼", code: "+680" },
    { name: "Panama", flag: "🇵🇦", code: "+507" },
    { name: "Papua New Guinea", flag: "🇵🇬", code: "+675" },
    { name: "Paraguay", flag: "🇵🇾", code: "+595" },
    { name: "Peru", flag: "🇵🇪", code: "+51" },
    { name: "Philippines", flag: "🇵🇭", code: "+63" },
    { name: "Poland", flag: "🇵🇱", code: "+48" },
    { name: "Portugal", flag: "🇵🇹", code: "+351" },
    { name: "Qatar", flag: "🇶🇦", code: "+974" },
    { name: "Romania", flag: "🇷🇴", code: "+40" },
    { name: "Russia", flag: "🇷🇺", code: "+7" },
    { name: "Rwanda", flag: "🇷🇼", code: "+250" },
    { name: "Saint Kitts and Nevis", flag: "🇰🇳", code: "+1-869" },
    { name: "Saint Lucia", flag: "🇱🇨", code: "+1-758" },
    { name: "Saint Vincent and the Grenadines", flag: "🇻🇨", code: "+1-784" },
    { name: "Samoa", flag: "🇼🇸", code: "+685" },
    { name: "San Marino", flag: "🇸🇲", code: "+378" },
    { name: "Sao Tome and Principe", flag: "🇸🇹", code: "+239" },
    { name: "Saudi Arabia", flag: "🇸🇦", code: "+966" },
    { name: "Senegal", flag: "🇸🇳", code: "+221" },
    { name: "Serbia", flag: "🇷🇸", code: "+381" },
    { name: "Seychelles", flag: "🇸🇨", code: "+248" },
    { name: "Sierra Leone", flag: "🇸🇱", code: "+232" },
    { name: "Singapore", flag: "🇸🇬", code: "+65" },
    { name: "Slovakia", flag: "🇸🇰", code: "+421" },
    { name: "Slovenia", flag: "🇸🇮", code: "+386" },
    { name: "Solomon Islands", flag: "🇸🇧", code: "+677" },
    { name: "Somalia", flag: "🇸🇴", code: "+252" },
    { name: "South Africa", flag: "🇿🇦", code: "+27" },
    { name: "South Korea", flag: "🇰🇷", code: "+82" },
    { name: "South Sudan", flag: "🇸🇸", code: "+211" },
    { name: "Spain", flag: "🇪🇸", code: "+34" },
    { name: "Sri Lanka", flag: "🇱🇰", code: "+94" },
    { name: "Sudan", flag: "🇸🇩", code: "+249" },
    { name: "Suriname", flag: "🇸🇷", code: "+597" },
    { name: "Sweden", flag: "🇸🇪", code: "+46" },
    { name: "Switzerland", flag: "🇨🇭", code: "+41" },
    { name: "Syria", flag: "🇸🇾", code: "+963" },
    { name: "Taiwan", flag: "🇹🇼", code: "+886" },
    { name: "Tajikistan", flag: "🇹🇯", code: "+992" },
    { name: "Tanzania", flag: "🇹🇿", code: "+255" },
    { name: "Thailand", flag: "🇹🇭", code: "+66" },
    { name: "Togo", flag: "🇹🇬", code: "+228" },
    { name: "Tonga", flag: "🇹🇴", code: "+676" },
    { name: "Trinidad and Tobago", flag: "🇹🇹", code: "+1-868" },
    { name: "Tunisia", flag: "🇹🇳", code: "+216" },
    { name: "Turkey", flag: "🇹🇷", code: "+90" },
    { name: "Turkmenistan", flag: "🇹🇲", code: "+993" },
    { name: "Tuvalu", flag: "🇹🇻", code: "+688" },
    { name: "Uganda", flag: "🇺🇬", code: "+256" },
    { name: "Ukraine", flag: "🇺🇦", code: "+380" },
    { name: "United Arab Emirates", flag: "🇦🇪", code: "+971" },
    { name: "United Kingdom", flag: "🇬🇧", code: "+44" },
    { name: "United States", flag: "🇺🇸", code: "+1" },
    { name: "Uruguay", flag: "🇺🇾", code: "+598" },
    { name: "Uzbekistan", flag: "🇺🇿", code: "+998" },
    { name: "Vanuatu", flag: "🇻🇺", code: "+678" },
    { name: "Vatican City", flag: "🇻🇦", code: "+379" },
    { name: "Venezuela", flag: "🇻🇪", code: "+58" },
    { name: "Vietnam", flag: "🇻🇳", code: "+84" },
    { name: "Yemen", flag: "🇾🇪", code: "+967" },
    { name: "Zambia", flag: "🇿🇲", code: "+260" },
    { name: "Zimbabwe", flag: "🇿🇼", code: "+263" }
  ];


  const [selectedCountry, setSelectedCountry] = useState({
    name: "India",
    flag: "🇮🇳",
    code: "+91", // Default country code
  });

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownVisible(false); // Close dropdown after selection
  };

  const handleNextButton = async () => {
    if (!username) {
      console.error('User ID is not available');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.1.226:8080/api/users/update-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: username, // Include userId in the request body for reference
          phoneNumber: number,
          countryCode: selectedCountry.code,
        }),
      });
  
      if (response.ok) {
        console.log('Contact updated successfully');
        // Navigate to the FindFriends screen and pass the userId
        updateUserData({ selectedCountry, number, username});
        navigation.navigate('Preferences', { username });
      } else {
        console.error('Failed to update contact');
      }
    } catch (err) {
      console.error('Error updating contact:', err);
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={{ paddingVertical: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={styles.title}>Help your friends find you</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="info" size={22} color="#0073e6" />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          Link your Phone number to Blink ID
        </Text>

        {/* Country Selection Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
            <Text style={{ fontSize: 20 }}>{selectedCountry.flag}</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          <TextInput
            style={styles.input}
            placeholder="Select Country"
            value={selectedCountry.name}
            editable={false} // Disable manual editing of the country name
          />

          <TouchableOpacity onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#3498db" />
          </TouchableOpacity>
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          {/* <Ionicons name="call" size={24} color="#3498db" /> */}

          {/* Display the selected country's code */}
          <Text style={styles.countryCode}>{selectedCountry.code}</Text>

          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="numeric"
            value={number}
            onChangeText={setNumber}
          />
        </View>

        {/* Dropdown for selecting a country (placed outside the inputContainer) */}
        {isDropdownVisible && (
          <View style={styles.dropdown}>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCountrySelect(item)} style={styles.countryItem}>
                  <Text style={{ fontSize: 20 }}>{item.flag}</Text>
                  <Text style={styles.countryName}>{item.name}</Text>
                </TouchableOpacity>
              )}
              style={{ maxHeight: 150 }} // Limit the dropdown height
              scrollEnabled // Ensure scrolling is possible
            />
          </View>
        )}
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNextButton}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Info Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              By providing your phone number, Blink can help your friends find you automatically if they have you in their phone’s address book. You can skip this step to use Blink completely anonymously.
            </Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setSecondModalVisible(true); // Open the second modal
              }}
              style={[styles.wideButton, isButtonPressed ? styles.okayButtonActive : null]}
            >
              <Text style={[styles.okayButtonText, isButtonPressed ? styles.okayButtonTextActive : null]}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Second Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={secondModalVisible}
        onRequestClose={() => setSecondModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.publicKeyValue}>
              Contact sync helps you find your friends automatically. If you agree, phone numbers and email addresses from your phone book will be encrypted before being sent to our server.
            </Text>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', left: 20, }}>
              <TouchableOpacity onPress={() => setSecondModalVisible(false)} style={[styles.noButton, isNoButtonPressed ? styles.noButtonActive : null]}>
                <Text style={[styles.noButtonText, isNoButtonPressed ? styles.noButtonTextActive : null]}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSecondModalVisible(false)}
                style={[styles.fifthOkayButton, isButtonPressed ? styles.okayButtonActive : null]}
              >
                <Text style={[styles.fifthOkayButtonText, isButtonPressed ? styles.okayButtonTextActive : null]}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    paddingVertical: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    // marginBottom: 20,
    color: '#1a3c79',
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 30,
    color: '#606060',
    marginTop: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  divider: {
    width: 2,
    height: '75%',
    backgroundColor: '#e5e5e5',
    marginHorizontal: 15,
  },
  countryCode: {
    fontSize: 14,
    color: 'black',
  },
  dropdown: {
    position: 'absolute',
    top: 205, // Adjust as needed based on inputContainer position
    width: 350,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 10,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  countryName: {
    marginLeft: 20,
    fontSize: 16,
  },
  button: {
    position: 'absolute', // Positioning button at the bottom
    bottom: 50, // Distance from the bottom of the screen
    width: 300,
    height: 50,
    backgroundColor: '#3498db', // Blue button
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Centers the button horizontally
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    alignItems: 'center',
  },
  publicKeyValue: {
    fontSize: 16,
    color: 'black',
    marginBottom: 40,
  },
  okayButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  okayButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  okayButtonActive: {
    backgroundColor: '#1F6ED4',
  },
  okayButtonTextActive: {
    color: '#fff',
  },
  wideButton: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  noButtonActive: {
    backgroundColor: '#1F6ED4',
  },
  noButtonTextActive: {
    color: '#fff',
  },
  fifthOkayButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  fifthOkayButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noButton: {
    bottom: 10,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  noButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FindFriends;
