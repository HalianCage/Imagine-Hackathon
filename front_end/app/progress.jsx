// progress.jsx
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  Pressable,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Ensure this is imported if using Expo Router
import logo from '../assets/images/logoHack.png';

const progress = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter(); // Router hook for navigation

  const handleAddButtonPress = () => {
    setModalVisible(true);
  };

  const handleOptionPress = (option) => {
    console.log(option);
    setModalVisible(false);
    if (option === "Weekly") {
      router.push("/uploads"); // Navigates to form.jsx
    }
  };

  return (
    <View style={styles.container}>
      {/* Updated Header */}
      <SafeAreaView style={styles.header}>
        <View style={styles.header_box}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Pressable onPress={() => console.log("Navigate to profile")}>
            <FontAwesome5 name="user-alt" size={45} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Title */}
      <Text style={styles.title}>Progress Tracking</Text>

      {/* Buttons with Logos */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/CornPage")} // Navigate to corn.jsx
        >
          <Image
            source={{ uri: "https://img.icons8.com/color/48/000000/corn.png" }}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Corn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/cotton")} // Navigate to cotton.jsx
        >
          <Image
            source={{ uri: "https://img.icons8.com/color/48/000000/cotton.png" }}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Cotton</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/wheat")} // Navigate to wheat.jsx
        >
          <Image
            source={{ uri: "https://img.icons8.com/color/48/000000/wheat.png" }}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Wheat</Text>
        </TouchableOpacity>
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
        <FontAwesome name="plus" size={24} color="black" />
      </TouchableOpacity>

      {/* Modal for Popup */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeading}>Schedule</Text>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => router.push("uploads")}
            >
              <FontAwesome
                name="calendar"
                size={20}
                color="black"
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Weekly</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionPress("Biweekly")}
            >
              <FontAwesome
                name="calendar-check-o"
                size={20}
                color="black"
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Biweekly</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionPress("Monthly")}
            >
              <FontAwesome
                name="calendar-o"
                size={20}
                color="black"
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Monthly</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f7e6",
    padding: 3,
  },
  header: {
    backgroundColor: "#9fbfac",
    padding: 5,
    marginBottom: 15,
  },
  header_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 85,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b3d9b3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: "#b3d9b3",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 100,
    marginRight: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    width: 150,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});