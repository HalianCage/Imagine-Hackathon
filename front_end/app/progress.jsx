// progress.jsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const Progress = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReports = async () => {

    console.log("inside fetchReports function")
    try {
      const response = await fetch("http://192.168.1.2:3000/getReports"); // Replace with your actual backend URL
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

  const handleTilePress = (reportId) => {
    router.push(`/report/${reportId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📈 Progress Tracker</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#679267" style={{ marginTop: 50 }} />
      ) : reports.length === 0 ? (
        <Text style={styles.noReports}>No reports found. Please upload your first diagnosis.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {reports.map((report, index) => (
            <TouchableOpacity
              key={report.id || index}
              style={styles.tile}
              onPress={() => handleTilePress(report.id)}
            >
              <View style={styles.tileLeft}>
                <Text style={styles.disease}>{report.disease_name || "Pending Diagnosis"}</Text>
                <Text style={styles.timestamp}>
                  {new Date(report.time_stamp).toLocaleString()}
                </Text>
              </View>
              <Image
                source={{ uri: report.imageUri }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
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