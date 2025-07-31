// progress.jsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,

} from "react-native";
import { useRouter } from "expo-router";

// Import translations and AsyncStorage
import translations from '../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Progress = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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

  const fetchReports = async () => {

    console.log("inside fetchReports function")
    try {
      const response = await fetch("http://172.20.10.3:3000/getReports"); // Replace with your actual backend URL
      const data = await response.json();
      setReports(data.array.reverse()); // Show latest first

      console.log('Data.array: \n',data.array)

    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleTilePress = async (reportId, time_stamp) => {
    
    console.log("Inside handleTilePress")
    console.log("Row Id: ", reportId)
    console.log("Time stamp: ", time_stamp)

    let report;

    try {

      //api fetch to get the specific report
      const response = await fetch(`http://172.20.10.3:3000/getSingleReport/${reportId}`, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const backendResult = await response.json();

      report = backendResult.report

      console.log("Backend API response:", backendResult.report);

    } catch (error) {
      console.error("Some error occured while calling api. Please try again:", error)
    }

    const dummyResult = {
      disease: report.disease,
      symptoms: report.symptoms,
      causes: report.causes,
      treatment: report.treatment,
      prevention: report.prevention,
      generation_datetime: time_stamp,
      advice: report.note
    }

    router.push({
          pathname: "/output",
          params: {
            imageUri: null,
            result: JSON.stringify(dummyResult),
          },
        });

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{translations[currentLanguage].report_title}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#679267" style={{ marginTop: 50 }} />
      ) : reports.length === 0 ? (
        <Text style={styles.reportText}>{translations[currentLanguage].report_not_found}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {reports.map((report, index) => (
            <TouchableOpacity
              key={report.id || index}
              style={styles.tile}
              onPress={() => handleTilePress(report.id, report.time_stamp)}
            >
              <View style={styles.tileLeft}>
                <Text style={styles.disease}>{report.disease_name || "Pending Diagnosis"}</Text>
                <Text style={styles.timestamp}>
                  {new Date(report.time_stamp).toLocaleString()}
                </Text>
              </View>
              <Text style={styles.reportIcon}>📄</Text>

            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9f3",
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2f4f2f",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  tile: {
    flexDirection: "row",
    backgroundColor: "#e0f0dc",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#ccc",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  tileLeft: {
    flex: 1,
    paddingRight: 10,
  },
  disease: {
    fontSize: 18,
    fontWeight: "600",
    color: "#405c3d",
  },
  timestamp: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#d0e0d0",
  },
  noReports: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
});