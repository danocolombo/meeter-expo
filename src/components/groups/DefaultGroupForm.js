import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    SafeAreaView,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import GenderSelectors from '../GenderSelectors';
import CustomButton from '../ui/CustomButton';
import Input from '../ui/Input';
import { ScrollView } from 'react-native-gesture-handler';

const GroupForm = ({ group, handleUpdate, handleCancel }) => {
    const mtrTheme = useTheme();
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
        <SafeAreaView>
            <ScrollView>
                <KeyboardAvoidingView behavior='padding'>
                    <View style={mtrStyles(mtrTheme).selectorWrapper}>
                        <GenderSelectors
                            setPick={setGenderValue}
                            pick={values.gender}
                        />
                    </View>

                    <View style={mtrStyles(mtrTheme).row}>
                        <Input
                            label='Group Title'
                            labelStyle={mtrStyles(mtrTheme).labelText}
                            textInputConfig={{
                                backgroundColor: isTitleValid
                                    ? mtrTheme.colors.lightGraphic
                                    : mtrTheme.colors.lightGraphic,
                                value: values.title,
                                paddingHorizontal: 5,
                                fontSize: 24,
                                color: mtrTheme.colors.darkText,
                                marginHorizontal: 0,
                                placeholder: 'title of group...',
                                style: { color: mtrTheme.colors.darkText },
                                fontWeight: '500',

                                letterSpacing: 0,
                                onChangeText: inputChangedHandler.bind(
                                    this,
                                    'title'
                                ),
                            }}
                        />
                    </View>
                    {!isTitleValid && (
                        <View style={mtrStyles(mtrTheme).errorMessageContainer}>
                            <Text style={mtrStyles(mtrTheme).errorMessageText}>
                                REQUIRED: minimum length = 3
                            </Text>
                        </View>
                    )}
                    <View style={mtrStyles(mtrTheme).row}>
                        <Input
                            label='Location'
                            labelStyle={mtrStyles(mtrTheme).labelText}
                            textInputConfig={{
                                backgroundColor: isLocationValid
                                    ? mtrTheme.colors.lightGraphic
                                    : mtrTheme.colors.lightGraphic,
                                paddingHorizontal: 5,
                                value: values.location,
                                fontSize: 24,
                                color: mtrTheme.colors.darkText,
                                capitalize: 'words',
                                marginHorizontal: 0,
                                placeholder: 'planned location...',
                                style: { color: mtrTheme.colors.darkText },

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
                        <View style={mtrStyles(mtrTheme).errorMessageContainer}>
                            <Text style={mtrStyles(mtrTheme).errorMessageText}>
                                REQUIRED: minimum length = 3
                            </Text>
                        </View>
                    )}
                    <View style={mtrStyles(mtrTheme).row}>
                        <Input
                            label='Facilitator'
                            labelStyle={mtrStyles(mtrTheme).labelText}
                            textInputConfig={{
                                backgroundColor: isFacilitatorValid
                                    ? mtrTheme.colors.lightGraphic
                                    : mtrTheme.colors.lightGraphic,
                                paddingHorizontal: 5,
                                fontSize: 24,
                                value: values.facilitator,
                                color: mtrTheme.colors.darkText,
                                capitalize: 'words',
                                marginHorizontal: 0,
                                placeholder: 'expected facilitator...',
                                style: { color: mtrTheme.colors.darkText },
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
                        <View style={mtrStyles(mtrTheme).errorMessageContainer}>
                            <Text style={mtrStyles(mtrTheme).errorMessageText}>
                                REQUIRED: minimum length = 2
                            </Text>
                        </View>
                    )}
                    <View style={mtrStyles(mtrTheme).buttonContainer}>
                        {isTitleValid &&
                            isLocationValid &&
                            isFacilitatorValid && (
                                <View>
                                    <CustomButton
                                        text='SAVE'
                                        bgColor={mtrTheme.colors.success}
                                        fgColor={mtrTheme.colors.lightText}
                                        type='STANDARD'
                                        enabled={
                                            isTitleValid && isLocationValid
                                        }
                                        onPress={handleFormSubmit}
                                    />
                                </View>
                            )}
                        <View>
                            <CustomButton
                                text='CANCEL'
                                bgColor={mtrTheme.colors.critical}
                                fgColor={mtrTheme.colors.lightText}
                                type='STANDARD'
                                onPress={handleFormCancel}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GroupForm;

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        selectorWrapper: {
            flexDirection: 'row',
            borderWidth: 2,
            borderColor: mtrTheme.colors.lightGraphic,
            borderRadius: 5,
            marginVertical: 10,
            marginHorizontal: 10,
            paddingVertical: 5,
        },
        row: {
            marginHorizontal: 20,
            marginVertical: 5,
        },
        labelText: {
            color: mtrTheme.colors.lightText,
            fontFamily: 'Roboto-Regular',
            fontSize: 24,
        },
        errorMessageContainer: {
            marginHorizontal: 30,
        },
        errorMessageText: {
            color: mtrTheme.colors.accent,
            fontFamily: 'Roboto-MediumItalic',
            fontSize: 18,
        },
        buttonContainer: {
            marginTop: 40,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        },
    });
