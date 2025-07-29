import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import progress from './progress';
import consultation from './consultation';
import ecomm from './ecomm';
import CornPage from './CornPage';
import Uploads from './uploads';
import Profile from './profile';
import LoadingPage from './loading';
import OutputPage from './output';

import { LocationProvider } from '../context/LocationContext'; // ✅ Import LocationProvider

const Stack = createStackNavigator();

const _layout = () => {
  return (
    <LocationProvider> {/* ✅ Wrap your entire stack in this */}
      <View style={styles.container}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="progress" component={progress} />
          <Stack.Screen name="consultation" component={consultation} />
          <Stack.Screen name="ecomm" component={ecomm} />
          <Stack.Screen name="CornPage" component={CornPage} />
          <Stack.Screen name="uploads" component={Uploads} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="loading" component={LoadingPage} />
          <Stack.Screen name="output" component={OutputPage} />
        </Stack.Navigator>
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
