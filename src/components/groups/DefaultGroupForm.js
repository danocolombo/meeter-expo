import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GenderSelectors from '../GenderSelectors';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../ui/CustomButton';
import NumberInput from '../ui/NumberInput';
import Input from '../ui/Input';

const GroupForm = ({ group, handleUpdate, handleCancel }) => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const [values, setValues] = useState({
        id: group?.id ? group.id : null,
        gender: group?.gender ? group.gender : 'x',
        title: group?.title ? group.title : '',
        location: group?.location ? group.location : '',
        facilitator: group?.facilitator ? group.facilitator : '',
    });
    const [isLocationValid, setIsLocationValid] = useState(
        group?.location?.length > 2 ? true : false
    );
    const [isTitleValid, setIsTitleValid] = useState(
        group?.title?.length > 2 ? true : false
    );
    const [isFacilitatorValid, setIsFacilitatorValid] = useState(
        group?.facilitator?.length > 1 ? true : false
    );

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setValues((curInputValues) => {
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
            if (inputIdentifier === 'facilitator') {
                if (enteredValue.length < 2) {
                    setIsFacilitatorValid(false);
                } else {
                    setIsFacilitatorValid(true);
                }
            }
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }
    function setGenderValue(enteredValue) {
        setValues((curInputValues) => {
            return {
                ...curInputValues,
                gender: enteredValue,
            };
        });
    }
    const handleFormSubmit = () => {
        handleUpdate(values);
    };
    const handleFormCancel = () => {
        handleCancel();
    };
    return (
        <>
            <View style={mtrTheme.groupEditRow}>
                <GenderSelectors
                    setPick={setGenderValue}
                    pick={values.gender}
                />
            </View>

            <View style={mtrTheme.groupEditRowBasic}>
                <Input
                    label='Group Title'
                    labelStyle={mtrTheme.groupFormInputTitle}
                    textInputConfig={{
                        backgroundColor: isTitleValid
                            ? 'lightgrey'
                            : mtrTheme.colors.errorTextBox,
                        value: values.title,
                        paddingHorizontal: 5,
                        fontSize: 24,
                        color: 'black',
                        marginHorizontal: 0,
                        placeholder: 'title of group...',
                        style: { color: 'black' },
                        fontWeight: '500',

                        letterSpacing: 0,
                        onChangeText: inputChangedHandler.bind(this, 'title'),
                    }}
                />
            </View>
            {!isTitleValid && (
                <View style={mtrTheme.groupEditInputErrorContainer}>
                    <Text style={mtrTheme.groupEditInputErrorText}>
                        REQUIRED: minimum length = 3
                    </Text>
                </View>
            )}
            <View style={mtrTheme.groupEditRowBasic}>
                <Input
                    label='Location'
                    labelStyle={mtrTheme.groupFormInputTitle}
                    textInputConfig={{
                        backgroundColor: isLocationValid
                            ? 'lightgrey'
                            : mtrTheme.colors.errorTextBox,
                        paddingHorizontal: 5,
                        value: values.location,
                        fontSize: 24,
                        color: 'black',
                        capitalize: 'words',
                        marginHorizontal: 0,
                        placeholder: 'planned location...',
                        style: { color: 'black' },

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
                <View style={mtrTheme.groupEditInputErrorContainer}>
                    <Text style={mtrTheme.groupEditInputErrorText}>
                        REQUIRED: minimum length = 3
                    </Text>
                </View>
            )}
            <View style={mtrTheme.groupEditRowBasic}>
                <Input
                    label='Faciliatator'
                    labelStyle={mtrTheme.groupFormInputTitle}
                    textInputConfig={{
                        backgroundColor: isFacilitatorValid
                            ? 'lightgrey'
                            : mtrTheme.colors.errorTextBox,
                        paddingHorizontal: 5,
                        fontSize: 24,
                        value: values.facilitator,
                        color: 'black',
                        capitalize: 'words',
                        marginHorizontal: 0,
                        placeholder: 'expected facilitator...',
                        style: { color: 'black' },

                        fontWeight: '500',
                        letterSpacing: 0,
                        onChangeText: inputChangedHandler.bind(
                            this,
                            'facilitator'
                        ),
                    }}
                />
            </View>
            {!isFacilitatorValid && (
                <View style={mtrTheme.groupEditInputErrorContainer}>
                    <Text style={mtrTheme.groupEditInputErrorText}>
                        REQUIRED: minimum length = 2
                    </Text>
                </View>
            )}
            <View
                style={{
                    marginTop: 40,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}
            >
                {isTitleValid && isLocationValid && isFacilitatorValid && (
                    <View>
                        <CustomButton
                            text='SAVE'
                            bgColor={mtrTheme.colors.success}
                            fgColor='white'
                            type='STANDARD'
                            enabled={isTitleValid && isLocationValid}
                            onPress={handleFormSubmit}
                        />
                    </View>
                )}
                <View>
                    <CustomButton
                        text='CANCEL'
                        bgColor={mtrTheme.colors.critical}
                        fgColor='white'
                        type='STANDARD'
                        //enabled={isTitleValid && isLocationValid}
                        onPress={handleFormCancel}
                    />
                </View>
            </View>
        </>
    );
};

export default GroupForm;

const styles = StyleSheet.create({});
