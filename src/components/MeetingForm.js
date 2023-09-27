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
import moment from 'moment-timezone'; // Import moment-timezone

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
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const [meeting, setMeeting] = useState({
        id: meetingId,
        announcementsContact: '',
        attendanceCount: 0,
        avContact: '',
        cafeContact: '',
        cafeCount: 0,
        childrenContact: '',
        childrenCount: 0,
        cleanupContact: '',
        closingContact: '',
        donations: 0,
        facilitatorContact: '',
        greeterContact1: '',
        greeterContact2: '',
        meal: '',
        mealContact: '',
        mealCount: 0,
        meetingDate: formattedDate,
        meetingType: 'Lesson',
        mtgCompKey: '',
        newcomersCount: 0,
        notes: '',
        nurseryContact: '',
        nurseryCount: 0,
        organizationMeetingsId: null,
        resourceContact: '',
        securityContact: '',
        setupContact: '',
        supportContact: '',
        title: '',
        transportationContact: '',
        worship: '',
        youthContact: '',
        youthCount: 0,
    });
    const [modalMeetingDateVisible, setModalMeetingDateVisible] =
        useState(false);
    const authority = newPerms.includes('manage') || false;
    const localTimezoneOffsetInMinutes = new Date().getTimezoneOffset();
    const [dateValue, setDateValue] = useState(null);
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
                marginVertical: 5,
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
            const currentDate = new Date(); // Get the current date
            const localCurrentDate = new Date(
                currentDate.getTime() - localTimezoneOffsetInMinutes * 60 * 1000
            ); // Convert to local timezone

            const newMeetingDate = localCurrentDate?.toISOString().slice(0, 10);
            setDateValue(localCurrentDate); // Set the default date to local timezone
            // console.log(
            //     'MF:184-->typeof newMeetingDate:',
            //     typeof newMeetingDate
            // );
            const newMeeting = {
                ...newMeetingTemplate,
                meetingDate: newMeetingDate,
            };
            setMeeting({
                ...meeting,
                meetingDate: newMeetingDate,
            });
        } else {
            if (hit?.meetingDate) {
                // printObject(
                //     'MF:209-->EXISTING hit.meetingDate:',
                //     hit.meetingDate
                // );
                const moment = require('moment-timezone');

                // Assuming hit.meetingDate is in UTC format like "2023-09-30"
                const utcDateString = hit.meetingDate;

                // Convert the UTC date to your local time zone (e.g., 'America/New_York')
                const localDate = moment(utcDateString).tz('America/New_York');
                setDateValue(localDate);
            } else {
                //* we have a meeting, but no meetingDate
                printObject('MF:235-->hit:\n', hit);
            }
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
            if (meeting?.title !== 'undefined' && meeting?.title?.length > 1) {
                titleVal = true;
            }
            if (
                meeting?.supportContact !== 'undefined' &&
                meeting?.supportContact?.length > 1
            ) {
                contactVal = true;
            }
            switch (meeting.meetingType) {
                case 'Testimony':
                    if (titleVal) {
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
        // THIS IS ONLY USED FOR DONATIONS AND NOTES
        setMeeting((curInputValues) => {
            // console.log('inputIdentifier:', inputIdentifier);
            if (inputIdentifier === 'donations') {
                // console.log('MFRTK:203-->donations:', enteredValue);
            }

            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }

    const FormatEventDate = (data) => {
        try {
            const utcDate = new Date(data);
            setDateValue(utcDate);
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
        const dateParts = dateValue?.toISOString().slice(0, 10).split('-');
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
            meetingDate: dateValue?.toISOString().slice(0, 10),
            mtgCompKey: newKey,
            mealCount: parseInt(meeting.mealCount),
            attendanceCount: parseInt(meeting.attendanceCount),
            newcomersCount: parseInt(meeting.newcomersCount),
        };
        if (newValues.id === null) {
            delete newValues.id;
        }
        printObject('MF:305-->adding newValues:\n', newValues);
        handleSubmit(newValues);
    };
    const onMeetingDateCancel = () => setModalMeetingDateVisible(false);
    printObject('MF:347-->dateValue:\n', dateValue);
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
                            {Platform?.OS === 'ios' && dateValue && (
                                <View
                                    style={mtrStyles(mtrTheme).dateWrapperIOS}
                                >
                                    {/* <DateBall
                                        date={`${
                                            dateValue?.getUTCMonth() + 1
                                        }/${dateValue?.getUTCDate()}/${dateValue?.getUTCFullYear()}`}
                                    /> */}
                                    <DateBall date={dateValue} />
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
                        date={
                            dateValue
                                ? moment(dateValue, 'YYYY-MM-DD').toDate()
                                : new Date()
                        } // Set the initial date value
                        display='inline'
                        // timeZoneOffsetInMinutes={localTimezoneOffsetInMinutes}
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
