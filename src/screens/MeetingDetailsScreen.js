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
// import * as Application from 'expo-application';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { PutGroup } from '../components/common/hooks/groupQueries';
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
    dateNumToDateDash,
} from '../utils/helpers';
import { FetchMeeting } from '../components/common/hooks/meetingQueries';
import { FetchGroups } from '../components/common/hooks/groupQueries';
import GroupListCard from '../components/Group.List.Card';
import CustomButton from '../components/ui/CustomButton';
import { getGroups } from '../features/groups/groupsThunks';
//   FUNCTION START
//   ==============
const MeetingDetails = (props) => {
    const meetingId = props.route.params.meetingId;
    const mtrTheme = useTheme();
    const userProfile = useSelector((state) => state.user.profile);
    const perms = useSelector((state) => state.user.perms);
    const [showDefaultsButton, setShowDefaultButton] = useState(true);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [groups, setGroups] = useState([]);
    const [authority, setAuthority] = useState(
        perms.includes('manage') || perms.includes('groups') || false
    );
    const meeter = useSelector((state) => state.system);
    const navigation = useNavigation();
    const uns = useNavigationState((state) => state);
    let historic = false;

    let meeting = {};
    const { width, height } = useWindowDimensions();
    // printObject('MDS:80-->userProfile:\n', userProfile);
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
    async function getDefaultGroups() {
        try {
            // printObject('getDefaultGroups:', userProfile.activeOrg.id);
            const systemInfo = await API.graphql({
                query: queries.getOrganizationDefaultGroups,
                variables: { id: userProfile.activeOrg.id },
            });
            const defaultGroups =
                systemInfo.data.getOrganization.defaultGroups.items;
            // printObject('defaultGroups:\n', defaultGroups);
            setGroups(defaultGroups);
            setShowDefaultButton(true);
        } catch (error) {
            printObject('DGS:116-->systemInfo TryCatch failure:\n', error);
            return;
        }
    }
    async function newGetGroups() {
        try {
            await dispatch(
                getGroups({ meetingId: '912b91de1fd5436fee640ddde3c98888' })
            ).then(() => {
                console.log('DONE getGroups');
            });
        } catch (error) {
            printObject('DGS:142-->error getGroups');
        }
    }
    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }
    useFocusEffect(
        useCallback(() => {
            newGetGroups();
            const subscription = AppState.addEventListener(
                'change',
                onAppStateChange
            );
            MEETING.refetch();
            //GROUPS.refetch();
            getDefaultGroups();
            //printObject('MDS:113-->REFETCH', null);

            return () => subscription.remove();
        }, [])
    );
    useEffect(() => {
        console.log('GROUPS REFRESHED');
    }, [GROUPS]);

    const MEETING = useQuery(
        ['mtg', meetingId],
        () => FetchMeeting(meetingId),
        {
            refetchInterval: 60000,
            cacheTime: 2000,
            enabled: true,
        }
    );
    const GROUPS = useQuery(['grps', meetingId], () => FetchGroups(meetingId), {
        refetchInterval: 60000,
        cacheTime: 2000,
        enabled: true,
    });
    const handleAddDefaults = async () => {
        console.log('handleAddDefaults');
        // printObject('MDS:160-->meeting:\n', meeting);
        groups.map((group) => {
            console.log('group.id:', group.id);
            const values = {
                meetingId: meetingId,
                groupId: '0',
                gender: group.gender,
                title: group.title,
                attendance: 0,
                location: group?.location ? group?.location : '',
                grpCompKey: meeting.mtgCompKey,
                facilitator: group?.facilitator ? group.facilitator : '',
                cofacilitator: '',
                notes: '',
            };
            PutGroup(values)
                .then((results) => {
                    // printObject('MDS:177-->PutGroup results:\n', results);
                })
                .catch((error) => {
                    printObject('MDS:182-->PutGroup error:', error);
                });
            // printObject('MDS:173-->values:', values);
        });
        //      only let them add one time.
        GROUPS.refetch();
        setShowDefaultButton(false);
    };
    //if (data) {
    if (MEETING.data) {
        // printObject('DATA to use:', MEETING.data);
        meeting = MEETING.data.body;
    }

    if (MEETING.isLoading || GROUPS.isLoading) {
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
    if (MEETING.isError) {
        return (
            <View>
                <Text>Something went wrong</Text>
            </View>
        );
    }
    if (meeting) {
        historic = isDateDashBeforeToday(meeting.meetingDate);
    }
    // printObject('MDS:234-->GROUPS.data:\n', GROUPS?.data);
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
            <Surface style={styles.surface}>
                {/* <SafeAreaView> */}
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
                                            meetingId: meetingId,
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
                {GROUPS.data ? (
                    <>
                        <FlatList
                            data={GROUPS.data.body}
                            keyExtractor={(item) => item.groupId}
                            persistentScrollbar={true}
                            renderItem={({ item }) => (
                                <GroupListCard group={item} meeting={meeting} />
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
                {authority && groups.length > 0 && showDefaultsButton && (
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
                {/* <GroupList meetingId={meetingId} /> */}
                {/* <View>
                    (GROUPS.data &&
                    <FlatList
                        data={GROUPS.data.body}
                        keyExtractor={(item) => item.groupId}
                        persistentScrollbar={true}
                        renderItem={({ item }) => (
                            <GroupListCard group={item} meeting={meeting} />
                        )}
                        ListFooterComponent={<></>}
                    />
                    }
                </View> */}
                {/* </SafeAreaView> */}
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
