import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Platform,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as Localization from 'expo-localization';
import DateBall from './ui/DateBall';
import DateStack from './ui/DateStack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { printObject, dateDashToDateObject } from '../utils/helpers';
import Tooltip from './ui/ToolTip';
import { useSelector } from 'react-redux';
const MeetingListCard = ({ meeting, active, handleDelete }) => {
    const navigation = useNavigation();
    const perms = useSelector((state) => state.user.perms);
    const userTimeZone = Localization.timezone;
    const mtrTheme = useTheme();

    const [dateValue, setDateValue] = useState(
        meeting.meetingDate ? new Date(meeting.meetingDate) : new Date()
    );
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const toggleTooltip = () => {
        setTooltipVisible(!tooltipVisible);
    };
    function meetingPressHandler() {
        navigation.navigate('MeetingDetails', {
            id: meeting.id,
        });
    }
    useEffect(() => {
        if (meeting?.meetingDate) {
            // setDateString(meeting.date);
            let dateObj = dateDashToDateObject(meeting.meetingDate);
            setDateValue(dateObj);
        } else {
            // setDateString(new Date().toISOString().substring(0, 10));
            setDateValue(new Date());
        }
    }, []);
    const formattedDate = dateValue?.toLocaleDateString('en-US', {
        timeZone: userTimeZone,
    });

    if (dateValue === null) {
        setDateValue(new Date());
    }
    return (
        <>
            <View style={mtrStyles(mtrTheme).rootContainer}>
                <Pressable
                    onPress={meetingPressHandler}
                    style={({ pressed }) =>
                        pressed && mtrStyles(mtrTheme).pressed
                    }
                >
                    <View
                        style={[
                            mtrStyles(mtrTheme).meetingItem,

                            active
                                ? mtrStyles(mtrTheme).meetingCardActivePrimary
                                : mtrStyles(mtrTheme)
                                      .meetingCardHistoricPrimary,
                        ]}
                    >
                        <View style={mtrStyles(mtrTheme).firstRow}>
                            <View style={mtrStyles(mtrTheme).columnDate}>
                                <View style={mtrStyles(mtrTheme).columnCenter}>
                                    {Platform.OS === 'ios' && (
                                        <View>
                                            <DateBall
                                                date={formattedDate}
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .dateBallIOS
                                                }
                                            />
                                        </View>
                                    )}
                                    {Platform.OS === 'android' && (
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .dateContainerAndroid
                                            }
                                        >
                                            <DateStack date={formattedDate} />
                                        </View>
                                    )}
                                </View>
                            </View>
                            <View style={mtrStyles(mtrTheme).columnText}>
                                <View
                                    style={
                                        mtrStyles(mtrTheme).columnMeetingText
                                    }
                                >
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            flexGrow: 1,
                                        }}
                                    >
                                        <View
                                            style={
                                                mtrStyles(mtrTheme).columnCenter
                                            }
                                        >
                                            <View
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .meetingDefinitionContainer
                                                }
                                            >
                                                <View
                                                    style={
                                                        mtrStyles(mtrTheme)
                                                            .meetingTextContainer
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            mtrStyles(mtrTheme)
                                                                .meetingTypeText
                                                        }
                                                    >
                                                        {meeting.meetingType.trim()}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={
                                                        mtrStyles(mtrTheme)
                                                            .meetingTextContainer
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            mtrStyles(mtrTheme)
                                                                .meetingTypeText
                                                        }
                                                    >
                                                        {meeting.title.trim()}
                                                    </Text>
                                                </View>
                                                {meeting.meetingType !==
                                                    'Testimony' && (
                                                    <View
                                                        style={
                                                            mtrStyles(mtrTheme)
                                                                .meetingTextContainer
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                mtrStyles(
                                                                    mtrTheme
                                                                )
                                                                    .meetingTypeText
                                                            }
                                                        >
                                                            {meeting?.supportContact?.trim()}
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).columnWorship
                                        }
                                    >
                                        {meeting?.worship && (
                                            <View
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .iconContainer
                                                }
                                            >
                                                <TouchableOpacity
                                                    onPress={toggleTooltip}
                                                >
                                                    <MaterialCommunityIcons
                                                        name='music'
                                                        size={20}
                                                        color={
                                                            mtrTheme.colors
                                                                .musicIcon
                                                        }
                                                    />
                                                </TouchableOpacity>

                                                {tooltipVisible && (
                                                    <Tooltip content='Tooltip Content'>
                                                        <View
                                                            style={
                                                                mtrStyles(
                                                                    mtrTheme
                                                                ).tooltip
                                                            }
                                                        >
                                                            <Text
                                                                style={
                                                                    mtrStyles(
                                                                        mtrTheme
                                                                    )
                                                                        .tooltipText
                                                                }
                                                            >
                                                                {
                                                                    meeting?.worship
                                                                }
                                                            </Text>
                                                        </View>
                                                    </Tooltip>
                                                )}
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={mtrStyles(mtrTheme).columnIcons}>
                            <View style={mtrStyles(mtrTheme).rowRight}>
                                <View
                                    style={
                                        mtrStyles(mtrTheme).columnSpaceBetween
                                    }
                                >
                                    <Badge
                                        size={30}
                                        style={mtrStyles(mtrTheme).badge}
                                    >
                                        {meeting.attendanceCount}
                                    </Badge>
                                    {perms.includes('manage') && (
                                        <View>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleDelete(meeting.id)
                                                }
                                            >
                                                <MaterialCommunityIcons
                                                    name='delete-forever'
                                                    size={30}
                                                    color={
                                                        mtrTheme.colors.critical
                                                    }
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </View>
        </>
    );
};

