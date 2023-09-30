import React, {
    useState,
    useCallback,
    useRef,
    useLayoutEffect,
    useEffect,
} from 'react';
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
    deleteMeeting,
    getActiveMeetings,
    getAllMeetings,
} from '../features/meetings/meetingsThunks';
import { dateDashMadePretty, printObject } from '../utils/helpers';
const ActiveScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const perms = useSelector((state) => state.user.perms);
    const isLoading = useSelector((state) => state.meetings.isLoading);
    const [meeting, setMeeting] = useState(null);
    const meetings = useSelector((state) => state.meetings.meetings);
    const [displayMeetings, setDisplayMeetings] = useState([]);
    const isFormDisplayedRef = useRef(false); // Track form display
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

    const meeter = useSelector((state) => state.system.meeter);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
        });
    }, [navigation, meeter]);

    useEffect(() => {
        try {
            async function getActives() {
                const allMeetingInfo = await dispatch(getActiveMeetings());
                setDisplayMeetings(allMeetingInfo.payload);
            }
            getActives();
        } catch (error) {
            console.log('HM:51-->unexpected error:\n', error);
        }
    }, [meetings]);
    const handleNewRequest = () => {
        isFormDisplayedRef.current = true;
        navigation.navigate('MeetingNew');
    };
    const handleDeleteResponse = (id) => {
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
            // printObject('AST:85-->deleteRequest:\n', deleteRequest);
            dispatch(deleteMeeting(deleteRequest));
            setMeeting(null);
            setShowDeleteConfirmModal(false);
        }
    };
    if (isLoading) {
        return (
            <View style={mtrStyles(mtrTheme).activityIndicatorContainer}>
                <ActivityIndicator
                    color={mtrStyles(mtrTheme).activityIndicator}
                    size={80}
                />
            </View>
        );
    }

    return (
        <Surface style={mtrStyles(mtrTheme).surface}>
            <Modal visible={showDeleteConfirmModal} animationStyle='slide'>
                <View style={mtrStyles(mtrTheme).modal}>
                    <View style={mtrStyles(mtrTheme).modalHeaderContainer}>
                        <Text style={mtrStyles(mtrTheme).modalHeaderText}>
                            PLEASE CONFIRM
                        </Text>
                    </View>
                    <View style={mtrStyles(mtrTheme).modalSurfaceContainer}>
                        <Surface style={mtrStyles(mtrTheme).modalSurface}>
                            <View style={mtrStyles(mtrTheme).warningContainer}>
                                <Text style={mtrStyles(mtrTheme).warningText}>
                                    Your are about to delete the following
                                    meeting.
                                </Text>
                            </View>
                            <View style={mtrStyles(mtrTheme).dateContainer}>
                                <Text style={mtrStyles(mtrTheme).dateText}>
                                    {dateDashMadePretty(meeting?.meetingDate)}
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={mtrStyles(mtrTheme).meetingInfoText}
                                >
                                    {meeting?.meetingType}: {meeting?.title}
                                </Text>
                            </View>
                            <View style={mtrStyles(mtrTheme).noteContainer}>
                                <Text style={mtrStyles(mtrTheme).noteText}>
                                    NOTE: All groups for the meeting will be
                                    deleted as well.
                                </Text>
                            </View>
                            <View style={mtrStyles(mtrTheme).buttonContainer}>
                                <View style={mtrStyles(mtrTheme).buttonWrapper}>
                                    <CustomButton
                                        text='No, CANCEL'
                                        bgColor={mtrTheme.colors.mediumGreen}
                                        fgColor={mtrTheme.colors.lightText}
                                        onPress={() =>
                                            setShowDeleteConfirmModal(false)
                                        }
                                    />
                                </View>

                                <View style={mtrStyles(mtrTheme).buttonWrapper}>
                                    <CustomButton
                                        text='Yes, DELETE'
                                        bgColor={mtrTheme.colors.critical}
                                        fgColor={mtrTheme.colors.lightText}
                                        onPress={() => handleDeleteConfirm()}
                                    />
                                </View>
                            </View>
                        </Surface>
                    </View>
                    <StatusBar style='auto' />
                </View>
            </Modal>
            <View>
                <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                    <Text style={mtrStyles(mtrTheme).screenTitleText}>
                        Active Meetings
                    </Text>
                </View>
                {perms.includes('manage') && (
                    <FAB
                        icon='calendar-plus'
                        style={mtrStyles(mtrTheme).FAB}
                        onPress={handleNewRequest}
                    />
                )}
            </View>

            <View style={mtrStyles(mtrTheme).subtitleContainer}>
                <Text style={mtrStyles(mtrTheme).subtitleText}>
                    Click event for details!
                </Text>
            </View>

            <FlatList
                key={Math.random()} // Add a random key to force re-render
                data={displayMeetings}
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
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        surface: {
            flex: 1,
            backgroundColor: mtrTheme.colors.background,
        },
        activityIndicatorContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {
            color: mtrTheme.colors.lightGraphic,
        },
        screenTitleContainer: {
            paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.lightText,
        },
        subtitleContainer: {},
        subtitleText: {
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            fontWeight: '500',
            color: mtrTheme.colors.accent,
            textAlign: 'center',
            paddingBottom: 5,
        },
        modal: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mtrTheme.colors.background,
        },
        modalHeaderContainer: {
            backgroundColor: mtrTheme.colors.background,
        },
        modalHeaderText: {
            fontFamily: 'Roboto-Bold',
            fontSize: 28,
            fontWeight: '700',
            color: mtrTheme.colors.lightText,
            textAlign: 'center',
            paddingTop: 10,
        },
        modalSurfaceContainer: {
            alignItems: 'center',
            marginTop: 15,
        },
        modalSurface: {
            backgroundColor: mtrTheme.colors.lightGraphic,
            width: '90%',
            borderRadius: 10,
            padding: 20,
        },
        warningContainer: {
            padding: 10,
        },
        warningText: {
            fontSize: 20,
            textAlign: 'center',
            fontFamily: 'Roboto-Regular',
        },
        dateContainer: { marginTop: 20 },
        dateText: {
            fontSize: 24,
            fontFamily: 'Roboto-Bold',
            textAlign: 'center',
        },
        meetingInfoContainer: {},
        meetingInfoText: {
            fontSize: 18,
            fontFamily: 'Roboto-Medium',
            textAlign: 'center',
        },
        noteContainer: {
            marginHorizontal: 20,
        },
        noteText: {
            paddingTop: 20,
            fontSize: 16,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.critical,
            textTransform: 'uppercase',
            textAlign: 'center',
        },
        buttonContainer: {
            marginVertical: 10,
        },
        buttonWrapper: {},
        FAB: {
            position: 'absolute',
            margin: 10,

            right: 0,
            bottom: -30,
            backgroundColor: 'green',
        },
    });
