import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/homeScreen';
import SummaryScreen from './screens/summaryScreen';
import ScansLibrary from './screens/scansLibrary';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';
import config from './config/firebaseConfig';
import Environment from './config/environmentConfig';

const Stack = createStackNavigator();

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
  }
  
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scan">
            {props => <ScansLibrary {...props} storage={firebase.storage()} environment = {Environment}/>}
          </Stack.Screen>
          <Stack.Screen name="Nutrition Summary" component={SummaryScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
