import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Input as RNInput,
    useWindowDimensions,
    TouchableOpacity,
} from 'react-native';
import { Storage } from 'aws-amplify';
import { focusManager } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuid } from 'uuid';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme, FAB } from 'react-native-paper';
import { useUserContext } from '../../contexts/UserContext';
import { useSysContext } from '../../contexts/SysContext';
import CustomButton from '../ui/CustomButton';
import Input from '../ui/Input';
import { printObject, dateDashToDateObject } from '../../utils/helpers';
import { STATESBY2, SHIRTSIZESBY2 } from '../../constants/meeter';

//   FUNCTION START
//   ===============
const ProfileForm = ({ handleUpdate, handleCancel }) => {
    const navigation = useNavigation();
    const { userProfile, updateUserProfile } = useUserContext();
    const [isStateFocus, setIsStateFocus] = useState(false);
    const [isShirtFocus, setIsShirtFocus] = useState(false);
    const [modalBirthDateVisible, setModalBirthDateVisible] = useState(false);
    const [birthDay, setBirthday] = useState(new Date(userProfile.birthday));
    const mtrTheme = useTheme();
    const { width } = useWindowDimensions();
    //      the picture S3 reference
    const [profilePicRef, setProfilePicRef] = useState(null);
    //      the picture file
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicDetails, setProfilePicDetails] = useState(null);
    const { meeter } = useSysContext();
    const [stateProv, setStateProv] = useState(
        userProfile?.location?.stateProv || ''
    );

    const [values, setValues] = useState({
        uid: userProfile.id,
        username: userProfile.username ? userProfile.username : '',
        firstName: userProfile?.firstName ? userProfile.firstName : '',
        lastName: userProfile?.lastName ? userProfile.lastName : '',
        street: userProfile?.location?.street
            ? userProfile.location.street
            : '',
        city: userProfile?.location?.city ? userProfile.location.city : '',
        postalCode: userProfile?.location?.postalCode
            ? userProfile?.location?.postalCode
            : '',
        email: userProfile?.email ? userProfile.email : '',
        phone: userProfile?.phone ? userProfile.phone : '',
        birthday: userProfile?.birthday
            ? userProfile.birthday.substr(0, 10)
            : '',
        shirt: userProfile?.shirt ? userProfile.shirt.toUpperCase() : '',
        picture: userProfile?.picture || meeter?.defaultProfilePicture,
    });
    const [isFirstNameValid, setIsFirstNameValid] = useState(
        values.firstName?.length > 1 ? true : false
    );
    const [isLastNameValid, setIsLastNameValid] = useState(
        values.lastName?.length > 2 ? true : false
    );
    useFocusEffect(
        useCallback(() => {
            // printObject('useFocusEffect-->profile:', profile);
            //let dateObj = dateDashToDateObject(values?.birthday);
            //setBirthday(dateObj);
            //setValues(profile);
            // let x = { ...values, ...profile };
            // setValues(x);
            let dateObj = dateDashToDateObject(values?.birthday);

            // printObject('dateObj:', dateObj);
            setBirthday(dateObj);
        }, [])
    );
    useEffect(() => {
        let picRef;

        if (userProfile.picture) {
            picRef = userProfile.picture;
        } else {
            //picRef = meeter.defaultProfilePicture;
            picRef = meeter.defaultProfilePicture;
        }
        setProfilePicRef(picRef);
        Storage.get(picRef, {
            level: 'public',
        }).then((hardPic) => setProfilePic(hardPic));
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
                let shirt = enteredValue;
                let newValues = { ...curInputValues, shirt };

                curInputValues = newValues;
                return curInputValues;
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
    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }
    const fetchImageFromUri = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };
    const saveProfileToS3 = async (imageFilename) => {
        //      this saves the file to S3 and returns the ref

        const img = await fetchImageFromUri(profilePic);
        const results = await Storage.put(imageFilename, img);
    };
    const handleFormSubmit = () => {
        console.log('PF:181-->typeof birthday', typeof birthDay);
        console.log(
            'PF:182-->birthDay.toString:',
            birthDay.toISOString().slice(0, 10)
        );
        //      start image section
        let uploadImage = null;

        if (profilePicDetails?.fileName) {
            //      profilePicDetails not set if no upload
            uploadImage = false; //      we have file, but need confirmation to upload
        }
        let picture;
        if (uploadImage !== null) {
            const nameOnly = profilePicDetails.fileName.slice(0, -4);
            const fileExtension = profilePicDetails.fileName.slice(-4);
            picture = `${nameOnly}_${uuid()}${fileExtension}`;
        } else {
            //      no file to upload
            picture = profilePicRef; //     this should be default value here...
        }

        if (picture !== meeter.defaultProfilePicture) {
            //      not default pic
            if (profilePicRef != picture) {
                //      selected file is different, upload and save
                saveProfileToS3(picture);
            }
        }

        const resultantProfile = {
            phone: values.phone,
            birthday: birthDay,
            shirt: values.shirt,
            picture: picture,
            location: {
                street: values.street,
                city: values.city,
                stateProv: values.stateProv,
                postalCode: values.postalCode,
            },
        };

        //      ========================
        //      save the form to graphql
        //      ========================
        printObject(
            'PF:277--> Profile Form done, resultantProfile:\n',
            resultantProfile
        );
        handleUpdate(resultantProfile);
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log('file information...');
        console.log(result);

        if (!result.canceled) {
            setProfilePicDetails(result.assets[0]);
            setProfilePic(result.assets[0].uri);
        }
    };

    printObject('PF:192__> values:', values);
    return (
        <>
            {/* {mutation.isLoading ? (
                'Adding meeting...'
            ) : ( */}
            <>
                <View style={mtrTheme.profileImageContainer}>
                    <View>
                        <View style={mtrTheme.profileImageFrame}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    // source={require('../../assets/user-profile.jpeg')}
                                    source={{
                                        uri: profilePic,
                                    }}
                                    style={mtrTheme.profileImage}
                                />
                            </View>

                            <FAB
                                icon='image-edit-outline'
                                style={styles.fab}
                                onPress={() => pickImage()}
                            />
                        </View>

                        <View style={{ paddingTop: 5 }}>
                            <Text style={{ color: mtrTheme.colors.accent }}>
                                {userProfile.firstName} {userProfile.lastName}
                            </Text>
                        </View>
                    </View>
                </View>
                <View></View>
                <View style={mtrTheme.profileFormRowStyle}>
                    <View style={{ minWidth: '90%' }}>
                        <Input
                            label='Phone Number'
                            labelStyle={mtrTheme.profileFormInputTitle}
                            textInputConfig={{
                                backgroundColor: 'lightgrey',
                                value: values.phone,
                                paddingHorizontal: 5,
                                marginRight: 5,
                                fontSize: 24,
                                color: 'black',
                                marginHorizontal: 0,
                                placeholder: 'Phone',
                                style: { color: 'black' },
                                fontWeight: '500',
                                //fontFamily: 'Roboto-Regular',
                                letterSpacing: 0,
                                onChangeText: inputChangedHandler.bind(
                                    this,
                                    'phone'
                                ),
                            }}
                        />
                    </View>
                </View>
                <View style={mtrTheme.profileFormRowStyle}>
                    <View>
                        <View>
                            <Text style={mtrTheme.profileFormInputTitle}>
                                Birthday
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setModalBirthDateVisible(true)}
                        >
                            <View
                                style={{
                                    alignItems: 'center',
                                    paddingHorizontal: 2,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: 'lightgrey',
                                        // maxWidth: 170,
                                        // minWidth: 170,
                                        marginRight: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 24,
                                            fontWeight: '500',
                                            padding: 5,
                                        }}
                                    >
                                        {birthDay.toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <View>
                            <Text style={mtrTheme.profileFormInputTitle}>
                                Shirt
                            </Text>
                        </View>
                        <Dropdown
                            style={[
                                styles.dropdown,
                                isStateFocus && { borderColor: 'blue' },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            containerStyle={styles.dropDownContainer}
                            itemContainerStyle={{
                                paddingVertical: 0,
                                marginVertical: 0,
                            }}
                            iconStyle={styles.iconStyle}
                            data={SHIRTSIZESBY2}
                            search={false}
                            maxHeight={300}
                            labelField='label'
                            valueField='value'
                            // placeholder={!isShirtFocus ? 'Shirt' : '...'}
                            //searchPlaceholder='Search...'
                            value={values?.shirt}
                            onFocus={() => setIsShirtFocus(true)}
                            onBlur={() => setIsShirtFocus(false)}
                            onChange={(item) => {
                                inputChangedHandler('shirt', item.value),
                                    //setStateValue(item.value);
                                    setIsShirtFocus(false);
                            }}
                        />
                    </View>
                </View>
                <View style={mtrTheme.profileFormRowStyle}>
                    <View>
                        <Text style={mtrTheme.profileFormSectionHeader}>
                            Residence
                        </Text>
                    </View>
                </View>
                <View style={mtrTheme.profileFormResidenceBorder}>
                    <View style={mtrTheme.profileFormRowStyle}>
                        <View style={{ minWidth: '90%' }}>
                            <Input
                                label='Street'
                                labelStyle={mtrTheme.profileFormInputTitle}
                                textInputConfig={{
                                    backgroundColor: 'lightgrey',
                                    value: values.street,
                                    paddingHorizontal: 5,
                                    marginRight: 5,
                                    fontSize: 24,
                                    color: 'black',
                                    marginHorizontal: 0,
                                    placeholder: 'Street',
                                    style: { color: 'black' },
                                    fontWeight: '500',
                                    //fontFamily: 'Roboto-Regular',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'street'
                                    ),
                                }}
                            />
                        </View>
                    </View>
                    <View style={mtrTheme.profileFormRowStyle}>
                        <View style={{ minWidth: '90%' }}>
                            <Input
                                label='City'
                                labelStyle={mtrTheme.profileFormInputTitle}
                                textInputConfig={{
                                    backgroundColor: 'lightgrey',
                                    value: values.city,
                                    paddingHorizontal: 5,
                                    marginRight: 5,
                                    fontSize: 24,
                                    color: 'black',
                                    marginHorizontal: 0,
                                    placeholder: 'City',
                                    style: { color: 'black' },
                                    fontWeight: '500',
                                    //fontFamily: 'Roboto-Regular',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
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
                            { justifyContent: 'flex-start', marginLeft: 20 },
                        ]}
                    >
                        <View style={{ marginRight: 10 }}>
                            <View>
                                <Text style={mtrTheme.profileFormInputTitle}>
                                    State
                                </Text>
                            </View>
                            <Dropdown
                                style={[
                                    styles.dropdown,
                                    isStateFocus && { borderColor: 'blue' },
                                ]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={STATESBY2}
                                search={false}
                                maxHeight={300}
                                labelField='label'
                                valueField='value'
                                placeholder={
                                    !isStateFocus ? 'Select State' : '...'
                                }
                                searchPlaceholder='Search...'
                                value={stateProv}
                                onFocus={() => setIsStateFocus(true)}
                                onBlur={() => setIsStateFocus(false)}
                                onChange={(item) => {
                                    setStateProv(item),
                                        //setStateValue(item.value);
                                        setIsStateFocus(false);
                                }}
                            />
                        </View>
                        <View style={{ minWidth: '45%' }}>
                            <Input
                                label='Postal Code'
                                labelStyle={mtrTheme.profileFormInputTitle}
                                textInputConfig={{
                                    backgroundColor: 'lightgrey',
                                    value: values.postalCode,
                                    paddingHorizontal: 5,
                                    fontSize: 24,
                                    color: 'black',
                                    height: 40,
                                    width: 90,
                                    placeholder: 'Postal Code',
                                    style: { color: 'black' },
                                    fontWeight: '500',
                                    //fontFamily: 'Roboto-Regular',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'postalCode'
                                    ),
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={mtrTheme.profileFormRowStyle}>
                    <Text style={{ color: 'silver', fontSize: 10 }}>
                        UID: {userProfile?.id}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        text='SAVE'
                        bgColor='green'
                        fgColor='white'
                        type='PRIMARY'
                        enabled={isFirstNameValid && isLastNameValid}
                        onPress={handleFormSubmit}
                    />
                </View>
                <DateTimePickerModal
                    isVisible={modalBirthDateVisible}
                    mode='date'
                    date={birthDay}
                    display='inline'
                    onConfirm={onBirthDateConfirm}
                    onCancel={onBirthDateCancel}
                />
            </>
            {/* )} */}
        </>
    );
};

export default ProfileForm;

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
        //margin: 16,
        right: 0,
        bottom: 0,
    },
});
