import React, { useState, useLayoutEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    useWindowDimensions,
    TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Input from './ui/Input';
import { useTheme } from 'react-native-paper';
import CustomButton from './ui/CustomButton';
import { printObject, dateDashToDateObject } from '../utils/helpers';
import { STATESBY2, SHIRTSIZESBY2 } from '../constants/meeter';
import { useMutation } from '@tanstack/react-query';

//   FUNCTION START
//   ===============
const ProfileForm = ({ profile, handleUpdate, handleCancel }) => {
    const navigation = useNavigation();
    const [stateValue, setStateValue] = useState(null);
    const [isStateFocus, setIsStateFocus] = useState(false);
    const [isShirtFocus, setIsShirtFocus] = useState(false);

    const [modalBirthDateVisible, setModalBirthDateVisible] = useState(false);
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const [birthday, setBirthday] = useState();
    console.log('birthday:', birthday);
    console.log(typeof birthday);
    const user = useSelector((state) => state.users.currentUser);
    const { width } = useWindowDimensions();
    const [values, setValues] = useState({
        uid: user?.uid,
        username: profile?.username ? profile.username : user.userName,
        firstName: profile?.firstName ? profile.firstName : user.firstName,
        lastName: profile?.lastName ? profile.lastName : user.lastName,
        email: profile?.email ? profile.email : user.email,
        phone: profile?.phone ? profile.phone : '',
        residenceStreet: profile?.residence?.street
            ? profile.residence.street
            : '',
        residenceCity: profile?.residence?.city ? profile.residence.city : '',
        residenceStateProv: profile?.residence?.stateProv
            ? profile.residence.stateProv
            : '',
        residencePostalCode: profile?.residence?.postalCode
            ? profile.residence.postalCode
            : '',
        birthday: profile?.birthday ? profile.birthday : '',
        shirt: profile?.shirt ? profile.shirt : '',
    });
    const [isFirstNameValid, setIsFirstNameValid] = useState(
        values.firstName?.length > 1 ? true : false
    );
    const [isLastNameValid, setIsLastNameValid] = useState(
        values.lastName?.length > 2 ? true : false
    );
    useFocusEffect(
        useCallback(() => {
            printObject('useFocusEffect-->profile:', profile);
            //let dateObj = dateDashToDateObject(values?.birthday);
            //setBirthday(dateObj);
            //setValues(profile);
            let x = { ...values, ...profile };
            setValues(x);
            let dateObj = dateDashToDateObject(values?.birthday);

            printObject('dateObj:', dateObj);
            setBirthday(dateObj);
        }, [])
    );
    const FormatBirthDate = (data) => {
        printObject('PF:78-->data:', data);
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
        printObject('PF:93-->tmp', tmp);
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
        printObject('PF:102-->mtgDateString', mtgDateString);
        const newValues = {
            ...values,
            birthday: mtgDateString,
        };
        printObject('PF:107--newValues', newValues);
        setValues(newValues);
        //setDateValue(tmp);

        return;
    };
    const onBirthDateConfirm = (data) => {
        FormatBirthDate(data);
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
            if (inputIdentifier === 'residenceStreet') {
                //console.log('STATE:', enteredValue);
                let residence = {
                    street: enteredValue,
                    city: values?.residence?.city,
                    stateProv: values?.residence?.stateProv,
                    postalCode: values?.residence?.postalCode,
                };
                let newValues = { ...curInputValues, residence };
                printObject('newValues', newValues);
                curInputValues = newValues;
                return curInputValues;
            }
            if (inputIdentifier === 'residenceCity') {
                //console.log('STATE:', enteredValue);
                let residence = {
                    street: values?.residence?.street,
                    city: enteredValue,
                    stateProv: values?.residence?.stateProv,
                    postalCode: values?.residence?.postalCode,
                };
                let newValues = { ...curInputValues, residence };
                printObject('newValues', newValues);
                curInputValues = newValues;
                return curInputValues;
            }
            if (inputIdentifier === 'stateProv') {
                //console.log('STATE:', enteredValue);
                let residence = {
                    street: values?.residence?.street,
                    city: values?.residence?.city,
                    stateProv: enteredValue,
                    postalCode: values?.residence?.postalCode,
                };
                let newValues = { ...curInputValues, residence };
                printObject('newValues', newValues);
                curInputValues = newValues;
                return curInputValues;
            }
            if (inputIdentifier === 'residencePostalCode') {
                //console.log('STATE:', enteredValue);
                let residence = {
                    street: values?.residence?.street,
                    city: values?.residence?.city,
                    stateProv: values?.residence?.stateProv,
                    postalCode: enteredValue,
                };
                let newValues = { ...curInputValues, residence };
                printObject('newValues', newValues);
                curInputValues = newValues;
                return curInputValues;
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
    }, [navigation, meeter]);
    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }

    const handleFormSubmit = () => {
        handleUpdate(values);
    };

    return (
        <>
            {/* {mutation.isLoading ? (
                'Adding meeting...'
            ) : ( */}
            <>
                <View style={mtrTheme.profileFormRowStyle}>
                    <View style={{ minWidth: '45%' }}>
                        <Input
                            label='First Name'
                            labelStyle={mtrTheme.profileFormInputTitle}
                            textInputConfig={{
                                backgroundColor: 'lightgrey',
                                value: values.firstName,
                                paddingHorizontal: 5,
                                marginRight: 5,
                                fontSize: 24,
                                color: mtrTheme.colors.unSelected,
                                marginHorizontal: 0,
                                enabled: false,
                                placeholder: 'First Name',
                                style: { color: 'black' },
                                fontWeight: '500',
                                //fontFamily: 'Roboto-Regular',
                                letterSpacing: 0,
                                // onChangeText: inputChangedHandler.bind(
                                //     this,
                                //     'firstName'
                                // ),
                            }}
                        />
                        {!isFirstNameValid && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>
                                    minimum length: 2
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={{ minWidth: '45%' }}>
                        <Input
                            label='Last Name'
                            labelStyle={mtrTheme.profileFormInputTitle}
                            textInputConfig={{
                                backgroundColor: 'lightgrey',
                                value: values.lastName,
                                paddingHorizontal: 5,
                                fontSize: 24,
                                color: mtrTheme.colors.unSelected,
                                enabled: false,
                                placeholder: 'Last Name',
                                style: { color: 'black' },
                                fontWeight: '500',
                                //fontFamily: 'Roboto-Regular',
                                letterSpacing: 0,
                                // onChangeText: inputChangedHandler.bind(
                                //     this,
                                //     'lastName'
                                // ),
                            }}
                        />
                        {!isLastNameValid && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>
                                    minimum length: 2
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                <View style={mtrTheme.profileFormRowStyle}>
                    <View style={{ minWidth: '90%' }}>
                        <Input
                            label='Email'
                            labelStyle={mtrTheme.profileFormInputTitle}
                            textInputConfig={{
                                backgroundColor: 'lightgrey',
                                value: values.email,
                                paddingHorizontal: 5,
                                marginRight: 5,
                                enabled: false,
                                fontSize: 24,
                                color: mtrTheme.colors.unSelected,
                                marginHorizontal: 0,
                                placeholder: 'Email',
                                style: { color: 'black' },
                                fontWeight: '500',
                                //fontFamily: 'Roboto-Regular',
                                letterSpacing: 0,
                                // onChangeText: inputChangedHandler.bind(
                                //     this,
                                //     'email'
                                // ),
                            }}
                        />
                    </View>
                </View>
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
                            <View style={{ minWidth: '45%' }}>
                                <View
                                    style={{
                                        backgroundColor: 'lightgrey',
                                        maxWidth: 150,
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
                                        {values.birthday}
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
                            iconStyle={styles.iconStyle}
                            data={SHIRTSIZESBY2}
                            search
                            maxHeight={300}
                            labelField='label'
                            valueField='value'
                            placeholder={!isShirtFocus ? 'Shirt' : '...'}
                            searchPlaceholder='Search...'
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
                                    value: values?.residence?.street,
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
                                        'residenceStreet'
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
                                    value: values?.residence?.city,
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
                                        'residenceCity'
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
                                search
                                maxHeight={300}
                                labelField='label'
                                valueField='value'
                                placeholder={
                                    !isStateFocus ? 'Select State' : '...'
                                }
                                searchPlaceholder='Search...'
                                value={values?.residence?.stateProv}
                                onFocus={() => setIsStateFocus(true)}
                                onBlur={() => setIsStateFocus(false)}
                                onChange={(item) => {
                                    inputChangedHandler(
                                        'stateProv',
                                        item.value
                                    ),
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
                                    value: values?.residence?.postalCode,
                                    paddingHorizontal: 5,
                                    fontSize: 24,
                                    color: 'black',

                                    placeholder: 'Postal Code',
                                    style: { color: 'black' },
                                    fontWeight: '500',
                                    //fontFamily: 'Roboto-Regular',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'residencePostalCode'
                                    ),
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={mtrTheme.profileFormRowStyle}>
                    <Text style={{ color: 'silver', fontSize: 12 }}>
                        UID: {user?.uid}
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
                    date={birthday}
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
});
