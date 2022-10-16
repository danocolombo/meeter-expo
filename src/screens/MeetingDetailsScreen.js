import React, { useEffect, useState, useLayoutEffect } from 'react';
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
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
    getMeetingGroups,
    clearGroups,
    createTmp,
} from '../features/meetingsSlice';
import GroupList from '../components/GroupList';
import DateBall from '../components/ui/DateBall';
import DateStack from '../components/ui/DateStack';
import { Surface, withTheme, useTheme, Badge } from 'react-native-paper';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import GroupListCard from '../components/Group.List.Card';
import MeetingListCard from '../components/Meeting.List.Card';
const MeetingDetails = ({ route }) => {
    const meetingPassedIn = route.params.meeting;
    const [meeting, setMeeting] = useState(meetingPassedIn);
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const groups = useSelector((state) => state.meetings.groups);
    const tmpMeeting = useSelector((state) => state.meetings.tmpMeeting);
    const hMeetings = useSelector((state) => state.meetings.historicMeetings);
    const aMeetings = useSelector((state) => state.meetings.activeMeetings);
    const [displayGroups, setDisplayGroups] = useState([]);
    const meeter = useSelector((state) => state.system);

    const navigation = useNavigation();
    const activeMeetings = useSelector(
        (state) => state.meetings.activeMeetings
    );
    // determin if active or historic
    const historic = isDateDashBeforeToday(meeting.meetingDate);
    useLayoutEffect(() => {
        let headerLabelColor = '';
        if (Platform.OS === 'ios') {
            headerLabelColor = 'white';
        }
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Back',
            headerRight: () => (
                <Button
                    onPress={() =>
                        navigation.navigate('MeetingEdit', {
                            meeting: meeting,
                        })
                    }
                    // color='red'
                    color={headerLabelColor}
                    title='Edit'
                />
            ),
        });
    }, [navigation, meeter]);

    useEffect(() => {
        let hm = hMeetings.filter(
            (m) => m.meetingId === meetingPassedIn.meetingId
        );
        if (Object.keys(hm).length !== 0) {
            //if (hm.length > 0) {
            printObject('historic meeting:', hm);
            dispatch(createTmp(hm));
        } else {
            let am = aMeetings.filter(
                (m) => m.meetingId === meetingPassedIn.meetingId
            );
            if (am.length > 0) {
                printObject('active meeting:', am);
                dispatch(createTmp(am));
            }
        }
        dispatch(clearGroups());
        const groups = dispatch(getMeetingGroups(meeting.meetingId));
    }, [route, isFocused]);
    // printObject('MDS:58-->meeting:', meeting);
    useEffect(() => {
        setMeeting(tmpMeeting);
    }, [tmpMeeting]);
    return (
        <>
            <Surface style={styles.surface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>
                        {tmpMeeting.meetingType}
                    </Text>
                </View>

                <View style={styles.firstRow}>
                    <View style={styles.dateWrapper}>
                        {Platform.OS === 'ios' && (
                            <View style={{ padding: 5 }}>
                                <DateBall date={tmpMeeting?.meetingDate} />
                            </View>
                        )}
                        {Platform.OS === 'android' && (
                            <View style={{ padding: 1 }}>
                                <DateStack date={tmpMeeting?.meetingDate} />
                            </View>
                        )}
                    </View>
                    <View>
                        <View style={{ flexDirection: 'column' }}>
                            {tmpMeeting.meetingType === 'Lesson' && (
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={mtrTheme.subTitle}>
                                        {tmpMeeting.title}
                                    </Text>
                                </View>
                            )}
                            <View style={{ alignContent: 'flex-start' }}>
                                <Text style={mtrTheme.detailsTitle}>
                                    {tmpMeeting.meetingType === 'Lesson'
                                        ? tmpMeeting.supportContact
                                        : tmpMeeting.title}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={mtrTheme.detailsRowLabel}>
                            {historic ? 'Meal:' : 'Meal Plans:'}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 2 }}>
                        <Text style={mtrTheme.detailsRowValue}>
                            {tmpMeeting.meal === '' ? 'TBD' : tmpMeeting.meal}
                        </Text>
                    </View>
                    {historic && (
                        <View style={{ marginLeft: 'auto', padding: 10 }}>
                            <Badge size={30} style={mtrTheme.detailsBadge}>
                                {tmpMeeting.mealCount}
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
                                {tmpMeeting.mealContact === ''
                                    ? 'TBD'
                                    : tmpMeeting.mealContact}
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
                                {tmpMeeting.attendanceCount}
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
                                {tmpMeeting.newcomersCount}
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
                                        group: {
                                            groupId: '0',
                                            meetingId: meeting.meetingId,
                                            attendance: '0',
                                            gender: 'x',
                                        },
                                        meeting: tmpMeeting,
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
                    </View>
                </View>
                {tmpMeeting?.meetingId && (
                    <GroupList meetingId={tmpMeeting.meetingId} />
                )}
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
