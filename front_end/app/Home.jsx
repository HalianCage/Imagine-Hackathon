import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import logo from '../assets/images/logoHack.png';

const Home = () => {
  const router = useRouter();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
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


   //FOR CAMERA INTEGRATION
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

  console.log("Camera result:", result); // ✅ Debug log

  if (!result.canceled) {
    let uri;

    // Safely extract image URI
    if (result.assets && result.assets.length > 0) {
      uri = result.assets[0].uri;
    } else if (result.uri) {
      uri = result.uri;
    }

    console.log("Camera image URI:", uri); // ✅ Confirm URI

    if (uri) {
      router.push({ pathname: "/loading", params: { imageUri: uri } });
    } else {
      Alert.alert("Error", "Unable to retrieve photo URI from camera.");
    }
  }
};





  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={styles.header}>
        <View style={styles.header_box}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Pressable onPress={() => router.push("/profile")}>
            <FontAwesome5 name="user-alt" size={45} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingTop: 85 }}>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            Upload a photo of your crop to receive an instant diagnosis with
            tailored advice and tips to ensure your plants remain healthy and
            thriving.
          </Text>
        </View>

        <View style={styles.uploadWrapper}>
  <Text style={styles.uploadText}>Upload Photo</Text>
  <View style={styles.uploadRow}>
    {/* Camera Block */}
    <View style={styles.uploadBlock}>
      <Pressable onPress={pickCameraImage} style={styles.iconButton}>
        <Feather name="camera" size={28} color="black" />
        <Text style={styles.blockLabel}>Camera</Text>
      </Pressable>
    </View>

    {/* Gallery Block */}
    <View style={styles.uploadBlock}>
      <Pressable onPress={pickImage} style={styles.iconButton}>
        <FontAwesome6 name="images" size={28} color="black" />
        <Text style={styles.blockLabel}>Gallery</Text>
      </Pressable>
    </View>
  </View>
</View>


        <View style={styles.actionButtonContainer}>
        <Pressable
  style={styles.actionButton}
  onPress={() => router.push("/progress")} // Navigate to the progress.jsx file
>
  <Fontisto name="clock" size={54} color="white" />
</Pressable>

<Pressable
  style={styles.actionButton}
  onPress={() => router.push("/consultation")} // Navigate to consultation.jsx
>
  <Fontisto name="doctor" size={54} color="white" />
</Pressable>
        </View>

        <View style={styles.ecommerceContainer}>
        <Pressable
  style={styles.actionButton}
  onPress={() => router.push("/ecomm")} // Navigate to ecomm.jsx
>
  <Fontisto name="shopping-bag" size={54} color="white" />
</Pressable>

        </View>
      </ScrollView>
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
  textContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
  },
  mainText: {
    fontSize: 16,
    color: "#1D1D1D",
    fontWeight: "500",
    textAlign: "center",
  },
  uploadWrapper: {
  marginTop: 30,
  padding: 20,
  alignItems: "center",
},

uploadText: {
  textAlign: "center",
  color: "black",
  fontWeight: "500",
  marginBottom: 20,
  fontSize: 16,
},

uploadRow: {
  flexDirection: "row",
  justifyContent: "space-around",
  width: "100%",
},

uploadBlock: {
  backgroundColor: "#9fbfac",
  borderRadius: 20,
  paddingVertical: 30,
  paddingHorizontal: 25,
  width: "40%",
  alignItems: "center",
},

iconButton: {
  alignItems: "center",
},

blockLabel: {
  marginTop: 8,
  fontSize: 14,
  fontWeight: "500",
  color: "#1D1D1D",
},

  uploadIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 50,
  },
  ecommerceContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: "#9fbfac",
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});