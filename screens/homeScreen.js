import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';

export default function HomeScreen( {navigation} ) {
  return (
    <View style={styles.container}>
      <Button title = "Open Camera" onPress = {() => navigation.navigate('Scan')} />
    </View>
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

