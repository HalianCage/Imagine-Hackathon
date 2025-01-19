import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Stack } from 'expo-router/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Slot } from "expo-router";

const Layout = () => {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
};

import progress from './progress';
import Home from './Home';
import consultation from './consultation';
import ecomm from './ecomm';
import CornPage from './CornPage';
import uploads from './uploads';




const _layout = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="progress" component={progress}/>
        <Stack.Screen name="consultation" component={consultation}/>
        <Stack.Screen name="ecomm" component={ecomm}/> 
        <Stack.Screen name="CornPage" component={CornPage}/>
        <Stack.Screen name="uploads" component={uploads}/>
    </Stack.Navigator>
    
  )
}

export default _layout;

const styles = StyleSheet.create({})