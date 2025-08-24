// app/schemes.jsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from '../translations';
import { MaterialIcons } from '@expo/vector-icons';
import schemesData from './data/schemes.js';

const SchemesListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [displaySchemes, setDisplaySchemes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('appLanguage') || 'en';
        setCurrentLanguage(savedLang);
        setDisplaySchemes(schemesData[savedLang] || []);
      } catch (error) {
        console.error("Error loading schemes data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTilePress = (scheme) => {
    router.push({
        pathname: `/schemeDetail`,
        params: {
            schemeData: JSON.stringify(scheme)
        }
    });
  };

  const renderSchemeItem = ({ item }) => (
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
      </View>
      <MaterialIcons name="chevron-right" size={28} color="#499a6c" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="account-balance" size={32} color="#2f4f2f" />
        <Text style={styles.headerText}>{translations[currentLanguage].schemes_hub_title}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#499a6c" style={{ marginTop: 50 }} />
      ) : displaySchemes.length === 0 ? (
         <View style={styles.noDataContainer}>
            <MaterialIcons name="info-outline" size={60} color="#ccc" />
            <Text style={styles.noDataText}>{translations[currentLanguage].schemes_hub_not_found}</Text>
         </View>
      ) : (
        <FlatList
          data={displaySchemes}
          renderItem={renderSchemeItem}
          keyExtractor={(item) => item.id}
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
    marginBottom: 20,
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
  tile: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
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