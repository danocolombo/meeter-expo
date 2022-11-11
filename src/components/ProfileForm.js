import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Input from './ui/Input';
import { useTheme } from 'react-native-paper';
import GenderSelectors from './GenderSelectors';
import CustomButton from './ui/CustomButton';
import NumberInput from './ui/NumberInput';
import { printObject } from '../utils/helpers';
import { FetchProfile } from './common/hooks/userQueries';
import { updateGroupValues, addGroupValues } from '../features/meetingsSlice';
import { useQuery } from '@tanstack/react-query';
const ProfileForm = ({ route, onCommit, onCancel }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const user = useSelector((state) => state.users.currentUser);

    let profile = {};
    const { data, isError, isLoading, isFetching } = useQuery(
        ['profile'],
        () => FetchProfile(user.uid),
        {
            cacheTime: 200,
        }
    );
    const [values, setValues] = useState({
        uid: user.uid,
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        residenceStreet: '',
        residenceCity: '',
        residenceStateProv: '',
        residencePostalCode: '',
        birthday: '',
        shirtSize: '',
    });
    function inputChangedHandler(inputIdentifier, enteredValue) {
        setValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }
    function loadInitialData(profile) {
        setValues((profile) => {
            return { ...values, profile };
        });
    }
    printObject('HL:22-->isLoading', isLoading);
    printObject('HL:23-->isFetching', isFetching);
    printObject('data to work with...', data);
    if (data) {
        // setValues(data.body.Items[0]);
        //inputChangedHandler('firstName', data.body.Items[0].firstName);
    }

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
    if (isError) {
        return (
            <View>
                <Text>Something went wrong</Text>
            </View>
        );
    }
    const handleFormSubmit = () => {
        console.log('SAVE-SAVE-SAVE');
    };
    return (
        <>
            {data && (
                <>
                    {data && (
                        <>
                            <View>
                                <Text>UID: {profile.uid}</Text>
                            </View>
                            <View style={mtrTheme.profileFormRowStyle}>
                                <View style={{ minWidth: '45%' }}>
                                    <Input
                                        label='First Name'
                                        labelStyle={
                                            mtrTheme.profileFormInputTitle
                                        }
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
                                            onChangeText:
                                                inputChangedHandler.bind(
                                                    this,
                                                    'firstName'
                                                ),
                                        }}
                                    />
                                </View>
                                <View style={{ minWidth: '45%' }}>
                                    <Input
                                        label='Last Name'
                                        labelStyle={
                                            mtrTheme.profileFormInputTitle
                                        }
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
                                            onChangeText:
                                                inputChangedHandler.bind(
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
                                        labelStyle={
                                            mtrTheme.profileFormInputTitle
                                        }
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
                                            onChangeText:
                                                inputChangedHandler.bind(
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
                                        labelStyle={
                                            mtrTheme.profileFormInputTitle
                                        }
                                        textInputConfig={{
                                            backgroundColor: 'lightgrey',
                                            value: values.phoneNumber,
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
                                            onChangeText:
                                                inputChangedHandler.bind(
                                                    this,
                                                    'phoneNumber'
                                                ),
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={mtrTheme.profileFormRowStyle}>
                                <View style={{ minWidth: '45%' }}>
                                    <Input
                                        label='Birthday'
                                        labelStyle={
                                            mtrTheme.profileFormInputTitle
                                        }
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
                                            onChangeText:
                                                inputChangedHandler.bind(
                                                    this,
                                                    'birthday'
                                                ),
                                        }}
                                    />
                                </View>
                                <View style={{ minWidth: '45%' }}>
                                    <Input
                                        label='Shirt Size'
                                        labelStyle={
                                            mtrTheme.profileFormInputTitle
                                        }
                                        textInputConfig={{
                                            backgroundColor: 'lightgrey',
                                            value: values.shirtSize,
                                            paddingHorizontal: 5,
                                            fontSize: 24,
                                            color: 'black',

                                            placeholder: 'Shirt Size',
                                            style: { color: 'black' },
                                            fontWeight: '500',
                                            //fontFamily: 'Roboto-Regular',
                                            letterSpacing: 0,
                                            onChangeText:
                                                inputChangedHandler.bind(
                                                    this,
                                                    'shirtSize'
                                                ),
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
                            <View style={mtrTheme.profileFormResidenceBorder}>
                                <View style={mtrTheme.profileFormRowStyle}>
                                    <View style={{ minWidth: '90%' }}>
                                        <Input
                                            label='Street'
                                            labelStyle={
                                                mtrTheme.profileFormInputTitle
                                            }
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
                                                onChangeText:
                                                    inputChangedHandler.bind(
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
                                            labelStyle={
                                                mtrTheme.profileFormInputTitle
                                            }
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
                                                onChangeText:
                                                    inputChangedHandler.bind(
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
                                            labelStyle={
                                                mtrTheme.profileFormInputTitle
                                            }
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
                                                onChangeText:
                                                    inputChangedHandler.bind(
                                                        this,
                                                        'residenceStateProv'
                                                    ),
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
                                                onChangeText:
                                                    inputChangedHandler.bind(
                                                        this,
                                                        'residencePostalCode'
                                                    ),
                                            }}
                                        />
                                    </View>
                                </View>
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
