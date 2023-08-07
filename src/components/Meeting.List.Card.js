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
import { useSelector } from 'react-redux';
const MeetingListCard = ({ meeting, active, handleDelete }) => {
    const navigation = useNavigation();
    const perms = useSelector((state) => state.user.perms);
    const userTimeZone = Localization.timezone;
    const mtrTheme = useTheme();
    const [dateValue, setDateValue] = useState(
        meeting.meetingDate ? new Date(meeting.meetingDate) : new Date()
    );
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
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginLeft: 'auto',
                                }}
                            >
                                <View
                                    style={{
                                        marginTop: 5,
                                        // borderWidth: 1,
                                        // borderColor: 'red',
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
        // borderWidth: 2,
        // borderColor: 'green',
        marginHorizontal: 5,
    },
    dateWrapper: {
        margin: 5,
    },
    // dataWrapper: {
    //     flexDirection: 'column',
    // },
    col1: {
        paddingVertical: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: 10,
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    eventDateWrapper: {
        // paddingTop: 5,
        // borderWidth: 1,
        // borderColor: 'yellow',
    },

    eventTimeWrapper: {
        marginTop: 5,
        marginBottom: 5,
        // paddingHorizontal: 0,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        // borderWidth: 1,
        // borderColor: 'white',
    },
    eventTime: {
        // marginLeft: 5,
        // marginRight: 30,
        fontSize: 16,
        color: 'white',
        justifyContent: 'center',
    },
    registeredWrapper: {
        borderWidth: 1,
        padding: 4,
        borderRadius: 10,
        borderColor: 'green',
        backgroundColor: 'green',
        alignItems: 'center',
    },
    registeredText: { color: 'white', fontSize: 10 },
    col2: {
        flex: 1,
        paddingVertical: 8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        // borderWidth: 1,
        // borderColor: 'yellow',
    },
    locationWrapper: {
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'white',
    },
    locationText: {
        width: '100%',
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'lightgrey',
    },
    hostWrapper: {
        paddingLeft: 25,
        // borderWidth: 1,
        // borderColor: 'white',
    },
    hostName: {
        // marginLeft: 20,
        fontSize: 20,
        // fontWeight: 'bold',
        color: 'lightgrey',
    },
    hostRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-start',
    },
});
