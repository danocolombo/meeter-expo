import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    StatusBar,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { Surface, useTheme, ActivityIndicator, FAB } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMeeting } from '../features/meetings/meetingsThunks';
import MeetingListCard from '../components/Meeting.List.Card';
import CustomButton from '../components/CustomButton';
import { printObject, dateDashMadePretty } from '../utils/helpers';
import { getHistoricMeetings } from '../features/meetings/meetingsThunks';
const HistoricScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const mtrTheme = useTheme();
    const [meeting, setMeeting] = useState(null);
    const meetings = useSelector((state) => state.meetings.meetings);
    const [isLoading, setIsLoading] = useState(false);
    const [displayMeetings, setDisplayMeetings] = useState([]);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            dispatch(getHistoricMeetings())
                .then((action) => {
                    const results = action.payload;
                    if (results.length > 0) {
                        setDisplayMeetings(results);
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
        <>
            <Surface style={mtrStyles(mtrTheme).screenSurface}>
                <Modal visible={showDeleteConfirmModal} animationStyle='slide'>
                    <View style={mtrStyles(mtrTheme).modal}>
                        <View style={mtrStyles(mtrTheme).modalHeaderContainer}>
                            <Text style={mtrStyles(mtrTheme).modalHeaderText}>
                                PLEASE CONFIRM
                            </Text>
                        </View>
                        <View style={mtrStyles(mtrTheme).modalSurfaceContainer}>
                            <Surface style={mtrStyles(mtrTheme).modalSurface}>
                                <View
                                    style={mtrStyles(mtrTheme).warningContainer}
                                >
                                    <Text
                                        style={mtrStyles(mtrTheme).warningText}
                                    >
                                        Your are about to delete the following
                                        meeting.
                                    </Text>
                                </View>
                                <View style={mtrStyles(mtrTheme).dateContainer}>
                                    <Text style={mtrStyles(mtrTheme).dateText}>
                                        {dateDashMadePretty(
                                            meeting?.meetingDate
                                        )}
                                    </Text>
                                </View>
                                <View>
                                    <Text
                                        style={
                                            mtrStyles(mtrTheme).meetingInfoText
                                        }
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
                                <View
                                    style={mtrStyles(mtrTheme).buttonContainer}
                                >
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).buttonWrapper
                                        }
                                    >
                                        <CustomButton
                                            text='No, CANCEL'
                                            bgColor={
                                                mtrTheme.colors.mediumGreen
                                            }
                                            fgColor={mtrTheme.colors.lightText}
                                            onPress={() =>
                                                setShowDeleteConfirmModal(false)
                                            }
                                        />
                                    </View>

                                    <View
                                        style={
                                            mtrStyles(mtrTheme).buttonWrapper
                                        }
                                    >
                                        <CustomButton
                                            text='Yes, DELETE'
                                            bgColor={mtrTheme.colors.critical}
                                            fgColor={mtrTheme.colors.lightText}
                                            onPress={() =>
                                                handleDeleteConfirm()
                                            }
                                        />
                                    </View>
                                </View>
                            </Surface>
                        </View>
                        <StatusBar style='auto' />
                    </View>
                </Modal>
                <View style={mtrStyles(mtrTheme).screenHeader}>
                    <Text style={mtrStyles(mtrTheme).screenHeaderText}>
                        Historic Meetings
                    </Text>
                    <Text style={mtrStyles(mtrTheme).subTitleSmall}>
                        Click event for details!
                    </Text>
                </View>
                {displayMeetings && (
                    <>
                        {displayMeetings && (
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
                        )}
                    </>
                )}
            </Surface>
        </>
    );
};

export default HistoricScreen;
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        screenSurface: {
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
        dateContainer: { marginTop: 20 },
        dateText: {
            fontSize: 24,
            fontFamily: 'Roboto-Bold',
            textAlign: 'center',
        },
        screenHeader: {
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenHeaderText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.lightText,
        },
        subTitleSmall: {
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            fontWeight: '500',
            color: mtrTheme.colors.accent,
            textAlign: 'center',
            paddingBottom: 5,
        },
        meetingInfoText: {
            fontSize: 18,
            fontFamily: 'Roboto-Medium',
            textAlign: 'center',
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
    });
