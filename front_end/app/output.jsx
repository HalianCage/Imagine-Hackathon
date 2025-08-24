import React from "react";
import * as Print from "expo-print";
import * as Speech from "expo-speech";
import * as Sharing from "expo-sharing";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

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
    advice,
    processed_with, // contains language info from backend
  } = parsedResult;

  const handleDownloadReport = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>Diagnosis Report</h1>
          ${generation_datetime ? `<p><strong>Generated On:</strong> ${new Date(generation_datetime).toLocaleString()}</p>` : ""}
          <p><strong>Disease:</strong> ${disease || "N/A"}</p>
          ${symptoms?.length ? `<p><strong>Symptoms:</strong><br>${symptoms.map(s => `• ${s}<br>`).join("")}</p>` : ""}
          ${causes?.length ? `<p><strong>Causes:</strong><br>${causes.map(c => `• ${c}<br>`).join("")}</p>` : ""}
          ${treatment?.organic?.length ? `<p><strong>Treatment (Organic):</strong><br>${treatment.organic.map(t => `• ${t}<br>`).join("")}</p>` : ""}
          ${treatment?.non_organic?.length ? `<p><strong>Treatment (Non-Organic):</strong><br>${treatment.non_organic.map(t => `• ${t}<br>`).join("")}</p>` : ""}
          ${prevention?.length ? `<p><strong>Prevention:</strong><br>${prevention.map(p => `• ${p}<br>`).join("")}</p>` : ""}
          ${advice ? `<p><strong>Additional Advice:</strong><br>${advice}</p>` : ""}
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Report saved", "PDF generated at: " + uri);
      }
    } catch (error) {
      console.error("PDF Generation Error:", error);
      Alert.alert("Error", "Failed to generate or share the report.");
    }
  };

  const speakReport = () => {
    const spokenText = `
      Diagnosis Report.
      ${generation_datetime ? `Generated On: ${new Date(generation_datetime).toLocaleString()}.` : ""}
      Disease: ${disease || "Not available"}.
      ${symptoms?.length ? `Symptoms: ${symptoms.join(", ")}.` : ""}
      ${causes?.length ? `Causes: ${causes.join(", ")}.` : ""}
      ${treatment?.organic?.length ? `Organic Treatments: ${treatment.organic.join(", ")}.` : ""}
      ${treatment?.non_organic?.length ? `Non-Organic Treatments: ${treatment.non_organic.join(", ")}.` : ""}
      ${prevention?.length ? `Prevention methods: ${prevention.join(", ")}.` : ""}
      ${advice ? `Additional Advice: ${advice}` : ""}
    `;

    try {
      // pick language from backend (default English)
      const speakLang = processed_with?.language || "en";
      Speech.speak(spokenText, {
        language: speakLang,
        rate: 0.9,
      });
    } catch (err) {
      console.error("Speech Error:", err);
    }
  };

  const stopSpeaking = () => {
    try {
      Speech.stop();
    } catch (err) {
      console.error("Stop Speech Error:", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diagnosis Report</Text>

      <View style={styles.infoBox}>
        {generation_datetime && (
          <>
            <Text style={styles.label}>Generated On:</Text>
            <Text style={styles.value}>
              {new Date(generation_datetime).toLocaleString()}
            </Text>
          </>
        )}

        <Text style={styles.label}>Disease:</Text>
        <Text style={styles.value}>{disease || "N/A"}</Text>

        {symptoms?.length > 0 && (
          <View>
            <Text style={styles.label}>Symptoms:</Text>
            {symptoms.map((item, index) => (
              <Text key={index} style={styles.value}>
                {"\u2022"} {item}
              </Text>
            ))}
          </View>
        )}

        {causes?.length > 0 && (
          <View>
            <Text style={styles.label}>Causes:</Text>
            {causes.map((item, index) => (
              <Text key={index} style={styles.value}>
                {"\u2022"} {item}
              </Text>
            ))}
          </View>
        )}

        {(treatment?.organic?.length || treatment?.non_organic?.length) ? (
          <View>
            <Text style={styles.label}>Treatment:</Text>

            {treatment.organic?.length > 0 && (
              <View style={styles.subSection}>
                <Text style={styles.subLabel}>Organic:</Text>
                {treatment.organic.map((item, index) => (
                  <Text key={index} style={styles.value}>
                    {"\u2022"} {item}
                  </Text>
                ))}
              </View>
            )}

            {treatment.non_organic?.length > 0 && (
              <View style={styles.subSection}>
                <Text style={styles.subLabel}>Non-Organic:</Text>
                {treatment.non_organic.map((item, index) => (
                  <Text key={index} style={styles.value}>
                    {"\u2022"} {item}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View>
            <Text style={styles.label}>Treatment:</Text>
            <Text style={styles.value}>N/A</Text>
          </View>
        )}

        {prevention?.length > 0 && (
          <View>
            <Text style={styles.label}>Prevention:</Text>
            {prevention.map((item, index) => (
              <Text key={index} style={styles.value}>
                {"\u2022"} {item}
              </Text>
            ))}
          </View>
        )}

        {advice && (
          <View>
            <Text style={styles.label}>Additional Advice:</Text>
            <Text style={styles.value}>{advice}</Text>
          </View>
        )}

        {!disease &&
          !symptoms?.length &&
          !causes?.length &&
          !treatment?.organic?.length &&
          !treatment?.non_organic?.length &&
          !prevention?.length &&
          !advice && (
            <Text style={styles.noDataText}>
              No detailed diagnosis data available.
            </Text>
          )}
      </View>

      <View style={styles.buttonGroup}>
        <Button title="🔊 Read Aloud" onPress={speakReport} />
        <Button title="⏸ Pause" onPress={stopSpeaking} />
        <Button title="⬇ Download Report" onPress={handleDownloadReport} />
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
  subsection: {
    marginLeft: 15,
    marginTop: 5,
  },
  sublabel: {
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
  buttonGroup: {
    marginTop: 30,
    width: "100%",
    gap: 12,
  },
});

