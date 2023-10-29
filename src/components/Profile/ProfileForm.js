import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
    useRef,
} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Input as RNInput,
    useWindowDimensions,
    KeyboardAvoidingView,
    SafeAreaView,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    ScrollView,
    StatusBar,
    Linking,
} from 'react-native';
import { Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuid } from 'uuid';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PhoneInput from '../ui/PhoneInput';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme, Surface, FAB } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
// *  CAMERA INTEGRATION
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import Button from '../ui/IButton';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';

import CustomButton from '../ui/CustomButton';
import { updateProfile } from '../../jerichoQL/providers/users.provider';
import Input from '../ui/Input';
import {
    printObject,
    dateDashToDateObject,
    todayMinus60,
    getPhoneType,
    transformPatePhone,
    createPatePhone,
} from '../../utils/helpers';
import { STATESBY2, SHIRTSIZESBY2 } from '../../constants/meeter';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserProfile } from '../../features/user/userThunks';
//   FUNCTION START
//   ===============
const ProfileForm = ({ handleUpdate, handleCancel, profile }) => {
    printObject('PF:59-->profile:\n', profile);
    const today = new Date();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showProfileSaved, setShowProfileSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);
    const [isStateFocus, setIsStateFocus] = useState(false);
    const [isShirtFocus, setIsShirtFocus] = useState(false);
    const [modalBirthDateVisible, setModalBirthDateVisible] = useState(false);
    const [birthDay, setBirthday] = useState(
        profile?.birthday
            ? new Date(profile.birthday)
            : today?.toISOString().slice(0, 10)
    );
    const mtrTheme = useTheme();
    const { width, height } = useWindowDimensions();
    //      the picture S3 reference
    const [profilePicRef, setProfilePicRef] = useState(null);
    const profilePicture = useRef(null);
    //      the picture file
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicDetails, setProfilePicDetails] = useState(null);
    const meeter = useSelector((state) => state.system.meeter);
    const [stateProv, setStateProv] = useState(
        profile?.location?.stateProv || ''
    );
    const [showPhoneError, setShowPhoneError] = useState(false);
    //* CAMERA VARIABLES
    //************************* */
    const [cameraImage, setCameraImage] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [flashMode, toggleFlashMode] = useState(
        Camera.Constants.FlashMode.off
    );
    const [showCameraModal, setShowCameraModal] = useState(false);
    const [cameraData, setCameraData] = useState(null);
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
        useState();
    // phone control needs the value in numeric format. Check if we need to
    // alter to use
    let phoneDisplayValue;
    if (profile?.phone) {
        let phoneType = getPhoneType(profile?.phone);

        switch (phoneType) {
            case 'PATE':
                phoneDisplayValue = profile.phone;
                break;
            case 'MASKED':
                // console.log('REC:57 tmp.contact.phone', tmp.contact.phone);
                phoneDisplayValue = createPatePhone(profile.phone);
                break;
            default:
                phoneDisplayValue = '';
                break;
        }
    } else {
        phoneDisplayValue = '';
    }
    const [values, setValues] = useState({
        uid: profile.id,
        username: profile.username ? profile.username : '',
        firstName: profile?.firstName ? profile.firstName : '',
        lastName: profile?.lastName ? profile.lastName : '',
        street: profile?.location?.street ? profile.location.street : '',
        city: profile?.location?.city ? profile.location.city : '',
        stateProv: profile?.location?.stateProv
            ? profile.location.stateProv
            : '',
        postalCode: profile?.location?.postalCode
            ? profile?.location?.postalCode
            : '',
        email: profile?.email ? profile.email : '',
        phone: phoneDisplayValue,
        birthday: profile?.birthday ? profile.birthday.substr(0, 10) : '',
        shirt: profile?.shirt ? profile.shirt.toUpperCase() : '',
        picture: profile?.picture || meeter?.defaultProfilePicture,
    });
    const [isFirstNameValid, setIsFir597stNameValid] = useState(
        values?.firstName?.length > 1 ? true : false
    );
    const [isLastNameValid, setIsLastNameValid] = useState(
        values?.lastName?.length > 2 ? true : false
    );
    useEffect(() => {
        let dateObj = dateDashToDateObject(values?.birthday);

        // printObject('dateObj:', dateObj);
        setBirthday(dateObj);
        //=======================
        let picRef;

        if (profile.picture) {
            picRef = profile.picture;
        } else {
            //picRef = meeter.defaultProfilePicture;
            picRef = meeter.defaultProfilePicture;
        }
        setProfilePicRef(picRef);
        Storage.get(picRef, {
            level: 'public',
        }).then((hardPic) => {
            setProfilePic(hardPic);
            // printObject('PF:132-->Storage.get', hardPic);
            profilePicture.current = hardPic;
        });
    }, []);

    //* Camera Permissions and settings
    async function getPermissions() {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission =
            await MediaLibrary.requestPermissionsAsync();
        printObject('cameraPermission:', cameraPermission);
        if (cameraPermission.status === 'granted') {
            console.log('CAMERA PERMISSION GRANTED');

            //setHasCameraPermission(true);
        }
        // setHasCameraPermission(cameraPermission.status === 'granted');
        printObject('mediaLibraryPermission:', mediaLibraryPermission);
        if (mediaLibraryPermission.status === 'granted') {
            console.log('MEDIA LIBRARY PERMISSION GRANTED');
            setHasMediaLibraryPermission(true);
            //     setHasMediaLibraryPermission(true);
        }
        // setHasMediaLibraryPermission(
        //     mediaLibraryPermission.status === 'granted'
        // );
    }
    useEffect(() => {
        // getPermssions();
        (async () => {
            const cameraPermission =
                await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission =
                await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
            setHasMediaLibraryPermission(
                mediaLibraryPermission.status === 'granted'
            );
        })();
        //   return () => {
        //     second
        //}
    }, []);
    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }
    // if (hasCameraPermission === undefined) {
    //     return (
    //         <View>
    //             <Text>Rquesting camera permissions...</Text>
    //         </View>
    //     );
    // } else if (!hasCameraPermission) {
    //     return (
    //         <View>
    //             <Text>
    //                 Permission for the camera not granted. Please change in
    //                 settings.
    //             </Text>
    //         </View>
    //     );
    // }
    useEffect(() => {
        let picRef;

        if (profile.picture) {
            picRef = profile.picture;
        } else {
            //picRef = meeter.defaultProfilePicture;
            picRef = meeter.defaultProfilePicture;
        }
        setProfilePicRef(picRef);
        Storage.get(picRef, {
            level: 'public',
        }).then((hardPic) => {
            // printObject('PF:208-->Storage.get', hardPic);
            setProfilePic(hardPic);
        });
    }, []);

    const FormatBirthDate = (data) => {
        // printObject('PF:78-->data:', data);
        let dateString =
            data.getMonth() +
            1 +
            '-' +
            data.getDate() +
            '-' +
            data.getFullYear() +
            ' ';
        const yr = parseInt(data.getFullYear());
        const mo = parseInt(data.getMonth());
        const da = parseInt(data.getDate());
        const tmp = new Date(yr, mo, da, 0, 0, 0);
        // printObject('PF:93-->tmp', tmp);
        //setBirthday(tmp);
        //make string to save in values.
        let mtgDateString =
            data.getFullYear() +
            '-' +
            ('0' + (data.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + data.getDate()).slice(-2);
        let dateObj = dateDashToDateObject(values?.birthday);
        setBirthday(dateObj);
        // printObject('PF:102-->mtgDateString', mtgDateString);
        const newValues = {
            ...values,
            birthday: mtgDateString,
        };
        // printObject('PF:107--newValues', newValues);
        setValues(newValues);
        //setDateValue(tmp);

        return;
    };
    const onBirthDateConfirm = (data) => {
        FormatBirthDate(data);
        setBirthday(data);
        setModalBirthDateVisible(false);
    };
    const onBirthDateCancel = () => {
        setModalBirthDateVisible(false);
    };
    function inputChangedHandler(inputIdentifier, enteredValue) {
        // console.log('inputChangeHandler::inputIdentifier:', inputIdentifier);
        setValues((curInputValues) => {
            if (inputIdentifier === 'firstName') {
                if (enteredValue.length < 2) {
                    setIsFirstNameValid(false);
                } else {
                    setIsFirstNameValid(true);
                }
            }
            if (inputIdentifier === 'lastName') {
                if (enteredValue.length < 2) {
                    setIsLastNameValid(false);
                } else {
                    setIsLastNameValid(true);
                }
            }
            if (inputIdentifier === 'shirt') {
                printObject('PF:304-->inputIdentifier:\n', inputIdentifier);
                printObject('PF:305-->enteredValue:\n', enteredValue);
                let shirt = enteredValue;
                let newValues = { ...curInputValues, shirt };
                printObject('PF:308-->newValues:\n', newValues);
                curInputValues = newValues;
                return curInputValues;
            }
            if (inputIdentifier === 'stateProv') {
                let stateProv = enteredValue;
                let newValues = { ...curInputValues, stateProv };
                curInputValues = newValues;
                return curInputValues;
            }
            if (inputIdentifier === 'postalCode') {
                //* entered value has to be numeric and no greater than 5 digits
                try {
                    if (!isNaN(enteredValue)) {
                        if (
                            parseInt(enteredValue) > 0 &&
                            parseInt(enteredValue) < 100000
                        ) {
                            let postalCode = enteredValue;
                            let newValues = { ...curInputValues, postalCode };
                            curInputValues = newValues;
                            return cuInputValues;
                        } else {
                            return curInputValues;
                        }
                    } else {
                        let postalCode = values?.postalCode;
                        let newValues = { ...curInputValues, postalCode };
                        curInputValues = newValues;
                        return curInputValues;
                    }
                } catch (error) {}
            }
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }

    useLayoutEffect(() => {
        let headerLabelColor = '';
        if (Platform.OS === 'ios') {
            headerLabelColor = 'white';
        }
        navigation.setOptions({
            // title: meeter.appName,
            headerBackTitle: 'Back',
        });
    }, [navigation]);

    const fetchImageFromUri = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };
    const saveProfileToS3 = async (imageFilename) => {
        //      this saves the file to S3 and returns the ref
        printObject('PF:296-->imageFilename to save:\n', imageFilename);
        printObject('PF:297-->profile.picture: ', profile.picture);
        try {
            console.log('trying to save to s3');
            const img = await fetchImageFromUri(profilePic);
            const results = await Storage.put(imageFilename, img);
            console.log('done trying');
        } catch (error) {
            printObject('PF:304->>failure trying to save to s3');
        }
    };
    const handleFormSubmit = async () => {
        setIsLoading(true);
        if (savingProfile) return;
        setSavingProfile(true);
        // printObject('PF:310-->handleFormSubmit start', null);
        // printObject('PF:311-->profilePicDetails:', profilePicDetails);
        let oldProfilePictureName = null;
        let pictureToSave;
        if (cameraData) {
            // printObject('PF:315-->we have cameraData', cameraData);
            if (profile?.picture) {
                // printObject(
                //     'PF:317-->we have a profile picture:',
                //     profile.picture
                // );
                oldProfilePictureName = profile.picture;
            } else {
                // printObject('NO profile picture:', profile);
                oldProfilePictureName = null;
            }
            //      create new profile picture name
            const newNameParts = cameraData.uri.split('/');
            const target = newNameParts.length;
            const newFileName = newNameParts[target - 1];
            // console.log('PF:330-->old file: ', oldProfilePictureName);
            // console.log('PF:331-->new file: ', newFileName);
            try {
                const response = await fetch(cameraData.uri);
                const img = await response.blob();
                const results = await Storage.put(newFileName, img);

                pictureToSave = newFileName;
                // delete the previously used S3 image.
                if (oldProfilePictureName != meeter.defaultProfilePicture) {
                    // delete the S3 file
                    // console.log('PF:338-->DELETE: ', oldProfilePictureName);
                    try {
                        await Storage.remove(oldProfilePictureName);
                    } catch (error) {
                        console.error(error);
                    }
                }
            } catch (error) {
                // printObject('PF:346-->error saving S3:\n', error);
                printObject('PF:425-->error:\n', error);
                Console.warn('Could not save image. Please try later.');
                pictureToSave = profile?.picture;
            }
        } else {
            // printObject(
            //     'PF:352-->no profile pic changes, continue to save profile',
            //     null
            // );
            pictureToSave = profile?.picture;
        }
        //* --------------------------
        //* prep the phone number
        //* --------------------------
        let phoneToPass;
        if (values?.phone) {
            //ensure that the phone is in expected format (xxx) xxx-xxxx
            // 1. value needs to be either 0 or 14 characters.
            let phoneValue = values.phone;
            let phoneOkay = false;
            if (phoneValue.length === 10 && phoneValue.indexOf(')') === -1) {
                phoneOkay = true;
            } else if (
                phoneValue.indexOf(')') === 4 &&
                phoneValue.length === 14
            ) {
                phoneOkay = true;
            }
            if (phoneOkay === false) {
                setShowPhoneError(true);
                return;
            }
            if (values.phone) {
                let pType = getPhoneType(values.phone);
                switch (pType) {
                    case 'PATE':
                        phoneToPass = transformPatePhone(values.phone);
                        break;
                    case 'MASKED':
                        phoneToPass = values.phone;
                        break;
                    default:
                        phoneToPass = '';
                        break;
                }
            } else {
                phoneToPass = '';
            }
        } else {
            phoneToPass = '';
        }
        // printObject('PF:475-->profile:\n', profile);
        if (
            values?.street ||
            values?.city ||
            values?.stateProv ||
            values?.postalCode
        ) {
            const newLocation = {
                street: values?.street || null,
                city: values?.city || null,
                stateProv: values?.stateProv || null,
                postalCode: values?.postalCode || null,
            };
            profile = {
                ...profile,
                location: newLocation,
            };
        } else {
            // no address info provided.
            //      if we have locationUsersId we need
            //      to clear the data
            if (profile?.locationUsersId !== null) {
                console.log('NEED TO CLEAR THE LOCATION DATA');
            } else {
                console.log('NO locationUsersId, nothting to update');
            }
            profile.location = null;
        }

        const resultantProfile = {
            ...profile,
            phone: phoneToPass,
            birthday: values?.birthday || null,
            shirt: values?.shirt || null,
            picture: pictureToSave || null,
        };

        // console.log('PF:491-->old name', oldProfilePictureName);
        // console.log('PF:492-->new name:', pictureToSave);
        // printObject('PF:516-->resultantProfile:\n', resultantProfile);
        //      ========================
        //      save the form to graphql
        //      ========================
        updateProfile(resultantProfile)
            .then((results) => {
                //then update context
                let newValues = {
                    ...resultantProfile,
                    ...results,
                };
                dispatch(saveUserProfile(newValues));
            })
            .catch((err) => {
                printObject(
                    'PF:495-->Error updating via Provider failed:\n',
                    err
                );
            });
        //handleUpdate(resultantProfile);
        setShowProfileSaved(true);
        setIsLoading(false);
        setSavingProfile(false);
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePicDetails(result.assets[0]);
            setProfilePic(result.assets[0].uri);
        }
    };
    const handlePictureClick = async () => {
        //* ---------------------------------
        //* take a picture
        //* ---------------------------------
        if (!cameraRef) return;

        if (cameraRef) {
            try {
                console.log('inside try');
                const data = await cameraRef.takePictureAsync();
                //const data = await cameraRef.current.takePictureAsync();
                printObject('camera data:\n', data);
                setCameraData(data);
                setCameraImage(data.uri);
            } catch (error) {
                printObject('Error taking picture', error);
            }
        }
        setShowCameraModal(false);
    };
    // printObject('PF:489--screen refresh values:', values);
    // printObject('PF:490-->cameraImage:', cameraImage);
    // printObject('PF:491-->profilePic:', profilePic);
    // printObject('PF:452-->profilePicture: \n', profilePicture);
    // console.log('type of birthDay:', typeof birthDay);
    // printObject('birthDay:\n', birthDay);
    // console.log('type of values.birthday:', typeof values.birthday);
    // printObject('values.birthday:\n', values.birthday);
    if (isLoading) {
        return (
            <View style={mtrStyles(mtrTheme).activityIndicatorContainer}>
                <ActivityIndicator
                    color={mtrStyles(mtrTheme).activityIndicator}
                    size={80}
                />
            </View>
        );
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <>
                    <KeyboardAvoidingView behavior='padding'>
                        <Modal
                            visible={showProfileSaved}
                            animationStyle='slide'
                        >
                            <View style={mtrStyles(mtrTheme).modal}>
                                <View
                                    style={
                                        mtrStyles(mtrTheme)
                                            .modalSurfaceContainer
                                    }
                                >
                                    <Surface
                                        style={mtrStyles(mtrTheme).modalSurface}
                                    >
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .warningContainer
                                            }
                                        >
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .modalHeaderText
                                                }
                                            >
                                                Profile Saved
                                            </Text>
                                        </View>

                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .buttonContainer
                                            }
                                        >
                                            <View
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .buttonWrapper
                                                }
                                            >
                                                <CustomButton
                                                    text='OK'
                                                    bgColor={
                                                        mtrTheme.colors
                                                            .mediumGreen
                                                    }
                                                    fgColor={
                                                        mtrTheme.colors
                                                            .lightText
                                                    }
                                                    onPress={() =>
                                                        setShowProfileSaved(
                                                            false
                                                        )
                                                    }
                                                />
                                            </View>
                                        </View>
                                    </Surface>
                                </View>
                                <StatusBar style='auto' />
                            </View>
                        </Modal>
                        <Modal visible={showCameraModal} animationStyle='slide'>
                            <Surface
                                style={mtrStyles(mtrTheme).cameraContainer}
                            >
                                <View>
                                    <Text
                                        style={
                                            mtrTheme.meetingEditDeleteModalTitle
                                        }
                                    >
                                        Take a picture
                                    </Text>
                                </View>
                                <Camera
                                    style={mtrStyles(mtrTheme).camera}
                                    type={type}
                                    flashMode={flashMode}
                                    ref={(r) => {
                                        cameraRef = r;
                                    }}
                                ></Camera>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        marginTop: 30,
                                    }}
                                >
                                    <View
                                        style={
                                            mtrStyles(mtrTheme)
                                                .cameraControlRotate
                                        }
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                setType(
                                                    type === CameraType.back
                                                        ? CameraType.front
                                                        : CameraType.back
                                                );
                                            }}
                                        >
                                            <MaterialCommunityIcons
                                                name='rotate-3d-variant'
                                                size={36}
                                                color='white'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={
                                            mtrStyles(mtrTheme)
                                                .cameraControlCapture
                                        }
                                    >
                                        <TouchableOpacity
                                            onPress={() => handlePictureClick()}
                                        >
                                            <MaterialIcons
                                                name='camera'
                                                size={36}
                                                color='white'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Surface>
                        </Modal>
                        <>
                            <KeyboardAvoidingView behavior='padding'>
                                <ScrollView>
                                    <View
                                        style={mtrTheme.profileImageContainer}
                                    >
                                        <View>
                                            <View
                                                style={
                                                    mtrTheme.profileImageFrame
                                                }
                                            >
                                                <View
                                                    style={{
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                >
                                                    <Image
                                                        // source={require('../../assets/user-profile.jpeg')}
                                                        source={{
                                                            uri: cameraImage
                                                                ? cameraImage
                                                                : profilePic,
                                                        }}
                                                        style={
                                                            mtrTheme.profileImage
                                                        }
                                                    />
                                                </View>

                                                <FAB
                                                    icon='camera'
                                                    style={
                                                        mtrStyles(mtrTheme).fab
                                                    }
                                                    onPress={() =>
                                                        setShowCameraModal(true)
                                                    }
                                                />
                                            </View>

                                            <View style={{ paddingTop: 5 }}>
                                                <Text
                                                    style={{
                                                        color: mtrTheme.colors
                                                            .accent,
                                                    }}
                                                >
                                                    {profile?.firstName}{' '}
                                                    {profile?.lastName}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={mtrTheme.profileFormRowStyle}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View
                                                style={
                                                    showPhoneError
                                                        ? mtrStyles(mtrTheme)
                                                              .phoneWrapperError
                                                        : mtrStyles(mtrTheme)
                                                              .phoneWrapper
                                                }
                                            >
                                                <View>
                                                    <Text
                                                        style={
                                                            mtrTheme.profileFormInputTitle
                                                        }
                                                    >
                                                        Phone
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    <View>
                                                        <PhoneInput
                                                            overrideStyle={
                                                                mtrStyles(
                                                                    mtrTheme
                                                                ).phoneInput
                                                            }
                                                            value={values.phone}
                                                            onChange={inputChangedHandler.bind(
                                                                this,
                                                                'phone'
                                                            )}
                                                        />
                                                    </View>
                                                </View>
                                                {showPhoneError && (
                                                    <View>
                                                        <Text
                                                            style={
                                                                mtrStyles(
                                                                    mtrTheme
                                                                ).phoneError
                                                            }
                                                        >
                                                            Phone number
                                                            incomplete
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    </View>

                                    <View style={mtrTheme.profileFormRowStyle}>
                                        <View>
                                            <View>
                                                <Text
                                                    style={
                                                        mtrTheme.profileFormInputTitle
                                                    }
                                                >
                                                    Birthday
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setModalBirthDateVisible(
                                                        true
                                                    )
                                                }
                                            >
                                                <View
                                                    style={{
                                                        alignItems: 'center',
                                                        paddingHorizontal: 2,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            backgroundColor:
                                                                mtrTheme.colors
                                                                    .lightGrey,
                                                            // maxWidth: 170,
                                                            // minWidth: 170,
                                                            marginRight: 10,
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: mtrTheme
                                                                    .colors
                                                                    .darkText,
                                                                fontSize:
                                                                    values?.birthday
                                                                        ? 24
                                                                        : 18,
                                                                fontWeight:
                                                                    values?.birthday
                                                                        ? '500'
                                                                        : '200',
                                                                padding: 5,
                                                            }}
                                                        >
                                                            {values.birthday
                                                                ? values.birthday
                                                                : 'undefined    '}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                            <View>
                                                <Text
                                                    style={
                                                        mtrTheme.profileFormInputTitle
                                                    }
                                                >
                                                    Shirt
                                                </Text>
                                            </View>
                                            <Dropdown
                                                style={[
                                                    mtrStyles(mtrTheme)
                                                        .dropdown,
                                                    isStateFocus && {
                                                        borderColor: 'blue',
                                                    },
                                                ]}
                                                placeholderStyle={
                                                    mtrStyles(mtrTheme)
                                                        .placeholderStyle
                                                }
                                                selectedTextStyle={
                                                    mtrStyles(mtrTheme)
                                                        .selectedTextStyle
                                                }
                                                inputSearchStyle={
                                                    mtrStyles(mtrTheme)
                                                        .inputSearchStyle
                                                }
                                                containerStyle={
                                                    mtrStyles(mtrTheme)
                                                        .dropDownContainer
                                                }
                                                itemContainerStyle={{
                                                    paddingVertical: 0,
                                                    marginVertical: 0,
                                                }}
                                                iconStyle={
                                                    mtrStyles(mtrTheme)
                                                        .iconStyle
                                                }
                                                data={SHIRTSIZESBY2}
                                                search={false}
                                                maxHeight={300}
                                                labelField='label'
                                                valueField='value'
                                                // placeholder={!isShirtFocus ? 'Shirt' : '...'}
                                                //searchPlaceholder='Search...'
                                                value={values?.shirt}
                                                onFocus={() =>
                                                    setIsShirtFocus(true)
                                                }
                                                onBlur={() =>
                                                    setIsShirtFocus(false)
                                                }
                                                onChange={(item) => {
                                                    inputChangedHandler(
                                                        'shirt',
                                                        item.value
                                                    ),
                                                        //setStateValue(item.value);
                                                        setIsShirtFocus(false);
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={mtrTheme.profileFormRowStyle}>
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.profileFormSectionHeader
                                                }
                                            >
                                                Residence
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={
                                            mtrTheme.profileFormResidenceBorder
                                        }
                                    >
                                        <View
                                            style={mtrTheme.profileFormRowStyle}
                                        >
                                            <View style={{ minWidth: '90%' }}>
                                                <Input
                                                    label='Street'
                                                    labelStyle={
                                                        mtrTheme.profileFormInputTitle
                                                    }
                                                    textInputConfig={{
                                                        backgroundColor:
                                                            mtrTheme.colors
                                                                .lightGrey,
                                                        value: values?.street,
                                                        paddingHorizontal: 5,
                                                        marginRight: 5,
                                                        fontSize: 24,
                                                        color: mtrTheme.colors
                                                            .darkText,
                                                        marginHorizontal: 0,
                                                        placeholder: 'Street',
                                                        style: {
                                                            color: mtrTheme
                                                                .colors
                                                                .darkText,
                                                        },
                                                        fontWeight: '500',
                                                        //fontFamily: 'Roboto-Regular',
                                                        letterSpacing: 0,
                                                        onChangeText:
                                                            inputChangedHandler.bind(
                                                                this,
                                                                'street'
                                                            ),
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View
                                            style={mtrTheme.profileFormRowStyle}
                                        >
                                            <View style={{ minWidth: '90%' }}>
                                                <Input
                                                    label='City'
                                                    labelStyle={
                                                        mtrTheme.profileFormInputTitle
                                                    }
                                                    textInputConfig={{
                                                        backgroundColor:
                                                            mtrTheme.colors
                                                                .lightGrey,
                                                        value: values?.city,
                                                        paddingHorizontal: 5,
                                                        marginRight: 5,
                                                        fontSize: 24,
                                                        color: mtrTheme.colors
                                                            .darkText,
                                                        marginHorizontal: 0,
                                                        placeholder: 'City',
                                                        style: {
                                                            color: mtrTheme
                                                                .colors
                                                                .darkText,
                                                        },
                                                        fontWeight: '500',
                                                        //fontFamily: 'Roboto-Regular',
                                                        letterSpacing: 0,
                                                        onChangeText:
                                                            inputChangedHandler.bind(
                                                                this,
                                                                'city'
                                                            ),
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                mtrTheme.profileFormRowStyle,
                                                {
                                                    justifyContent:
                                                        'flex-start',
                                                    marginLeft: 20,
                                                },
                                            ]}
                                        >
                                            <View style={{ marginRight: 10 }}>
                                                <View>
                                                    <Text
                                                        style={
                                                            mtrTheme.profileFormInputTitle
                                                        }
                                                    >
                                                        State
                                                    </Text>
                                                </View>
                                                <Dropdown
                                                    style={[
                                                        mtrStyles(mtrTheme)
                                                            .dropdown,
                                                        isStateFocus && {
                                                            borderColor: 'blue',
                                                        },
                                                    ]}
                                                    placeholderStyle={
                                                        mtrStyles(mtrTheme)
                                                            .placeholderStyle
                                                    }
                                                    selectedTextStyle={
                                                        mtrStyles(mtrTheme)
                                                            .selectedTextStyle
                                                    }
                                                    inputSearchStyle={
                                                        mtrStyles(mtrTheme)
                                                            .inputSearchStyle
                                                    }
                                                    iconStyle={
                                                        mtrStyles(mtrTheme)
                                                            .iconStyle
                                                    }
                                                    data={STATESBY2}
                                                    search={false}
                                                    maxHeight={300}
                                                    labelField='label'
                                                    valueField='value'
                                                    placeholder={
                                                        !isStateFocus
                                                            ? 'Select State'
                                                            : '...'
                                                    }
                                                    searchPlaceholder='Search...'
                                                    value={stateProv}
                                                    onFocus={() =>
                                                        setIsStateFocus(true)
                                                    }
                                                    onBlur={() =>
                                                        setIsStateFocus(false)
                                                    }
                                                    onChange={(item) => {
                                                        inputChangedHandler(
                                                            'stateProv',
                                                            item.value
                                                        ),
                                                            //setStateValue(item.value);
                                                            setIsStateFocus(
                                                                false
                                                            );
                                                    }}
                                                />
                                            </View>
                                            <View style={{ minWidth: '45%' }}>
                                                <Input
                                                    label='Postal Code'
                                                    labelStyle={
                                                        mtrTheme.profileFormInputTitle
                                                    }
                                                    textInputConfig={{
                                                        backgroundColor:
                                                            mtrTheme.colors
                                                                .lightGrey,
                                                        value: values?.postalCode,
                                                        paddingHorizontal: 5,
                                                        fontSize: 24,
                                                        color: mtrTheme.colors
                                                            .darkText,
                                                        height: 40,
                                                        width: 100,
                                                        placeholder:
                                                            'Postal Code',
                                                        style: {
                                                            color: mtrTheme
                                                                .colors
                                                                .darkText,
                                                        },
                                                        fontWeight: '500',
                                                        letterSpacing: 0,
                                                        onChangeText:
                                                            inputChangedHandler.bind(
                                                                this,
                                                                'postalCode'
                                                            ),
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={mtrStyles(mtrTheme).uidContainer}
                                    >
                                        <Text
                                            style={mtrStyles(mtrTheme).uidText}
                                        >
                                            UID: {profile?.id}
                                        </Text>
                                    </View>
                                    <View
                                        style={
                                            mtrStyles(mtrTheme)
                                                .saveButtonContainer
                                        }
                                    >
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .saveButtonWrapper
                                            }
                                        >
                                            <CustomButton
                                                text={
                                                    savingProfile
                                                        ? 'Saving...'
                                                        : 'SAVE'
                                                }
                                                bgColor={
                                                    mtrTheme.colors.mediumGreen
                                                }
                                                fgColor={
                                                    mtrTheme.colors.lightText
                                                }
                                                type='PRIMARY'
                                                enabled={
                                                    isFirstNameValid &&
                                                    isLastNameValid
                                                }
                                                onPress={handleFormSubmit}
                                            />
                                        </View>
                                    </View>
                                    {profile.organizationDefaultUsersId ===
                                        profile?.activeOrg?.id && (
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .affButtonContainer
                                            }
                                        >
                                            <TouchableOpacity
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'Affiliation'
                                                    )
                                                }
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .affButton
                                                }
                                            >
                                                <Text
                                                    style={
                                                        mtrStyles(mtrTheme)
                                                            .affButtonText
                                                    }
                                                >
                                                    AFFILIATIONS
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    <DateTimePickerModal
                                        isVisible={modalBirthDateVisible}
                                        mode='date'
                                        date={
                                            values.birthday ? birthDay : today
                                        }
                                        display='inline'
                                        dateTextStyle={{
                                            color: mtrTheme.colors.lightText,
                                        }}
                                        headerLabelColor={{
                                            color: mtrTheme.colors.accent,
                                        }}
                                        headerBackTitle={{
                                            color: mtrTheme.colors.accent,
                                        }}
                                        onConfirm={onBirthDateConfirm}
                                        onCancel={onBirthDateCancel}
                                    />
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </>
                        {/* )} */}
                    </KeyboardAvoidingView>
                </>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileForm;

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
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
        activityIndicatorContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {
            color: mtrTheme.colors.lightGraphic,
        },
        modal: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mtrTheme.colors.background,
        },
        modalHeaderContainer: {
            backgroundColor: mtrTheme.colors.background,
        },
        modalHeaderText: {
            fontFamily: 'Roboto-Bold',
            fontSize: 28,
            fontWeight: '700',
            color: mtrTheme.colors.mediumGrey,
            textAlign: 'center',
            paddingTop: 10,
        },
        modalSurfaceContainer: {
            alignItems: 'center',
            width: '80%',
            marginTop: 15,
        },
        modalSurface: {
            backgroundColor: mtrTheme.colors.lightGraphic,
            width: '90%',
            borderRadius: 10,
            padding: 20,
        },
        buttonContainer: {
            marginTop: 20,
            marginHorizontal: 20,
            marginBottom: 15,
        },
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
            height: 40,
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

        fab: {
            position: 'absolute',
            backgroundColor: 'white',
            color: 'blue',
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: 1,
            right: 0,
            bottom: 0,
        },
        cameraContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        camera: {
            flex: 0.5,
        },
        cameraControlRotate: {
            flex: 1,
            alignItems: 'flex-start',
            paddingLeft: 20,
        },
        cameraControlCapture: {
            flex: 1,
            alignItems: 'flex-end',
            paddingRight: 20,
        },
        phoneWrapper: {
            marginBottom: 10,
        },
        phoneInput: {
            borderColor: 'lightgrey',
            borderWidth: 2,
            borderRadius: 6,
            backgroundColor: 'lightgrey',
        },
        phoneWrapperError: {
            marginBottom: 10,
        },
        phoneError: {
            color: 'red',
            fontSize: 18,
            fontWeight: 'bold',
        },
        uidContainer: {
            alignItems: 'center',
        },
        uidText: {
            color: mtrTheme.colors.mediumGrey,
            fontSize: 10,
        },
        saveButtonContainer: {
            marginBottom: 10,
        },
        saveButtonWrapper: {
            marginTop: 5,
            marginHorizontal: 20,
            marginBottom: 15,
        },
        affButtonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        affButton: {
            backgroundColor: mtrTheme.colors.lightBlue,
            borderRadius: 5,
        },
        affButtonText: {
            fontSize: 14,
            color: mtrTheme.colors.lightText,
            fontFamily: 'Roboto-Regular',
            textAlign: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
        },
        // cameraControlsContainer: {
        //     flexDirection: 'row',
        //     alignItems: 'center',
        //     alignContent: 'space-around',
        // },
        // cameraRotateContainer: {
        //     backgroundColor: 'grey',
        //     borderColor: 'yellow',
        //     borderWidth: 1,
        // },
        // cameraButton: {
        //     flex: 1,
        //     alignSelf: 'flex-end',
        //     alignItems: 'center',
        // },
    });
