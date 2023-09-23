import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    Platform,
} from 'react-native';

import Input from './ui/Input';
import { newMeetingTemplate } from '../constants/meeter';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CurrencyInput from 'react-native-currency-input';

import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DateBall from './ui/DateBall';
import DateStack from './ui/DateStack';
import MealSection from './MeetingForm.meal';
import CustomButton from './ui/CustomButton';
import { useTheme, Button } from 'react-native-paper';
import { printObject } from '../utils/helpers';
import TypeSelectors from './TypeSelectors';
import TitleSection from './MeetingForm.titleContact';
import NumbersSection from './MeetingForm.numbers';

//   FUNCTION START
//   ==============
const MeetingForm = ({ meetingId, handleSubmit }) => {
    const navigation = useNavigation();
    const userProfile = useSelector((state) => state.user.profile);
    const newPerms = useSelector((state) => state.user.perms);
    const mtrTheme = useTheme();
    const hit = useSelector((state) =>
        state.meetings.meetings.find((m) => m.id === meetingId)
    );
    const [meeting, setMeeting] = useState({});
    const [modalMeetingDateVisible, setModalMeetingDateVisible] =
        useState(false);
    const authority = newPerms.includes('manage') || false;
    const localTimezoneOffsetInMinutes = new Date().getTimezoneOffset();
    const [dateValue, setDateValue] = useState();
    const [isSavable, setIsSavable] = useState(false);
    const mtrStyles = (mtrTheme) =>
        StyleSheet.create({
            surface: {
                flex: 1,
                backgroundColor: mtrTheme.colors.lightGraphic,
            },
            keyboardAvoiding: {
                flex: 1,
                ...Platform.select({
                    ios: {
                        behavior: 'padding',
                        keyboardVerticalOffset: 0,
                    },
                    android: {
                        behavior: 'height',
                        keyboardVerticalOffset: -100,
                    },
                }),
            },
            selectorWrapper: {
                flexDirection: 'row',
                borderWidth: 2,
                borderColor: mtrTheme.colors.darkGraphic,
                borderRadius: 5,
                marginVertical: 10,
                marginHorizontal: 10,
            },
            row: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 0,
                marginHorizontal: 10,
            },
            dateContainer: { margin: 5 },
            dateWrapperIOS: { padding: 5 },
            dateWrapperAndroid: { padding: 1 },
            numberLabelContainer: {
                width: '45%',
                paddingLeft: 'auto',
                minWidth: '50%',
            },

            notesStyle: {
                paddingBottom: 5,
            },
            donationLabel: {
                color: mtrTheme.colors.darkText,
                fontSize: 18,
                textAlign: 'right',
                paddingRight: 10,
            },
            notesLabelText: {
                fontFamily: 'Roboto-Regular',
                fontSize: 24,
                color: mtrTheme.colors.darkText,
                marginLeft: 20,
            },
            currencyInputContainer: {
                paddingVertical: 0,
                marginVertical: 2,
            },
            costInput: {
                fontSize: 18,
                borderWidth: 1,
                borderRadius: 6,
                width: 100,
                backgroundColor: mtrTheme.colors.lightGrey,
                marginHorizontal: 0,
                borderColor: mtrTheme.colors.darkGraphic,
                paddingHorizontal: 12,
                height: 45,
            },
            buttonContainer: {
                marginTop: 1,
                alignItems: 'center', // Center the content horizontally
                width: '50%', // Set the width to 50% of the parent container
                marginLeft: 'auto', // Push the button to the right side of the container
                marginRight: 'auto', // Push the button to the left side of the container
                marginBottom: 1,
            },
        });
    useEffect(() => {
        // printObject('MFRTK:81-->hit:\n', hit);
        if (!hit?.id) {
            // console.log('MFRTK:83-->meeting defined from template');
            const currentDate = new Date(); // Get the current date
            const localCurrentDate = new Date(
                currentDate.getTime() - localTimezoneOffsetInMinutes * 60 * 1000
            ); // Convert to local timezone

            const newMeetingDate = localCurrentDate.toISOString().slice(0, 10);
            setDateValue(localCurrentDate); // Set the default date to local timezone

            const newMeeting = {
                ...newMeetingTemplate,
                meetingDate: newMeetingDate,
            };
            setMeeting(newMeeting);
        } else {
            if (hit?.meetingDate) {
                const meetingDate = new Date(hit.meetingDate);
                setDateValue(meetingDate);
            } else {
                const daDate = new Date();
                printObject('MFRTK:68-->daDate:\n', daDate);
                const yyyymmmdd_dash = daDate.toISOString().slice(0, 10);
                printObject('MFRTK:70-->yyyymmmdd_dash:\n', yyyymmmdd_dash);
                setDateValue(daDate.toISOString().slice(0, 10)); // Passing the date in 'YYYY-MM-DD' format
            }

            setMeeting(hit);
        }
    }, []);

    useEffect(() => {
        // console.log(`MFRTK:129-->beginning of meeting useState`);
        if (meeting?.meetingDate) {
            // printObject('MFRTK:132-->meeting:\n', meeting);
            //* **************************************
            //* ENABLE OR DISABLE SAVE BUTTON
            //* **************************************
            let titleVal = false;
            let contactVal = false;
            if (meeting?.title !== 'undefined' && meeting?.title?.length > 2) {
                titleVal = true;
            }
            if (
                meeting?.supportContact !== 'undefined' &&
                meeting?.supportContact?.length > 2
            ) {
                contactVal = true;
            }

            switch (meeting.meetingType) {
                case 'Testimony':
                    if (contactVal) {
                        setIsSavable(true);
                    }
                    break;
                case 'Special':
                    if (titleVal && contactVal) {
                        setIsSavable(true);
                    }
                    break;
                case 'Lesson':
                    if (titleVal && contactVal) {
                        setIsSavable(true);
                    }
                    break;
                default:
                    break;
            }
        }
        // console.log('MFRTK:161-->done with meeting useState');
    }, [meeting]); // Add meeting dependency to this useEffect to handle changes in the meeting object

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setMeeting((curInputValues) => {
            // console.log('inputIdentifier:', inputIdentifier);

            if (inputIdentifier === 'title') {
                if (enteredValue.length < 3) {
                    setIsTitleValid(false);
                } else {
                    setIsTitleValid(true);
                }
            }
            if (inputIdentifier === 'donations') {
                // console.log('MFRTK:203-->donations:', enteredValue);
            }
            if (inputIdentifier === 'supportContact') {
                if (enteredValue.length < 1) {
                    setIsSupportContactValid(false);
                } else {
                    setIsSupportContactValid(true);
                }
            }

            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }

    const FormatEventDate = (data) => {
        try {
            console.log(`MFRTK:232-->FormatEventDate(${data})`);
            const utcDate = new Date(data);
            setDateValue(utcDate);
            console.log('[[ 4 ]]');
            // setFormattedDate(
            //     utcDate.toLocaleDateString('en-US', {
            //         timeZone: userTimeZone,
            //     })
            // );
            return;
        } catch (error) {
            printObject('MFRTK:319-->error parsing date:\n', error);
            return;
        }
    };

    const onMeetingDateConfirm = (data) => {
        const selectedDate = data || new Date(); // Use current date if data is null
        setDateValue(selectedDate);
        FormatEventDate(selectedDate);
        setModalMeetingDateVisible(false);
    };

    const handleTypeChange = (value) => {
        if (!newPerms.includes('manage')) {
            return;
        }
        let titleVal = false;
        let contactVal = false;
        switch (meeting.meetingType) {
            case 'Testimony':
                setIsSavable(titleVal);
                break;
            case 'Special':
                if (titleVal && contactVal) {
                    setIsSavable(true);
                }
                break;
            case 'Lesson':
                if (titleVal && contactVal) {
                    setIsSavable(true);
                }
                break;
            default:
                break;
        }
        const newValues = {
            ...meeting,
            meetingType: value,
        };
        setMeeting(newValues);
    };
    const handleFormSubmit = () => {
        // need to create updated mtgCompKey from date
        console.log('hit');
        const dateParts = dateValue.toISOString().slice(0, 10).split('-');
        const newKey =
            userProfile?.activeOrg?.code?.toLowerCase() +
            '#' +
            dateParts[0] +
            '#' +
            dateParts[1] +
            '#' +
            dateParts[2];
        const newValues = {
            ...meeting,
            meetingDate: dateValue.toISOString().slice(0, 10),
            mtgCompKey: newKey,
            mealCount: parseInt(meeting.mealCount),
            attendanceCount: parseInt(meeting.attendanceCount),
            newcomersCount: parseInt(meeting.newcomersCount),
        };
        printObject('MFRTK:220-->newValues:\n', newValues);
        handleSubmit(newValues);
    };
    const onMeetingDateCancel = () => setModalMeetingDateVisible(false);

    return (
        <SafeAreaView style={mtrStyles(mtrTheme).surface}>
            <KeyboardAvoidingView style={mtrStyles(mtrTheme).keyboardAvoiding}>
                <View style={mtrStyles(mtrTheme).selectorWrapper}>
                    <TypeSelectors
                        pick={meeting.meetingType}
                        setPick={handleTypeChange}
                    />
                </View>
                <View style={mtrStyles(mtrTheme).row}>
                    <TouchableOpacity
                        onPress={() =>
                            newPerms.includes('manage')
                                ? setModalMeetingDateVisible(true)
                                : null
                        }
                    >
                        <View style={mtrStyles(mtrTheme).dateContainer}>
                            {Platform.OS === 'ios' &&
                                dateValue?.toISOString() && (
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).dateWrapperIOS
                                        }
                                    >
                                        <DateBall
                                            date={`${
                                                dateValue?.getUTCMonth() + 1
                                            }/${dateValue?.getUTCDate()}/${dateValue?.getUTCFullYear()}`}
                                        />
                                    </View>
                                )}
                            {Platform.OS === 'android' && (
                                <View
                                    style={
                                        mtrStyles(mtrTheme).dateWrapperAndroid
                                    }
                                >
                                    <DateStack
                                        date={`${
                                            dateValue?.getUTCMonth() + 1
                                        }/${dateValue?.getUTCDate()}/${dateValue?.getUTCFullYear()}`}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <TitleSection values={meeting} setValues={setMeeting} />
                    </View>
                </View>
                <MealSection values={meeting} setValues={setMeeting} />
                <NumbersSection values={meeting} setValues={setMeeting} />
                {authority && (
                    <View style={mtrStyles(mtrTheme).row}>
                        <View style={mtrStyles(mtrTheme).numberLabelContainer}>
                            <Text style={mtrStyles(mtrTheme).donationLabel}>
                                Donations:
                            </Text>
                        </View>
                        <View
                            style={mtrStyles(mtrTheme).currencyInputContainer}
                        >
                            <CurrencyInput
                                value={meeting.donations}
                                onChangeValue={inputChangedHandler.bind(
                                    this,
                                    'donations'
                                )}
                                prefix='$'
                                placeholder='Donations'
                                minValue={0}
                                delimiter=','
                                separator='.'
                                precision={2}
                                editable={true}
                                style={mtrStyles(mtrTheme).costInput}
                            />
                        </View>
                    </View>
                )}
                <View style={mtrStyles(mtrTheme).notesStyle}>
                    <Input
                        label='Notes'
                        labelStyle={mtrStyles(mtrTheme).notesLabelText}
                        textInputConfig={{
                            backgroundColor: mtrTheme.colors.lightGrey,
                            paddingHorizontal: 10,
                            fontSize: 20,
                            borderColor: mtrTheme.colors.mediumObject,
                            borderWidth: StyleSheet.hairlineWidth,
                            editable: authority,
                            color: mtrTheme.colors.darkText,
                            value: meeting.notes,
                            capitalize: 'sentence',
                            autoCorrect: true,
                            marginHorizontal: 20,
                            placeholder: '',
                            style: { color: mtrTheme.colors.darkText },
                            fontWeight: '500',
                            letterSpacing: 0,
                            multiline: true,
                            minHeight: 50,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'notes'
                            ),
                        }}
                    />
                </View>

                <View styles={{ color: mtrTheme.colors.lightGraphic }}>
                    <DateTimePickerModal
                        isVisible={modalMeetingDateVisible}
                        mode='date'
                        date={dateValue || new Date()} // Pass null or the current date as the initial date if dateValue is not set yet
                        display='inline'
                        timeZoneOffsetInMinutes={localTimezoneOffsetInMinutes}
                        dayTextStyle={mtrStyles(mtrTheme).calendarText}
                        dateTextStyle={mtrStyles(mtrTheme).calendarText}
                        textColor={mtrStyles(mtrTheme).calendarText}
                        monthTextStyle={mtrStyles(mtrTheme).calendarText}
                        yearTextStyle={mtrStyles(mtrTheme).calendarText}
                        onConfirm={onMeetingDateConfirm}
                        onCancel={onMeetingDateCancel}
                    />
                </View>
                {isSavable && (
                    <View style={mtrStyles(mtrTheme).buttonContainer}>
                        <CustomButton
                            text='SAVE'
                            bgColor={mtrTheme.colors.mediumGreen}
                            fgColor={mtrTheme.colors.lightText}
                            type='PRIMARY'
                            enabled={true}
                            onPress={() => handleFormSubmit()}
                        />
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default MeetingForm;
