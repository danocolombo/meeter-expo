import React, { useState, useLayoutEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    useWindowDimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import Input from './ui/Input';
import { useTheme } from 'react-native-paper';
import CustomButton from './ui/CustomButton';
import { printObject } from '../utils/helpers';
import { STATESBY2 } from '../constants/meeter';
import { useMutation } from '@tanstack/react-query';

//   FUNCTION START
//   ===============
const ProfileForm = ({ profile, handleUpdate, handleCancel }) => {
    const navigation = useNavigation();
    const [stateValue, setStateValue] = useState(null);
    const [isStateFocus, setIsStateFocus] = useState(false);

    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
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
    useFocusEffect(
        useCallback(() => {
            printObject('useFocusEffect-->profile:', profile);
            //setValues(profile);
            let x = { ...values, ...profile };
            setValues(x);
        }, [])
    );
    const handleFormSubmit = () => {
        // need to rebuild the residence
        // const res = {
        //     street: values.residenceStreet,
        //     city: values.residenceCity,
        //     stateProv: values.residenceStateProv,
        //     postalCode: values.residencePostalCode,
        // };

        // const newValues = {
        //     ...values,
        //     residence: res,
        // };
        // now remove the jwtoken
        //delete newValues['jwtToken'];

        handleUpdate(values);
    };

    // const mutation = useMutation({
    //     mutationFn: (values) => {
    //         return (
    //             PutProfile(values),
    //             {
    //                 onSuccess: (profile) => {
    //                     queryCache.invalidateQueries(['profile', user.uid]);
    //                 },
    //             }
    //         );
    //     },
    // });

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
                    <View style={{ minWidth: '45%' }}>
                        <Input
                            label='Birthday'
                            labelStyle={mtrTheme.profileFormInputTitle}
                            textInputConfig={{
                                backgroundColor: 'lightgrey',
                                value: values.birthday,
                                paddingHorizontal: 5,
                                marginRight: 5,
                                fontSize: 24,
                                color: 'black',
                                marginHorizontal: 0,
                                placeholder: 'Birthday',
                                style: { color: 'black' },
                                fontWeight: '500',
                                //fontFamily: 'Roboto-Regular',
                                letterSpacing: 0,
                                onChangeText: inputChangedHandler.bind(
                                    this,
                                    'birthday'
                                ),
                            }}
                        />
                    </View>
                    <View style={{ minWidth: '45%' }}>
                        <Input
                            label='Shirt Size'
                            labelStyle={mtrTheme.profileFormInputTitle}
                            textInputConfig={{
                                backgroundColor: 'lightgrey',
                                value: values.shirt,
                                paddingHorizontal: 5,
                                fontSize: 24,
                                color: 'black',

                                placeholder: 'Shirt Size',
                                style: { color: 'black' },
                                fontWeight: '500',
                                //fontFamily: 'Roboto-Regular',
                                letterSpacing: 0,
                                onChangeText: inputChangedHandler.bind(
                                    this,
                                    'shirt'
                                ),
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
        marginVertical: 5,
        minWidth: 65,
        maxWidth: 65,
        borderWidth: 0.5,
        borderRadius: 1,
        paddingHorizontal: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
