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
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Surface, ActivityIndicator, useTheme, FAB } from 'react-native-paper';
import MeetingListCard from '../components/Meeting.List.Card';
import { FontDisplay } from 'expo-font';
import { FetchActiveMeetings } from '../components/common/hooks/meetingQueries';
import { dateNumToDateDash, printObject } from '../utils/helpers';
import { useAuthContext } from '../contexts/AuthContext';
import { focusManager } from '@tanstack/react-query';
import { current } from '@reduxjs/toolkit';
import { useSysContext } from '../contexts/SysContext';
import { useUserContext } from '../contexts/UserContext';
import {
    getActiveMeetings,
    getAllMeetings,
} from '../features/meetings/meetingsThunks';
//   FUNCTION START
//   ===============
const ActiveScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { userProfile } = useUserContext();
    const { meeter } = useSysContext();
    const activeMeetings = useSelector(
        (state) => state.meetings.activeMeetings
    );
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
            dispatch(getAllMeetings({ code: userProfile.activeOrg.code }))
                .then(() => {
                    return dispatch(getActiveMeetings());
                })
                .then((action) => {
                    const results = action.payload;
                    if (results.length > 0) {
                        setDisplayMeetings(results);
                    } else {
                        setDisplayMeetings([]);
                    }
                    setIsLoading(false);
                })
                // .then(() => {
                //     dispatch(listAllMeetings());
                // })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false);
                });
        }, [])
    );

    let meetings = [];

    const handleNewRequest = () => {
        navigation.navigate('MeetingNew');
    };

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

    printObject('ASRTK:109-->activeMeetings:\n', activeMeetings);
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
                                keyExtractor={(item) => item.meetingId}
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
