import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    KeyboardAvoidingView,
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
import CustomButton from './ui/CustomButton';
import { Surface, withTheme, useTheme, Badge } from 'react-native-paper';
import {
    printObject,
    isDateDashBeforeToday,
    dateNumToDateDash,
    todayMinus60,
    dateDashToDateObject,
} from '../utils/helpers';
import { useMutation } from '@tanstack/react-query';
import TypeSelectors from './TypeSelectors';
import { ScrollView } from 'react-native-gesture-handler';
//   FUNCTION START
//   ==============
const MeetingForm = ({ meeting, handleUpdate, handleDeleteRequest }) => {
    // const meeter = useSelector((state) => state.system);
    const { meeter } = useSysContext();
    const { userProfile } = useUserContext();
    const { width } = useWindowDimensions();

    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);

    const groups = useSelector((state) => state.meetings.groups);
    const [modalMeetingDateVisible, setModalMeetingDateVisible] =
        useState(false);

    const [meetingDate, setMeetingDate] = useState();
    const [dateValue, setDateValue] = useState();
    const meetingTypeRef = useRef(meeting.meetingType);
    const [values, setValues] = useState({
        childrenCount: meeting?.childrenCount ? meeting.childrenCount : 0,
        transportationContact: meeting?.transportationContact
            ? meeting.transportationContact
            : '',
        mealCount: meeting?.mealCount ? meeting.mealCount : 0,
        meal: meeting?.meal ? meeting.meal : '',
        greeterContact2: meeting?.greeterContact2
            ? meeting.greeterContact2
            : '',
        nurseryCount: meeting?.nurseryCount ? meeting.nurseryCount : 0,
        greeterContact1: meeting?.greeterContact1
            ? meeting.greeterContact1
            : '',
        securityContact: meeting?.securityContact
            ? meeting.securityContact
            : '',
        announcementsContact: meeting?.announcementsContact
            ? meeting.announcementsContact
            : '',
        attendanceCount: meeting?.attendanceCount ? meeting.attendanceCount : 0,
        meetingId: meeting?.meetingId ? meeting.meetingId : meetingId,
        mealContact: meeting?.mealContact ? meeting.mealContact : '',
        closingContact: meeting?.closingContact ? meeting.closingContact : '',
        notes: meeting?.notes ? meeting.notes : '',
        cafeCount: meeting?.cafeCount ? meeting.cafeCount : 0,
        youthCount: meeting?.youthCount ? meeting.youthCount : 0,
        cafeContact: meeting?.cafeContact ? meeting.cafeContact : '',
        setupContact: meeting?.setupContact ? meeting.setupContact : '',
        meetingDate: meeting?.meetingDate ? meeting.meetingDate : dashDate,
        clientId: meeting?.clientId
            ? meeting.clientId
            : userProfile?.activeOrg?.organization?.code,
        donations: meeting?.donations ? meeting.donations : 0,
        youthContact: meeting?.youthContact ? meeting.youthContact : '',
        nurseryContact: meeting?.murseryContact ? meeting.nurseryContact : '',
        cleanupContact: meeting?.cleanupContact ? meeting.cleanupContact : '',
        resourceContact: meeting?.resourceContact
            ? meeting.resourceContact
            : '',
        childrenContact: meeting?.childrenContact
            ? meeting.childrenContact
            : '',
        newcomersCount: meeting?.newcomersCount ? meeting.newcomersCount : 0,
        mtgCompKey: meeting?.mtgCompKey ? meeting.mtgCompKey : mtgCompKey,
        facilitatorContact: meeting?.facilitatorContact
            ? meeting.facilitatorContact
            : '',
        transportationCount: meeting?.transportationCount
            ? meeting.transportationContact
            : 0,
        worship: meeting?.worship ? meeting.worship : '',
        avContact: meeting?.avContact ? meeting.avContact : '',
        supportContact: meeting?.supportContact ? meeting.supportContact : '',
        meetingType: meeting?.meetingType ? meeting.meetingType : '',
        title: meeting?.title ? meeting.title : '',
    });
    // const [isTitleValid, setIsTitleValid] = useState(true);
    function inputChangedHandler(inputIdentifier, enteredValue) {
        setValues((curInputValues) => {
            if (inputIdentifier === 'title') {
                if (enteredValue.length < 3) {
                    setIsTitleValid(false);
                } else {
                    setIsTitleValid(true);
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
    const [isTitleValid, setIsTitleValid] = useState(
        values?.title?.length > 2 ? true : false
    );
    // determin if active or historic
    const historic = isDateDashBeforeToday(meeting.meetingDate);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
            headerRight: () => (
                <>
                    {meeting.meetingId !== '0' &&
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
        printObject('MF:163-->data', data);
        let dateString =
            data.getMonth() +
            1 +
            '-' +
            data.getDate() +
            '-' +
            data.getFullYear() +
            ' ';
        const yr = parseInt(data.getFullYear());
        const mo = parseInt(data.getMonth());
        const da = parseInt(data.getDate());
        const tmp = new Date(yr, mo, da, 0, 0, 0);
        printObject('MF:176-->tmp', tmp);
        // save the date value for control
        setMeetingDate(tmp);
        //make string to save in values.
        let mtgDateString =
            data.getFullYear() +
            '-' +
            ('0' + (data.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + data.getDate()).slice(-2);
        printObject('MF:186-->mtgDateString', mtgDateString);
        const newValues = {
            ...values,
            meetingDate: mtgDateString,
        };
        //====================================
        // set the dateValue object as well.
        setDateValue(tmp);
        printObject('MF:194--newValues', newValues);
        setValues(newValues);
        return;
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
            ...values,
            meetingType: value,
        };
        meetingTypeRef.current = value;
        setValues(newValues);
    };
    const handleFormSubmit = () => {
        // need to create updated mtgCompKey from date
        const dateParts = values.meetingDate.split('-');
        const newKey =
            userProfile?.activeOrg?.organization?.code.toLowerCase() +
            '#' +
            dateParts[0] +
            '#' +
            dateParts[1] +
            '#' +
            dateParts[2];
        const newValues = {
            ...values,
            mtgCompKey: newKey,
            mealCount: parseInt(values.mealCount),
            attendanceCount: parseInt(values.attendanceCount),
            newcomersCount: parseInt(values.newcomersCount),
        };

        // console.log('---------------------------');
        // printObject('newValues', newValues);
        // console.log('---------------------------');
        // return;
        // mutation.mutate(values);
        handleUpdate(values);
    };
    const onMeetingDateCancel = () => setModalMeetingDateVisible(false);
    // printObject('MF:58-->meeting:', meeting);
    useEffect(() => {
        //printObject('MF:218-->values', values);
        let dateObj = dateDashToDateObject(values.meetingDate);
        setDateValue(dateObj);
        //printObject('MF:220-->dateObj', dateObj);
    }, []);
    const mutation = useMutation({
        mutationFn: (values) => {
            return (
                PutMeeting(values),
                {
                    onSuccess: (meeting) => {
                        queryCache.invalidateQueries(['meetings', 'active']);
                    },
                }
            );
        },
    });

    return (
        <>
            <ScrollView>
                {mutation.isLoading ? (
                    'Adding meeting...'
                ) : (
                    <>
                        {mutation.isError ? (
                            <View>
                                <Text>
                                    An error occurred: {mutation.error.message}
                                </Text>
                            </View>
                        ) : null}

                        {mutation.isSuccess ? (
                            <View>
                                <Text>Meeting added!</Text>
                            </View>
                        ) : null}
                        <KeyboardAvoidingView
                            behavior='padding'
                            style={[
                                styles.surface,
                                { backgroundColor: mtrTheme.colors.background },
                            ]}
                        >
                            <ScrollView>
                                <View
                                    style={mtrTheme.meetingEditTypeSelectorRow}
                                >
                                    <TypeSelectors
                                        pick={values.meetingType}
                                        setPick={handleTypeChange}
                                    />
                                </View>
                                <View style={mtrTheme.meetingEditFirstRow}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            userProfile.activeOrg.role ===
                                            'manage'
                                                ? setModalMeetingDateVisible(
                                                      true
                                                  )
                                                : null
                                        }
                                    >
                                        <View
                                            style={
                                                mtrTheme.meetingEditDateWrapper
                                            }
                                        >
                                            {Platform.OS === 'ios' && (
                                                <View
                                                    style={
                                                        mtrTheme.meetingEditIOSDataCompContainer
                                                    }
                                                >
                                                    <DateBall
                                                        date={
                                                            values.meetingDate
                                                        }
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
                                                        date={
                                                            values.meetingDate
                                                        }
                                                    />
                                                </View>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                    <View>
                                        <View
                                            style={{ flexDirection: 'column' }}
                                        >
                                            {meetingTypeRef.current ===
                                                'Lesson' && (
                                                <>
                                                    <Input
                                                        label='Lesson'
                                                        labelStyle={
                                                            mtrTheme.meetingEditInputLabel
                                                        }
                                                        textInputConfig={{
                                                            backgroundColor:
                                                                'white',
                                                            value: values.title,
                                                            paddingHorizontal: 1,
                                                            fontSize: 24,
                                                            color: 'black',
                                                            editable:
                                                                userProfile
                                                                    .activeOrg
                                                                    .role ===
                                                                'manage'
                                                                    ? true
                                                                    : false,
                                                            marginHorizontal: 10,
                                                            placeholder:
                                                                'Lesson Title',
                                                            // style: { color: 'white' },
                                                            fontWeight: '300',
                                                            minWidth: '70%',
                                                            letterSpacing: 0,
                                                            onChangeText:
                                                                inputChangedHandler.bind(
                                                                    this,
                                                                    'title'
                                                                ),
                                                        }}
                                                    />
                                                    <Input
                                                        label='Contact'
                                                        labelStyle={
                                                            mtrTheme.meetingEditInputLabel
                                                        }
                                                        textInputConfig={{
                                                            backgroundColor:
                                                                'white',
                                                            value: values.supportContact,
                                                            paddingHorizontal: 1,
                                                            fontSize: 24,
                                                            color: 'black',
                                                            marginHorizontal: 10,
                                                            placeholder:
                                                                'Contact',
                                                            fontWeight: '300',
                                                            minWidth:
                                                                width * 0.6,
                                                            letterSpacing: 0,
                                                            onChangeText:
                                                                inputChangedHandler.bind(
                                                                    this,
                                                                    'supportContact'
                                                                ),
                                                        }}
                                                    />
                                                </>
                                            )}
                                            {meetingTypeRef.current ===
                                                'Testimony' && (
                                                <>
                                                    <Input
                                                        label='Guest'
                                                        labelStyle={
                                                            mtrTheme.meetingEditInputLabel
                                                        }
                                                        textInputConfig={{
                                                            backgroundColor:
                                                                'white',
                                                            value: values.title,
                                                            paddingHorizontal: 1,
                                                            fontSize: 24,
                                                            editable:
                                                                userProfile
                                                                    .activeOrg
                                                                    .role ===
                                                                'manage'
                                                                    ? true
                                                                    : false,
                                                            color: 'black',
                                                            marginHorizontal: 10,
                                                            autoCapitalize:
                                                                'words',
                                                            placeholder:
                                                                'Guest',
                                                            // style: { color: 'white' },
                                                            fontWeight: '300',
                                                            minWidth: '70%',
                                                            letterSpacing: 0,
                                                            onChangeText:
                                                                inputChangedHandler.bind(
                                                                    this,
                                                                    'title'
                                                                ),
                                                        }}
                                                    />
                                                </>
                                            )}
                                            {meetingTypeRef.current ===
                                                'Special' && (
                                                <>
                                                    <Input
                                                        label='Event Title'
                                                        labelStyle={
                                                            mtrTheme.meetingEditInputLabel
                                                        }
                                                        textInputConfig={{
                                                            backgroundColor:
                                                                'white',
                                                            value: values.title,
                                                            paddingHorizontal: 1,
                                                            fontSize: 24,
                                                            color: 'black',
                                                            marginHorizontal: 10,
                                                            placeholder:
                                                                'Event Title',
                                                            // style: { color: 'white' },
                                                            fontWeight: '300',
                                                            minWidth:
                                                                width * 0.6,
                                                            letterSpacing: 0,
                                                            onChangeText:
                                                                inputChangedHandler.bind(
                                                                    this,
                                                                    'title'
                                                                ),
                                                        }}
                                                    />
                                                    <Input
                                                        label='Contact'
                                                        labelStyle={
                                                            mtrTheme.meetingEditInputLabel
                                                        }
                                                        textInputConfig={{
                                                            backgroundColor:
                                                                'white',
                                                            value: values.supportContact,
                                                            paddingHorizontal: 1,
                                                            fontSize: 24,
                                                            color: 'black',
                                                            marginHorizontal: 10,
                                                            placeholder:
                                                                'Contact',
                                                            fontWeight: '300',
                                                            minWidth:
                                                                width * 0.6,
                                                            letterSpacing: 0,
                                                            onChangeText:
                                                                inputChangedHandler.bind(
                                                                    this,
                                                                    'supportContact'
                                                                ),
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: 'yellow',
                                        borderRadius: 10,
                                        padding: 5,
                                        marginHorizontal: 10,
                                        marginVertical: 5,
                                    }}
                                >
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            marginTop: 0,
                                        }}
                                    >
                                        <Text
                                            style={
                                                mtrTheme.meetingEditInputLabel
                                            }
                                        >
                                            Meal Information
                                        </Text>
                                    </View>
                                    {/* <View
                                style={[
                                    mtrTheme.meetingEditBasicRow,
                                    mtrTheme.meetingEditMealRow,
                                ]}
                            > */}
                                    <View style={{ flexDirection: 'column' }}>
                                        <View>
                                            <Input
                                                label='Menu'
                                                labelStyle={
                                                    mtrTheme.meetingEditInputLabel
                                                }
                                                textInputConfig={{
                                                    backgroundColor: 'white',
                                                    value: values.meal,
                                                    paddingHorizontal: 1,
                                                    fontSize: 24,
                                                    color: 'black',
                                                    marginHorizontal: 10,
                                                    //placeholder: 'Meal',
                                                    fontWeight: '300',
                                                    minWidth: width * 0.5,
                                                    letterSpacing: 0,
                                                    onChangeText:
                                                        inputChangedHandler.bind(
                                                            this,
                                                            'meal'
                                                        ),
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View>
                                            <Input
                                                label='Contact'
                                                labelStyle={
                                                    mtrTheme.meetingEditInputLabel
                                                }
                                                textInputConfig={{
                                                    backgroundColor: 'white',
                                                    value: values.mealContact,
                                                    paddingHorizontal: 1,
                                                    fontSize: 24,
                                                    color: 'black',
                                                    marginHorizontal: 10,
                                                    //placeholder: 'Meal',
                                                    fontWeight: '300',
                                                    minWidth: width * 0.37,
                                                    letterSpacing: 0,
                                                    onChangeText:
                                                        inputChangedHandler.bind(
                                                            this,
                                                            'mealContact'
                                                        ),
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View
                                        style={[styles.row, { paddingTop: 5 }]}
                                    >
                                        <View
                                            style={[
                                                mtrTheme.meetingEditNumberLabelContainer,
                                                { minWidth: '50%' },
                                            ]}
                                        >
                                            <Text
                                                style={
                                                    mtrTheme.meetingEditMealNumberText
                                                }
                                            >
                                                Served:
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                mtrTheme.meetingEditMealNumberContainer,
                                                { minWidth: '50%' },
                                            ]}
                                        >
                                            <NumberInput
                                                numberStyle={{
                                                    color: 'white',
                                                    borderColor: 'white',
                                                }}
                                                graphicStyle={{
                                                    color: 'white',
                                                    borderColor: 'white',
                                                }}
                                                value={values.mealCount}
                                                onAction={inputChangedHandler.bind(
                                                    this,
                                                    'mealCount'
                                                )}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={[styles.row, { marginVertical: 4 }]}
                                >
                                    <View
                                        style={[
                                            mtrTheme.meetingEditNumberLabelContainer2,
                                            {
                                                minWidth: '50%',
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={
                                                mtrTheme.meetingEditMealNumberText
                                            }
                                        >
                                            Attendance:
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            mtrTheme.meetingEditMealNumberContainer,
                                            {
                                                minWidth: '50%',
                                            },
                                        ]}
                                    >
                                        <NumberInput
                                            numberStyle={{
                                                color: 'white',
                                                borderColor: 'white',
                                            }}
                                            graphicStyle={{
                                                color: 'white',
                                                borderColor: 'white',
                                            }}
                                            value={values.attendanceCount}
                                            onAction={inputChangedHandler.bind(
                                                this,
                                                'attendanceCount'
                                            )}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={[styles.row, { marginVertical: 0 }]}
                                >
                                    <View
                                        style={[
                                            mtrTheme.meetingEditNumberLabelContainer,
                                            { minWidth: '50%' },
                                        ]}
                                    >
                                        <Text
                                            style={
                                                mtrTheme.meetingEditMealNumberText
                                            }
                                        >
                                            Newcomers:
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            mtrTheme.meetingEditMealNumberContainer,
                                            { minWidth: '50%' },
                                        ]}
                                    >
                                        <NumberInput
                                            numberStyle={{
                                                color: 'white',
                                                borderColor: 'white',
                                            }}
                                            graphicStyle={{
                                                color: 'white',
                                                borderColor: 'white',
                                            }}
                                            value={values.newcomersCount}
                                            onAction={inputChangedHandler.bind(
                                                this,
                                                'newcomersCount'
                                            )}
                                        />
                                    </View>
                                </View>
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
                                            value={values.donations}
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
                                            color: 'black',
                                            value: values.notes,
                                            capitalize: 'sentence',
                                            autoCorrect: true,
                                            marginHorizontal: 20,
                                            placeholder: '',
                                            style: { color: 'black' },
                                            fontWeight: '500',
                                            letterSpacing: 0,
                                            multiline: true,
                                            minHeight: 100,
                                            onChangeText:
                                                inputChangedHandler.bind(
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
                                        enabled={isTitleValid}
                                        onPress={handleFormSubmit}
                                    />
                                </View>
                                <View styles={{ color: 'white' }}>
                                    <DateTimePickerModal
                                        isVisible={modalMeetingDateVisible}
                                        mode='date'
                                        date={dateValue}
                                        display='inline'
                                        style={{
                                            backgroundColor:
                                                mtrTheme.colors.background,
                                        }}
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
                )}
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

    dateWrapper: {
        margin: 5,
    },
    calendarText: {
        color: 'white',
    },
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
