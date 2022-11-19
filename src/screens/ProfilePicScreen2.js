import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Text, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import { Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react-native';
import Button from '../components/ui/IButton';
import ImageViewer from '../components/ui/ImageViewer';
import { printObject } from '../utils/helpers';

const PlaceholderImage = require('../../assets/user-profile.jpeg');

export default function ProfilePicScreen() {
    const [profileKey, setProfileKey] = useState();
    const [liveImage, setLiveImage] = useState(PlaceholderImage);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileData, setFileData] = useState();
    const mtrTheme = useTheme();
    ///// upload image ////
    const fetchImageUri = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };
    const uploadFile = async (file) => {
        const img = await fetchImageUri(file.uri);
        return Storage.put(`profile_${Math.random()}.jpg`, img, {
            level: 'public',
            contentType: file.type,
            progressCallback(uploadProgress) {
                console.log(
                    'PROGRESS--',
                    uploadProgress.loaded + '/' + uploadProgress.total
                );
            },
        })
            .then((res) => {
                Storage.get(res.key)
                    .then((result) => {
                        setProfileKey(result);

                        console.log('PPS:40-->result --- ', result);
                        let awsImageUri = result.substring(
                            0,
                            result.indexOf('?')
                        );
                        console.log('PPS:45-->awsImageUri', awsImageUri);

                        setIsLoading(false);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((e) => {
                console.log(e);
            });
    };
    ////end upload img ////
    let openImagePickerAsync = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        console.log(pickerResult);
        uploadFile(pickerResult);
        setSelectedImage({ localUri: pickerResult.uri });
    };
    //// fortsson
    const pickImageAsync = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     allowsEditing: true,
        //     quality: 1,
        // });
        let result = await ImagePicker.launchImageLibraryAsync();
        printObject('PPS:20-->ImagePicker result:', result);
        if (!result.cancelled) {
            // setSelectedImage(result.assets[0].uri);
            uploadFile(result);
            setFileData(result);
            setSelectedImage(result.uri);
        } else {
            alert('You did not select any image.');
        }
    };
    // if (selectedImage !== null) {
    //     return (
    //         <View style={styles.container}>
    //             <View>
    //                 <Text style={{ color: 'yellow' }}>WHAT?</Text>
    //             </View>
    //             <Image
    //                 source={{ uri: selectedImage.localUri }}
    //                 style={styles.thumbnail}
    //             />
    //         </View>
    //     );
    // }
    ////end of the other picker ////

    printObject('PPS:100-->selectedImage', selectedImage);
    printObject('PPS:101-->profileKey', profileKey);
    if (isLoading) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator
                    size={75}
                    color={mtrTheme.colors.activityIndicator}
                />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={mtrTheme.profileImageContainer}>
                <View>
                    <View style={styles.profileImageFrame}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                source={liveImage}
                                style={{
                                    height: 80,
                                    aspectRatio: 1,

                                    borderRadius: 40,
                                }}
                            />
                        </View>
                        {profileKey && (
                            <View>
                                <Text style={{ color: 'orange' }}>
                                    Loaded...
                                </Text>
                                <S3Image imgKey={{ uri: profileKey.uri }} />
                            </View>
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.imageContainer}>
                <ImageViewer
                    placeholderImageSource={PlaceholderImage}
                    selectedImage={selectedImage}
                />
            </View>
            <View style={styles.footerContainer}>
                <Button
                    theme='primary'
                    label='Choose a photo'
                    onPress={() => pickImageAsync()}
                />
                <Pressable onPress={() => uploadFile(dataFile)}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: 'white' }}>Use this photo</Text>
                    </View>
                </Pressable>
            </View>
            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        paddingTop: 58,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
});
