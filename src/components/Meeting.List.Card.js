import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import React from 'react';
import { useTheme, withTheme, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import MeetingCardDate from './ui/Meeting.Card.Date';
import DateBall from './ui/DateBall';
import DateStack from './ui/DateStack';
import { printObject } from '../utils/helpers';
const MeetingListCard = ({ meeting, active }) => {
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    //printObject('mtrTheme:', mtrTheme);
    function meetingPressHandler() {
        // if the user is registered, take them to registerForm

        navigation.navigate('MeetingDetails', {
            meetingId: meeting.meetingId,
        });
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
                            {Platform.OS === 'ios' && (
                                <View>
                                    <DateBall
                                        date={meeting.meetingDate}
                                        style={
                                            mtrTheme.meetingCardActiveDateBall
                                        }
                                    />
                                </View>
                            )}
                            {Platform.OS === 'android' && (
                                <View style={{ padding: 1 }}>
                                    <DateStack date={meeting?.meetingDate} />
                                </View>
                            )}

                            <View
                                style={{
                                    flexDirection: 'row',
                                    // borderWidth: 1,
                                    // borderColor: 'blue',
                                    width: '85%',
                                }}
                            >
                                <View
                                    style={{
                                        // borderWidth: 1,
                                        // borderColor: 'blue',
                                        width: '75%',
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
                                        {meeting.meetingType === 'Lesson' && (
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
                                <View style={{ marginTop: 5 }}>
                                    {!active && (
                                        <Badge
                                            size={30}
                                            style={
                                                mtrTheme.meetingCardHistoricAttendanceBadge
                                            }
                                        >
                                            {meeting.attendanceCount}
                                        </Badge>
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
