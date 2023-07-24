import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GenderSelectors from '../components/GenderSelectors';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import NumberInput from '../components/ui/NumberInput';
import Input from '../components/ui/Input';

const GroupForm = ({ group, meeting, handleUpdate }) => {
    const meeter = useSelector((state) => state.system);
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const [values, setValues] = useState({
        meetingId: group?.meetingId ? group.meetingId : '0',
        groupId: group?.groupId ? group.groupId : '0',
        gender: group?.gender ? group.gender : 'x',
        title: group?.title ? group.title : '',
        attendance: group?.attendance ? parseInt(group.attendance) : 0,
        location: group?.location ? group.location : '',
        facilitator: group?.facilitator ? group.facilitator : '',
        cofacilitator: group?.cofacilitator ? group.cofacilitator : '',
        notes: group?.notes ? group.notes : '',
    });
    const [isLocationValid, setIsLocationValid] = useState(
        group?.location?.length > 2 ? true : false
    );
    const [isTitleValid, setIsTitleValid] = useState(
        group?.title?.length > 2 ? true : false
    );
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
            headerRight: () => (
                <>
                    {meeting.id !== '0' && (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('DeleteGroupConfirm', {
                                    group,
                                    meeting,
                                })
                            }
                        >
                            <MaterialCommunityIcons
                                name='delete-forever'
                                size={30}
                                color={mtrTheme.colors.critical}
                            />
                        </TouchableOpacity>
                    )}
                </>
            ),
        });
    }, [navigation]);

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
        //todo--- gather values

        //todo--- pass them up
        console.log('GF:94--> handleFormSubmit\n', values);
        // handleUpdate(values);
    };
    return (
        <>
            <Surface style={mtrTheme.groupEditSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>GROUP DETAILS</Text>
                </View>
                <View style={mtrTheme.groupEditRow}>
                    <GenderSelectors
                        setPick={setGenderValue}
                        pick={values.gender}
                    />
                </View>
                <View
                    style={[
                        mtrTheme.groupEditRowBasic,
                        { marginTop: 15, marginBottom: 0 },
                    ]}
                >
                    <NumberInput
                        value={values.attendance}
                        numberStyle={{ color: 'white' }}
                        graphicStyle={{ color: 'white' }}
                        onAction={inputChangedHandler.bind(this, 'attendance')}
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
                            placeholder: 'Group Title',
                            style: { color: 'black' },
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
                            placeholder: 'where was group?',
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
                            backgroundColor: 'lightgrey',
                            paddingHorizontal: 5,
                            fontSize: 24,
                            value: values.facilitator,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 0,
                            placeholder: 'who facilitated?',
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
                <View style={mtrTheme.groupEditRowBasic}>
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
                <View style={mtrTheme.groupEditRowBasic}>
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
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'notes'
                            ),
                        }}
                    />
                </View>

                <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                    <CustomButton
                        text='SAVE'
                        bgColor={mtrTheme.colors.success}
                        fgColor='white'
                        type='PRIMARY'
                        enabled={isTitleValid && isLocationValid}
                        onPress={handleFormSubmit}
                    />
                </View>
            </Surface>
        </>
    );
};

export default GroupForm;

const styles = StyleSheet.create({});
