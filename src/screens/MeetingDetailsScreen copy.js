import React, {
    useEffect,
    useState,
    useLayoutEffect,
    useCallback,
    useRef,
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Platform,
} from 'react-native';

// import * as Application from 'expo-application';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import {
    useNavigation,
    useIsFocused,
    useNavigationState,
    useFocusEffect,
} from '@react-navigation/native';
import {
    getMeetingGroups,
    fetchSpecificMeeting,
    clearGroups,
    createTmp,
} from '../features/meetingsSlice';
import GroupList from '../components/GroupList';
import DateBall from '../components/ui/DateBall';
import DateStack from '../components/ui/DateStack';
import {
    Surface,
    withTheme,
    useTheme,
    Badge,
    ActivityIndicator,
} from 'react-native-paper';
import {
    printObject,
    isDateDashBeforeToday,
    dateNumToDateDash,
} from '../utils/helpers';
import GroupListCard from '../components/Group.List.Card';
import MeetingListCard from '../components/Meeting.List.Card';
const MeetingDetails = (props) => {
    const meetingId = props.route.params.meetingId;

    // const [tmpMeeting, setTmpMeeting] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const mtrTheme = useTheme();
    const meetings = useSelector((state) => state.meetings.meetings);
    const meeting = useSelector((state) => state.meetings.tmpMeeting);
    // const [meeting, setMeeting] = useState();
    // const mtg = useRef(meetingPassedIn);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const groups = useSelector((state) => state.meetings.groups);
    const [historic, setHistoric] = useState(false);
    // const hMeetings = useSelector((state) => state.meetings.historicMeetings);
    // const aMeetings = useSelector((state) => state.meetings.activeMeetings);
    const [displayGroups, setDisplayGroups] = useState([]);
    const meeter = useSelector((state) => state.system);

    const navigation = useNavigation();
    // const activeMeetings = useSelector(
    //     (state) => state.meetings.activeMeetings
    // );
    // determin if active or historic
    // const historic = isDateDashBeforeToday(tmpMeeting.meetingDate);
    const uns = useNavigationState((state) => state);
    useFocusEffect(
        React.useCallback(() => {
            // alert(JSON.stringify(uns));
            // alert('ActiveScree: focused');
            dispatch(fetchSpecificMeeting(meetingId));
            // console.log('MDS:78-->useFocusEffect');
            // setIsLoading(true);
            // let today = dateNumToDateDash(meeter.today);
            // let mtg = [];
            // meetings.forEach((m) => {
            //     if (m.meetingId === meetingId) {
            //         mtg.push(m);
            //         if (m.meetingDate < today) {
            //             setHistoric(true);
            //         } else {
            //             setHistoric(false);
            //         }
            //     }
            // });
            // console.log('MDS:89-->got meeting to set');
            // setMeeting(mtg[0]);
            //printObject('MDS:94-->mtg[0]:', mtg[0]);
            console.log('MDS:89-->setMeeting complete');
            const groups = dispatch(getMeetingGroups(meetingId));
            setDisplayGroups(groups);
            setIsLoading(false);
            // Do something when the screen is focused
            return () => {
                // alert('ActiveScreen was unfocused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );
    useEffect(() => {
        console.log('MDS:89-->useEffect::meetingId', meetingId);
        // setIsLoading(true);
        // let today = dateNumToDateDash(meeter.today);
        // let mtg = [];
        // meetings.forEach((m) => {
        //     if (m.meetingId === meetingId) {
        //         mtg.push(m);
        //         if (m.meetingDate < today) {
        //             setHistoric(true);
        //         } else {
        //             setHistoric(false);
        //         }
        //     }
        // });
        // console.log('MDS:89-->got meeting to set');
        // setMeeting(mtg[0]);
        // console.log('MDS:89-->setMeeting complete');
        // const groups = dispatch(getMeetingGroups(meetingId));
        // setDisplayGroups(groups);
        // setIsLoading(false);
    }, []);

    useLayoutEffect(() => {
        let headerLabelColor = '';
        if (Platform.OS === 'ios') {
            headerLabelColor = 'white';
        }
        if (meeter.userRole !== 'guest') {
            navigation.setOptions({
                title: meeter.appName,
                headerBackTitle: 'Back',
                headerRight: () => (
                    <Button
                        onPress={() =>
                            navigation.navigate('MeetingEdit', {
                                meetingId: meetingId,
                            })
                        }
                        // color='red'
                        color={headerLabelColor}
                        title='Edit'
                    />
                ),
            });
        } else {
            navigation.setOptions({
                title: meeter.appName,
                headerBackTitle: 'Back',
            });
        }
    }, [navigation, meeter]);

    // useEffect(() => {
    //     let hm = hMeetings.filter(
    //         (m) => m.meetingId === meetingPassedIn.meetingId
    //     );
    //     if (Object.keys(hm).length !== 0) {
    //         //if (hm.length > 0) {
    //         printObject('historic meeting:', hm);
    //         dispatch(createTmp(hm));
    //     } else {
    //         let am = aMeetings.filter(
    //             (m) => m.meetingId === meetingPassedIn.meetingId
    //         );
    //         if (am.length > 0) {
    //             printObject('active meeting:', am);
    //             dispatch(createTmp(am));
    //         }
    //     }
    //     dispatch(clearGroups());
    //     const groups = dispatch(getMeetingGroups(meeting.meetingId));
    //     setDisplayGroups(groups);
    // }, [route, isFocused]);
    // printObject('MDS:58-->meeting:', meeting);
    // useEffect(() => {
    //     setMeeting(tmpMeeting);
    // }, [tmpMeeting]);
    printObject('meeting:', meeting);
    if (isLoading || !meeting) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator
                    color={mtrTheme.colors.background}
                    size={80}
                />
            </View>
        );
    }

    return (
        <>
            <Surface style={styles.surface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>
                        {meeting?.meetingType}
                    </Text>
                </View>

                <View style={styles.firstRow}>
                    <View style={styles.dateWrapper}>
                        {Platform.OS === 'ios' && (
                            <View style={{ padding: 5 }}>
                                <DateBall date={meeting?.meetingDate} />
                            </View>
                        )}
                        {Platform.OS === 'android' && (
                            <View style={{ padding: 1 }}>
                                <DateStack date={meeting?.meetingDate} />
                            </View>
                        )}
                    </View>
                    <View>
                        <View style={{ flexDirection: 'column' }}>
                            {meeting.meetingType === 'Lesson' && (
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={mtrTheme.subTitle}>
                                        {meeting.title}
                                    </Text>
                                </View>
                            )}
                            <View style={{ alignContent: 'flex-start' }}>
                                <Text style={mtrTheme.detailsTitle}>
                                    {meeting.meetingType === 'Lesson'
                                        ? meeting.supportContact
                                        : meeting.title}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={mtrTheme.detailsRowLabel}>Meal</Text>
                    </View>
                    <View style={{ marginHorizontal: 2 }}>
                        <Text style={mtrTheme.detailsRowValue}>
                            meeting.meal
                        </Text>
                    </View>
                    {historic && (
                        <View style={{ marginLeft: 'auto', padding: 10 }}>
                            <Badge size={30} style={mtrTheme.detailsBadge}>
                                {meeting.mealCount}
                            </Badge>
                        </View>
                    )}
                </View>
                {!historic && (
                    <View style={[styles.row, { marginBottom: 10 }]}>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={mtrTheme.detailsRowLabel}>
                                Meal Contact:
                            </Text>
                        </View>
                        <View style={{ marginHorizontal: 2 }}>
                            <Text style={mtrTheme.detailsRowValue}>
                                {meeting.mealContact === ''
                                    ? 'TBD'
                                    : meeting.mealContact}
                            </Text>
                        </View>
                    </View>
                )}
                {historic && (
                    <View style={styles.row}>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={mtrTheme.detailsRowLabel}>
                                Attendance:
                            </Text>
                        </View>

                        <View style={{ marginLeft: 'auto', padding: 10 }}>
                            <Badge size={30} style={mtrTheme.detailsBadge}>
                                {meeting.attendanceCount}
                            </Badge>
                        </View>
                    </View>
                )}
                {meeting.newcomersCount > 0 && (
                    <View style={styles.row}>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={mtrTheme.detailsRowLabel}>
                                Newcomers:
                            </Text>
                        </View>

                        <View style={{ marginLeft: 'auto', padding: 10 }}>
                            <Badge size={30} style={mtrTheme.detailsBadge}>
                                {meeting.newcomersCount}
                            </Badge>
                        </View>
                    </View>
                )}
                <View
                    style={{
                        borderTopColor: 'yellow',
                        borderBottomColor: 'yellow',
                        marginHorizontal: 20,
                        marginBottom: 20,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderTopWidth: StyleSheet.hairlineWidth,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            textAlign: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: '400',
                                textAlign: 'center',
                                paddingVertical: 5,
                            }}
                        >
                            Open-Share Groups
                        </Text>
                        {meeter.userRole !== 'guest' && (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    marginLeft: 10,
                                }}
                            >
                                <TouchableOpacity
                                    key={0}
                                    onPress={() =>
                                        navigation.navigate('GroupEdit', {
                                            meetingId: meetingId,
                                            groupId: '0',
                                        })
                                    }
                                    style={({ pressed }) =>
                                        pressed && styles.pressed
                                    }
                                >
                                    <FontAwesome5
                                        name='plus-circle'
                                        size={20}
                                        color='white'
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                <GroupList meetingId={meetingId} />
            </Surface>
        </>
    );
};
export default withTheme(MeetingDetails);
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
        alignItems: 'center',
        marginHorizontal: 5,
    },

    dateWrapper: {
        margin: 5,
    },
});
