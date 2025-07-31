import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LineChart } from "react-native-gifted-charts";

const MonitoringDetailPage = () => {
  // --- 1. RECEIVE DATA FROM THE PREVIOUS SCREEN ---
  const { disease, reports: reportsString } = useLocalSearchParams();
  
  // Parse the stringified reports array back into a JavaScript object
  const diseaseReports = reportsString ? JSON.parse(reportsString) : [];

  // --- 2. PREPARE DATA FOR THE CHART ---
  // Sort reports chronologically for the graph
  const sortedForChart = [...diseaseReports].sort((a, b) => new Date(a.time_stamp) - new Date(b.time_stamp));
  const chartData = sortedForChart.map((report) => {
    const date = new Date(report.time_stamp);
    return {
      // Use "spread_percent" from your API for the value
      value: report.spread_percent, 
      label: `${date.getDate()}/${date.getMonth() + 1}`,
      dataPointText: `${report.spread_percent}%`,
    };
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>{decodeURIComponent(disease)}</Text>
      
      {/* Section for Individual Report Tiles */}
      <Text style={styles.sectionTitle}>Detailed Reports</Text>
      {diseaseReports.map(report => (
         <View key={report.id} style={styles.reportTile}>
            <View style={styles.tileLeft}>
                <Text style={styles.tileId}>ID: {report.id}</Text>
                <Text style={styles.tileTimestamp}>
                  {new Date(report.time_stamp).toLocaleString()}
                </Text>
            </View>
            <View style={styles.tileRight}>
                {/* Use "spread_percent" from your API for the percentage */}
                <Text style={styles.tilePercentage}>{report.spread_percent}%</Text>
                <Text style={styles.tileSeverity}>Severity</Text>
            </View>
         </View>
      ))}

      {/* Section for the Graph */}
      <Text style={styles.sectionTitle}>Curation Progress</Text>
      <View style={styles.chartContainer}>
        {chartData.length > 1 ? (
          <LineChart
            data={chartData}
            height={250}
            color="#007BFF"
            thickness={3}
            startFillColor="rgba(0, 123, 255, 0.1)"
            endFillColor="rgba(0, 123, 255, 0.01)"
            dataPointsShape="circular"
            dataPointsColor="#007BFF"
            textShiftY={-10}
            textShiftX={-5}
            textColor="black"
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
      color: '#d9534f', // Red color for severity
  },
  tileSeverity: {
      fontSize: 12,
      color: '#d9534f',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#ccc',
    marginBottom: 40, // Add space at the bottom
  },
  noDataText: {
      textAlign: 'center',
      fontSize: 16,
      color: 'gray',
      padding: 20,
  }
});