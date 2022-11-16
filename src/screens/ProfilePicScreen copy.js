import React, { useLayoutEffect, useCallback, useState } from 'react';
import {
    Text,
    View,
    Image,
    Pressable,
    AppState,
    StyleSheet,
    useWindowDimensions,
    Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Amplify, Storage } from 'aws-amplify';
import Button from '../components/ui/IButton';
import ImageViewer from '../components/ui/ImageViewer';
import CustomButton from '../components/ui/CustomButton';
import { printObject } from '../utils/helpers';
const PlaceholderImage = require('../../assets/user-profile.jpeg');

//   FUNCTION START
//   ==============
const ProfilePicScreen = (props) => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const mtrTheme = useTheme();

    const meeter = useSelector((state) => state.system);
    const user = useSelector((state) => state.users.currentUser);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileData, setFileData] = useState();
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };
    const uploadFile = async () => {
        const result = Storage.put(fileData.name, fileData, {
            resumable: true,
            contentType: fileData.type,
        });
        console.log(21, result);
    };

    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>Picture Picker</Text>
                </View>
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
                                    source={require('../../assets/user-profile.jpeg')}
                                    style={{
                                        height: 80,
                                        aspectRatio: 1,

                                        borderRadius: 40,
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ paddingTop: 5 }}>
                            <Text style={{ color: mtrTheme.colors.accent }}>
                                {user.firstName} {user.lastName}
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text>This is where you change your profile picture</Text>
                </View>

                <View style={styles.container}>
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
                            onPress={pickImageAsync}
                        />
                        <Button label='Use this photo' />
                    </View>
                    <StatusBar style='auto' />
                </View>
            </Surface>
        </>
    );
};

export default ProfilePicScreen;
const styles = StyleSheet.create({
    formContainer: {
        //marginTop: 10,
    },
    rowStyle: {
        marginTop: 5,
    },
    errorContainer: {
        marginTop: 2,
        marginLeft: 20,
    },
    errorText: {
        color: 'red',
        fontWeight: '700',
    },
    buttonContainer: { marginTop: 20, marginHorizontal: 20 },
    button: {
        backgroundColor: 'blue',
        marginHorizontal: 20,
        marginTop: 20,
    },
    dropDownLabel: {
        color: 'white',
        fontSize: 24,
        fontWeight: '500',
        fontFamily: 'Roboto-Regular',
        letterSpacing: 0,
    },
    dropdown: {
        height: 30,
        borderColor: 'gray',
        color: 'black',
        fontWeight: 500,
        fontSize: 30,
        backgroundColor: 'lightgrey',
        marginVertical: 1,
        minWidth: 65,
        maxWidth: 65,
        borderWidth: 0.5,
        borderRadius: 1,
        paddingHorizontal: 2,
        paddingVertical: 0,
    },
    dropDownContainer: {
        fontSize: 4,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
    },
    inputSearchStyle: {
        //height: 40,
        fontSize: 16,
    },
    profileImageFrame: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        backgroundColor: 'white',
        color: 'blue',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        //margin: 16,
        right: 0,
        bottom: 0,
    },
    imageView: {
        margin: 20,
    },
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
});
