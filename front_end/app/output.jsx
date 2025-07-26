// output.jsx
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

const OutputPage = () => {
  const { imageUri, result } = useLocalSearchParams();
  const parsedResult = result ? JSON.parse(result) : {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diagnosis Result</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
      
      <View style={styles.infoBox}>
        <Text style={styles.label}>Crop Type:</Text>
        <Text style={styles.value}>{parsedResult.cropType || "N/A"}</Text>

        <Text style={styles.label}>Disease:</Text>
        <Text style={styles.value}>{parsedResult.disease || "N/A"}</Text>

        <Text style={styles.label}>Advice:</Text>
        <Text style={styles.value}>{parsedResult.advice || "N/A"}</Text>
      </View>
    </ScrollView>
  );
};

export default OutputPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#effff5",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1D1D1D",
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#9fbfac",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#d1f7d6",
    padding: 20,
    borderRadius: 20,
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1D1D1D",
    marginTop: 10,
  },
  value: {
    fontSize: 15,
    color: "#333",
    marginTop: 4,
  },
});
