import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Import translations and AsyncStorage
import translations from '../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConsultancyPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Default to English

  useEffect(() => {
    // Load saved language preference
    (async () => {
      const savedLang = await AsyncStorage.getItem('appLanguage');
      if (savedLang) {
        setCurrentLanguage(savedLang);
      }
    })();
  }, []); // Empty dependency array means this runs once on mount

  const handleSubmit = () => {
    Alert.alert(translations[currentLanguage].submitted_alert_title, translations[currentLanguage].submitted_alert_message);
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <MaterialIcons name="menu" size={30} color="white" />
        {/* <Text style={styles.logo}>MyLogo</Text> */}
        <MaterialIcons name="account-circle" size={30} color="white" />
      </View>

      {/* Schedule Consultancy Box */}
      <View style={styles.scheduleBox}>
        <Text style={styles.scheduleText}>{translations[currentLanguage].schedule_consultancy_box}</Text>
      </View>

      {/* Expert Care Text */}
      <Text style={styles.expertText}>{translations[currentLanguage].expert_care_text}</Text>

      {/* Date Section */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{translations[currentLanguage].select_date_button}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={translations[currentLanguage].pick_date_placeholder}
          placeholderTextColor="#666" // Good practice to set placeholder color
          value={selectedDate}
          onChangeText={setSelectedDate}
        />
      </View>

      {/* Time Section */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{translations[currentLanguage].select_time_button}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={translations[currentLanguage].pick_time_placeholder}
          placeholderTextColor="#666" // Good practice to set placeholder color
          value={selectedTime}
          onChangeText={setSelectedTime}
        />
      </View>

      {/* Share Report (Not clickable) */}
      <View style={styles.reportContainer}>
        <Text style={styles.reportText}>{translations[currentLanguage].share_report_text}</Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{translations[currentLanguage].submit_button}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#effff5',
    padding: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#9fbfac',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scheduleBox: {
    backgroundColor: '#9fbfac',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  scheduleText: {
    fontSize: 18,
    color: 'white',
  },
  expertText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: '#4d4d4d',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#9fbfac',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#9fbfac',
    padding: 10,
    borderRadius: 20,
  },
  reportContainer: {
    backgroundColor: '#d1f7d6',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  reportText: {
    color: '#4d4d4d',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#9fbfac',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
});