import {
    StyleSheet,
    Text,
    View,
    ViewBase,
    FlatList,
    ImageBackground,
} from 'react-native';
import React, {
    useLayoutEffect,
    useEffect,
    useState,
    useCallback,
} from 'react';
import { Surface, useTheme } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import MeetingListCard from '../components/Meeting.List.Card';
import { getHistoricMeetings } from '../providers/meetings';
//import { getHistoricMeetings } from '../features/meetingsSlice';
import { printObject, getDateMinusDays } from '../utils/helpers';

const HistoricScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const hMeetings = useSelector((state) => state.meetings.historicMeetings);
    const [meetings, setMeetings] = useState([]);
    const getMeeitngs = async () => {
        let hMeetings = await getHistoricMeetings(
            system.affiliation.toLowerCase(),
            deleteGroup
        );
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerRight: () => (
                <>
                    <View>
                        <Text style={{ color: 'white' }}>WHAT</Text>
                    </View>
                    <Button
                        onPress={() =>
                            navigation.navigate('MeeterEdit', {
                                meetingId: meeting.meetingId,
                            })
                        }
                        color='white'
                        title='NEW'
                    />
                </>
            ),
        });
    }, [navigation, meeter]);
    useEffect(() => {}, []);
    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            //-----------------------------------------
            // sort and load active meetings to FontDisplay
            //dispatch(getHistoricMeetings());

            getHistoricMeetings(
                meeter.affiliation.toLowerCase(),
                meeter.today
            ).then((tmp) => {
                function quickSort(prop) {
                    return function (b, a) {
                        if (a[prop] > b[prop]) {
                            return 1;
                        } else if (a[prop] < b[prop]) {
                            return -1;
                        }
                        return 0;
                    };
                }
                let currentMeetings = [];
                tmp.map((m) => {
                    currentMeetings.push(m);
                });

                let sortedResults = currentMeetings.sort(
                    quickSort('mtgCompKey')
                );
                setMeetings(sortedResults);
            });

            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>HISTORIC</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={mtrTheme.subTitleSmall}>
                        Click event for details.
                    </Text>
                </View>
                {hMeetings && (
                    <FlatList
                        data={meetings}
                        keyExtractor={(item) => item.meetingId}
                        renderItem={({ item }) => (
                            <MeetingListCard meeting={item} active={false} />
                        )}
                    />
                )}
            </Surface>
        </>
    );
};

export default HistoricScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    screenHeader: {
        alignItems: 'center',
    },
    screenHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    bgImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
