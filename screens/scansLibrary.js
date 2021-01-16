import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

export default function ScansLibrary( {storage} ) {
    const [cameraParams, setCameraParams] = useState({
        hasPermission: null,
        type: Camera.Constants.Type.back
    })
    const ref = useRef(null)

    useEffect(() => {
        Permissions.askAsync(Permissions.CAMERA)
        .then(({status}) => {
            setCameraParams((prevState) => {
                return {
                    ...prevState,
                    hasPermission: status === 'granted',
                }
            })
        })
        .catch(err => console.log(err))
    }, [])

    const takePicture = () => {
        const reference = storage.ref()
        ref.current.takePictureAsync()
        .then(( {uri} ) => {
            return fetch(uri);
        })
        .then((response) => response.blob())
        .then((blob) =>{
            const imageName = 'image' + '-' + new Date()
            reference.child(imageName).put(blob)
        })
        .then((snapshot) => {
            console.log('Uploaded image file successfully')
        })
        .catch(err => console.log(err))
    }

    return (
    <>
        {
            cameraParams.hasPermission === null ? <View /> : (
                cameraParams.hasPermission === false ? <Text>No access to camera</Text> : (
                <View style={styles.container}>
                    <Camera style={styles.camera} type={cameraParams.type} ref={ref}>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={()=> takePicture()}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../assets/button.png')}
                            />
                        
                        </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
                )
            )
        }
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
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
        width: 75,
        height: 75,
    },
  });
