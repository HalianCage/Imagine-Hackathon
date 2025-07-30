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

// Import translations and AsyncStorage
import translations from '../translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Log all received parameters for debugging
  console.log("LoadingPage - All received params:", params);
  
  const { imageUri, selectedLanguage: initialSelectedLanguage, location: locationString } = params;
  
  console.log("LoadingPage - Extracted params:");
  console.log("- imageUri:", imageUri);
  console.log("- selectedLanguage:", initialSelectedLanguage);
  console.log("- location string:", locationString);
  
  // Parse the location back to object
  let location = null;
  try {
    if (locationString && typeof locationString === 'string') {
      location = JSON.parse(locationString);
    }
  } catch (error) {
    console.error("Error parsing location:", error);
    location = null;
  }

  // Add currentLanguage state, initialized from param or default
  const [currentLanguage, setCurrentLanguage] = useState(initialSelectedLanguage || 'en');

  // Use state for loadingText, initialized and updated based on currentLanguage
  const [loadingText, setLoadingText] = useState("Processing...");

  useEffect(() => {
    (async () => {
      // If a language wasn't passed, try to load from AsyncStorage
      if (!initialSelectedLanguage) {
        try {
          const savedLang = await AsyncStorage.getItem('appLanguage');
          if (savedLang) {
            setCurrentLanguage(savedLang);
          }
        } catch (error) {
          console.error("Error loading language from storage:", error);
        }
      }
    })();
  }, [initialSelectedLanguage]);

  // Update loading text when language changes
  useEffect(() => {
    if (translations[currentLanguage]?.loading_status_text) {
      setLoadingText(translations[currentLanguage].loading_status_text);
    } else {
      setLoadingText("Processing...");
    }
  }, [currentLanguage]);

  useEffect(() => {
    console.log("LoadingPage useEffect triggered");
    console.log("imageUri exists:", !!imageUri);
    console.log("imageUri type:", typeof imageUri);
    console.log("imageUri value:", imageUri);
    
    // Check if imageUri exists and is not empty
    if (!imageUri || imageUri.trim() === '' || imageUri === 'undefined') {
      console.error("No valid image URI provided");
      Alert.alert("Error", "No image provided for processing");
      setTimeout(() => {
        router.replace("/");
      }, 1000);
      return;
    }

    const processImageWithBackend = async () => {
      try {
        console.log("=== PROCESSING IMAGE WITH BACKEND ===");
        console.log("Image URI:", imageUri);
        console.log("Language:", currentLanguage);
        console.log("Location:", location);

        // --- START OF BACKEND API CALL INTEGRATION ---
        const formData = new FormData();
        
        // Add image to FormData
        formData.append('image', {
          uri: imageUri,
          name: 'crop_image.jpg',
          type: 'image/jpeg',
        });
        
        // Add location data
        formData.append("location", JSON.stringify(location || null));

        // Add language
        if (currentLanguage) {
          formData.append("language", currentLanguage);
        }

        console.log("FormData prepared for backend call...");

        // Here you would make your actual backend API call
        // Example:
        // const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        //   method: 'POST',
        //   body: formData,
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });
        // 
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // 
        // const backendResult = await response.json();

        // --- DUMMY RESULT FOR DEMONSTRATION ---
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
          processed_with: {
            language: currentLanguage,
            location: location,
            image_processed: true
          }
        };

        // Simulate network delay
        console.log("Simulating processing delay...");
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log("Processing complete, navigating to output...");

        // Navigate to output page
        router.replace({
          pathname: "/output",
          params: {
            imageUri: imageUri,
            result: JSON.stringify(dummyResult),
          },
        });

      } catch (error) {
        console.error("Error during image processing:", error);
        const errorTitle = translations[currentLanguage]?.loading_error_title || "Error";
        const errorMessage = error.message || translations[currentLanguage]?.loading_error_message || "Processing failed";
        
        Alert.alert(errorTitle, errorMessage, [
          {
            text: "OK",
            onPress: () => router.replace("/")
          }
        ]);
      }
    };

    // Start processing
    processImageWithBackend();
    
  }, [imageUri, currentLanguage, location, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {translations[currentLanguage]?.loading_page_title || "Processing Image"}
      </Text>
      
      {imageUri && imageUri !== 'undefined' && (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
            onError={(error) => {
              console.error("Image loading error:", error);
            }}
            onLoad={() => {
              console.log("Image loaded successfully");
            }}
          />
        </View>
      )}
      
      <Text style={styles.statusText}>{loadingText}</Text>
      <ActivityIndicator size="large" color="#4d4d4d" style={{ marginTop: 20 }} />
      
      {/* Debug info - remove in production */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>Debug Info:</Text>
        <Text style={styles.debugText}>ImageURI: {imageUri ? 'Present' : 'Missing'}</Text>
        <Text style={styles.debugText}>Language: {currentLanguage}</Text>
        <Text style={styles.debugText}>Location: {location ? 'Present' : 'Missing'}</Text>
      </View>
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
    textAlign: "center",
  },
  previewContainer: {
    width: 180,
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#9fbfac",
    backgroundColor: "#d1f7d6",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  statusText: {
    fontSize: 16,
    color: "#4d4d4d",
    textAlign: "center",
    marginBottom: 10,
  },
  debugContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 5,
  },
  debugText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 2,
  },
});