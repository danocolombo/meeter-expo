import { useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Platform,
    AppState,
} from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { focusManager } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { FetchHistoricMeetings } from './common/hooks/meetingQueries';
import MeetingListCard from './Meeting.List.Card';
import { printObject } from '../utils/helpers';
import { useSelector } from 'react-redux';

const HistoryList = ({ clientId }) => {
    const mtrTheme = useTheme();
    printObject('HL:21-->clientId :', clientId);
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
            printObject('HL:34-->REFETCH', null);

            return () => subscription.remove();
        }, [])
    );
    let meetings = [];
    const { data, isError, isLoading, isFetching, refetch } = useQuery(
        ['historicMeetings'],
        () => FetchHistoricMeetings(clientId),
        {
            cacheTime: 200,
        }
    );
    printObject('HL:22-->isLoading', isLoading);
    printObject('HL:23-->isFetching', isFetching);
    if (data) {
        meetings = data.body.Items;
    }
    // meetings = res?.data.body.Items;

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
            {meetings && (
                <>
                    {meetings && (
                        <FlatList
                            data={meetings}
                            keyExtractor={(item) => item.meetingId}
                            renderItem={({ item }) => (
                                <MeetingListCard
                                    meeting={item}
                                    active={false}
                                />
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
