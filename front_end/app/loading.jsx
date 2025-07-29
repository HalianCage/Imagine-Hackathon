// loading.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
// import axios from "axios"; // You would typically use axios or fetch

import { LocationContext } from "../context/LocationContext";
import { useContext } from "react";

// Import translations and AsyncStorage
import translations from '../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingPage = () => {
  const router = useRouter();
  const { imageUri, selectedLanguage: initialSelectedLanguage } = useLocalSearchParams();
  const location = useContext(LocationContext);

  // Add currentLanguage state, initialized from param or default
  const [currentLanguage, setCurrentLanguage] = useState(initialSelectedLanguage || 'en');

  // Use state for loadingText, initialized and updated based on currentLanguage
  const [loadingText, setLoadingText] = useState(translations[currentLanguage].loading_status_text);

  useEffect(() => {
    (async () => {
      // If a language wasn't passed, try to load from AsyncStorage
      if (!initialSelectedLanguage) {
        const savedLang = await AsyncStorage.getItem('appLanguage');
        if (savedLang) {
          setCurrentLanguage(savedLang);
        }
      }
    })();
  }, [initialSelectedLanguage]); // Run once when initialSelectedLanguage changes (or component mounts)

  // This useEffect ensures loadingText updates if currentLanguage changes after initial render
  useEffect(() => {
    setLoadingText(translations[currentLanguage].loading_status_text);
  }, [currentLanguage]);


  useEffect(() => {
    const processImageWithBackend = async () => {
      try {
        // --- START OF BACKEND API CALL INTEGRATION ---
        const formData = new FormData();
        formData.append('image', {
          uri: imageUri,
          name: 'crop_image.jpg',
          type: 'image/jpeg',
        });
        formData.append("location", JSON.stringify(location || null));

        // Append the determined current language to your formData
        if (currentLanguage) {
          formData.append("language", currentLanguage);
        }

        // Example using fetch (you might use axios, etc.):
        // const response = await fetch('YOUR_BACKEND_API_ENDPOINT_HERE', {
        //   method: 'POST',
        //   body: formData,
        //   headers: {
        //     // 'Content-Type': 'multipart/form-data' might be auto-set by FormData
        //     // Add any other headers like authorization tokens if needed
        //   },
        // });

        // if (!response.ok) {
        //   const errorData = await response.json();
        //   throw new Error(errorData.message || translations[currentLanguage].loading_error_message);
        // }

        // const backendResult = await response.json();
        // console.log("Backend response:", backendResult);

        // --- DUMMY RESULT FOR DEMONSTRATION (REMOVE THIS IN PRODUCTION) ---
        const dummyResult = {
          disease: "Leaf Blight",
          symptoms: ["Yellow spots on leaves", "Brown lesions", "Reduced growth"],
          causes: ["Fungal infection", "High humidity"],
          treatment: {
            organic: ["Neem oil spray", "Remove infected leaves"],
            non_organic: ["Apply specific fungicide X", "Foliar spray Y"],
          },
          prevention: ["Ensure proper spacing", "Good air circulation", "Resistant varieties"],
          generation_datetime: new Date().toISOString(),
        };


        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        // --- END OF BACKEND API CALL INTEGRATION ---

        router.replace({
          pathname: "/output",
          params: {
            imageUri,
            result: JSON.stringify(dummyResult),
          },
        });

      } catch (error) {
        console.error("Error during image processing:", error);
        Alert.alert(translations[currentLanguage].loading_error_title, error.message || translations[currentLanguage].loading_error_message);
        router.replace("/Home");
      }
    };

    // This useEffect is responsible for initiating the backend process
    processImageWithBackend();
    // Dependencies to re-run the process if these change (unlikely in this flow, but good practice)
  }, [imageUri, currentLanguage, location]);


  return (
    <View style={styles.container}>
      {/* Title text directly uses translation */}
      <Text style={styles.title}>{translations[currentLanguage].loading_page_title}</Text>
      <View style={styles.previewContainer}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      {/* Status text now uses the loadingText state, which is dynamically updated */}
      <Text style={styles.statusText}>{loadingText}</Text>
      <ActivityIndicator size="large" color="#4d4d4d" style={{ marginTop: 20 }} />
    </View>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#effff5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1D1D1D",
    marginBottom: 20,
  },
  previewContainer: {
    width: 180,
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#9fbfac",
    backgroundColor: "#d1f7d6",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  statusText: {
    marginTop: 20,
    fontSize: 16,
    color: "#4d4d4d",
    textAlign: "center",
  },
});