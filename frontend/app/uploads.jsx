import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  FlatList,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, Feather, FontAwesome6, FontAwesome5 } from "@expo/vector-icons";

const Home = () => {
  const router = useRouter();

  // State variables for selected options
  const [selectedPlantStage, setSelectedPlantStage] = useState("");
  const [selectedFertilizer, setSelectedFertilizer] = useState("");
  const [selectedWater, setSelectedWater] = useState("");

  // Modal control states
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSelection, setCurrentSelection] = useState("");

  // Options for each selection
  const plantStageOptions = ["Seedling", "Juvenile", "Adult"];
  const fertilizerOptions = ["Organic", "None", "Chemical"];
  const waterOptions = ["0.5", "1.0", "1.5"];

  // Image selection state
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  // Request for gallery permissions
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // Camera integration
  const pickCameraImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.status !== "granted") {
      Alert.alert("Not have access to camera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleOptionSelect = (type, value) => {
    if (type === "PlantStage") setSelectedPlantStage(value);
    else if (type === "Fertilizer") setSelectedFertilizer(value);
    else if (type === "Water") setSelectedWater(value);

    setModalVisible(false);
  };

  const openModal = (type) => {
    setCurrentSelection(type);
    setModalVisible(true);
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to gallery</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <View style={styles.header_box}>
          <Image
            source={require("@/assets/images/logoHack.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Pressable onPress={() => router.push("/profile")}>
            <FontAwesome5 name="user-alt" size={45} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Upload Photo */}
        <View style={styles.uploadContainer}>
          <MaterialIcons name="cloud-upload" size={120} color="black" />
          <Text style={styles.uploadText}>Upload Photo</Text>
          <View style={styles.uploadIcons}>
            <Pressable onPress={pickCameraImage}>
              <Feather name="camera" size={28} color="black" />
            </Pressable>
            <View style={{ width: 40 }}></View>
            <Pressable onPress={pickImage}>
              <FontAwesome6 name="images" size={28} color="black" />
            </Pressable>
          </View>
        </View>

        {/* Plant Stage */}
        <View style={styles.optionContainer}>
          <Pressable
            style={styles.optionButton}
            onPress={() => openModal("PlantStage")}
          >
            <Text style={styles.optionText}>Plant Stage</Text>
          </Pressable>
          <View style={styles.selectedBox}>
            <Text style={styles.selectedText}>
              {selectedPlantStage || "No Selection"}
            </Text>
          </View>
        </View>

        {/* Fertilizer Type */}
        <View style={styles.optionContainer}>
          <Pressable
            style={styles.optionButton}
            onPress={() => openModal("Fertilizer")}
          >
            <Text style={styles.optionText}>Fertilizer Type</Text>
          </Pressable>
          <View style={styles.selectedBox}>
            <Text style={styles.selectedText}>
              {selectedFertilizer || "No Selection"}
            </Text>
          </View>
        </View>

        {/* Water */}
        <View style={styles.optionContainer}>
          <Pressable
            style={styles.optionButton}
            onPress={() => openModal("Water")}
          >
            <Text style={styles.optionText}>Water</Text>
          </Pressable>
          <View style={styles.selectedBox}>
            <Text style={styles.selectedText}>
              {selectedWater || "No Selection"}
            </Text>
          </View>
        </View>

        {/* Submit Button */}
        <Pressable
          style={styles.submitButton}
          onPress={() => Alert.alert("Submitted", "Your selections are noted!")}
        >
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </ScrollView>

      {/* Modal for Options */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select an Option</Text>
            <FlatList
              data={
                currentSelection === "PlantStage"
                  ? plantStageOptions
                  : currentSelection === "Fertilizer"
                  ? fertilizerOptions
                  : waterOptions
              }
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalOption}
                  onPress={() => handleOptionSelect(currentSelection, item)}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </Pressable>
              )}
            />
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#9fbfac",
    height: 85,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  header_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 100,
    height: 200,
    
  },
  container: {
    paddingTop: 120,  // Adjusted for the header position
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  optionContainer: {
    marginVertical: 20,
    alignItems: "center",
    width: "100%",
  },
  optionButton: {
    backgroundColor: "#9fbfac",
    padding: 15,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
  optionText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  selectedBox: {
    marginTop: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  selectedText: {
    color: "#1D1D1D",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: "#1D1D1D",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    width: "60%",
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#1D1D1D",
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: "#9fbfac",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
  },
  modalCloseText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  uploadContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  uploadText: {
    fontSize: 18,
    color: "#1D1D1D",
    marginTop: 10,
  },
  uploadIcons: {
    flexDirection: "row",
    marginTop: 10,
  },
});
