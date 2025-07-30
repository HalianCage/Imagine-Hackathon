import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import logo from '../assets/images/logoHack.png';

import translations from '../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationContext } from "../context/LocationContext";

const Home = () => {
  const router = useRouter();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  const location = useContext(LocationContext);

  useEffect(() => {
    (async () => {
      const savedLang = await AsyncStorage.getItem('appLanguage');
      if (savedLang) {
        setCurrentLanguage(savedLang);
      }
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");

      const imageDir = FileSystem.documentDirectory + 'images/';
      const dirInfo = await FileSystem.getInfoAsync(imageDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imageDir, { intermediates: true });
      }
    })();
  }, []);

  useEffect(() => {
    if (image) {
      router.push({
        pathname: "/loading",
        params: {
          imageUri: image,
          selectedLanguage: currentLanguage,
          location: JSON.stringify(location || {})
        }
      });
      setImage(null);
    }
  }, [image]);

  const setAppLanguage = async (lang) => {
    setCurrentLanguage(lang);
    await AsyncStorage.setItem('appLanguage', lang);
  };

  const handleImagePick = async (pickerFunction) => {
    try {
      const result = await pickerFunction({
        // FIX: Reverted to using a string literal for mediaTypes.
        // This is more compatible across different expo-image-picker versions
        // and should prevent the 'cannot read property' crash.
        mediaTypes: 'Images',
        allowsEditing: false,
        quality: 1,
      });

      console.log("Image picker result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const tempUri = result.assets[0].uri;
        const filename = tempUri.split('/').pop();
        const newUri = FileSystem.documentDirectory + 'images/' + filename;
        
        // To prevent "file already exists" error, check and delete if needed
        const existingFile = await FileSystem.getInfoAsync(newUri);
        if (existingFile.exists) {
            await FileSystem.deleteAsync(newUri);
        }

        await FileSystem.moveAsync({
          from: tempUri,
          to: newUri,
        });
        console.log("Saved image to permanent URI:", newUri);
        setImage(newUri);
      } else {
        console.log("Image selection was canceled or failed");
      }
    } catch (error) {
      console.error("Error in pickImage:", error);
      Alert.alert("Error", "Failed to pick image: " + error.message);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== "granted") {
      Alert.alert(translations[currentLanguage].permission_denied_gallery, translations[currentLanguage].permission_denied_gallery_message);
      return;
    }
    console.log("Starting gallery picker...");
    await handleImagePick(ImagePicker.launchImageLibraryAsync);
  };

  const pickCameraImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.status !== "granted") {
      Alert.alert(translations[currentLanguage].permission_denied_camera, translations[currentLanguage].permission_denied_camera_message);
      return;
    }
    console.log("Starting camera...");
    await handleImagePick(ImagePicker.launchCameraAsync);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.header_box}>
          <View style={styles.logoContainer}>
            <Image
              source={logo}
              style={styles.leafIcon}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.appTitle}>{translations[currentLanguage].app_title}</Text>
              <Text style={styles.appSubtitle}>{translations[currentLanguage].app_subtitle}</Text>
            </View>
          </View>
          <Pressable onPress={() => router.push("/profile")}>
            <FontAwesome5 name="user-alt" size={24} color="white" style={styles.profileIcon} />
          </Pressable>
        </View>
      </SafeAreaView>

      <View style={styles.languageSelector}>
        <Pressable onPress={() => setAppLanguage('en')} style={[styles.langButton, currentLanguage === 'en' && styles.activeLangButton]}>
          <Text style={styles.langButtonText}>English</Text>
        </Pressable>
        <Pressable onPress={() => setAppLanguage('hi')} style={[styles.langButton, currentLanguage === 'hi' && styles.activeLangButton]}>
          <Text style={styles.langButtonText}>हिंदी</Text>
        </Pressable>
        <Pressable onPress={() => setAppLanguage('mr')} style={[styles.langButton, currentLanguage === 'mr' && styles.activeLangButton]}>
          <Text style={styles.langButtonText}>मराठी</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>{translations[currentLanguage].upload_section_title}</Text>
          <Text style={styles.sectionSubtitle}>{translations[currentLanguage].upload_section_subtitle}</Text>
          <View style={styles.uploadOptions}>
            <Pressable style={styles.uploadCard} onPress={pickCameraImage}>
              <Feather name="camera" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>{translations[currentLanguage].camera_card_title}</Text>
              <Text style={styles.cardSubtitle}>{translations[currentLanguage].camera_card_subtitle}</Text>
            </Pressable>
            <Pressable style={styles.uploadCard} onPress={pickImage}>
              <FontAwesome6 name="images" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>{translations[currentLanguage].gallery_card_title}</Text>
              <Text style={styles.cardSubtitle}>{translations[currentLanguage].gallery_card_subtitle}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.additionalFeaturesContainer}>
          <Text style={styles.sectionTitle}>{translations[currentLanguage].additional_features_title}</Text>
          <View style={styles.featuresGrid}>
            <Pressable style={styles.featureCard} onPress={() => router.push("/progress")}>
              <MaterialIcons name="history" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>{translations[currentLanguage].diagnosis_history_card_title}</Text>
              <Text style={styles.cardSubtitle}>{translations[currentLanguage].diagnosis_history_card_subtitle}</Text>
            </Pressable>
            <Pressable style={styles.featureCard} onPress={() => router.push("/consultation")}>
              <MaterialIcons name="medical-services" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>{translations[currentLanguage].expert_consultation_card_title}</Text>
              <Text style={styles.cardSubtitle}>{translations[currentLanguage].expert_consultation_card_subtitle}</Text>
            </Pressable>
            <Pressable style={styles.featureCard} onPress={() => console.log("Crop Monitoring")}>
              <MaterialIcons name="show-chart" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>{translations[currentLanguage].crop_monitoring_card_title}</Text>
              <Text style={styles.cardSubtitle}>{translations[currentLanguage].crop_monitoring_card_subtitle}</Text>
            </Pressable>
            <Pressable style={styles.featureCard} onPress={() => console.log("Care Reminders")}>
              <MaterialIcons name="access-alarm" size={30} color="#66bb6a" />
              <Text style={styles.cardTitle}>{translations[currentLanguage].care_reminders_card_title}</Text>
              <Text style={styles.cardSubtitle}>{translations[currentLanguage].care_reminders_card_subtitle}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>{translations[currentLanguage].intro_title}</Text>
          <Text style={styles.introText}>
            {translations[currentLanguage].intro_text}
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <MaterialIcons name="flash-on" size={24} color="#66bb6a" />
            <Text style={styles.featureText}>{translations[currentLanguage].feature_instant_diagnosis}</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="security" size={24} color="#66bb6a" />
            <Text style={styles.featureText}>{translations[currentLanguage].feature_expert_recommendations}</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="local-florist" size={24} color="#66bb6a" />
            <Text style={styles.featureText}>{translations[currentLanguage].feature_healthier_crops}</Text>
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
    backgroundColor: '#e9f6eaff',
  },
 header: {
  backgroundColor: '#499a6cff',
  height: 90,
  paddingHorizontal: 20,
  borderBottomLeftRadius: 2,
  borderBottomRightRadius: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
  justifyContent: 'center',
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
  width: 90,
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
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 8,
  },
  scrollViewContent: {
    paddingBottom: 20,
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
    width: '45%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  langButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
  },
  activeLangButton: {
    backgroundColor: '#499a6cff',
  },
  langButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
