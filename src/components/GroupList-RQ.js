import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getMeetingGroups, clearGroups } from '../features/meetingsSlice';
import { useIsFocused } from '@react-navigation/native';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import GroupListCard from '../components/Group.List.Card';
import { FetchGroupsForMeeting } from './common/hooks/groupQueries';
const GroupList = (meetingId) => {
    const [isLoading, setIsLoadiing] = useState(true);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    //const meetingId = groups[0]?.meetingId ? groups[0].meetingId : '';
    const mtrTheme = useTheme();
    const [groups, setGroups] = useState([]);
    // const [meeting, setMeeting] = useState({});
    //const [groups, setGroups] = useState([]);

    // const groups = useSelector((state) => state.meetings.groups);
    // const meeting = useSelector((state) => state.meetings.tmpMeeting);
    async function getGroups(meetingId) {
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
        //   +++++++++++++++++++++++++++++++++
    }
    // useEffect(() => {
    //     //check for groups
    //     dispatch(clearGroups());
    //     setIsLoadiing(true);
    //     console.log('BOOP');
    //     getGroups(meeting.meetingId);
    //     //dispatch(getMeetingGroups(meeting.meetingId));

    //     setIsLoadiing(false);
    //     console.log('BOMB');
    //     // const count = historicMeetings.filter(
    //     //     (item) => item.meetingId !== '0'
    //     // ).length;
    //     // if (count) {
    //     //     setMeeting(historicMeetings[0]);
    //     // } else {
    //     //     setMeeting(activeMeetings[0]);
    //     // }
    //     // setGroups(groups);
    //     //get meeting, majority of time, we are getting historic so check that first

    //     setIsLoadiing(false);
    //    }, []);
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
                    color={mtrTheme.colors.background}
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
            {groups && (
                <FlatList
                    data={groups}
                    keyExtractor={(item) => item.groupId}
                    persistentScrollbar={true}
                    renderItem={({ item }) => (
                        <GroupListCard group={item} meeting={meeting} />
                    )}
                    ListFooterComponent={<></>}
                />
            )}
        </>
    );
};

export default GroupList;
