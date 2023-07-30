import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, AppState } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { focusManager } from '@tanstack/react-query';
import CustomButton from '../components/ui/CustomButton';
import { Badge } from 'react-native-paper';
import {
    Surface,
    withTheme,
    useTheme,
    ActivityIndicator,
} from 'react-native-paper';
import { useUserContext } from '../contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { FetchGroup } from '../components/common/hooks/groupQueries';
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
    const { perms } = useUserContext();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const [isLoading, setIsLoading] = useState(false);
    const [authority, setAuthority] = useState(
        perms.includes('manage') || perms.includes('manage') || false
    );
    useLayoutEffect(() => {
        let headerLabelColor = '';
        if (Platform.OS === 'ios') {
            headerLabelColor = 'white';
        }
        if (perms.includes('manage') || perms.includes('groups')) {
            navigation.setOptions({
                title: meeter.appName,
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
                        color={headerLabelColor}
                        title='Edit'
                    />
                ),
            });
        }
    }, [navigation, meeter]);
    // function onAppStateChange(status) {
    //     if (Platform.OS !== 'web') {
    //         focusManager.setFocused(status === 'active');
    //     }
    // }
    // useFocusEffect(
    //     useCallback(() => {
    //         const subscription = AppState.addEventListener(
    //             'change',
    //             onAppStateChange
    //         );
    //         refetch();
    //         printObject('GDS:64-->REFETCH', null);

    //         return () => subscription.remove();
    //     }, [])
    // );

    // const { data, isError, error, isLoading, isFetching, refetch } = useQuery(
    //     ['group', groupId],
    //     () => FetchGroup(groupId),
    //     {
    //         refetchInterval: 60000,
    //         cacheTime: 2000,
    //         enabled: true,
    //     }
    // );

    // if (data) {
    //     group = data.body;
    // }
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
    // if (isError) {
    //     console.error('Error getting group', error);
    // }
    return (
        <>
            <View style={{ flex: 1 }}>
                <Surface style={styles.surface}>
                    <View
                        style={{
                            width: '95%',
                            height: '100%',

                            backgroundColor: mtrTheme.backgroundColor,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'column',
                                flex: 1,
                            }}
                        >
                            <View
                                style={{
                                    margin: 10,
                                    width: 'auto',
                                    height: 'auto',
                                }}
                            >
                                <View
                                    style={{
                                        width: 'auto',
                                        height: 'auto',
                                        paddingHorizontal: 0,
                                    }}
                                >
                                    <View>
                                        <Text style={mtrTheme.screenTitle}>
                                            GROUP DETAILS
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            marginTop: 20,
                                        }}
                                    >
                                        <Text
                                            style={
                                                mtrTheme.groupCardDetailsLabel
                                            }
                                        >
                                            {meeting.meetingDate}
                                        </Text>
                                        <Text
                                            style={
                                                mtrTheme.groupCardDetailsLabel
                                            }
                                        >
                                            {meeting.meetingType}
                                            {' : '}
                                            {meeting.title}
                                        </Text>
                                    </View>

                                    <View
                                        style={[
                                            mtrTheme.groupCardTopRow,
                                            { maxWidth: '90%' },
                                        ]}
                                    >
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsData
                                                }
                                            >
                                                {group.gender === 'f' && (
                                                    <Text
                                                        style={
                                                            mtrTheme.groupCardDetailsData
                                                        }
                                                    >
                                                        Women's {group.title}
                                                    </Text>
                                                )}
                                                {group.gender === 'm' && (
                                                    <Text
                                                        style={
                                                            mtrTheme.groupCardDetailsData
                                                        }
                                                    >
                                                        Men's {group.title}
                                                    </Text>
                                                )}
                                                {group.gender === 'x' && (
                                                    <Text
                                                        style={
                                                            mtrTheme.groupCardDetailsData
                                                        }
                                                    >
                                                        {group.title}
                                                    </Text>
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 10,
                                        }}
                                    >
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsLabel
                                                }
                                            >
                                                Attendance:
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                paddingLeft: 20,
                                                // marginLeft: 'auto',
                                                // marginRight: 0,
                                            }}
                                        >
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsLabel
                                                }
                                            >
                                                {group.attendance}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={mtrTheme.groupCardRow}>
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsLabel
                                                }
                                            >
                                                Location:
                                            </Text>
                                        </View>
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsData
                                                }
                                            >
                                                {group.location}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={mtrTheme.groupCardRow}>
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsLabel
                                                }
                                            >
                                                Faciliator:
                                            </Text>
                                        </View>
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsData
                                                }
                                            >
                                                {group.facilitator}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={mtrTheme.groupCardRow}>
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsLabel
                                                }
                                            >
                                                Co-faciliator:
                                            </Text>
                                        </View>
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsData
                                                }
                                            >
                                                {group.cofacilitator}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={mtrTheme.groupCardRow}>
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.groupCardDetailsLabel
                                                }
                                            >
                                                Notes:
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={mtrTheme.groupCardRow}>
                                        <View>
                                            <Text
                                                style={
                                                    mtrTheme.groupDetailsNotesText
                                                }
                                            >
                                                {group.notes}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {authority && (
                            <View
                                style={{
                                    marginVertical: 20,
                                    marginHorizontal: 50,
                                }}
                            >
                                <>
                                    {meeter.userRole !== 'guest' && (
                                        <CustomButton
                                            text='DELETE'
                                            bgColor='red'
                                            fgColor='white'
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
                        )}
                    </View>
                </Surface>
            </View>
        </>
    );
};
export default withTheme(GroupDetailsScreen);
const styles = StyleSheet.create({
    surface: {
        // flex: 1,
        alignItems: 'center',
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },

    dateWrapper: {
        margin: 5,
    },
    buttonContainer: { marginTop: 20, marginHorizontal: 20 },
    button: {
        backgroundColor: 'blue',
        marginHorizontal: 20,
        marginTop: 20,
    },
    surfaceContainer: {
        marginHorizontal: 10,
        width: '95%',
        marginHorizontal: 10,
        padding: 20,
    },
    titleContainer: {},
    titleText: {
        fontSize: 28,
        fontWeight: '600',
        color: 'white',
    },
});
