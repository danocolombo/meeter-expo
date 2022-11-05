import { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Platform,
    AppState,
} from 'react-native';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
    FetchMeeting,
    FetchActiveMeetings,
} from './common/hooks/meetingQueries';
import MeetingListCard from './Meeting.List.Card';
import { printObject } from '../utils/helpers';

const ActiveList = ({ clientId }) => {
    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }
    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            onAppStateChange
        );

        return () => subscription.remove();
    }, []);
    let meetings = [];
    const { data, isError, isLoading, isFetching } = useQuery(
        ['activeMeetings'],
        () => FetchActiveMeetings(clientId),
        {
            refetchInterval: 60000,
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

export default ActiveList;

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
});
