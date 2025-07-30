import { Stack } from 'expo-router';
import React from 'react';
import { LocationProvider } from '../context/LocationContext';

/**
 * This is the root layout for the app.
 * It uses Expo Router's Stack navigator.
 *
 * Key Changes:
 * 1. Removed the unnecessary wrapping <View> and its styles.
 * 2. Removed all the individual <Stack.Screen> components. Expo Router
 * automatically creates routes for each file in the directory,
 * so you don't need to declare them manually.
 * 3. This setup correctly uses Expo Router's file-based routing system.
 */
export default function RootLayout() {
  return (
    // The LocationProvider wraps the entire navigation stack,
    // making location data available to all screens.
    <LocationProvider>
      <Stack
        screenOptions={{
          // This option hides the default header for all screens.
          headerShown: false,
        }}
      />
    </LocationProvider>
  );
}
