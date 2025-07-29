// loading.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert, // Import Alert for error handling
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
// import axios from "axios"; // You would typically use axios or fetch


import { LocationContext } from "../context/LocationContext"; //  LOCATION PAGE PATH
import { useContext } from "react";


const LoadingPage = () => {
  const router = useRouter();
  const { imageUri } = useLocalSearchParams();
  const [loadingText, setLoadingText] = useState("Processing your crop image");
  const location = useContext(LocationContext);

  useEffect(() => {
    const processImageWithBackend = async () => {
      try {
        // --- START OF BACKEND API CALL INTEGRATION ---
        // This is where you would replace the dummy logic with your actual API call.
        // You'll need to send the 'imageUri' (or the actual image file) to your backend.

        // Example using fetch (you might use axios, etc.):
        // const formData = new FormData();
        // formData.append('image', {
        //   uri: imageUri,
        //   name: 'crop_image.jpg', // You might want to generate a unique name
        //   type: 'image/jpeg', // Adjust based on your image type
        // });

        // const response = await fetch('YOUR_BACKEND_API_ENDPOINT_HERE', {
        //   method: 'POST',
        //   headers: {
        //     // 'Content-Type': 'multipart/form-data', // This header might be auto-set by FormData
        //     // Add any other headers like authorization tokens if needed
        //   },
        //   body: formData, // Or JSON.stringify({ imageUri: imageUri }) if sending URI
        // });

        // if (!response.ok) {
        //   const errorData = await response.json();
        //   throw new Error(errorData.message || 'Failed to get diagnosis from backend.');
        // }

        // const backendResult = await response.json();
        // console.log("Backend response:", backendResult);

        // --- DUMMY RESULT FOR DEMONSTRATION (REMOVE THIS IN PRODUCTION) ---
        // Simulate a backend response matching the desired format
        const dummyResult = {
          disease: "Leaf Blight",
          symptoms: ["Yellow spots on leaves", "Brown lesions", "Reduced growth"],
          causes: ["Fungal infection", "High humidity"],
          treatment: {
            organic: ["Neem oil spray", "Remove infected leaves"],
            non_organic: ["Apply specific fungicide X", "Foliar spray Y"],
          },
          prevention: ["Ensure proper spacing", "Good air circulation", "Resistant varieties"],
          generation_datetime: new Date().toISOString(), // Current timestamp
        };
        

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate a 3-second fetch time

        // --- END OF BACKEND API CALL INTEGRATION ---

        // Navigate to output page with the fetched result (as a string) and image URI
        router.replace({ // Use replace to prevent going back to loading page
          pathname: "/output",
          params: {
            imageUri,
            result: JSON.stringify(dummyResult), // Use backendResult here in production
          },
        });

      } catch (error) {
        console.error("Error during image processing:", error);
        Alert.alert("Error", error.message || "Failed to get diagnosis. Please try again.");
        // Optionally navigate back or to an error page
        router.replace("/Home"); // Navigate back to Home or a suitable page
      }
    };

     formData.append("location", JSON.stringify(location || null));  // Include location data if available

    processImageWithBackend();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please wait...</Text>
      <View style={styles.previewContainer}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
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