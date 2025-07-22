
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import logo from '../assets/images/logoHack.png';

const VendorList = () => {
  const vendors = [
    {
      name: 'Green Valley Farms',
      address: '123 Farm Lane, Springfield',
      phone: '123-456-7890',
      link: 'https://www.google.com/maps?q=Green+Valley+Farms',
    },
    {
      name: 'Sunrise Cotton Suppliers',
      address: '456 Cotton Street, Rivertown',
      phone: '987-654-3210',
      link: 'https://www.google.com/maps?q=Sunrise+Cotton+Suppliers',
    },
    {
      name: 'Golden Wheat Traders',
      address: '789 Golden Road, Harvest City',
      phone: '456-789-1234',
      link: 'https://www.google.com/maps?q=Golden+Wheat+Traders',
    },
    {
      name: 'Fresh Harvest Co.',
      address: '321 Orchard Drive, Greenfield',
      phone: '321-654-9870',
      link: 'https://www.google.com/maps?q=Fresh+Harvest+Co',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <View style={styles.header_box}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => console.log("Navigate to profile")}>
            <FontAwesome5 name="user-alt" size={45} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Title */}
      <Text style={styles.title}>Vendor Directory</Text>

      {/* Vendor Blocks */}
      <View style={styles.vendorContainer}>
        {vendors.map((vendor, index) => (
          <TouchableOpacity
            key={index}
            style={styles.vendorBlock}
            onPress={() => Linking.openURL(vendor.link)}
          >
            <View>
              <Text style={styles.vendorName}>{vendor.name}</Text>
              <Text style={styles.vendorDetails}>{vendor.address}</Text>
              <Text style={styles.vendorDetails}>{vendor.phone}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default VendorList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7e6',
    padding: 3,
  },
  header: {
    backgroundColor: '#9fbfac',
    padding: 5,
    marginBottom: 15,
  },
  header_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 85,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  vendorContainer: {
    marginBottom: 30,
  },
  vendorBlock: {
    backgroundColor: '#b3d9b3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  vendorDetails: {
    fontSize: 14,
    color: '#333',
    marginTop: 3,
  },
});