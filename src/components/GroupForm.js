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
import { updateGroupValues, addGroupValues } from '../features/meetingsSlice';
const GroupForm = ({ route, group, meeting }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    printObject('GF:11-->group', group);
    printObject('GF:16-->meeting:,', meeting);
    const [values, setValeus] = useState({
        meetingId: meeting.meetingId,
        groupId: group.groupId ? group.id : '0',
        gender: group.gender ? group.gender : 'x',
        title: group.title ? group.title : '',
        attendance: group.attendance ? group.attendance : '0',
        location: group.location ? group.location : '',
        facilitator: group.facilitator ? group.facilitator : '',
        cofacilitator: group.cofacilitator ? group.cofacilitator : '',
        notes: group.notes ? group.notes : '',
    });
    const [isLocationValid, setIsLocationValid] = useState(
        group?.location?.length > 2 ? true : false
    );
    const [isTitleValid, setIsTitleValid] = useState(
        group?.title?.length > 2 ? true : false
    );

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setValeus((curInputValues) => {
            if (inputIdentifier === 'title') {
                if (enteredValue.length < 3) {
                    setIsTitleValid(false);
                } else {
                    setIsTitleValid(true);
                }
            }
            if (inputIdentifier === 'location') {
                if (enteredValue.length < 3) {
                    setIsLocationValid(false);
                } else {
                    setIsLocationValid(true);
                }
            }
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }
    function setGenderValue(enteredValue) {
        setValeus((curInputValues) => {
            return {
                ...curInputValues,
                gender: enteredValue,
            };
        });
    }
    const handleFormSubmit = () => {
        //   handle SAVE request
        if (values.groupId === undefined) {
            console.log('yep');
            values.groupId = 0;
            dispatch(addGroupValues(values));
        } else {
            dispatch(updateGroupValues(values));
        }
        navigation.navigate('MeetingDetails', {
            meeting: meeting,
        });
    };
    const inputStyle = {
        paddingLeft: 0,
        fontSize: 24,
        fontWeight: '800',
        color: 'black',
        marginHorizontal: 10,
    };
    //printObject('GF:79-->meeting', meeting);
    return (
        <View style={mtrTheme.groupFormContainer}>
            <View style={mtrTheme.groupFormGenderSelectorContainer}>
                <GenderSelectors
                    setPick={setGenderValue}
                    pick={values.gender}
                />
            </View>
            <View>
                <NumberInput
                    value={values.attendance}
                    numberStyle={{ color: 'white' }}
                    graphicStyle={{ color: 'white' }}
                    onAction={inputChangedHandler.bind(this, 'attendance')}
                />
            </View>
            <View style={mtrTheme.groupFormRowStyle}>
                <Input
                    label='Group Title'
                    labelStyle={mtrTheme.groupFormInputTitle}
                    textInputConfig={{
                        backgroundColor: 'lightgrey',
                        value: values.title,
                        paddingHorizontal: 5,
                        fontSize: 24,
                        color: 'black',
                        marginHorizontal: 0,
                        placeholder: 'Group Title',
                        style: { color: 'black' },
                        fontWeight: '500',
                        fontFamily: 'Roboto-Regular',
                        letterSpacing: 0,
                        onChangeText: inputChangedHandler.bind(this, 'title'),
                    }}
                />
            </View>
            {!isTitleValid && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>minimum length = 3</Text>
                </View>
            )}
            <View style={mtrTheme.groupFormRowStyle}>
                <Input
                    label='Location'
                    labelStyle={mtrTheme.groupFormInputTitle}
                    textInputConfig={{
                        backgroundColor: 'lightgrey',
                        paddingHorizontal: 5,
                        value: values.location,
                        fontSize: 24,
                        color: 'black',
                        capitalize: 'words',
                        marginHorizontal: 0,
                        placeholder: 'where was group?',
                        style: { color: 'black' },
                        fontFamily: 'Roboto-Regular',
                        fontWeight: '500',
                        letterSpacing: 0,
                        onChangeText: inputChangedHandler.bind(
                            this,
                            'location'
                        ),
                    }}
                />
            </View>
            {!isLocationValid && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>minimum length = 3</Text>
                </View>
            )}
            <View style={mtrTheme.groupFormRowStyle}>
                <Input
                    label='Faciliatator'
                    labelStyle={mtrTheme.groupFormInputTitle}
                    textInputConfig={{
                        backgroundColor: 'lightgrey',
                        paddingHorizontal: 5,
                        fontSize: 24,
                        value: values.facilitator,
                        color: 'black',
                        capitalize: 'words',
                        marginHorizontal: 0,
                        placeholder: 'who facilitated?',
                        style: { color: 'black' },
                        fontFamily: 'Roboto-Regular',
                        fontWeight: '500',
                        letterSpacing: 0,
                        onChangeText: inputChangedHandler.bind(
                            this,
                            'facilitator'
                        ),
                    }}
                />
            </View>
            <View style={mtrTheme.groupFormRowStyle}>
                <Input
                    label='Co-Faciliatator'
                    labelStyle={mtrTheme.groupFormInputTitle}
                    textInputConfig={{
                        backgroundColor: 'lightgrey',
                        paddingHorizontal: 5,
                        fontSize: 24,
                        value: values.cofacilitator,
                        color: 'black',
                        width: '100%',
                        capitalize: 'words',
                        marginHorizontal: 0,
                        placeholder: 'who co-facilitated?',
                        style: { color: 'black' },
                        fontWeight: '500',
                        letterSpacing: 0,
                        onChangeText: inputChangedHandler.bind(
                            this,
                            'cofacilitator'
                        ),
                    }}
                />
            </View>
            <View style={mtrTheme.groupFormRowStyle}>
                <Input
                    label='Notes'
                    labelStyle={mtrTheme.groupFormInputTitle}
                    textInputConfig={{
                        backgroundColor: 'lightgrey',
                        paddingHorizontal: 10,
                        fontSize: 24,
                        color: 'black',
                        value: values.notes,
                        capitalize: 'sentence',
                        autoCorrect: true,
                        marginHorizontal: 5,
                        placeholder: '',
                        style: { color: 'black' },
                        fontWeight: '500',
                        letterSpacing: 0,
                        multiline: true,
                        minHeight: 100,
                        onChangeText: inputChangedHandler.bind(this, 'notes'),
                    }}
                />
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton
                    text='SAVE'
                    bgColor='blue'
                    fgColor='white'
                    type='PRIMARY'
                    enabled={isTitleValid && isLocationValid}
                    onPress={handleFormSubmit}
                />
            </View>
        </View>
    );
};

export default GroupForm;

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
    buttonContainer: { marginTop: 10, marginHorizontal: 20 },
    button: {
        backgroundColor: 'blue',
        marginHorizontal: 20,
        marginTop: 20,
    },
});
