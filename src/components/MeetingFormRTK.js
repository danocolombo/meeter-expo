import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    KeyboardAvoidingView,
    ActivityIndicator,
    Platform,
    Button,
    Modal,
} from 'react-native';

import Input from './ui/Input';
import { newMeetingTemplate } from '../constants/meeter';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CurrencyInput from 'react-native-currency-input';
import * as Localization from 'expo-localization';

import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DateBall from './ui/DateBall';
import DateStack from './ui/DateStack';
import MealSection from './MeetingForm.meal';
import CustomButton from './ui/CustomButton';
import { Surface, withTheme, useTheme, Badge } from 'react-native-paper';
import {
    printObject,
    dateDashMadePretty,
    isDateDashBeforeToday,
    dateNumToDateDash,
    todayMinus60,
    dateDashToDateObject,
    createAWSUniqueID,
    dateObjectToDashDate,
} from '../utils/helpers';
import { StatusBar } from 'expo-status-bar';
import TypeSelectors from './TypeSelectors';
import { ScrollView } from 'react-native-gesture-handler';
import TitleSection from './MeetingForm.titleContact';
import NumbersSection from './MeetingForm.numbers';

//   FUNCTION START
//   ==============
const MeetingForm = ({ meetingId, handleSubmit, handleDelete }) => {
    const navigation = useNavigation();

    const userProfile = useSelector((state) => state.user.profile);
    const newPerms = useSelector((state) => state.user.perms);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
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
    useEffect(() => {
        printObject('MFRTK:81-->hit:\n', hit);
        if (!hit?.id) {
            console.log('MFRTK:83-->meeting defined from template');
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
                console.log('[[ 2.1 ]]');
                const meetingDate = new Date(hit.meetingDate);
                setDateValue(meetingDate);
            } else {
                const daDate = new Date();
                console.log('daDate use ', daDate);
                console.log('iso:', daDate.toISOString().slice(0, 10));
                setDateValue(daDate.toISOString().slice(0, 10)); // Passing the date in 'YYYY-MM-DD' format
                console.log('[[ 2.2 ]]');
                console.log(`daDate: ${daDate}`);
            }

            setMeeting(hit);
        }
        console.log('end of load');
    }, []);

    useEffect(() => {
        console.log(`MFRTK:129-->beginning of meeting useState`);
        if (meeting?.meetingDate) {
            printObject('MFRTK:132-->meeting:\n', meeting);
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
        }
        console.log('MFRTK:161-->done with meeting useState');
    }, [meeting]); // Add meeting dependency to this useEffect to handle changes in the meeting object

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setMeeting((curInputValues) => {
            console.log('inputIdentifier:', inputIdentifier);

            if (inputIdentifier === 'title') {
                if (enteredValue.length < 3) {
                    setIsTitleValid(false);
                } else {
                    setIsTitleValid(true);
                }
            }
            if (inputIdentifier === 'donations') {
                console.log('MFRTK:203-->donations:', enteredValue);
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
        const utcDate = new Date(selectedDate);
        setDateValue(utcDate);
        FormatEventDate(utcDate);
        setModalMeetingDateVisible(false);
    };

    const handleTypeChange = (value) => {
        if (userProfile.activeOrg.role !== 'manage') {
            return;
        }
        let titleVal = false;
        let contactVal = false;
        switch (meeting.meetingType) {
            case 'Testimony':
                console.log('Testimony');
                setIsSavable(titleVal);
                break;
            case 'Special':
                console.log('Special');
                if (titleVal && contactVal) {
                    setIsSavable(true);
                }
                break;
            case 'Lesson':
                console.log('Lesson');
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
        handleSubmit(newValues);
    };
    const handleDeleteConfirm = () => {
        setShowDeleteConfirmModal(false);
        let groups = [];
        if (meeting?.groups?.items) {
            meeting.groups.items.forEach((g) => {
                groups.push(g.id);
            });
        }
        const deleteRequest = {
            id: meeting.id,
            groups: groups,
        };
        handleDelete(deleteRequest);
    };

    const onMeetingDateCancel = () => setModalMeetingDateVisible(false);
    // printObject('MFRTK:285-->userProfile:', userProfile);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior='padding'
                style={[
                    styles.surface,
                    { backgroundColor: mtrTheme.colors.background },
                ]}
            >
                <Modal visible={showDeleteConfirmModal} animationStyle='slide'>
                    <View>
                        <Text style={mtrTheme.screenTitle}>PLEASE CONFIRM</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 15 }}>
                        <Surface
                            style={{
                                backgroundColor: 'white',
                                width: '90%',
                                height: 400,
                                borderRadius: 10,
                            }}
                        >
                            <View style={{ padding: 20 }}>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            textAlign: 'center',
                                        }}
                                    >
                                        Your are about to delete the following
                                        meeting.
                                    </Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontFamily: 'Roboto-Bold',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {dateDashMadePretty(
                                            meeting?.meetingDate
                                        )}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontFamily: 'Roboto-Medium',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {meeting.meetingType}: {meeting.title}
                                    </Text>
                                    <Text
                                        style={{
                                            paddingTop: 20,
                                            fontSize: 16,
                                            fontFamily: 'Roboto-Bold',

                                            color: mtrTheme.colors.critical,
                                            textAlign: 'center',
                                        }}
                                    >
                                        NOTE: ALL GROUPS FOR THE MEETING WILL BE
                                        DELETED AS WELL.
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginVertical: 20,
                                    }}
                                >
                                    <CustomButton
                                        text='No, CANCEL'
                                        bgColor='green'
                                        fgColor='white'
                                        onPress={() =>
                                            setShowDeleteConfirmModal(false)
                                        }
                                    />
                                </View>
                                <View
                                    style={{
                                        marginVertical: 20,
                                    }}
                                >
                                    <CustomButton
                                        text='Yes, DELETE'
                                        bgColor='red'
                                        fgColor='white'
                                        onPress={() => handleDeleteConfirm()}
                                    />
                                </View>
                            </View>
                        </Surface>
                    </View>
                    <StatusBar style='auto' />
                </Modal>

                <View>
                    <Text style={{ color: 'white' }}>MeetingFormRTK</Text>
                    <Text style={{ color: 'white' }}>
                        dateValue: {dateValue?.toISOString()}
                    </Text>
                </View>
                <View style={mtrTheme.meetingEditTypeSelectorRow}>
                    <TypeSelectors
                        pick={meeting.meetingType}
                        setPick={handleTypeChange}
                    />
                </View>
                <View style={mtrTheme.meetingEditFirstRow}>
                    <TouchableOpacity
                        onPress={() =>
                            userProfile.activeOrg.role === 'manage'
                                ? setModalMeetingDateVisible(true)
                                : null
                        }
                    >
                        <View style={mtrTheme.meetingEditDateWrapper}>
                            {Platform.OS === 'ios' &&
                                dateValue?.toISOString() && (
                                    <View
                                        style={
                                            mtrTheme.meetingEditIOSDataCompContainer
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
                                        mtrTheme.meetingEditAndroidDataCompContainer
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
                    <View>
                        <TitleSection values={meeting} setValues={setMeeting} />
                    </View>
                </View>
                <MealSection values={meeting} setValues={setMeeting} />
                <NumbersSection values={meeting} setValues={setMeeting} />
                {authority && (
                    <View style={mtrTheme.meetingEditFirstRow}>
                        <View
                            style={[
                                mtrTheme.meetingEditNumberLabelContainer,
                                { minWidth: '50%' },
                            ]}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 18,
                                    textAlign: 'right',
                                    paddingRight: 4,
                                }}
                            >
                                Donations:
                            </Text>
                        </View>
                        <View style={styles(mtrTheme).currencyInputContainer}>
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
                                style={styles(mtrTheme).costInput}
                            />
                        </View>
                    </View>
                )}
                <View style={styles(mtrTheme).notesStyle}>
                    <Input
                        label='Notes'
                        labelStyle={{
                            fontSize: 24,
                            color: 'white',
                            marginLeft: 20,
                        }}
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            paddingHorizontal: 10,
                            fontSize: 20,
                            editable: authority,
                            color: 'black',
                            value: meeting.notes,
                            capitalize: 'sentence',
                            autoCorrect: true,
                            marginHorizontal: 20,
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

                <View styles={{ color: 'white' }}>
                    <DateTimePickerModal
                        isVisible={modalMeetingDateVisible}
                        mode='date'
                        date={dateValue || new Date()} // Pass null or the current date as the initial date if dateValue is not set yet
                        display='inline'
                        timeZoneOffsetInMinutes={localTimezoneOffsetInMinutes}
                        dayTextStyle={styles.calendarText}
                        dateTextStyle={styles.calendarText}
                        textColor={styles.calendarText}
                        monthTextStyle={styles.calendarText}
                        yearTextStyle={styles.calendarText}
                        onConfirm={onMeetingDateConfirm}
                        onCancel={onMeetingDateCancel}
                    />
                </View>

                <View style={styles(mtrTheme).buttonContainer}>
                    <CustomButton
                        text='SAVE'
                        bgColor={mtrTheme.colors.success}
                        fgColor='white'
                        type='PRIMARY'
                        enabled={isSavable}
                        onPress={handleFormSubmit}
                        style={{ width: '100%' }} // Set the width of the button to 100% so it takes the full width of the buttonContainer
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
export default withTheme(MeetingForm);
const styles = (mtrTheme) =>
    StyleSheet.create({
        surface: {
            flex: 1,
        },
        row: {
            flexDirection: 'row',

            marginHorizontal: 60,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        notesStyle: {
            paddingBottom: 5,
        },
        currencyInputContainer: {
            paddingVertical: 0, // Adjust this value as needed
            marginVertical: 2,
        },
        costInput: {
            fontSize: 18,
            borderWidth: 1,
            borderRadius: 6,
            width: 100,
            backgroundColor: 'lightgrey',
            marginHorizontal: 0,
            borderColor: 'lightgrey',
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
