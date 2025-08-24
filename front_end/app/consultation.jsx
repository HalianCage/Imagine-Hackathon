import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Linking
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import translations from '../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConsultancyPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [uploadedReport, setUploadedReport] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [scheduledConsultancies, setScheduledConsultancies] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    (async () => {
      const savedLang = await AsyncStorage.getItem('appLanguage');
      if (savedLang) setCurrentLanguage(savedLang);
    })();
  }, []);

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !uploadedReport) {
      Alert.alert("Error", "Please select date, time and upload a report before submitting.");
      return;
    }

    const newEntry = {
      date: selectedDate,
      time: selectedTime,
      report: uploadedReport,
    };

    setConsultations([...consultations, newEntry]);
    setScheduledConsultancies([...scheduledConsultancies, newEntry]);

    Alert.alert(
      translations[currentLanguage].submitted_alert_title,
      translations[currentLanguage].submitted_alert_message
    );

    setSelectedDate('');
    setSelectedTime('');
    setUploadedReport(null);
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result?.assets?.length > 0) {
        const file = result.assets[0];
        setUploadedReport({ name: file.name, uri: file.uri });
      } else if (result.type === 'success') {
        setUploadedReport(result);
      }
    } catch (error) {
      Alert.alert("Error uploading file", error.message);
    }
  };

  const onDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      const dateStr = selected.toLocaleDateString();
      setSelectedDate(dateStr);
    }
  };

  const onTimeChange = (event, selected) => {
    setShowTimePicker(false);
    if (selected) {
      const timeStr = selected.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSelectedTime(timeStr);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navbar}>
        <MaterialIcons name="menu" size={30} color="white" />
        <MaterialIcons name="account-circle" size={30} color="white" />
      </View>

      <View style={styles.scheduleBox}>
        <Text style={styles.scheduleText}>{translations[currentLanguage].schedule_consultancy_box}</Text>
      </View>

      <Text style={styles.expertText}>{translations[currentLanguage].expert_care_text}</Text>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>{translations[currentLanguage].select_date_button}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={translations[currentLanguage].pick_date_placeholder}
          placeholderTextColor="#666"
          value={selectedDate}
          editable={false}
        />
      </View>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.buttonText}>{translations[currentLanguage].select_time_button}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={translations[currentLanguage].pick_time_placeholder}
          placeholderTextColor="#666"
          value={selectedTime}
          editable={false}
        />
      </View>

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}

      <TouchableOpacity style={styles.reportContainer} onPress={handleUpload}>
        <Text style={styles.reportText}>
          {uploadedReport ? uploadedReport.name : translations[currentLanguage].share_report_text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{translations[currentLanguage].submit_button}</Text>
      </TouchableOpacity>

      {scheduledConsultancies.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>
            Scheduled Consultancies
          </Text>
          {scheduledConsultancies.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#ffffff',
                padding: 16,
                borderRadius: 10,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#9fbfac',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#000' }}>
                Scheduled at: {item.date} at {item.time}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (item.report?.uri) {
                    Linking.openURL(item.report.uri);
                  } else {
                    Alert.alert('No report found.');
                  }
                }}
                style={{
                  backgroundColor: '#6DBF97',
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                  alignSelf: 'flex-start',
                  marginTop: 8,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 14 }}>View Report</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#effff5',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#9fbfac',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
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
    backgroundColor: '#fff',
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
    marginBottom: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
});