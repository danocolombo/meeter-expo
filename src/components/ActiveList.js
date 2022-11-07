import { useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Platform,
    AppState,
} from 'react-native';
import axios from 'axios';
import { focusManager } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import {
    FetchMeeting,
    FetchActiveMeetings,
} from './common/hooks/meetingQueries';
import MeetingListCard from './Meeting.List.Card';
import { printObject } from '../utils/helpers';
// export const useRefetchOnFocus = (refetch: : () => void) => {
//     useFocusEffect(() => {
//         refetch();
//     });
//     /* Maybe subscribe to App state here too */
// };
const ActiveList = ({ clientId }) => {
    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }
    // useFocusEffect(
    //     useCallback(() => {
    //         const subscription = AppState.addEventListener(
    //             'change',
    //             onAppStateChange
    //         );
    //         useQuery.refetch();
    //         printObject('AL:38-->isLoading', isLoading);
    //         printObject('AL:39-->isFetching', isFetching);
    //         return () => subscription.remove();
    //         // return () => {
    //         //alert('ActiveScreen was unfocused');
    //         // Do something when the screen is unfocused
    //         // Useful for cleanup functions
    //         //};
    //     }, [])
    // );
    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            onAppStateChange
        );

        return () => subscription.remove();
    }, []);
    let meetings = [];
    const { data, isError, isLoading, isFetching } = useQuery(
        ['meetings', 'active'],
        () => FetchActiveMeetings(clientId),
        {
            refetchOnMount: 'always',
            refetchOnWindowFocus: true,
            refetchInterval: 60000,
            cacheTime: 2000,
            enabled: true,
        }
    );
    printObject('AL:20-->isLoading', isLoading);
    printObject('AL:21-->isFetching', isFetching);
    // if (data) {
    //     meetings = data.body.Items;
    // }
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
                            data={data.body.Items}
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
