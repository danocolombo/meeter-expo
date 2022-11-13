import React, { useState, useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    useWindowDimensions,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Input from './ui/Input';
import { useTheme } from 'react-native-paper';
import CustomButton from './ui/CustomButton';
import { printObject } from '../utils/helpers';
import { PutProfile } from './common/hooks/userQueries';
import { useMutation } from '@tanstack/react-query';
//   FUNCTION START
//   ===============
const ProfileForm = ({ profile, handleUpdate, handleCancel }) => {
    const navigation = useNavigation();

    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const user = useSelector((state) => state.users.currentUser);
    const { width } = useWindowDimensions();
    const [values, setValues] = useState({
        uid: user?.userId,
        userName: profile.userName ? profile.userName : '',
        firstName: profile.firstName ? profile.firstName : '',
        lastName: profile.lastName ? profile.lastName : '',
        login: profile.login ? profile.login : '',
        email: profile.email ? profile.email : '',
        phone: profile.phone ? profile.phone : '',
        residenceStreet: profile.residence.street
            ? profile.residence.street
            : '',
        residenceCity: profile.residence.city ? profile.residence.city : '',
        residenceStateProv: profile.residence.stateProv
            ? profile.residence.stateProv
            : '',
        residencePostalCode: profile.residence.postalCode
            ? profile.residence.postalCode
            : '',
        birthday: profile.birthday ? profile.birthday : '',
        shirt: profile.shirt ? profile.shirt : '',
    });
    function inputChangedHandler(inputIdentifier, enteredValue) {
        setValues((curInputValues) => {
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
        const newValues = {
            ...values,
        };

        console.log('---------------------------');
        printObject('newValues', newValues);
        console.log('---------------------------');
        //mutation.mutate(values);
        handleUpdate(values);
    };

    const mutation = useMutation({
        mutationFn: (values) => {
            return (
                PutProfile(values),
                {
                    onSuccess: (profile) => {
                        queryCache.invalidateQueries(['profile', user.uid]);
                    },
                }
            );
        },
    });

    return (
        <>
            {mutation.isLoading ? (
                'Adding meeting...'
            ) : (
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
                                    color: 'black',
                                    marginHorizontal: 0,
                                    placeholder: 'First Name',
                                    style: { color: 'black' },
                                    fontWeight: '500',
                                    //fontFamily: 'Roboto-Regular',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'firstName'
                                    ),
                                }}
                            />
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
                                    color: 'black',

                                    placeholder: 'Last Name',
                                    style: { color: 'black' },
                                    fontWeight: '500',
                                    //fontFamily: 'Roboto-Regular',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'lastName'
                                    ),
                                }}
                            />
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
                                    fontSize: 24,
                                    color: 'black',
                                    marginHorizontal: 0,
                                    placeholder: 'Email',
                                    style: { color: 'black' },
                                    fontWeight: '500',
                                    //fontFamily: 'Roboto-Regular',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'email'
                                    ),
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
                                        value: values.residenceStreet,
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
                                        value: values.residenceCity,
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
                        <View style={mtrTheme.profileFormRowStyle}>
                            <View style={{ minWidth: '45%' }}>
                                <Input
                                    label='State/Providence'
                                    labelStyle={mtrTheme.profileFormInputTitle}
                                    textInputConfig={{
                                        backgroundColor: 'lightgrey',
                                        value: values.residenceStateProv,
                                        paddingHorizontal: 5,
                                        marginRight: 5,
                                        fontSize: 24,
                                        color: 'black',
                                        marginHorizontal: 0,
                                        placeholder: 'State',
                                        style: { color: 'black' },
                                        fontWeight: '500',
                                        //fontFamily: 'Roboto-Regular',
                                        letterSpacing: 0,
                                        onChangeText: inputChangedHandler.bind(
                                            this,
                                            'residenceStateProv'
                                        ),
                                    }}
                                />
                            </View>
                            <View style={{ minWidth: '45%' }}>
                                <Input
                                    label='Postal Code'
                                    labelStyle={mtrTheme.profileFormInputTitle}
                                    textInputConfig={{
                                        backgroundColor: 'lightgrey',
                                        value: values.residencePostalCode,
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
                            UID: {profile.uid}
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            text='SAVE'
                            bgColor='green'
                            fgColor='white'
                            type='PRIMARY'
                            //enabled={isTitleValid && isLocationValid}
                            onPress={handleFormSubmit}
                        />
                    </View>
                </>
            )}
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
});
