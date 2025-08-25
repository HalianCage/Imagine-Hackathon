// app/schemes.jsx

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SectionList, // Using SectionList for the headings
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router"; // Using useFocusEffect for auto language updates
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from '../translations';
import { MaterialIcons } from '@expo/vector-icons';
import schemesData from './data/schemes.js'; // Ensure this path is correct for your project

const SchemesListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [schemesSections, setSchemesSections] = useState([]);
  const router = useRouter();

  // This hook now re-loads the data and groups it into sections every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setLoading(true); // Show loader while processing
        try {
          const savedLang = await AsyncStorage.getItem('appLanguage') || 'en';
          setCurrentLanguage(savedLang);
          
          const allSchemes = schemesData[savedLang] || [];

          // Group schemes into sections
          const nationalSchemes = allSchemes.filter(s => s.type === 'राष्ट्रीय' || s.type === 'National');
          const stateSchemes = allSchemes.filter(s => s.type && s.type.startsWith('राज्य') || s.type.startsWith('State'));
          
          const sections = [];
          if (stateSchemes.length > 0) {
              sections.push({ 
                  title: translations[savedLang].state_schemes_header, 
                  data: stateSchemes 
              });
          }
          if (nationalSchemes.length > 0) {
              sections.push({ 
                  title: translations[savedLang].national_schemes_header, 
                  data: nationalSchemes 
              });
          }
          
          setSchemesSections(sections);

        } catch (error) {
          console.error("Error loading schemes data:", error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [])
  );

  const handleTilePress = (scheme) => {
    router.push({
        pathname: `/schemeDetail`,
        params: {
            schemeData: JSON.stringify(scheme)
        }
    });
  };

  const renderSchemeItem = ({ item }) => {
    const isStateScheme = item.type && (item.type.startsWith('State') || item.type.startsWith('राज्य'));
    const tagStyle = isStateScheme ? styles.stateTag : styles.nationalTag;
    const tagTextStyle = isStateScheme ? styles.stateTagText : styles.nationalTagText;

    return (
      <TouchableOpacity
        style={styles.tile}
        onPress={() => handleTilePress(item)}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons name={item.icon} size={28} color="#FFFFFF" />
        </View>
        <View style={styles.tileTextContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
          <View style={[styles.tag, tagStyle]}>
            <Text style={tagTextStyle}>{item.type}</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={28} color="#499a6c" />
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="account-balance" size={32} color="#2f4f2f" />
        <Text style={styles.headerText}>{translations[currentLanguage].schemes_hub_title}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#499a6c" style={{ marginTop: 50 }} />
      ) : schemesSections.length === 0 ? (
         <View style={styles.noDataContainer}>
            <MaterialIcons name="info-outline" size={60} color="#ccc" />
            <Text style={styles.noDataText}>{translations[currentLanguage].schemes_hub_not_found}</Text>
         </View>
      ) : (
        <SectionList
          sections={schemesSections}
          keyExtractor={(item) => item.id}
          renderItem={renderSchemeItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default SchemesListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f9f3",
        paddingTop: 40,
      },
      header: {
        paddingHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerText: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#2f4f2f",
        marginLeft: 10,
      },
      listContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
      },
      sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#405c3d',
        backgroundColor: '#f3f9f3',
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 5,
      },
      tile: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 15,
        marginTop: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
        borderWidth: 1,
        borderColor: '#e0f0dc',
      },
      iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#499a6c',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
      },
      tileTextContainer: {
        flex: 1,
      },
      title: {
        fontSize: 17,
        fontWeight: "600",
        color: "#2f4f2f",
      },
      summary: {
        fontSize: 14,
        color: '#666',
        marginTop: 3,
        marginBottom: 10,
      },
      tag: {
        borderRadius: 5,
        paddingVertical: 3,
        paddingHorizontal: 8,
        alignSelf: 'flex-start',
      },
      nationalTag: {
        backgroundColor: '#e0eafc',
        borderColor: '#b3c7f2',
        borderWidth: 1,
      },
      nationalTagText: {
        color: '#3d5a80',
        fontSize: 11,
        fontWeight: 'bold',
      },
      stateTag: {
        backgroundColor: '#fce6d8',
        borderColor: '#f5c5a7',
        borderWidth: 1,
      },
      stateTagText: {
        color: '#b86638',
        fontSize: 11,
        fontWeight: 'bold',
      },
      noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      noDataText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 20,
      },
});