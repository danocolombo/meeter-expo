import React, { useState, useCallback, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Surface, useTheme, FAB } from 'react-native-paper';
import MeetingListCard from '../components/Meeting.List.Card';
import {
    getAllMeetings,
    getActiveMeetings,
} from '../features/meetings/meetingsThunks';

const ActiveScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.profile);
    const meetings = useSelector((state) => state.meetings.meetings);

    const [isLoading, setIsLoading] = useState(false);
    const isFormDisplayedRef = useRef(false); // Track form display

    const getCurrentDateInUserTimezone = useCallback(() => {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currentDate = new Date();
        const userTimezoneDate = new Date(
            currentDate.toLocaleString('en-US', { timeZone: userTimezone })
        );
        return userTimezoneDate.toISOString().split('T')[0];
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (!isFormDisplayedRef.current) {
                async function fetchAndSetMeetings() {
                    setIsLoading(true);
                    try {
                        await dispatch(
                            getAllMeetings({ orgId: userProfile.activeOrg.id })
                        );
                        await dispatch(getActiveMeetings());
                    } catch (error) {
                        console.error('Error:', error);
                    }
                    setIsLoading(false);
                }

                fetchAndSetMeetings();
            }
        }, [dispatch, isFormDisplayedRef, userProfile.activeOrg.id])
    );

    const handleNewRequest = () => {
        isFormDisplayedRef.current = true;
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
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = getCurrentDateInUserTimezone();
    const userTimezoneDate = new Date(
        currentDate.toLocaleString('en-US', { timeZone: userTimezone })
    );
    const currentTimeInUserTimezone = userTimezoneDate.getTime(); // Get current time in user timezone
    const activeMeetings = meetings
        .filter((m) => {
            // Convert meetingDate to user timezone and compare with current time
            const meetingDateInUserTimezone = new Date(
                `${m.meetingDate}T00:00:00${userTimezone === 'UTC' ? 'Z' : ''}`
            ).getTime();
            return meetingDateInUserTimezone >= currentTimeInUserTimezone;
        })
        .sort((a, b) => {
            // Sort by meetingDate in ascending order
            const dateComparison =
                new Date(a.meetingDate) - new Date(b.meetingDate);
            if (dateComparison !== 0) {
                return dateComparison;
            }

            // If meetingDate is the same, sort by meetingType in ascending order
            const typeComparison = a.meetingType.localeCompare(b.meetingType);
            if (typeComparison !== 0) {
                return typeComparison;
            }

            // If meetingType is the same, sort by title in ascending order
            return a.title.localeCompare(b.title);
        });

    return (
        <Surface style={mtrTheme.screenSurface}>
            <View>
                <Text style={{ color: 'white' }}>ActiveScreenThree</Text>
            </View>
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

            <FlatList
                data={activeMeetings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MeetingListCard meeting={item} active={true} />
                )}
            />
        </Surface>
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
