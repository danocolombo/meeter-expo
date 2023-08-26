import React, { useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Surface, useTheme } from 'react-native-paper';
import { printObject } from '../utils/helpers';
//   FUNCTION START
//   ===============
const GroupDetailsScreen = ({ route, navigation }) => {
    const meeting = useSelector((state) =>
        state.meetings.meetings.find((m) => m.id === route.params.meeting.id)
    );
    const group = meeting.groups.items.find(
        (g) => g.id === route.params.group.id
    );
    const perms = useSelector((state) => state.user.perms);
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    useLayoutEffect(() => {
        let headerLabelColor = '';
        if (Platform.OS === 'ios') {
            headerLabelColor = mtrTheme.colors.lightText;
        }
        if (perms.includes('manage') || perms.includes('groups')) {
            navigation.setOptions({
                title: meeter.appName || 'Meeter',
                headerBackTitle: 'Back',
                headerRight: () => (
                    <Button
                        onPress={() =>
                            navigation.navigate('GroupEdit', {
                                group: group,
                                meeting: meeting,
                            })
                        }
                        // color='red'
                        color={mtrTheme.colors.lightText}
                        title='Edit'
                    />
                ),
            });
        }
    }, [navigation, meeter]);

    return (
        <>
            <View style={mtrStyles(mtrTheme).flex}>
                <Surface style={mtrStyles(mtrTheme).surface}>
                    <View style={mtrStyles(mtrTheme).container}>
                        <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                            <Text style={mtrStyles(mtrTheme).screenTitleText}>
                                GROUP DETAILS
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                flex: 1,
                            }}
                        >
                            <View
                                style={
                                    mtrStyles(mtrTheme).groupDetailsContainer
                                }
                            >
                                <View style={mtrStyles(mtrTheme).logistics}>
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).logisticsBreak
                                        }
                                    >
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsLabel
                                            }
                                        >
                                            {meeting.meetingDate}
                                        </Text>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsLabel
                                            }
                                        >
                                            {meeting.meetingType}
                                            {' : '}
                                            {meeting.title}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={
                                        mtrStyles(mtrTheme).groupDetailContainer
                                    }
                                >
                                    <View>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsLabel
                                            }
                                        >
                                            Group:
                                        </Text>
                                    </View>
                                    {group.gender === 'f' && (
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsData
                                            }
                                        >
                                            Women's {group.title}
                                        </Text>
                                    )}
                                    {group.gender === 'm' && (
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsData
                                            }
                                        >
                                            Men's {group.title}
                                        </Text>
                                    )}
                                    {group.gender === 'x' && (
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsData
                                            }
                                        >
                                            {group.title}
                                        </Text>
                                    )}
                                </View>
                                <View
                                    style={
                                        mtrStyles(mtrTheme).groupDetailContainer
                                    }
                                >
                                    <View>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsLabel
                                            }
                                        >
                                            Attendance:
                                        </Text>
                                    </View>

                                    <Text
                                        style={
                                            mtrStyles(mtrTheme)
                                                .groupCardDetailsData
                                        }
                                    >
                                        {group.attendance}
                                    </Text>
                                </View>
                                <View
                                    style={
                                        mtrStyles(mtrTheme).groupDetailContainer
                                    }
                                >
                                    <View>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsLabel
                                            }
                                        >
                                            Location:
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsData
                                            }
                                        >
                                            {group.location}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={
                                        mtrStyles(mtrTheme).groupDetailContainer
                                    }
                                >
                                    <View>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsLabel
                                            }
                                        >
                                            Facilitator:
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsData
                                            }
                                        >
                                            {group.facilitator}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={
                                        mtrStyles(mtrTheme).groupDetailContainer
                                    }
                                >
                                    <View>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsLabel
                                            }
                                        >
                                            Co-facilitator:
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsData
                                            }
                                        >
                                            {group.cofacilitator}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={
                                        mtrStyles(mtrTheme).groupDetailContainer
                                    }
                                >
                                    <View>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupCardDetailsLabel
                                            }
                                        >
                                            Notes:
                                        </Text>
                                    </View>
                                </View>
                                <View style={mtrStyles(mtrTheme).groupCardRow}>
                                    <View>
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .groupDetailsNotesText
                                            }
                                        >
                                            {group.notes}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* {authority && (
                            <View
                                style={{
                                    marginVertical: 20,
                                    marginHorizontal: 50,
                                }}
                            >
                                <>
                                    {meeter.userRole !== 'guest' && (
                                        <CustomButton
                                            text='DELETEWWW'
                                            bgColor={mtrTheme.colors.critical}
                                            fgColor={mtrTheme.colors.lightText}
                                            type='PRIMARY'
                                            onPress={() => {
                                                navigation.navigate(
                                                    'DeleteGroupConfirm',
                                                    {
                                                        group,
                                                        meeting,
                                                    }
                                                );
                                            }}
                                        />
                                    )}
                                </>
                            </View>
                        )} */}
                    </View>
                </Surface>
            </View>
        </>
    );
};
export default GroupDetailsScreen;
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        surface: {
            // flex: 1,
            alignItems: 'center',
        },
        container: {
            width: '95%',
            height: '100%',

            backgroundColor: mtrTheme.colors.background,
        },
        screenTitleContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.accent,
        },
        groupDetailsContainer: {
            backgroundColor: mtrTheme.colors.backgroundLight,
            borderRadius: 5,
            marginTop: 10,
            marginHorizontal: 10,
            width: 'auto',
            height: 'auto',
            paddingHorizontal: 0,
        },
        logistics: {
            alignItems: 'center',
            marginTop: 10,
        },
        logisticsBreak: {
            // borderTopColor: mtrTheme.colors.mediumGraphic,
            borderBottomColor: mtrTheme.colors.darkGraphic,
            marginHorizontal: 0,
            marginBottom: 5,
            padding: 10,
            borderBottomWidth: StyleSheet.hairlineWidth,
            alignItems: 'center',
        },
        groupCardDetailsLabel: {
            fontFamily: 'Roboto-Regular',
            fontSize: 26,
            paddingLeft: 0,
            fontWeight: '400',
            textAlign: 'left',
            letterSpacing: 0.5,
            color: mtrTheme.colors.darkText,
        },
        groupCardTopRow: {
            flexDirection: 'row',
            marginTop: 10,
            marginHorizontal: 0,
            alignItems: 'center',
        },
        groupCardRow: {
            flexDirection: 'row',
            marginTop: 10,
            marginHorizontal: 5,
        },
        groupCardDetailsLabel: {
            fontFamily: 'Roboto-Regular',
            fontSize: 26,
            paddingLeft: 0,
            fontWeight: '400',
            textAlign: 'left',
            letterSpacing: 0.5,
            color: mtrTheme.colors.darkText,
        },
        groupDetailContainer: {
            flexDirection: 'row',
            // marginTop: 10,
            marginLeft: 20,
        },
        groupCardDetailsData: {
            fontFamily: 'Roboto-Regular',
            fontSize: 26,
            fontWeight: '200',
            paddingHorizontal: 5,
            color: mtrTheme.colors.darkText,
        },
        groupDetailsNotesText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 24,
            color: mtrTheme.colors.darkText,
            fontWeight: '200',
            marginTop: -10,
            letterSpacing: 0.2,
            paddingBottom: 10,
            marginLeft: 15,
        },
    });
