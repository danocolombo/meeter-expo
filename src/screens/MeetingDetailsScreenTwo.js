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
    FlatList,
    TouchableOpacity,
    useWindowDimensions,
    SafeAreaView,
    Platform,
    AppState,
} from 'react-native';
import { API } from 'aws-amplify';
import * as queries from '../jerichoQL/queries';
import { useQuery } from '@tanstack/react-query';
import { focusManager } from '@tanstack/react-query';
import * as Localization from 'expo-localization';
// import * as Application from 'expo-application';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
// import { PutGroup } from '../components/common/hooks/groupQueries';
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
    FAB,
} from 'react-native-paper';
import {
    printObject,
    isDateDashBeforeToday,
    dateDashToDateObject,
    dateNumToDateDash,
} from '../utils/helpers';
import { FetchMeeting } from '../components/common/hooks/meetingQueries';
import { FetchGroups } from '../components/common/hooks/groupQueries';
import GroupListCard from '../components/Group.List.Card';
import MeetingListCard from '../components/Meeting.List.Card';
import { useUserContext } from '../contexts/UserContext';
import CustomButton from '../components/ui/CustomButton';
import {
    addDefaultGroups,
    deleteGroupFromMeeting,
} from '../features/meetings/meetingsThunks';
// import { getGroupsForMeeting } from '../features/groups/groupsThunks';
// import { getMeetingById } from '../features/meetings/meetingsThunks';
//   FUNCTION START
//   ==============
const MeetingDetails = (props) => {
    const id = props.route.params.id;
    // printObject('MDST:70-->props:\n', id);
    const mtrTheme = useTheme();
    const { userProfile, perms } = useUserContext();
    const [showDefaultsButton, setShowDefaultButton] = useState(true);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const newPerms = useSelector((state) => state.user.perms);
    const [authority, setAuthority] = useState(
        newPerms.includes('manage') || newPerms.includes('groups') || false
    );
    const meeter = useSelector((state) => state.system);
    const meetings = useSelector((state) => state.meetings.meetings);
    const defaultGroups = useSelector(
        (state) => state?.system?.activeOrg?.defaultGroups?.items
    );
    const navigation = useNavigation();
    let historic = false;
    const userTimeZone = Localization.timezone;
    const [isLoading, setIsLoading] = useState(false);
    const [meeting, setMeeting] = useState(
        useSelector((state) => state.meetings.meetings.find((m) => m.id === id))
    );
    const [dateValue, setDateValue] = useState(
        meeting.meetingDate ? new Date(meeting.meetingDate) : new Date()
    );
    const [meetingGroups, setMeetingGroups] = useState([]);
    const { width, height } = useWindowDimensions();
    useEffect(() => {
        if (meeting?.meetingDate) {
            // setDateString(meeting.date);
            let dateObj = dateDashToDateObject(meeting.meetingDate);
            // setMeetingDate(meeting.meetingDate); // Update meetingDate whenever the meeting.meetingDate changes
            setDateValue(dateObj);
        } else {
            // setDateString(new Date().toISOString().substring(0, 10));
            setDateValue(new Date());
        }
    }, [meeting]); // Add meeting dependency to this useEffect to handle changes in the meeting object
    useEffect(() => {
        setIsLoading(true);
        setMeeting(meetings.find((m) => m.id === id));
        setIsLoading(false);
    }, [meetings]);

    useLayoutEffect(() => {
        let headerLabelColor = '';
        if (Platform.OS === 'ios') {
            headerLabelColor = 'white';
        }
        // printObject('MDS:87-->userProfile:\n', userProfile);

        if (perms.includes('manage') || perms.includes('meals')) {
            navigation.setOptions({
                title: meeter.appName,
                headerBackTitle: 'Back',
                headerRight: () => (
                    <Button
                        onPress={() =>
                            navigation.navigate('MeetingEdit', {
                                id: id,
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
    // async function getDefaultGroups() {
    //     try {
    //         // printObject('getDefaultGroups:', userProfile.activeOrg.id);
    //         const systemInfo = await API.graphql({
    //             query: queries.getOrganizationDefaultGroups,
    //             variables: { id: userProfile.activeOrg.id },
    //         });
    //         const defaultGroups =
    //             systemInfo.data.getOrganization.defaultGroups.items;
    //         // printObject('defaultGroups:\n', defaultGroups);
    //         setGroups(defaultGroups);
    //         setShowDefaultButton(true);
    //     } catch (error) {
    //         printObject('DGS:116-->systemInfo TryCatch failure:\n', error);
    //         return;
    //     }
    // }
    async function newGetGroups() {
        try {
            await dispatch(getGroupsForMeeting({ meetingId: id })).then(() => {
                // console.log('DONE getGroups');
            });
        } catch (error) {
            printObject('DGS:142-->error getGroups');
        }
    }
    function handleDeleteRequest(values) {
        const deleteRequest = {
            meetingId: id,
            groupId: values,
        };
        dispatch(deleteGroupFromMeeting(deleteRequest));
    }
    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }
    // useFocusEffect(
    //     useCallback(() => {
    //         dispatch(getMeetingById(id))
    //             .then((mtg) => {
    //                 if (mtg.meta.requestStatus === 'fulfilled') {
    //                     setMeeting(mtg.payload);
    //                 } else {
    //                     printObject(
    //                         'MDST:208-->getMeetingById failure:\n',
    //                         mtg
    //                     );
    //                 }
    //                 setIsLoading(false);
    //             })
    //             .catch((err) => {
    //                 console.log('MDST:215-->getMeetingById failure:', err);
    //                 setIsLoading(false);
    //             });
    //         return;
    //     }, [])
    // );

    const handleAddDefaults = async () => {
        dispatch(
            addDefaultGroups({
                meeting: meeting,
                orgId: userProfile.activeOrg.id,
                defaultGroups: defaultGroups,
            })
        );
    };
    //if (data) {
    const formattedDate = dateValue.toLocaleDateString('en-US', {
        timeZone: userTimeZone,
    });

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
    // printObject('MDST:240-->meeting:\n', meeting);
    // printObject('MDST:264-->defaultGroups\n', defaultGroups);
    // printObject('MDST:267-->userProfile:\n', userProfile);
    // printObject('MDST:268-->perms\n', perms);
    // printObject('MDST:270-->newUserProfile\n', newUserProfile);
    // printObject('MDST:272-->newPerms:\n', newPerms);
    // printObject('MDST:273-->authority:', authority);
    return (
        <>
            <Surface style={styles.surface}>
                {/* <SafeAreaView> */}
                <View>
                    <Text style={{ color: 'white' }}>
                        MeetingDetailsScreenTwo
                    </Text>
                </View>
                <View>
                    <Text style={mtrTheme.screenTitle}>
                        {meeting?.meetingType}
                    </Text>
                </View>
                <View style={styles.firstRow}>
                    <View style={styles.dateWrapper}>
                        {Platform.OS === 'ios' && (
                            <View style={{ padding: 5 }}>
                                <DateBall date={formattedDate} />
                            </View>
                        )}
                        {Platform.OS === 'android' && (
                            <View style={{ padding: 1 }}>
                                <DateStack date={formattedDate} />
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
                        <Text style={mtrTheme.detailsRowLabel}>
                            {historic ? 'Meal:' : 'Meal Plans:'}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 2 }}>
                        <Text
                            style={[
                                mtrTheme.groupDetailsMealText,
                                { maxWidth: width * 0.6 },
                            ]}
                        >
                            {meeting.meal === '' ? 'TBD' : meeting.meal}
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
                {meeting.notes && (
                    <View style={mtrTheme.meetingDetailsNotesContainer}>
                        <Text style={mtrTheme.meeingDetailsNotesText}>
                            {meeting.notes}
                        </Text>
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
                        {(perms.includes('manage') ||
                            perms.includes('groups')) && (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    marginLeft: 10,
                                }}
                            >
                                <TouchableOpacity
                                    key={0}
                                    onPress={() =>
                                        navigation.navigate('GroupNew', {
                                            meeting,
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
                {meeting?.groups?.items ? (
                    <>
                        <FlatList
                            data={meeting.groups.items}
                            keyExtractor={(item) => item.id}
                            persistentScrollbar={true}
                            renderItem={({ item }) => (
                                <GroupListCard
                                    group={item}
                                    meeting={meeting}
                                    authority={authority}
                                    handleDeleteRequest={handleDeleteRequest}
                                />
                            )}
                            ListFooterComponent={<></>}
                        />
                    </>
                ) : (
                    <View style={mtrTheme.meetingDetailsGroupLoadingText}>
                        <Text style={mtrTheme.meetingDetailsGroupLoadingText}>
                            Loading Groups...
                        </Text>
                    </View>
                )}
                {authority && showDefaultsButton && (
                    <View
                        style={{
                            marginHorizontal: 20,
                            paddingBottom: 20,
                        }}
                    >
                        <CustomButton
                            text='Add Default Groups'
                            bgColor='blue'
                            fgColor={'white'}
                            type='STANDARD'
                            onPress={() => handleAddDefaults()}
                        />
                    </View>
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
    FAB: {
        position: 'absolute',
        margin: 0,
        right: 20,
        backgroundColor: 'green',
    },
});
