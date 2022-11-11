import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FetchMeeting } from './common/hooks/meetingQueries';
import { printObject } from '../utils/helpers';

const ActiveList = () => {
    const { data, isError, isLoading } = useQuery(['meeting'], () =>
        FetchMeeting()
    );

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
            {data?.body && (
                <>
                    <View>
                        <Text style={styles.text}>Meeting Info</Text>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.text}>
                                {data?.body.meetingId}
                            </Text>
                        </View>
                    </View>
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
