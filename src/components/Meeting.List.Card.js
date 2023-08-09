import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Platform,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme, withTheme, Badge } from 'react-native-paper';
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
    const formattedDate = dateValue.toLocaleDateString('en-US', {
        timeZone: userTimeZone,
    });

    if (dateValue === null) {
        setDateValue(new Date());
    }
    return (
        <>
            <View style={styles.rootContainer}>
                <Pressable
                    onPress={meetingPressHandler}
                    style={({ pressed }) => pressed && styles.pressed}
                >
                    <View
                        style={[
                            styles.meetingItem,

                            active
                                ? mtrTheme.meetingCardActivePrimary
                                : mtrTheme.meetingCardHistoricPrimary,
                        ]}
                    >
                        <View style={styles.firstRow}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    // borderWidth: 3,
                                    // borderColor: 'blue',
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        // borderWidth: 4,
                                        // borderColor: 'green',
                                    }}
                                >
                                    {Platform.OS === 'ios' && (
                                        <View>
                                            <DateBall
                                                date={formattedDate}
                                                style={
                                                    mtrTheme.meetingCardActiveDateBall
                                                }
                                            />
                                        </View>
                                    )}
                                    {Platform.OS === 'android' && (
                                        <View style={{ padding: 1 }}>
                                            <DateStack date={formattedDate} />
                                        </View>
                                    )}
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        // borderWidth: 5,
                                        // borderColor: 'orange',
                                    }}
                                >
                                    <View
                                        style={{
                                            // borderWidth: 1,
                                            // borderColor: 'blue',
                                            // width: '75%',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                paddingLeft: 10,
                                            }}
                                        >
                                            <View
                                                style={
                                                    {
                                                        // borderWidth: 1,
                                                        // borderColor: 'blue',
                                                    }
                                                }
                                            >
                                                <Text
                                                    style={
                                                        mtrTheme.meetingCardActiveTypeText
                                                    }
                                                >
                                                    {meeting.meetingType.trim()}
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    {
                                                        // borderWidth: 1,
                                                        // borderColor: 'blue',
                                                    }
                                                }
                                            >
                                                <Text
                                                    style={
                                                        mtrTheme.meetingCardActiveTitleText
                                                    }
                                                >
                                                    {meeting.title.trim()}
                                                </Text>
                                            </View>
                                            {meeting.meetingType !==
                                                'Testimony' && (
                                                <View>
                                                    <Text
                                                        style={
                                                            mtrTheme.meetingCardActivePersonText
                                                        }
                                                    >
                                                        {meeting.supportContact.trim()}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {meeting?.worship && (
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity onPress={toggleTooltip}>
                                        <MaterialCommunityIcons
                                            name='music'
                                            size={20}
                                            color='red'
                                        />
                                    </TouchableOpacity>
                                    {tooltipVisible && (
                                        <Tooltip content='Tooltip Content'>
                                            <View style={styles.tooltip}>
                                                <Text
                                                    style={styles.tooltipText}
                                                >
                                                    {meeting?.worship}
                                                </Text>
                                            </View>
                                        </Tooltip>
                                    )}
                                </View>
                            )}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginLeft: 'auto',
                                }}
                            >
                                <View
                                    style={{
                                        marginTop: 5,
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Badge
                                        size={30}
                                        style={
                                            mtrTheme.meetingCardHistoricAttendanceBadge
                                        }
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
                                                    color='red'
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

export default withTheme(MeetingListCard);

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    rootContainer: {
        marginHorizontal: 10,
    },
    meetingItem: {
        marginVertical: 5,
        paddingBottom: 5,
        backgroundColor: 'darkgrey',
        flexDirection: 'row',
        flex: 1,
        //justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 3,
        shadowColor: 'yellow',
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    firstRow: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 10,
        justifyContent: 'flex-end',
        flex: 1,
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
