import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native';

export default function HomeScreen( {navigation} ) {
  return (
    <View style={styles.buttonContainer}>
      <Image
        style= {styles.person}
        source={require('../assets/person-homescreen.png')}
      />
      <TouchableOpacity 
         style={styles.button}
         onPress = {() => navigation.navigate('Scan')}>
         <Image
            style={styles.tinyLogo}
            source={require('../assets/open-camera.png')}
         />
      </TouchableOpacity>
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
  buttonContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
  },
  button: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 30
  },
  tinyLogo: {
    marginBottom: 20,
    width: 125,
    height: 125,
  },
  person: {
    marginTop: 50,
    width: 350,
    height: 500
  }
});

