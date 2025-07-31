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
import axios from 'axios';

const CropMonitoring = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchMonitoringReports = async () => {
    try {
      // Replace this with your actual backend endpoint for monitoring data
      // const response = await axios.get("http://your-backend-api.com/monitoring");
      // setReports(response.data);

      // --- DUMMY DATA for demonstration until backend is ready ---
      const dummyData = [
        { id: 'RPT001', disease_name: 'Corn Leaf Blight', time_stamp: '2025-07-31T12:30:00Z', percentage: 85 },
        { id: 'RPT002', disease_name: 'Tomato Early Blight', time_stamp: '2025-07-30T09:15:00Z', percentage: 60 },
        { id: 'RPT003', disease_name: 'Potato Late Blight', time_stamp: '2025-07-29T18:00:00Z', percentage: 72 },
      ];
      setReports(dummyData.reverse()); // Show latest first
      // --- END OF DUMMY DATA ---

    } catch (error) {
      console.error("Error fetching monitoring reports:", error);
      // It's good practice to show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitoringReports();
  }, []);

  // You can decide what happens when a user presses a tile, e.g., navigate to a detailed view
  const handleTilePress = (report) => {
    console.log("Pressed report:", report);
    // Example: router.push(`/monitoring/${report.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Crop Monitoring</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#679267" style={{ marginTop: 50 }} />
      ) : reports.length === 0 ? (
        <Text style={styles.noReports}>No monitoring data found.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {reports.map((report) => (
            <TouchableOpacity
              key={report.id}
              style={styles.tile}
              onPress={() => handleTilePress(report)}
            >
              <View style={styles.tileLeft}>
                <Text style={styles.reportId}>ID: {report.id}</Text>
                <Text style={styles.disease}>{report.disease_name}</Text>
                <Text style={styles.timestamp}>
                  {new Date(report.time_stamp).toLocaleString()}
                </Text>
              </View>
              <View style={styles.tileRight}>
                 <Text style={styles.percentageLabel}>Severity</Text>
                 <Text style={styles.percentageValue}>{report.percentage}%</Text>
              </View>
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
    padding: 20,
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
  reportId: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  disease: {
    fontSize: 18,
    fontWeight: "600",
    color: "#405c3d",
  },
  timestamp: {
    fontSize: 13,
    color: "#777",
    marginTop: 5,
  },
  tileRight: {
      alignItems: 'center',
      justifyContent: 'center'
  },
  percentageLabel: {
      fontSize: 14,
      color: '#666'
  },
  percentageValue: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#2f4f2f'
  },
  noReports: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
});