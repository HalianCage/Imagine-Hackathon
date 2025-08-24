// app/schemeDetail.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from '../translations';
import { MaterialIcons } from '@expo/vector-icons';

const SchemeDetailScreen = () => {
  const { schemeData } = useLocalSearchParams();
  const scheme = JSON.parse(schemeData);

  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const loadLanguage = async () => {
        const savedLang = await AsyncStorage.getItem('appLanguage') || 'en';
        setCurrentLanguage(savedLang);
    };
    loadLanguage();
  }, []);

  const DetailSection = ({ title, content, iconName }) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <MaterialIcons name={iconName} size={22} color="#499a6c" />
            <Text style={styles.heading}>{title}</Text>
        </View>
        <View style={styles.sectionContent}>
            {Array.isArray(content) ? (
            content.map((item, index) => (
                <View key={index} style={styles.listItemContainer}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.listItem}>{item}</Text>
                </View>
            ))
            ) : (
            <Text style={styles.paragraph}>{content}</Text>
            )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleHeader}>
        <View style={styles.titleIconContainer}>
            <MaterialIcons name={scheme.icon} size={32} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>{scheme.title}</Text>
      </View>
      
      <DetailSection 
        title={translations[currentLanguage].scheme_details_what_is_it}
        content={scheme.details.what_is_it}
        iconName="info-outline"
      />
      <DetailSection 
        title={translations[currentLanguage].scheme_details_benefits}
        content={scheme.details.benefits}
        iconName="check-circle-outline"
      />
      <DetailSection 
        title={translations[currentLanguage].scheme_details_who_can_apply}
        content={scheme.details.who_can_apply}
        iconName="person-outline"
      />
      <DetailSection 
        title={translations[currentLanguage].scheme_details_how_to_apply}
        content={scheme.details.how_to_apply}
        iconName="how-to-reg"
      />
      <DetailSection 
        title={translations[currentLanguage].scheme_details_documents_needed}
        content={scheme.details.documents_needed}
        iconName="description"
      />

      <TouchableOpacity 
        style={styles.customButton}
        onPress={() => Linking.openURL(scheme.details.official_link)}
      >
        <Text style={styles.customButtonText}>{translations[currentLanguage].scheme_details_official_link_button}</Text>
        <MaterialIcons name="launch" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SchemeDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f9f3',
    padding: 15,
    paddingTop: 50,
  },
  titleHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  titleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#499a6c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#2f4f2f',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0f0dc',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e9f6eaff',
  },
  heading: { 
    fontSize: 17, 
    fontWeight: '600', 
    color: '#2f4f2f',
    marginLeft: 10,
  },
  sectionContent: {
    padding: 15,
  },
  paragraph: { 
    fontSize: 15, 
    lineHeight: 24,
    color: '#333',
  },
  listItemContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#499a6c',
    marginRight: 10,
    lineHeight: 24,
  },
  listItem: { 
    flex: 1,
    fontSize: 15, 
    lineHeight: 24,
    color: '#333',
  },
  customButton: { 
    flexDirection: 'row',
    backgroundColor: '#499a6c',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, 
    marginBottom: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  customButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});