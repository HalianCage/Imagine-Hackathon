import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

import { LocationProvider } from '../context/LocationContext'; // ✅ Import LocationProvider

const _layout = () => {
  return (
    <LocationProvider> {/* ✅ Wrap your entire stack in this */}
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" />
          <Stack.Screen name="progress" />
          <Stack.Screen name="consultation" />
          <Stack.Screen name="ecomm" />
          <Stack.Screen name="CornPage" />
          <Stack.Screen name="uploads" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="loading" />
          <Stack.Screen name="output" />
        </Stack>
      </View>
    </LocationProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});