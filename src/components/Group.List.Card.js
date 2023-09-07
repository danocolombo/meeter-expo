import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useTheme, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { printObject } from '../utils/helpers';
//   FUNCTION START
//   ---------------
const GroupListCard = ({ group, meeting, authority, handleDeleteRequest }) => {
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    function groupPressHandler() {
        // if the user is registered, take them to registerForm
        // console.log('GLC:13-->groupPressHandler, back to GroupDetails');
        navigation.navigate('GroupDetails', {
            group: group,
            meeting: meeting,
        });
    }

    return (
        <>
            <Pressable
                onPress={groupPressHandler}
                style={({ pressed }) => pressed && mtrStyles(mtrTheme).pressed}
            >
                <View style={mtrStyles(mtrTheme).rootContainer}>
                    <View style={mtrStyles(mtrTheme).cardAlign}>
                        <View style={mtrStyles(mtrTheme).groupItem}>
                            <View style={mtrStyles(mtrTheme).cardContainer}>
                                <View style={mtrStyles(mtrTheme).row}>
                                    {group.gender === 'f' && (
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupListCardTitle
                                            }
                                        >
                                            Women's {group.title}
                                        </Text>
                                    )}
                                    {group.gender === 'm' && (
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupListCardTitle
                                            }
                                        >
                                            Men's {group.title}
                                        </Text>
                                    )}
                                    {group.gender === 'x' && (
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupListCardTitle
                                            }
                                        >
                                            {group.title}
                                        </Text>
                                    )}
                                    {}
                                    <Text>
                                        {authority ? (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleDeleteRequest(
                                                        group.id
                                                    )
                                                }
                                            >
                                                <MaterialCommunityIcons
                                                    name='trash-can-outline'
                                                    size={25}
                                                    color={
                                                        mtrTheme.colors.critical
                                                    }
                                                />
                                            </TouchableOpacity>
                                        ) : (
                                            'FALSE'
                                        )}
                                    </Text>
                                </View>
                                <View style={mtrStyles(mtrTheme).locationRow}>
                                    {group.location && (
                                        <View>
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .groupListCardText
                                                }
                                            >
                                                {group.location}
                                            </Text>
                                        </View>
                                    )}
                                    {group.facilitator && (
                                        <View>
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .groupListCardText
                                                }
                                            >
                                                {group.facilitator}
                                            </Text>
                                        </View>
                                    )}
                                    {group.cofacilitator && (
                                        <View>
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .groupListCardText
                                                }
                                            >
                                                {group.cofacilitator}
                                            </Text>
                                        </View>
                                    )}
                                    <View>
                                        <Badge
                                            size={30}
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .attendanceBadge
                                            }
                                        >
                                            {group.attendance}
                                        </Badge>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </>
    );
};

export default GroupListCard;

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        pressed: {
            opacity: 0.75,
        },
        rootContainer: {
            marginHorizontal: 5,
        },
        groupItem: {
            marginVertical: 5,
            paddingBottom: 5,
            backgroundColor: mtrTheme.colors.meetingActiveCard,
            flexDirection: 'row',
            borderRadius: 10,
            elevation: 3,
            shadowColor: 'yellow',
            shadowRadius: 4,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
        },
        cardContainer: {
            paddingHorizontal: 15,
            width: '100%',
            paddingTop: 5,
            paddingBottom: 10,
        },
        cardAlign: { marginHorizontal: 20 },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        groupListCardTitle: {
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.darkText,
            fontWeight: '600',
            fontSize: 24,
        },
        locationRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 5,
        },
        groupListCardText: {
            fontFamily: 'Roboto-Regular',
            color: mtrTheme.colors.darkText,
            fontSize: 20,
        },
        attendanceBadge: {
            backgroundColor: mtrTheme.colors.background,
            color: mtrTheme.colors.lightText,
        },
    });

const styles = StyleSheet.create({
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
