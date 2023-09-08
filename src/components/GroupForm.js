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
        meetingId: meeting?.id ? meeting.id : '0',
        groupId: group?.id ? group.id : '0',
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
            title: meeter.appName || 'Meeter',
            headerBackTitle: 'Cancel',
            // headerRight: () => (
            //     <>
            //         {meeting.id !== '0' && (
            //             <TouchableOpacity
            //                 onPress={() =>
            //                     navigation.navigate('DeleteGroupConfirm', {
            //                         group,
            //                         meeting,
            //                     })
            //                 }
            //             >
            //                 <MaterialCommunityIcons
            //                     name='delete-forever'
            //                     size={30}
            //                     color={mtrTheme.colors.lightGraphic}
            //                 />
            //             </TouchableOpacity>
            //         )}
            //     </>
            // ),
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
        handleUpdate(values);
        navigation.goBack();
    };
    return (
        <>
            <Surface style={mtrStyles(mtrTheme).rootContainer}>
                <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                    <Text style={mtrStyles(mtrTheme).screenTitleText}>
                        GROUP DETAILS
                    </Text>
                </View>
                <View style={mtrStyles(mtrTheme).surface}>
                    <View style={mtrStyles(mtrTheme).groupSelectorRow}>
                        <View
                            style={mtrStyles(mtrTheme).groupSelectorContainer}
                        >
                            <GenderSelectors
                                setPick={setGenderValue}
                                pick={values.gender}
                            />
                        </View>
                    </View>
                    <View style={mtrStyles(mtrTheme).rowCenter}>
                        <View style={mtrStyles(mtrTheme).attendanceContainer}>
                            <NumberInput
                                value={values.attendance}
                                numberStyle={
                                    mtrStyles(mtrTheme).attendanceNumber
                                }
                                graphicStyle={
                                    mtrStyles(mtrTheme).attendanceGraphic
                                }
                                onAction={inputChangedHandler.bind(
                                    this,
                                    'attendance'
                                )}
                            />
                        </View>
                    </View>
                    <View style={mtrStyles(mtrTheme).rowLeft}>
                        <View style={mtrStyles(mtrTheme).inputContainer}>
                            <Input
                                label='Group Title'
                                labelStyle={mtrStyles(mtrTheme).inputLabel}
                                textInputConfig={{
                                    backgroundColor: isTitleValid
                                        ? mtrTheme.colors.lightGrey
                                        : mtrTheme.colors.errorTextBox,
                                    value: values.title,
                                    paddingHorizontal: 5,
                                    fontSize: 24,
                                    color: mtrTheme.colors.darkText,
                                    marginHorizontal: 0,
                                    placeholder: 'Group Title',
                                    style: mtrStyles(mtrTheme).inputLabel,
                                    fontWeight: '500',

                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'title'
                                    ),
                                }}
                            />
                        </View>
                    </View>
                    {!isTitleValid && (
                        <View style={mtrStyles(mtrTheme).inputErrorContainer}>
                            <Text style={mtrStyles(mtrTheme).inputErrorText}>
                                REQUIRED: minimum length = 3
                            </Text>
                        </View>
                    )}
                    <View style={mtrStyles(mtrTheme).rowLeft}>
                        <View style={mtrStyles(mtrTheme).inputContainer}>
                            <Input
                                label='Location'
                                labelStyle={mtrStyles(mtrTheme).inputLabel}
                                textInputConfig={{
                                    backgroundColor: isLocationValid
                                        ? mtrTheme.colors.lightGrey
                                        : mtrTheme.colors.errorTextBox,
                                    paddingHorizontal: 5,
                                    value: values.location,
                                    fontSize: 24,
                                    color: mtrTheme.colors.darkText,
                                    capitalize: 'words',
                                    marginHorizontal: 0,
                                    placeholder: 'where was group?',
                                    style: mtrStyles(mtrTheme).inputLabel,

                                    fontWeight: '500',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'location'
                                    ),
                                }}
                            />
                        </View>
                    </View>
                    {!isLocationValid && (
                        <View style={mtrStyles(mtrTheme).inputErrorContainer}>
                            <Text style={mtrStyles(mtrTheme).inputErrorText}>
                                REQUIRED: minimum length = 3
                            </Text>
                        </View>
                    )}
                    <View style={mtrTheme.groupEditRowBasic}>
                        <Input
                            label='Facilitator'
                            labelStyle={mtrStyles(mtrTheme).inputLabel}
                            textInputConfig={{
                                backgroundColor: mtrTheme.colors.lightGrey,
                                paddingHorizontal: 5,
                                fontSize: 24,
                                value: values.facilitator,
                                color: mtrTheme.colors.darkText,
                                capitalize: 'words',
                                marginHorizontal: 0,
                                placeholder: 'who facilitated?',
                                style: mtrStyles(mtrTheme).inputLabel,

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
                            labelStyle={mtrStyles(mtrTheme).inputLabel}
                            textInputConfig={{
                                backgroundColor: mtrTheme.colors.lightGrey,
                                paddingHorizontal: 5,
                                fontSize: 24,
                                value: values.cofacilitator,
                                color: mtrTheme.colors.darkText,
                                width: '100%',
                                capitalize: 'words',
                                marginHorizontal: 0,
                                placeholder: 'who co-facilitated?',
                                style: mtrStyles(mtrTheme).inputLabel,
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
                            labelStyle={mtrStyles(mtrTheme).inputLabel}
                            textInputConfig={{
                                backgroundColor: mtrTheme.colors.lightGrey,
                                paddingHorizontal: 10,
                                fontSize: 24,
                                color: mtrTheme.colors.darkText,
                                value: values.notes,
                                capitalize: 'sentence',
                                autoCorrect: true,
                                marginHorizontal: 5,
                                placeholder: '',
                                style: mtrStyles(mtrTheme).inputLabel,
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

                    <View style={mtrStyles(mtrTheme).buttonRow}>
                        <View style={mtrStyles(mtrTheme).buttonContainer}>
                            <CustomButton
                                text='SAVE'
                                bgColor={mtrTheme.colors.mediumGreen}
                                fgColor={mtrTheme.colors.textLight}
                                type='PRIMARY'
                                enabled={isTitleValid && isLocationValid}
                                onPress={handleFormSubmit}
                            />
                        </View>
                    </View>
                </View>
            </Surface>
        </>
    );
};

export default GroupForm;

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        rootContainer: {
            flex: 1,
        },
        screenTitleContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 10,
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.lightText,
        },
        surface: {
            backgroundColor: 'white',
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 5,
            paddingBottom: 10,
        },
        rowCenter: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        rowLeft: {
            flexDirection: 'column',
            alignItems: 'left',
        },
        groupSelectorRow: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        groupSelectorContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
            paddingVertical: 10,
            borderBottomColor: mtrTheme.colors.lightObject,
            borderBottomWidth: 1,
            maxWidth: '95%',
        },
        groupEditRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 0,
            marginHorizontal: 10,
            // { marginTop: 15, marginBottom: 0 }
        },
        attendanceContainer: {
            paddingVertical: 5,
        },
        attendanceNumber: {
            color: mtrTheme.colors.mediumText,
        },
        attendanceGraphic: {
            color: mtrTheme.colors.mediumObject,
        },
        inputContainer: {
            paddingHorizontal: 20,
            minWidth: '100%',
        },
        inputLabel: {
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
            fontWeight: '500',
            color: mtrTheme.colors.darkText,
        },
        inputErrorContainer: {
            marginHorizontal: 30,
        },
        inputErrorText: {
            color: mtrTheme.colors.inputErrorText,
            fontFamily: 'Roboto-MediumItalic',
            fontSize: 18,
        },
        buttonRow: {
            paddingHorizontal: 20,
        },
        buttonContainer: {
            // paddingHorizontal: 20,
            // flexDirection: 'column',
        },
    });
