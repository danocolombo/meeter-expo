import React, { useState, useCallback, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Modal,
    StatusBar,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Surface, useTheme, FAB } from 'react-native-paper';
import MeetingListCard from '../components/Meeting.List.Card';
import CustomButton from '../components/CustomButton';
import {
    getAllMeetings,
    getActiveMeetings,
    deleteMeeting,
} from '../features/meetings/meetingsThunks';
import { dateDashMadePretty, printObject } from '../utils/helpers';
const ActiveScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.profile);
    const meetings = useSelector((state) => state.meetings.meetings);
    const [meeting, setMeeting] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const isFormDisplayedRef = useRef(false); // Track form display
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
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
    const handleDeleteResponse = (id) => {
        console.log('AST:64-->handleDeleteResponse(' + id + ')');
        const deleteMeeting = meetings.find((m) => m.id === id);
        if (deleteMeeting?.id) {
            setMeeting(deleteMeeting);
            setShowDeleteConfirmModal(true);
        }
    };
    const handleDeleteConfirm = () => {
        if (meeting?.id) {
            let groups = [];
            if (meeting?.groups?.items) {
                meeting.groups.items.forEach((g) => {
                    groups.push(g.id);
                });
            }
            const deleteRequest = {
                id: meeting.id,
                groups: groups,
            };
            printObject('AST:85-->deleteRequest:\n', deleteRequest);
            dispatch(deleteMeeting(deleteRequest));
            setMeeting(null);
            setShowDeleteConfirmModal(false);
        }
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
            <Modal visible={showDeleteConfirmModal} animationStyle='slide'>
                <View>
                    <Text style={mtrTheme.screenTitle}>PLEASE CONFIRM</Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    <Surface
                        style={{
                            backgroundColor: 'white',
                            width: '90%',
                            height: 400,
                            borderRadius: 10,
                        }}
                    >
                        <View style={{ padding: 20 }}>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        textAlign: 'center',
                                    }}
                                >
                                    Your are about to delete the following
                                    meeting.
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        fontFamily: 'Roboto-Bold',
                                        textAlign: 'center',
                                    }}
                                >
                                    {dateDashMadePretty(meeting?.meetingDate)}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontFamily: 'Roboto-Medium',
                                        textAlign: 'center',
                                    }}
                                >
                                    {meeting?.meetingType}: {meeting?.title}
                                </Text>
                                <Text
                                    style={{
                                        paddingTop: 20,
                                        fontSize: 16,
                                        fontFamily: 'Roboto-Bold',

                                        color: mtrTheme.colors.critical,
                                        textAlign: 'center',
                                    }}
                                >
                                    NOTE: ALL GROUPS FOR THE MEETING WILL BE
                                    DELETED AS WELL.
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginVertical: 20,
                                }}
                            >
                                <CustomButton
                                    text='No, CANCEL'
                                    bgColor='green'
                                    fgColor='white'
                                    onPress={() =>
                                        setShowDeleteConfirmModal(false)
                                    }
                                />
                            </View>
                            <View
                                style={{
                                    marginVertical: 20,
                                }}
                            >
                                <CustomButton
                                    text='Yes, DELETE'
                                    bgColor='red'
                                    fgColor='white'
                                    onPress={() => handleDeleteConfirm()}
                                />
                            </View>
                        </View>
                    </Surface>
                </View>
                <StatusBar style='auto' />
            </Modal>
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
                    <MeetingListCard
                        meeting={item}
                        active={true}
                        handleDelete={handleDeleteResponse}
                    />
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
