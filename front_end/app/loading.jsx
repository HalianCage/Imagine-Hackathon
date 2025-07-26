// loading.jsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const LoadingPage = () => {
  const router = useRouter();
  const { imageUri } = useLocalSearchParams();
  console.log("Image URI:", imageUri);

  useEffect(() => {
    const simulateProcessing = async () => {
      // Simulate backend processing (replace this with real API call later)
      const dummyResult = {
        cropType: "Corn",
        disease: "Leaf Blight",
        advice: "Apply fungicide weekly. Ensure proper spacing and irrigation.",
      };

      // Wait 10 seconds
      setTimeout(() => {
        // Navigate to output page with result and image
        router.push({
          pathname: "/output",
          params: {
            imageUri,
            result: JSON.stringify(dummyResult), // pass as string
          },
        });
      }, 10000);
    };

    simulateProcessing();
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
      <Text style={styles.statusText}>Processing your crop image</Text>
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
