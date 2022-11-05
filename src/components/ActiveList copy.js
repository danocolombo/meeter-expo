import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { printObject } from '../utils/helpers';

const fetchMeetings = () => {
    const res = axios.get(
        'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
    );
    return res;
};
const fetchMeetings2 = () => {
    const config = {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };
    let obj = {
        operation: 'getMeetingsOnAfterDate',
        payload: {
            clientId: 'wbc',
            date: '2022-12-01',
            direction: 'DESC',
        },
    };
    let body = JSON.stringify(obj);
    let api2use = process.env.AWS_API_ENDPOINT + '/meetings';

    const res = axios.post(api2use, body, config);

    return res;
};
const ActiveList = () => {
    const onSuccess = (data) => {
        console.log({ data });
    };
    const onError = (error) => {
        console.log('error side-effect action from data fetching');
    };

    const { isLoading, data, isError, error, isFetching } = useQuery(
        'us-pops',
        fetchMeetings2,
        {
            //cacheTime: 5000,
            refetchOnMount: true, //true, "always", 1000,
            refetchOnWindowFocus: true, // default is true
            //refetchInterval: 2000,
            refetchIntervalInBackground: false,
        },
        {
            onSuccess: onSuccess(),
            onError, //shorthand for onError: onError
        }
    );
    if (isLoading) {
        return (
            <View>
                <Text style={styles.text}>Loading...</Text>
            </View>
        );
    }
    if (isError) {
        return (
            <View>
                <Text style={styles.text}>{error.message}</Text>
            </View>
        );
    }
    return (
        <>
            <View>
                <Text style={styles.text}>React Query Meetings Page</Text>
            </View>
            {/* {data?.data.map((y) => {
                return (
                    <View>
                        <Text style={styles.text}>
                            {y['ID Year']} Population: {y['Population']}
                        </Text>
                    </View>
                );
            })} */}
        </>
    );
};

export default ActiveList;

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
});
