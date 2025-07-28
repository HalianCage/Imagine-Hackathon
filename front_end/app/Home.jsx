import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Alert, // Added Alert for permission feedback
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import logo from '../assets/images/logoHack.png'; // Assuming logoHack.png is CropCare logo

const Home = () => {
  const router = useRouter();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null); // Keep if needed for other functionalities, though not directly used for display here

  useEffect(() => {
    (async () => {
      // Request gallery permission
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  // Function to pick an image from the gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== "granted") {
      Alert.alert("Permission denied", "Gallery access is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false, // NO CROP
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      router.push({ pathname: "/loading", params: { imageUri: uri } });
    }
  };

  // FOR CAMERA INTEGRATION
  const pickCameraImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.status !== "granted") {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    console.log("Camera result:", result);

    if (!result.canceled) {
      let uri;

      // Safely extract image URI
      if (result.assets && result.assets.length > 0) {
        uri = result.assets[0].uri;
      } else if (result.uri) {
        uri = result.uri;
      }

      console.log("Camera image URI:", uri);

      if (uri) {
        router.push({ pathname: "/loading", params: { imageUri: uri } });
      } else {
        Alert.alert("Error", "Unable to retrieve photo URI from camera.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.header_box}>
          <View style={styles.logoContainer}>
            <Image
              source={logo} // Assuming this is the leaf icon
              style={styles.leafIcon}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.appTitle}>CropCare</Text>
              <Text style={styles.appSubtitle}>Smart Crop Diagnosis</Text>
            </View>
          </View>
          <Pressable onPress={() => router.push("/profile")}>
            <FontAwesome5 name="user-alt" size={24} color="white" style={styles.profileIcon} />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
       

        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Upload Photo</Text>
          <Text style={styles.sectionSubtitle}>Choose how you'd like to capture your crop image</Text>
          <View style={styles.uploadOptions}>
            <Pressable style={styles.uploadCard} onPress={pickCameraImage}>
              <Feather name="camera" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>Camera</Text>
              <Text style={styles.cardSubtitle}>Take a photo now</Text>
            </Pressable>
            <Pressable style={styles.uploadCard} onPress={pickImage}>
              <FontAwesome6 name="images" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>Gallery</Text>
              <Text style={styles.cardSubtitle}>Choose from gallery</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.additionalFeaturesContainer}>
          <Text style={styles.sectionTitle}>Additional Features</Text>
          <View style={styles.featuresGrid}>
            <Pressable style={styles.featureCard} onPress={() => router.push("/progress")}>
              <MaterialIcons name="history" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>Diagnosis History</Text>
              <Text style={styles.cardSubtitle}>View past reports</Text>
            </Pressable>
            <Pressable style={styles.featureCard} onPress={() => router.push("/consultation")}>
              <MaterialIcons name="medical-services" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>Expert Consultation</Text>
              <Text style={styles.cardSubtitle}>Connect with experts</Text>
            </Pressable>
            <Pressable style={styles.featureCard} onPress={() => console.log("Crop Monitoring")}>
              <MaterialIcons name="show-chart" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>Crop Monitoring</Text>
              <Text style={styles.cardSubtitle}>Track crop health</Text>
            </Pressable>
            <Pressable style={styles.featureCard} onPress={() => console.log("Care Reminders")}>
              <MaterialIcons name="access-alarm" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>Care Reminders</Text>
              <Text style={styles.cardSubtitle}>Get timely alerts</Text>
            </Pressable>
          </View>
        </View>

         <View style={styles.introContainer}>
          <Text style={styles.introTitle}>Get Instant Crop Diagnosis with AI</Text>
          <Text style={styles.introText}>
            Upload a photo of your crop to receive an instant diagnosis with
            tailored advice and tips to ensure your plants remain healthy and
            thriving.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <MaterialIcons name="flash-on" size={24} color="#66bb6a" />
            <Text style={styles.featureText}>Instant diagnosis</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="security" size={24} color="#66bb6a" />
            <Text style={styles.featureText}>Expert recommendations</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="local-florist" size={24} color="#66bb6a" />
            <Text style={styles.featureText}>Healthier crops</Text>
          </View>
        </View>
      </ScrollView>
    </View>

    
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f6eaff', // Light gray background
  },
 header: {
  backgroundColor: '#499a6cff',
  height: 90, // Fixed height for header
  paddingHorizontal: 20,
  borderBottomLeftRadius: 2,
  borderBottomRightRadius: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
  justifyContent: 'center', // Vertically center content
},
  header_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
   leafIcon: {
  width: 90,         // Bigger, more visible
  height: 90,
  marginRight: 12,
  marginLeft: -25,
  resizeMode: 'contain',
},

  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  appSubtitle: {
    fontSize: 14,
    color: 'white',
  },
  profileIcon: {
    backgroundColor: '#e0e0e0', // Light gray circle for profile icon
    borderRadius: 20,
    padding: 8,
  },
  scrollViewContent: {
    paddingBottom: 20, // Add some padding at the bottom for scrollable content
  },
  introContainer: {
    padding: 20,
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  uploadSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  uploadCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  additionalFeaturesContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: '45%', // Approx. half width for two columns
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});