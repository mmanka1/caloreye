import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default function ScansLibrary( {storage, environment, navigation} ) {
    const [cameraParams, setCameraParams] = useState({
        hasPermission: null,
        type: Camera.Constants.Type.back
    })
    const ref = useRef(null)
    const [image, setImage] = useState({uri: null})

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
            const imageName = 'image-nutrition-facts'
            return reference.child(imageName).put(blob)
        })
        .then((snapshot) => {
            console.log('Uploaded image file successfully')
	        return snapshot.ref.getDownloadURL();
        })
        .then((uploadUrl) => {
            setImage({uri: uploadUrl})
        })
        .catch(err => console.log(err))
    }

    const getMacroValue = (macroCount, word) => {
        let numberArray = []
        let foundLetter = false
        let count = macroCount
        while (foundLetter === false) {
            if ((/[a-zA-Z]/).test(word.charAt(count)) || word.charAt(count) === "%") {
                foundLetter = true
            } else {
                numberArray.push(word.charAt(count))
            }
            count++
        }
        return numberArray.toString().replace(/,/g, '')
    }
 

    const handleGoogleResponse = (res) => {
        let wordsList = []
        res.responses.forEach(response => { 
            response.fullTextAnnotation.pages.forEach(page => {
                page.blocks.forEach(block => {
                    block.paragraphs.forEach(paragraph => {
                        paragraph.words.forEach(word => {
                            word.symbols.forEach(symbol => {
                                wordsList.push(symbol.text)
                            })
                        })
                    })
                })
            })
        })
        const searchStr = wordsList.toString().replace(/,/g, '')

        const indexOfCalories = searchStr.indexOf("Calories") + 8
        const indexOfFat = searchStr.indexOf("Fat") + 3
        const indexOfCarbs = searchStr.indexOf("Carbohydrate") + 12
        const indexOfProtein = searchStr.indexOf("Protein") + 7
        
        const calorieCount = indexOfCalories
        const fatCount = indexOfFat
        const carbCount = indexOfCarbs
        const proteinCount = indexOfProtein

        const numCalories = parseInt(getMacroValue(calorieCount, searchStr))
        const numFat = parseInt(getMacroValue(fatCount, searchStr))
        const numCarbs = parseInt(getMacroValue(carbCount, searchStr))
        const numProtein = parseInt(getMacroValue(proteinCount, searchStr))

        setImage({uri: null})
        navigation.navigate('Nutrition Summary', {
            calories: numCalories,
            fat: numFat,
            carbs: numCarbs,
            protein: numProtein,
        });
    }

    const textDetector = () => {
        const googleStorageImg = image.uri.substring(image.uri.lastIndexOf('/') + 1, image.uri.indexOf('?'))
        const googleStorageUri = 'gs://' + environment['FIREBASE_STORAGE_BUCKET'] + '/' + googleStorageImg
        let body = JSON.stringify({
            requests: [
                {
                    features: [
                        { type: 'TEXT_DETECTION', maxResults: 5 }
                    ],
                    image: {
                        source: {
                            imageUri: googleStorageUri
                        }
                    }
                }
            ]
        });
        fetch(
            'https://vision.googleapis.com/v1/images:annotate?key=' +
                environment['GOOGLE_CLOUD_VISION_API_KEY'],
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: body
            }
        )
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            handleGoogleResponse(responseJson)
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
                        {//If no picture taken, show take picture button, otherwise show checkmark button
                        image.uri === null ? (
                            <TouchableOpacity style={styles.button} onPress={() => takePicture()}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('../assets/button.png')}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.button} onPress={() => textDetector()}>
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('../assets/checkmark.png')}
                                />
                            </TouchableOpacity>
                        )
                        }
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
