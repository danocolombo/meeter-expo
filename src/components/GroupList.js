import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getMeetingGroups, clearGroups } from '../features/meetingsSlice';
import { useIsFocused } from '@react-navigation/native';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import GroupListCard from '../components/Group.List.Card';
import { getGroupsForMeeting } from '../providers/groups';
const GroupList = ({ meetingId }) => {
    const [isLoading, setIsLoadiing] = useState(true);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    //const meetingId = groups[0]?.meetingId ? groups[0].meetingId : '';
    const mtrTheme = useTheme();
    // const [meeting, setMeeting] = useState({});
    //const [groups, setGroups] = useState([]);

    const groups = useSelector((state) => state.meetings.groups);
    const meeting = useSelector((state) => state.meetings.tmpMeeting);
    async function getGroups(meetingId) {
        getGroupsForMeeting(meetingId)
            .then((groups) => {
                return groups;
            })
            .catch((error) => {
                printObject('provider::error', error);
            });
    }
    useEffect(() => {
        //check for groups
        dispatch(clearGroups());
        setIsLoadiing(true);

        getGroups(meeting.meetingId);
        //dispatch(getMeetingGroups(meeting.meetingId));

        setIsLoadiing(false);
        // const count = historicMeetings.filter(
        //     (item) => item.meetingId !== '0'
        // ).length;
        // if (count) {
        //     setMeeting(historicMeetings[0]);
        // } else {
        //     setMeeting(activeMeetings[0]);
        // }
        // setGroups(groups);
        //get meeting, majority of time, we are getting historic so check that first

        setIsLoadiing(false);
    }, []);
    if (isLoading) {
        return <ActivityIndicator color={mtrTheme.colors.accent} size={40} />;
    }

    return (
        <>
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
