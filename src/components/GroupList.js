import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, AppState } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getMeetingGroups, clearGroups } from '../features/meetingsSlice';
import { useIsFocused } from '@react-navigation/native';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import GroupListCard from '../components/Group.List.Card';
import { focusManager } from '@tanstack/react-query';
import { FetchGroupsForMeeting } from './common/hooks/groupQueries';
const GroupList = ({ meetingId }) => {
    const isFocused = useIsFocused();
    //const meetingId = groups[0]?.meetingId ? groups[0].meetingId : '';
    const mtrTheme = useTheme();
    const [groups, setGroups] = useState([]);
    // const [meeting, setMeeting] = useState({});
    //const [groups, setGroups] = useState([]);

    // const groups = useSelector((state) => state.meetings.groups);
    // const meeting = useSelector((state) => state.meetings.tmpMeeting);
    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }
    useFocusEffect(
        useCallback(() => {
            const subscription = AppState.addEventListener(
                'change',
                onAppStateChange
            );
            refetch();
            printObject('GL:35-->REFETCH', null);

            return () => subscription.remove();
        }, [])
    );
    const { data, isError, isLoading, isFetching, refetch } = useQuery(
        ['groups', meetingId],
        () => FetchGroupsForMeeting(meetingId),
        {
            refetchInterval: 60000,
            cacheTime: 2000,
            enabled: true,
        }
    );
    printObject('GROUP DATA to use:', data);
    if (data) {
        setGroups(data.body);
    }
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
    if (isError) {
        return (
            <View>
                <Text>Something went wrong</Text>
            </View>
        );
    }

    return (
        <>
            <View>
                <Text>INSIDE GROUP LIST COMPONENT</Text>
            </View>
            {/* {groups && (
                <FlatList
                    data={groups}
                    keyExtractor={(item) => item.groupId}
                    persistentScrollbar={true}
                    renderItem={({ item }) => (
                        <GroupListCard group={item} meeting={meeting} />
                    )}
                    ListFooterComponent={<></>}
                />
            )} */}
        </>
    );
};

export default GroupList;
