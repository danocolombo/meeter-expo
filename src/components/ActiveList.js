import { useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Platform,
    AppState,
} from 'react-native';
import { focusManager } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { FetchActiveMeetings } from './common/hooks/meetingQueries';
import {
    Surface,
    withTheme,
    useTheme,
    ActivityIndicator,
} from 'react-native-paper';
import MeetingListCard from './Meeting.List.Card';
import { printObject } from '../utils/helpers';

const ActiveList = ({ clientId }) => {
    const mtrTheme = useTheme();
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
            printObject('AL:42-->REFETCH', null);

            return () => subscription.remove();
        }, [])
    );

    let meetings = [];
    const { data, isError, isLoading, isFetching, refetch } = useQuery(
        ['meetings', 'active'],
        () => FetchActiveMeetings(clientId),
        {
            refetchInterval: 60000,
            cacheTime: 2000,
            enabled: true,
        }
    );
    printObject('AL:20-->isLoading', isLoading);
    printObject('AL:21-->isFetching', isFetching);

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
