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

import moment from 'moment-timezone';
import Input from './ui/Input';
import { newMeetingTemplate } from '../constants/meeter';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import * as Application from 'expo-application';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CurrencyInput from 'react-native-currency-input';
import * as Localization from 'expo-localization';

import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
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
import {
    getMeetingById,
    deleteMeeting,
} from '../features/meetings/meetingsThunks';
import { parse } from 'expo-linking';
//   FUNCTION START
//   ==============
const MeetingForm = ({ meetingId, handleSubmit, handleDelete }) => {
    const navigation = useNavigation();

    const meeter = useSelector((state) => state.system.meeter);
    const userProfile = useSelector((state) => state.user.profile);
    const newPerms = useSelector((state) => state.user.perms);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [formattedDate, setFormattedDate] = useState();
    const mtrTheme = useTheme();

    const hit = useSelector((state) =>
        state.meetings.meetings.find((m) => m.id === meetingId)
    );
    const [meeting, setMeeting] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const [modalMeetingDateVisible, setModalMeetingDateVisible] =
        useState(false);
    const [authority, setAuthority] = useState(
        newPerms.includes('manage') || false
    );
    const userTimeZone = Localization.timezone;
    const localTimezoneOffsetInMinutes = new Date().getTimezoneOffset();

    const [dateValue, setDateValue] = useState();

    const [isTitleValid, setIsTitleValid] = useState(false);
    const [isSupportContactValid, setIsSupportContactValid] = useState(false);
    const [isSavable, setIsSavable] = useState(false);
    useEffect(() => {
        printObject('MFRTK:81-->hit:\n', hit);
        if (!hit?.id) {
            console.log('MFRTK:83-->meeting defined from template');
            const meetingDate = new Date();
            const newMeetingDate = meetingDate.toISOString().slice(0, 10);
            setDateValue(meetingDate);

            console.log('[[ 1 ]]');

            const newMeeting = {
                ...newMeetingTemplate,
                meetingDate: newMeetingDate,
            };
            printObject('MFRTK:95-->newMeeting:\n', newMeeting);

            setMeeting(newMeeting);
            printObject('MFRTK:100-->newMeeting:\n', newMeeting);
        } else {
            console.log('MFRTK:97-->meeting used from redux');
            if (hit?.meetingDate) {
                console.log('[[ 2.1 ]]');
                const meetingDate = new Date(hit.meetingDate);
                setDateValue(meetingDate);
            } else {
                const daDate = new Date();
                console.log('daDate use ', daDate);
                console.log('iso:', daDate.toISOString().slice(0, 10));
                setDateValue(daDate.toISOString().slice(0, 10)); // Passing the date in 'YYYY-MM-DD' format
                // setDateValue(daDate);
                console.log('[[ 2.2 ]]');
                console.log(`daDate: ${daDate}`);
                setFormattedDate(
                    daDate.toLocaleDateString('en-US', {
                        timeZone: userTimeZone,
                    })
                );
            }

            setMeeting(hit);
        }
        console.log('end of load');
    }, []);

    useEffect(() => {
        console.log(`MFRTK:180-->beginning of meeting useState`);
        printObject('meeting:\n', meeting);
        if (meeting?.meetingDate) {
            printObject('MFRTK:181-->meeting:\n', meeting);
            let titleVal = false;
            let contactVal = false;
            if (meeting.title !== 'undefined' && meeting?.title?.length > 2) {
                setIsTitleValid(true);
                titleVal = true;
            } else {
                setIsTitleValid(false);
            }
            if (
                meeting.suppContact !== 'undefined' &&
                meeting?.supportContact?.length > 2
            ) {
                setIsSupportContactValid(true);
                contactVal = true;
            } else {
                setIsSupportContactValid(false);
            }

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
        }
        console.log('MFRTK:254-->done with meeting useState');
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

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
            headerRight: () => (
                <>
                    {meetingId !== null &&
                        userProfile.activeOrg.role === 'manage' && (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('DeleteConfirm', {
                                        id: meetingId,
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
    }, [navigation, meeter]);

    const FormatEventDate = (data) => {
        try {
            console.log(`MFRTK:232-->FormatEventDate(${data})`);
            const dv = new Date(data);
            setDateValue(dv);
            console.log('[[ 4 ]]');
            setFormattedDate(
                dv.toLocaleDateString('en-US', {
                    timeZone: userTimeZone,
                })
            );
            return;
        } catch (error) {
            printObject('MFRTK:319-->error parsing date:\n', error);
            return;
        }
    };
    const onMeetingDateConfirmWAS = (data) => {
        // Parse the input data into a Date object
        console.log(data.toISOString());
        const meetingDate = new Date(data);

        // Extract the date components without adjusting the timezone or time
        const year = meetingDate.getUTCFullYear();
        const month = meetingDate.getUTCMonth() + 1; // Adding 1 because getUTCMonth() returns 0-indexed month
        const day = meetingDate.getUTCDate();

        // Create the resulting date string in the desired format (YYYY-MM-DD)
        const resultDateString = `${year}-${month
            .toString()
            .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        // Log the result
        console.log(`MFRTK:248-->onMeetingDateConfirm(${resultDateString})`);
        setDateValue(resultDateString);
        setModalMeetingDateVisible(false);
    };
    const onMeetingDateConfirm = (data) => {
        // Parse the input data into a Date object
        setDateValue(data);
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
        const dateDash = dateObjectToDashDate(dateValue);
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
        // console.log(`MFRTK:305-->meeting.meetingId:${meeting.meetingId}`);
        // printObject('newValues:', newValues);
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
        //setShowDeleteConfirmModal(false);
        // dispatch(deleteMeeting(meeting))
        //     .then(() => {
        //         navigation.navigate('Meetings');
        //     })
        //     .catch((error) => {
        //         console.error('Error deleting meeting:', error);
        //     });
    };

    const onMeetingDateCancel = () => setModalMeetingDateVisible(false);

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator
                    color={mtrTheme.colors.activityIndicator}
                    size={80}
                />
            </View>
        );
    }
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
                                            fontSize: 18,
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
                    <View style={[styles.row, { marginTop: 10 }]}>
                        <View
                            style={[
                                mtrTheme.meetingEditNumberLabelContainer,
                                { minWidth: '50%' },
                            ]}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 24,
                                    textAlign: 'right',
                                }}
                            >
                                Donations:
                            </Text>
                        </View>
                        <View
                            style={{
                                paddingRight: 'auto',
                                paddingLeft: 10,
                                minWidth: '50%',
                            }}
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
                                style={styles.costInput}
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
                {meeting?.id && (
                    <View style={styles(mtrTheme).deleteCanContainer}>
                        <TouchableOpacity
                            onPress={() => setShowDeleteConfirmModal(true)}
                        >
                            <MaterialCommunityIcons
                                name='delete-forever'
                                size={30}
                                color={mtrTheme.colors.critical}
                            />
                        </TouchableOpacity>
                    </View>
                )}
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
        deleteCanContainer: {
            marginRight: 10,
            marginLeft: 'auto',
        },
    });