export default MeetingListCard;

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        rootContainer: {
            marginHorizontal: 10,
        },
        pressed: {
            opacity: 0.75,
        },
        meetingItem: {
            marginVertical: 5,
            paddingBottom: 5,
            backgroundColor: mtrTheme.colors.darkShadow,
            flexDirection: 'row',
            flex: 1,
            //justifyContent: 'space-between',
            borderRadius: 10,
            elevation: 3,
            shadowColor: mtrTheme.colors.darkShadow,
            shadowRadius: 4,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
        },
        meetingCardActivePrimary: {
            backgroundColor: mtrTheme.colors.meetingActiveCard,
        },
        columnDate: {
            flexDirection: 'column',

            alignSelf: 'flex-start',
            flexGrow: 0,
        },
        columnText: {
            flex: 1,

            paddingHorizontal: 8,
        },
        columnIcons: {
            alignSelf: 'flex-start',
            flexGrow: 0,
        },
        meetingCardHistoricPrimary: {
            backgroundColor: mtrTheme.colors.meetingHistoricCard,
        },
        firstRow: {
            flexDirection: 'row',
            flex: 1,
            marginHorizontal: 5,
        },
        row: {
            flexDirection: 'row',
        },
        rowRight: {
            flexDirection: 'row',
            flex: 1,
            paddingRight: 5,
            marginLeft: 'auto',
        },
        columnCenter: {
            flexDirection: 'column',
            justifyContent: 'center',
        },
        columnSpaceBetween: {
            marginTop: 5,
            justifyContent: 'space-between',
        },
        columnMeetingText: {
            flexDirection: 'row',
            // flexDirection: 'column',
        },
        columnWorship: {
            // flexDirection: 'row',
            flexDirection: 'column',
            marginRight: 5,
        },
        dateBallIOS: {
            fontFamily: 'Roboto-Regular',
            backgroundColor: mtrTheme.colors.accentColor,
            textColor: mtrTheme.colors.darkText,
        },
        dateContainerAndroid: { padding: 1 },
        meetingDefinitionContainer: {
            flexDirection: 'column',
            paddingLeft: 10,
        },
        meetingTextContainer: {
            margin: 0,
        },
        meetingTypeText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 26,
            fontWeight: '600',
            paddingLeft: 0,
        },
        iconContainer: {
            flexDirection: 'row',
            marginTop: 10,
            marginRight: 10,

            justifyContent: 'flex-end',
            flex: 1,
        },
        badge: {
            backgroundColor: mtrTheme.colors.background,
        },
        tooltip: {
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 8,
            borderRadius: 4,
            top: 20, // Adjust as needed
            left: -110, // Adjust as needed
            right: 10,
        },
        tooltipText: {
            color: 'white',
            textAlign: 'center',
        },
    });
