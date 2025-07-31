import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from '../translations';
import { MaterialIcons } from '@expo/vector-icons';

const CropMonitoring = () => {
  const [groupedReports, setGroupedReports] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load language preference
        const savedLang = await AsyncStorage.getItem('appLanguage');
        if (savedLang) {
          setCurrentLanguage(savedLang);
        }
        
        // --- 1. FETCH DATA FROM BACKEND ---
        // Using the IP from your other files. Replace if needed.
        const response = await fetch("http://10.255.30.84:3000/get-monitoring-reports");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allReports = await response.json();

        // --- 2. PROCESS AND GROUP THE DATA ---
        const reportMap = new Map();
        allReports.forEach(report => {
          const { disease_name } = report;
          if (!reportMap.has(disease_name)) {
            reportMap.set(disease_name, []);
          }
          reportMap.get(disease_name).push(report);
        });
        
        setGroupedReports(reportMap);

      } catch (error) {
        console.error("Error fetching or processing monitoring reports:", error);
        Alert.alert("Error", "Failed to load monitoring data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTilePress = (diseaseName) => {
    // --- 3. PASS THE FILTERED DATA TO THE DETAIL SCREEN ---
    const reportsForDisease = groupedReports.get(diseaseName);
    router.push({
        pathname: `/MonitoringDetail/${diseaseName}`,
        params: {
            // Pass the array of reports as a string
            reports: JSON.stringify(reportsForDisease)
        }
    });
  };

  const diseaseNames = Array.from(groupedReports.keys());

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{translations[currentLanguage].crop_monitoring_title}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#679267" style={{ marginTop: 50 }} />
      ) : diseaseNames.length === 0 ? (
        <Text style={styles.noReports}>{translations[currentLanguage].monitoring_data_not_found}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {diseaseNames.map((diseaseName) => (
            <TouchableOpacity
              key={diseaseName}
              style={styles.tile}
              onPress={() => handleTilePress(diseaseName)}
            >
              <MaterialIcons name="bug-report" size={24} color="#405c3d" />
              <Text style={styles.disease}>{diseaseName}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#777" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CropMonitoring;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9f3",
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2f4f2f",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tile: {
    flexDirection: "row",
    backgroundColor: "#e0f0dc",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#ccc",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  disease: {
    fontSize: 18,
    fontWeight: "600",
    color: "#405c3d",
    flex: 1,
    marginLeft: 15,
  },
  noReports: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
});