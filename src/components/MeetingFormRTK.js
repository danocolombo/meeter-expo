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
import { useSysContext } from '../contexts/SysContext';
import { useUserContext } from '../contexts/UserContext';
import DateBall from './ui/DateBall';
import DateStack from './ui/DateStack';
import MealSection from './MeetingForm.meal';
import CustomButton from './ui/CustomButton';
import { Surface, withTheme, useTheme, Badge } from 'react-native-paper';
import {
    printObject,
    isDateDashBeforeToday,
    dateNumToDateDash,
    todayMinus60,
    dateDashToDateObject,
    createAWSUniqueID,
    dateObjectToDashDate,
} from '../utils/helpers';
import TypeSelectors from './TypeSelectors';
import { ScrollView } from 'react-native-gesture-handler';
import TitleSection from './MeetingForm.titleContact';
import NumbersSection from './MeetingForm.numbers';
import { getMeetingById } from '../features/meetings/meetingsThunks';
import { parse } from 'expo-linking';
//   FUNCTION START
//   ==============
const MeetingForm = ({ meetingId, handleSubmit, handleDeleteRequest }) => {
    // const meeter = useSelector((state) => state.system);
    // console.log('MFRTK:54-->meetingId:', meetingId);
    const id = meetingId || createAWSUniqueID();
    const navigation = useNavigation();
    const { meeter } = useSysContext();
    const { userProfile } = useUserContext();
    const newPerms = useSelector((state) => state.user.perms);
    const { width } = useWindowDimensions();
    const [formattedDate, setFormattedDate] = useState();
    const hit = useSelector((state) =>
        state.meetings.meetings.find((m) => m.id === meetingId)
    );
    const [meeting, setMeeting] = useState({});
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);

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
            // setMeeting({
            //     ...newMeetingTemplate,
            //     meetingDate: daDate.toString(),
            // });
            setMeeting(newMeeting);
            printObject('MFRTK:100-->newMeeting:\n', newMeeting);
        } else {
            console.log('MFRTK:97-->meeting used from redux');
            if (hit?.meetingDate) {
                console.log('[[ 2.1 ]]');
                const meetingDate = new Date(hit.meetingDate);
                setDateValue(meetingDate);

                // setDateValue(daDate.toISOString().slice(0, 10)); // Passing the date in 'YYYY-MM-DD' format
                // setDateValue(daDate);

                // setFormattedDate(
                //     daDate.toLocaleDateString('en-US', {
                //         timeZone: userTimeZone,
                //     })
                // );
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
    // useEffect(() => {
    //     if (meetingId) {
    //         console.log(`MFRTK:132-->meetingId: ${meetingId}`);
    //         setIsLoading(true);
    //         dispatch(getMeetingById(meetingId))
    //             .then((mtg) => {
    //                 if (mtg.meta.requestStatus === 'fulfilled') {
    //                     setMeeting(mtg.payload);
    //                     // FormatEventDate(mtg.payload.meetingDate);
    //                 } else {
    //                     printObject(
    //                         'MFRTK:109-->getMeetingById failure\nmtg response:\n',
    //                         mtg
    //                     );
    //                 }
    //                 setIsLoading(false);
    //             })
    //             .catch((err) => {
    //                 console.log('MFRTK:116-->getMeetingById failure:', err);
    //                 setIsLoading(false);
    //             });
    //     } else {
    //         //* -------------------------------
    //         // new meeting request, set defaults
    //         var d = new Date();
    //         const today = d.toISOString().slice(0, 10);
    //         const todayParts = today.split('-');
    //         const org = userProfile.activeOrg.code;
    //         const compKey = `${org.toLowerCase()}#${todayParts[0]}#${
    //             todayParts[1]
    //         }#${todayParts[2]}`;
    //         //      use newMeetingTemplate
    //         const newMtg = {
    //             ...newMeetingTemplate,
    //             meetingDate: today,
    //             mtgCompKey: compKey,
    //         };
    //         setMeeting(newMtg);

    //         printObject('MFRTK:165-->newMtg:\n', newMtg);
    //     }
    // }, [hit]);
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

            // if (
            //     meeting.title !== 'undefined' &&
            //     meeting?.supportContact?.length > 2
            // ) {
            //     console.log(`supportContact:>>${meeting?.supportContact}<<`);
            //     setIsSupportContactValid(true);
            //     contactVal = true;
            // } else {
            //     console.log(`supportContact:>>${meeting?.supportContact}<<`);
            //     console.log(
            //         `supportContact length:${meeting?.supportContact?.length}`
            //     );
            //     setIsSupportContactValid(false);
            // }
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

            // if (!dateValue) {
            //     console.log('dateValue is null');
            //     const daDate = new Date(hit.meetingDate);
            //     setDateValue(daDate);
            //     console.log('[[ 3 ]]');
            //     console.log('daDate use ', daDate);
            //     setFormattedDate(
            //         daDate.toLocaleDateString('en-US', {
            //             timeZone: userTimeZone,
            //         })
            //     );
            // } else {
            //     console.log('dateValue is NOT NULL');
            //     // let dateObj = dateDashToDateObject(dateValue);
            //     // setDateValue(dateObj);
            // }
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
                                        meeting: meeting,
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
    // }
    //     // const dateValue = new Date(data); // Convert the data value to a Date object
    //     // const timezoneOffsetInMinutes = dateValue.getTimezoneOffset(); // Get the timezone offset in minutes
    //     // const dateWithTimezone = new Date(
    //     //     dateValue.getTime() - timezoneOffsetInMinutes * 60000
    //     // ); // Adjust the date for the timezone
    //     // const newFormattedDate = dateWithTimezone.toISOString().slice(0, 10); // Format the date as YYYY-MM-DD

    //     // console.log('newFormattedDate:', newFormattedDate);
    //     // setDateValue(newFormattedDate); // Set the state variable with the formatted date

    //     // const daDate1 = new Date(data);
    //     // console.log(`daDate1: ${daDate1}`);
    //     // console.log('daDate1 use ', daDate1);
    //     // console.log('iso:', daDate1.toISOString().slice(0, 10));

    //     // setDateValue(daDate1);

    //     // const newDaDate1 =
    //     //     dateValue?.getUTCMonth() +
    //     //     1 +
    //     //     dateValue?.getUTCDate() +
    //     //     dateValue?.getUTCFullYear();
    //     // console.log('newDaDate1:', newDaDate1);

    //     // setDateValue(daDate1);
    //     // FormatEventDate(data);
    //     // setDateValue(data);
    //     // setFormattedDate(
    //     //     data.toLocaleDateString('en-US', {
    //     //         timeZone: userTimeZone,
    //     //     })
    //     // );
    //     setModalMeetingDateVisible(false);
    // };
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
    const onMeetingDateCancel = () => setModalMeetingDateVisible(false);
    // useEffect(() => {
    //     if (meeting?.meetingDate) {
    //         let dateObj = dateDashToDateObject(meeting.meetingDate);
    //         setDateValue(dateObj);
    //     } else {
    //         setDateValue(new Date());
    //     }
    // }, []);

    // const formattedDate = dateValue.toLocaleDateString('en-US', {
    //     timeZone: userTimeZone,
    // });

    // if (dateValue === null) {
    //     setDateValue(new Date());
    // }
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
        <>
            <ScrollView>
                <>
                    <KeyboardAvoidingView
                        behavior='padding'
                        style={[
                            styles.surface,
                            { backgroundColor: mtrTheme.colors.background },
                        ]}
                    >
                        <ScrollView>
                            <View>
                                <Text style={{ color: 'white' }}>
                                    MeetingFormRTK
                                </Text>
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
                                    <View
                                        style={mtrTheme.meetingEditDateWrapper}
                                    >
                                        {Platform.OS === 'ios' &&
                                            dateValue?.toISOString() && (
                                                <View
                                                    style={
                                                        mtrTheme.meetingEditIOSDataCompContainer
                                                    }
                                                >
                                                    <DateBall
                                                        date={`${
                                                            dateValue?.getUTCMonth() +
                                                            1
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
                                                        dateValue?.getUTCMonth() +
                                                        1
                                                    }/${dateValue?.getUTCDate()}/${dateValue?.getUTCFullYear()}`}
                                                />
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <TitleSection
                                        values={meeting}
                                        setValues={setMeeting}
                                    />
                                </View>
                            </View>
                            <MealSection
                                values={meeting}
                                setValues={setMeeting}
                            />
                            <NumbersSection
                                values={meeting}
                                setValues={setMeeting}
                            />
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
                            <View style={styles.rowStyle}>
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
                            <View style={styles.buttonContainer}>
                                <CustomButton
                                    text='SAVE'
                                    bgColor={mtrTheme.colors.success}
                                    fgColor='white'
                                    type='PRIMARY'
                                    enabled={isSavable}
                                    onPress={handleFormSubmit}
                                />
                            </View>
                            <View>
                                <Text>WHAT?</Text>
                            </View>
                            <View styles={{ color: 'white' }}>
                                <DateTimePickerModal
                                    isVisible={modalMeetingDateVisible}
                                    mode='date'
                                    date={dateValue || new Date()} // Pass null or the current date as the initial date if dateValue is not set yet
                                    display='inline'
                                    timeZoneOffsetInMinutes={
                                        localTimezoneOffsetInMinutes
                                    }
                                    // style={{
                                    //     backgroundColor:
                                    //         mtrTheme.colors.background,
                                    // }}
                                    dayTextStyle={styles.calendarText}
                                    dateTextStyle={styles.calendarText}
                                    textColor={styles.calendarText}
                                    monthTextStyle={styles.calendarText}
                                    yearTextStyle={styles.calendarText}
                                    onConfirm={onMeetingDateConfirm}
                                    onCancel={onMeetingDateCancel}
                                />
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </>
            </ScrollView>
        </>
    );
};
export default withTheme(MeetingForm);
const styles = StyleSheet.create({
    surface: {
        flex: 1,
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 10,
    },
    row: {
        flexDirection: 'row',

        marginHorizontal: 60,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    countRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 60,
        marginVertical: 5,
    },

    // dateWrapper: {
    //     margin: 5,
    // },
    // calendarText: {
    //     color: 'white',
    // },
    costLabel: {
        fontSize: 20,
        fontWeight: '600',
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
    buttonContainer: { marginTop: 10, marginHorizontal: 20, marginBottom: 20 },
    button: {
        backgroundColor: 'blue',
        marginHorizontal: 20,
        marginTop: 20,
    },
    modalContainer: {
        marginTop: 50,
        // alignSelf: 'flex-end',
    },
    modalSurface: {
        marginTop: 100,
        marginHorizontal: 10,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
