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

  if (hasGalleryPermission === false) {
    return <Text>No access to gallery</Text>;
  }

   //FOR CAMERA INTEGRATION
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
  
      if(!result.canceled){
        setImage(result.uri);
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

        <View style={styles.uploadContainer}>
          <MaterialIcons name="cloud-upload" size={120} color="black" />
          <Text style={styles.uploadText}>Upload Photo</Text>
          <View style={styles.uploadIcons}>
          <Pressable onPress={pickCameraImage}>
          <Feather name="camera" size={28} color="black" />
          </Pressable>
          <View style={{width: 40}}> </View>
            <Pressable onPress={pickImage}>
              <FontAwesome6 name="images" size={28} color="black" />
            </Pressable>
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
  uploadContainer: {
    backgroundColor: "#9fbfac",        //ADJUST THE SPACE BETWEEN THE ICONS
    marginTop: 30,
    padding: 20,
    borderRadius: 40,
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
  },
  uploadText: {
    textAlign: "center",
    color: "black",
    fontWeight: "500",
    marginTop: 10,
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