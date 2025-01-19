import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const CornPage = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async (date) => {
    setLoading(true);
    setModalVisible(true);
    try {
      // Backend URL (adjust this as per your setup)
      const response = await axios.post("http://172.22.0.228:3000/", {
        date,
      });
      console.log(res)
      // const result = await response.json();
      setData(response); // Store the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({ error: "Failed to fetch data." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <View style={{ marginLeft: 10 }}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={34} color="black" />
        </Pressable>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Corn</Text>
      </View>

      {/* Date-Time Buttons */}
      <View style={styles.content}>
        <Pressable
          style={styles.dateTimeButton}
          onPress={() => fetchData("2025-01-18")} // Send date as parameter
        >
          <Text style={styles.dateTimeText}>Date Time 1</Text>
          <FontAwesome5 name="file-alt" size={20} color="black" />
        </Pressable>

        <Pressable
          style={styles.dateTimeButton}
          onPress={() => fetchData("2025-01-02")} // Send another date
        >
          <Text style={styles.dateTimeText}>Date Time 2</Text>
          <FontAwesome5 name="file-alt" size={20} color="black" />
        </Pressable>

        <Pressable
          style={styles.dateTimeButton}
          onPress={() => fetchData("2025-01-03")} // Send another date
        >
          <Text style={styles.dateTimeText}>Date Time 3</Text>
          <FontAwesome5 name="file-alt" size={20} color="black" />
        </Pressable>
      </View>

      {/* Modal for Displaying Data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : data?.error ? (
              <Text style={styles.modalText}>{data.error}</Text>
            ) : (
              <Text style={styles.modalText}>
                {data ? JSON.stringify(data, null, 2) : "No data available"}
              </Text>
            )}
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CornPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F6F6" },
  header: {
    backgroundColor: "#DFF4E3",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#1D1D1D" },
  content: { marginTop: 30, paddingHorizontal: 20 },
  dateTimeButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  dateTimeText: { fontSize: 18, fontWeight: "bold", color: "#1D1D1D" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: { fontSize: 16, color: "#333", marginBottom: 20 },
  closeButton: {
    backgroundColor: "#9fbfac",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: { color: "white", fontSize: 14 },
});
