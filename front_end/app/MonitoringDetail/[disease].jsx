import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LineChart } from "react-native-gifted-charts";

// --- NEW: Helper function to determine color based on severity ---
// This function helps us reuse the color logic for both the tiles and the chart.
const getSeverityColor = (percentage) => {
  if (percentage <= 20) {
    return '#28a745'; // Green
  } else if (percentage <= 50) {
    return '#fd7e14'; // Orange
  } else {
    return '#dc3545'; // Red
  }
};
// -----------------------------------------------------------------

const MonitoringDetailPage = () => {
  // --- 1. RECEIVE DATA FROM THE PREVIOUS SCREEN ---
  const { disease, reports: reportsString } = useLocalSearchParams();
  const diseaseReports = reportsString ? JSON.parse(reportsString) : [];

  // --- 2. PREPARE DATA FOR THE CHART ---
  const sortedForChart = [...diseaseReports].sort((a, b) => new Date(a.time_stamp) - new Date(b.time_stamp));
  
  // --- MODIFIED: The map function now adds dynamic colors for the chart ---
  const chartData = sortedForChart.map((report) => {
    const date = new Date(report.time_stamp);
    const severityColor = getSeverityColor(report.spread_percent); // Get the color for the current report

    return {
      value: report.spread_percent,
      label: `${date.getDate()}/${date.getMonth() + 1}`,
      dataPointText: `${report.spread_percent}%`,
      
      // NEW: These properties will color the individual points and text on the chart
      dataPointColor: severityColor,
      textColor: severityColor,
    };
  });
  // -------------------------------------------------------------------------

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>{decodeURIComponent(disease)}</Text>
      
      <Text style={styles.sectionTitle}>Detailed Reports</Text>
      {diseaseReports.map(report => {
        // --- MODIFIED: Get the severity color for each tile ---
        const severityColor = getSeverityColor(report.spread_percent);
        // ------------------------------------------------------

        return (
         <View key={report.id} style={styles.reportTile}>
            <View style={styles.tileLeft}>
                <Text style={styles.tileId}>ID: {report.id}</Text>
                <Text style={styles.tileTimestamp}>
                  {new Date(report.time_stamp).toLocaleString()}
                </Text>
            </View>
            <View style={styles.tileRight}>
                {/* --- MODIFIED: Apply the dynamic color to the percentage and severity text --- */}
                <Text style={[styles.tilePercentage, { color: severityColor }]}>
                    {report.spread_percent}%
                </Text>
                <Text style={[styles.tileSeverity, { color: severityColor }]}>
                    Severity
                </Text>
                {/* ----------------------------------------------------------------------------- */}
            </View>
         </View>
        );
      })}

      <Text style={styles.sectionTitle}>Curation Progress</Text>
      <View style={styles.chartContainer}>
        {chartData.length > 1 ? (
          <LineChart
            data={chartData}
            height={250}
            // --- MODIFIED: Using a neutral color for the line itself ---
            color="#6c757d" // A neutral gray for the line
            thickness={3}
            startFillColor="rgba(108, 117, 125, 0.1)"
            endFillColor="rgba(108, 117, 125, 0.01)"
            // ---------------------------------------------------------
            dataPointsShape="circular"
            // dataPointsColor is no longer needed as each point has its own color
            textShiftY={-10}
            textShiftX={-5}
            // textColor is also no longer needed for the data points
            textSize={12}
            yAxisLabel="%"
            yAxisTextStyle={{ color: 'gray' }}
            xAxisLabelTextStyle={{ color: 'gray' }}
            noOfSections={5}
            rulesType="solid"
            rulesColor="lightgray"
          />
        ) : (
          <Text style={styles.noDataText}>
            At least two reports are needed to show a progress graph.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default MonitoringDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9f3",
    paddingTop: 50,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2f4f2f",
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#444',
      marginTop: 20,
      marginBottom: 15,
      paddingHorizontal: 20,
  },
  reportTile: {
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      padding: 15,
      marginHorizontal: 20,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#ccc'
  },
  tileLeft: {},
  tileId: {
      fontSize: 12,
      color: '#888',
  },
  tileTimestamp: {
      fontSize: 15,
      color: '#333',
      marginTop: 4,
  },
  tileRight: {
      alignItems: 'flex-end',
  },
  tilePercentage: {
      fontSize: 22,
      fontWeight: 'bold',
      // color is now applied dynamically
  },
  tileSeverity: {
      fontSize: 12,
      // color is now applied dynamically
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#ccc',
    marginBottom: 40,
  },
  noDataText: {
      textAlign: 'center',
      fontSize: 16,
      color: 'gray',
      padding: 20,
  }
});