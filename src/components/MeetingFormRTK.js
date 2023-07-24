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
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import * as Application from 'expo-application';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CurrencyInput from 'react-native-currency-input';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSysContext } from '../contexts/SysContext';
import { useUserContext } from '../contexts/UserContext';
import {
    getMeetingGroups,
    clearGroups,
    updateMeetingValues,
} from '../features/meetingsSlice';
import { PutMeeting } from './common/hooks/meetingQueries';
import NumberInput from './ui/NumberInput';
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
} from '../utils/helpers';
import { useMutation } from '@tanstack/react-query';
import TypeSelectors from './TypeSelectors';
import { ScrollView } from 'react-native-gesture-handler';
import TitleSection from './MeetingForm.titleContact';
import NumbersSection from './MeetingForm.numbers';
import { getMeetingById } from '../features/meetings/meetingsThunks';
import { parse } from 'expo-linking';
//   FUNCTION START
//   ==============
const MeetingForm = ({ meetingId, handleUpdate, handleDeleteRequest }) => {
    // const meeter = useSelector((state) => state.system);
    console.log('MFRTK:54-->meetingId:', meetingId);
    const id = meetingId || createAWSUniqueID();
    const { meeter } = useSysContext();
    const { userProfile, perms } = useUserContext();
    const { width } = useWindowDimensions();
    const [meeting, setMeeting] = useState({});
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const specificMeeting = useSelector(
        (state) => state.meetings.specificMeeting
    );
    const groups = useSelector((state) => state.meetings.groups);
    const [modalMeetingDateVisible, setModalMeetingDateVisible] =
        useState(false);
    const [authority, setAuthority] = useState(
        perms.includes('manage') || false
    );
    const [meetingDate, setMeetingDate] = useState();
    const [dateValue, setDateValue] = useState(new Date());
    const meetingTypeRef = useRef(meeting?.meetingType);
    const [isTitleValid, setIsTitleValid] = useState(
        meeting?.title?.length > 2 ? true : false
    );
    const [isSupportContactValid, setIsSupportContactValid] = useState(
        meeting?.supportContact?.length > 2 ? true : false
    );
    // const [values, setValues] = useState({
    //     childrenCount: meeting?.childrenCount ? meeting.childrenCount : 0,
    //     transportationContact: meeting?.transportationContact
    //         ? meeting.transportationContact
    //         : '',
    //     mealCount: meeting?.mealCount ? meeting.mealCount : 0,
    //     meal: meeting?.meal ? meeting.meal : '',
    //     greeterContact2: meeting?.greeterContact2
    //         ? meeting.greeterContact2
    //         : '',
    //     nurseryCount: meeting?.nurseryCount ? meeting.nurseryCount : 0,
    //     greeterContact1: meeting?.greeterContact1
    //         ? meeting.greeterContact1
    //         : '',
    //     securityContact: meeting?.securityContact
    //         ? meeting.securityContact
    //         : '',
    //     announcementsContact: meeting?.announcementsContact
    //         ? meeting.announcementsContact
    //         : '',
    //     attendanceCount: meeting?.attendanceCount ? meeting.attendanceCount : 0,
    //     meetingId: meeting?.meetingId ? meeting.meetingId : meetingId,
    //     mealContact: meeting?.mealContact ? meeting.mealContact : '',
    //     closingContact: meeting?.closingContact ? meeting.closingContact : '',
    //     notes: meeting?.notes ? meeting.notes : '',
    //     cafeCount: meeting?.cafeCount ? meeting.cafeCount : 0,
    //     youthCount: meeting?.youthCount ? meeting.youthCount : 0,
    //     cafeContact: meeting?.cafeContact ? meeting.cafeContact : '',
    //     setupContact: meeting?.setupContact ? meeting.setupContact : '',
    //     meetingDate: meeting?.meetingDate ? meeting.meetingDate : null,
    //     clientId: meeting?.clientId
    //         ? meeting.clientId
    //         : userProfile?.activeOrg?.organization?.code,
    //     donations: meeting?.donations ? meeting.donations : 0,
    //     youthContact: meeting?.youthContact ? meeting.youthContact : '',
    //     nurseryContact: meeting?.nurseryContact ? meeting.nurseryContact : '',
    //     cleanupContact: meeting?.cleanupContact ? meeting.cleanupContact : '',
    //     resourceContact: meeting?.resourceContact
    //         ? meeting.resourceContact
    //         : '',
    //     childrenContact: meeting?.childrenContact
    //         ? meeting.childrenContact
    //         : '',
    //     newcomersCount: meeting?.newcomersCount ? meeting.newcomersCount : 0,
    //     mtgCompKey: meeting?.mtgCompKey ? meeting.mtgCompKey : '',
    //     facilitatorContact: meeting?.facilitatorContact
    //         ? meeting.facilitatorContact
    //         : '',
    //     transportationCount: meeting?.transportationCount
    //         ? meeting.transportationContact
    //         : 0,
    //     worship: meeting?.worship ? meeting.worship : '',
    //     avContact: meeting?.avContact ? meeting.avContact : '',
    //     supportContact: meeting?.supportContact ? meeting.supportContact : '',
    //     meetingType: meeting?.meetingType ? meeting.meetingType : '',
    //     title: meeting?.title ? meeting.title : '',
    // });
    useEffect(() => {
        if (meetingId) {
            setIsLoading(true);
            console.log('MFRTK:134-->meetingId:', meetingId);
            dispatch(getMeetingById(meetingId))
                .then((mtg) => {
                    if (mtg.meta.requestStatus === 'fulfilled') {
                        setMeeting(mtg.payload);
                        FormatEventDate(mtg.payload.meetingDate);
                        console.log('MFRTK:147:saved');
                    } else {
                        printObject(
                            'MFRTK:136-->getMeetingById failure\nmtg response:\n',
                            mtg
                        );
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('MFRTK:135-->getMeetingById failure:', err);
                    setIsLoading(false);
                });
        } else {
            //* -------------------------------
            // new meeting request, set defaults
            var d = new Date();
            const today = d.toISOString().slice(0, 10);
            const todayParts = today.split('-');
            const org = userProfile.activeOrg.code;
            const compKey = `${org.toLowerCase()}#${todayParts[0]}#${
                todayParts[1]
            }#${todayParts[2]}`;
            const newMtg = {
                childrenCount: 0,
                transportationContact: '',
                mealCount: 0,
                meal: '',
                greeterContact2: '',
                nurseryCount: 0,
                greeterContact1: '',
                securityContact: '',
                announcementsContact: '',
                attendanceCount: 0,
                meetingId: '',
                mealContact: '',
                closingContact: '',
                notes: '',
                cafeCount: 0,
                youthCount: 0,
                cafeContact: '',
                setupContact: '',
                meetingDate: today,
                clientId: org,
                donations: 0,
                youthContact: '',
                nurseryContact: '',
                cleanupContact: '',
                resourceContact: '',
                childrenContact: '',
                newcomersCount: 0,
                mtgCompKey: compKey,
                facilitatorContact: '',
                transportationCount: 0,
                worship: '',
                avContact: '',
                supportContact: '',
                meetingType: 'Testimony',
                title: 'TBD',
            };
            setMeeting(newMtg);
            printObject('MFRTK:198-->newMtg:\n', newMtg);
        }
    }, []);

    useEffect(() => {
        console.log('CHANGE');
    }, [meeting]);

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
    const navigation = useNavigation();
    const activeMeetings = useSelector(
        (state) => state.meetings.activeMeetings
    );
    // determine if active or historic
    const historic = isDateDashBeforeToday(meeting.meetingDate);
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
    useEffect(() => {
        if (meeting?.title?.length > 1) {
            setIsTitleValid(true);
        } else {
            setIsTitleValid(false);
        }
        meeting?.supportContact?.length > 1
            ? setIsSupportContactValid(true)
            : setIsSupportContactValid(false);
    }, [meeting]);

    const FormatEventDate = (data) => {
        printObject('MFRTK:283-->data', data);
        try {
            // let dateString =
            //     data.getMonth() +
            //     1 +
            //     '-' +
            //     data.getDate() +
            //     '-' +
            //     data.getFullYear() +
            //     ' ';
            let dateParts = data.split('-');

            // const yr = parseInt(data.getFullYear());
            // const mo = parseInt(data.getMonth());
            // const da = parseInt(data.getDate());
            const yr = parseInt(dateParts[0]);
            const mo = parseInt(dateParts[1]);
            const da = parseInt(dateParts[2]);
            const tmp = new Date(yr, mo, da, 0, 0, 0);
            printObject('MFRTK:297-->tmp', tmp);
            // save the date value for control
            setDateValue(tmp);
            //make string to save in values.
            // let mtgDateString =
            //     data.getFullYear() +
            //     '-' +
            //     ('0' + (data.getMonth() + 1)).slice(-2) +
            //     '-' +
            //     ('0' + data.getDate()).slice(-2);
            // printObject('MFRTK:307-->mtgDateString', mtgDateString);
            // const newValues = {
            //     ...meeting,
            //     meetingDate: mtgDateString,
            // };
            //====================================
            // set the dateValue object as well.
            // setDateValue(tmp);
            // printObject('MFRTK:315--newValues', newValues);
            // setMeeting(newValues);
            return;
        } catch (error) {
            printObject('MFRTK:319-->error parsing date:\n', error);
            return;
        }
    };
    const onMeetingDateConfirm = (data) => {
        FormatEventDate(data);
        setModalMeetingDateVisible(false);
    };
    const handleTypeChange = (value) => {
        if (userProfile.activeOrg.role !== 'manage') {
            return;
        }
        const newValues = {
            ...meeting,
            meetingType: value,
        };
        setMeeting(newValues);
    };
    const handleFormSubmit = () => {
        // need to create updated mtgCompKey from date
        const dateParts = meeting.meetingDate.split('-');
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
            mtgCompKey: newKey,
            mealCount: parseInt(meeting.mealCount),
            attendanceCount: parseInt(meeting.attendanceCount),
            newcomersCount: parseInt(meeting.newcomersCount),
        };
        handleUpdate(newValues);
    };
    const onMeetingDateCancel = () => setModalMeetingDateVisible(false);
    useEffect(() => {
        console.log('MFRTK:368-->convert');
        let dateObj = dateDashToDateObject(meeting.meetingDate);
        setDateValue(dateObj);
    }, []);
    // const mutation = useMutation({
    //     mutationFn: (values) => {
    //         return (
    //             PutMeeting(values),
    //             {
    //                 onSuccess: (meeting) => {
    //                     queryCache.invalidateQueries(['meetings', 'active']);
    //                 },
    //             }
    //         );
    //     },
    // });
    printObject('MFRTK:381-->meeting:', meeting);
    console.log('MFRTK:382-->isTitleValid:', isTitleValid);
    console.log('MFRTK:383-->isSupportContactValid:', isSupportContactValid);
    console.log('MFRTK:384-->dateValue:', dateValue);
    if (dateValue === null) {
        setDateValue(new Date());
    }
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
                                        {Platform.OS === 'ios' && (
                                            <View
                                                style={
                                                    mtrTheme.meetingEditIOSDataCompContainer
                                                }
                                            >
                                                <DateBall
                                                    date={meeting.meetingDate}
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
                                                    date={meeting.meetingDate}
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
                                    enabled={
                                        isTitleValid || isSupportContactValid
                                    }
                                    onPress={handleFormSubmit}
                                />
                            </View>
                            <View styles={{ color: 'white' }}>
                                <DateTimePickerModal
                                    isVisible={modalMeetingDateVisible}
                                    mode='date'
                                    date={dateValue}
                                    display='inline'
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
