// output.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import * as Sharing from "expo-sharing";

const OutputPage = () => {
  const { imageUri, result } = useLocalSearchParams();
  const parsedResult = result ? JSON.parse(result) : {};

  const {
    disease,
    symptoms,
    causes,
    treatment,
    prevention,
    generation_datetime,
  } = parsedResult;

  const handleDownloadReport = async () => {
    const htmlContent = `
      <h1>Diagnosis Report</h1>
      ${generation_datetime ? `<p><strong>Generated On:</strong> ${new Date(generation_datetime).toLocaleString()}</p>` : ""}
      <p><strong>Disease:</strong> ${disease || "N/A"}</p>
      ${symptoms?.length ? `<p><strong>Symptoms:</strong><br>${symptoms.map(s => `• ${s}<br>`).join("")}</p>` : ""}
      ${causes?.length ? `<p><strong>Causes:</strong><br>${causes.map(c => `• ${c}<br>`).join("")}</p>` : ""}
      ${treatment?.organic?.length ? `<p><strong>Treatment (Organic):</strong><br>${treatment.organic.map(t => `• ${t}<br>`).join("")}</p>` : ""}
      ${treatment?.non_organic?.length ? `<p><strong>Treatment (Non-Organic):</strong><br>${treatment.non_organic.map(t => `• ${t}<br>`).join("")}</p>` : ""}
      ${prevention?.length ? `<p><strong>Prevention:</strong><br>${prevention.map(p => `• ${p}<br>`).join("")}</p>` : ""}
      ${parsedResult.advice ? `<p><strong>Additional Advice:</strong><br>${parsedResult.advice}</p>` : ""}
    `;

    try {
      const { uri } = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: "CropCare_Diagnosis_Report",
        base64: false,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Success", "Report saved to: " + uri);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to generate report.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diagnosis Result</Text>

      <View style={styles.infoBox}>
        {generation_datetime && (
          <View>
            <Text style={styles.label}>Generated On:</Text>
            <Text style={styles.value}>
              {new Date(generation_datetime).toLocaleString()}
            </Text>
          </View>
        )}

        <Text style={styles.label}>Disease:</Text>
        <Text style={styles.value}>{disease || "N/A"}</Text>

        {symptoms && symptoms.length > 0 && (
          <View>
            <Text style={styles.label}>Symptoms:</Text>
            {symptoms.map((item, index) => (
              <Text key={index} style={styles.value}>
                {"\u2022"} {item}
              </Text>
            ))}
          </View>
        )}

        {causes && causes.length > 0 && (
          <View>
            <Text style={styles.label}>Causes:</Text>
            {causes.map((item, index) => (
              <Text key={index} style={styles.value}>
                {"\u2022"} {item}
              </Text>
            ))}
          </View>
        )}

        {treatment && (treatment.organic || treatment.non_organic) ? (
          <View>
            <Text style={styles.label}>Treatment:</Text>
            {treatment.organic && treatment.organic.length > 0 && (
              <View style={styles.subSection}>
                <Text style={styles.subLabel}>Organic:</Text>
                {treatment.organic.map((item, index) => (
                  <Text key={index} style={styles.value}>
                    {"\u2022"} {item}
                  </Text>
                ))}
              </View>
            )}
            {treatment.non_organic && treatment.non_organic.length > 0 && (
              <View style={styles.subSection}>
                <Text style={styles.subLabel}>Non-Organic:</Text>
                {treatment.non_organic.map((item, index) => (
                  <Text key={index} style={styles.value}>
                    {"\u2022"} {item}
                  </Text>
                ))}
              </View>
            )}
            {!treatment.organic?.length &&
              !treatment.non_organic?.length && (
                <Text style={styles.value}>N/A</Text>
              )}
          </View>
        ) : (
          <View>
            <Text style={styles.label}>Treatment:</Text>
            <Text style={styles.value}>N/A</Text>
          </View>
        )}

        {prevention && prevention.length > 0 && (
          <View>
            <Text style={styles.label}>Prevention:</Text>
            {prevention.map((item, index) => (
              <Text key={index} style={styles.value}>
                {"\u2022"} {item}
              </Text>
            ))}
          </View>
        )}

        {parsedResult.advice && (
          <View>
            <Text style={styles.label}>Additional Advice:</Text>
            <Text style={styles.value}>{parsedResult.advice}</Text>
          </View>
        )}

        {!disease &&
          (!symptoms || symptoms.length === 0) &&
          (!causes || causes.length === 0) &&
          (!treatment ||
            (!treatment.organic?.length &&
              !treatment.non_organic?.length)) &&
          (!prevention || prevention.length === 0) &&
          !parsedResult.advice && (
            <Text style={styles.noDataText}>
              No detailed diagnosis data available.
            </Text>
          )}
      </View>

      {/* Download Button */}
      <View style={{ marginTop: 20, width: "100%" }}>
        <Button title="Download Report" onPress={handleDownloadReport} />
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
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    color: "#333",
    marginBottom: 4,
  },
  subSection: {
    marginLeft: 15,
    marginTop: 5,
  },
  subLabel: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1D1D1D",
    marginBottom: 2,
  },
  noDataText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
