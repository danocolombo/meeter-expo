import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FetchDogBreeds, BreedsKeys } from './common/hooks/meetingQueries';
import { printObject } from '../utils/helpers';

const ActiveList = () => {
    const { data, isError, isLoading } = useQuery(['breeds'], () =>
        FetchDogBreeds()
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
            {data?.message && (
                <>
                    <View>
                        <Text style={styles.text}>Breed Names</Text>
                    </View>
                    <View>
                        {Object.keys(data?.message).map((item, i) => (
                            <View>
                                <Text style={styles.text}>{item}</Text>
                            </View>
                        ))}
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
