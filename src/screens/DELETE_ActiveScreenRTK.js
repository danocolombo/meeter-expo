import {
    StyleSheet,
    Text,
    View,
    FlatList,
    AppState,
    ViewBase,
    ImageBackground,
    SafeAreaView,
} from 'react-native';
import React, {
    useState,
    useLayoutEffect,
    useEffect,
    useCallback,
} from 'react';
import {
    useNavigation,
    useFocusEffect,
    useNavigationState,
} from '@react-navigation/native';
import moment from 'moment';
import * as ExpoTimeZone from 'expo-timezone';
import { useDispatch, useSelector } from 'react-redux';
import { Surface, ActivityIndicator, useTheme, FAB } from 'react-native-paper';
import MeetingListCard from '../components/Meeting.List.Card';
import {
    getActiveMeetings,
    getAllMeetings,
    getAllMeetingsG,
} from '../features/meetings/meetingsThunks';
//   FUNCTION START
//   ===============
const ActiveScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.profile);
    const meeter = useSelector((state) => state.system.meeter);

    const localTimezoneOffsetInMinutes = new Date().getTimezoneOffset();
    const [dateValue, setDateValue] = useState();

    // const activeMeetings = useSelector(
    //     (state) => state.meetings.activeMeetings
    // );
    // const [meetings, setMeetings] = useState(
    //     useSelector((state) => state.meetings.meetings)
    // );
    const [isLoading, setIsLoading] = useState(false);
    const [displayMeetings, setDisplayMeetings] = useState([]);

    useLayoutEffect(() => {
        let headerLabelColor = '';
        if (Platform.OS === 'ios') {
            headerLabelColor = 'white';
        }
        navigation.setOptions({
            title: meeter.appName,
        });
    }, [navigation, meeter]);

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            dispatch(getAllMeetingsG({ orgId: userProfile.activeOrg.id }))
                .then((action) => {
                    const results = action.payload;
                    if (results.length > 0) {
                        const userTimezone = ExpoTimeZone.timezone;
                        const now = moment().tz(userTimezone).startOf('day');
                        console.log('Now:', now.format('YYYY-MM-DD HH:mm:ss')); // Add this line
                        const newDateLogic = true;
                        if (newDateLogic) {
                            const currentDate = new Date(); // Get the current date
                            const localCurrentDate = new Date(
                                currentDate.getTime() -
                                    localTimezoneOffsetInMinutes * 60 * 1000
                            ); // Convert to local timezone
                            const filteredMeetings = results.reduce(
                                (acc, meeting) => {
                                    const meetingDate = moment.tz(
                                        meeting.meetingDate,
                                        'YYYY-MM-DD',
                                        userTimezone
                                    );
                                    if (
                                        meetingDate.isSameOrAfter(
                                            localCurrentDate,
                                            'day'
                                        )
                                    ) {
                                        acc.push(meeting);
                                    }
                                    return acc;
                                },
                                []
                            );
                        } else {
                            const filteredMeetings = results.reduce(
                                (acc, meeting) => {
                                    const meetingDate = moment.tz(
                                        meeting.meetingDate,
                                        'YYYY-MM-DD',
                                        userTimezone
                                    );
                                    console.log(
                                        'Meeting Date:',
                                        meetingDate.format(
                                            'YYYY-MM-DD HH:mm:ss'
                                        )
                                    ); // Add this line
                                    if (meetingDate.isSameOrAfter(now, 'day')) {
                                        acc.push(meeting);
                                    }
                                    return acc;
                                },
                                []
                            );
                        }

                        setDisplayMeetings(filteredMeetings);
                    } else {
                        setDisplayMeetings([]);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false);
                });
        }, [])
    );

    const handleNewRequest = () => {
        navigation.navigate('MeetingNew');
    };
    // printObject('ASRTK:97-->meetings:\n', meetings);
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

    // printObject('ASRTK:109-->activeMeetings:\n', activeMeetings);
    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>ACTIVE</Text>
                    {userProfile?.activeOrg?.role === 'manage' && (
                        <FAB
                            icon='calendar-plus'
                            style={styles.FAB}
                            onPress={handleNewRequest}
                        />
                    )}
                </View>

                <View style={{ padding: 10 }}>
                    <Text style={mtrTheme.subTitleSmall}>
                        Click event for details!
                    </Text>
                </View>
                {displayMeetings && (
                    <>
                        {displayMeetings && (
                            <FlatList
                                data={displayMeetings}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <MeetingListCard
                                        meeting={item}
                                        active={true}
                                    />
                                )}
                            />
                        )}
                    </>
                )}
            </Surface>
        </>
    );
};

export default ActiveScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    bgImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    FAB: {
        position: 'absolute',
        margin: 10,

        right: 0,
        bottom: -30,
        backgroundColor: 'green',
    },
});
