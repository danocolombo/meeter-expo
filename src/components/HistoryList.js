import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
    FetchMeeting,
    FetchActiveMeetings,
    FetchHistoricMeetings,
} from './common/hooks/meetingQueries';
import MeetingListCard from './Meeting.List.Card';
import { printObject } from '../utils/helpers';

const HistoryList = () => {
    let meetings = [];
    const { data, isError, isLoading, isFetching } = useQuery(
        ['activeMeetings'],
        () => FetchHistoricMeetings(),
        {
            cacheTime: 2000,
        }
    );
    printObject('AL:20-->isLoading', isLoading);
    printObject('AL:21-->isFetching', isFetching);
    if (data) {
        meetings = data.body.Items;
    }
    // meetings = res?.data.body.Items;

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
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
            {meetings && (
                <>
                    {meetings && (
                        <FlatList
                            data={meetings}
                            keyExtractor={(item) => item.meetingId}
                            renderItem={({ item }) => (
                                <MeetingListCard meeting={item} active={true} />
                            )}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default HistoryList;

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
});
