import {
    StyleSheet,
    Text,
    View,
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
import {
    useNavigation,
    useFocusEffect,
    useNavigationState,
} from '@react-navigation/native';
import { getSupportedMeetings } from '../providers/meetings';
import { useSelector, useDispatch } from 'react-redux';
import MeetingListCard from '../components/Meeting.List.Card';
import { getHistoricMeetings } from '../providers/meetings';
//import { getHistoricMeetings } from '../features/meetingsSlice';
import {
    printObject,
    getDateMinusDays,
    createMtgCompKey,
} from '../utils/helpers';

const HistoricScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const hMeetings = useSelector((state) => state.meetings.historicMeetings);
    const [meetings, setMeetings] = useState([]);
    const uns = useNavigationState((state) => state);
    useFocusEffect(
        useCallback(() => {
            // alert(JSON.stringify(uns));
            //alert('Historic: focused');
            printObject('###HISTORIC:uns###', uns);
            let currentMeetings = [];
            getSupportedMeetings(meeter.affiliation.toLowerCase())
                .then((results) => {
                    console.log('got results');
                    results.forEach((m) => {
                        currentMeetings.push(m);
                    });
                    let key =
                        meeter.affiliation.toLowerCase() +
                        '#' +
                        meeter.today.substring(0, 4) +
                        '#' +
                        meeter.today.substring(4, 6) +
                        '#' +
                        meeter.today.substring(6, 8);
                    // get yesterdays date
                    let filteredMeetings = currentMeetings.filter(
                        (m) => m.mtgCompKey < key
                    );
                    printObject('filteredMeeings', filteredMeetings);
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
                    let sortedResults = filteredMeetings.sort(
                        quickSort('mtgCompKey')
                    );
                    setMeetings(sortedResults);
                })
                .catch((error) => {
                    printObject('ERROR GETTING SUPPORTED MEETINGS', error);
                });

            // Do something when the screen is focused
            return () => {
                //alert('ActiveScreen was unfocused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );
    // const getMeeitngs = async () => {
    //     let hMeetings = await getHistoricMeetings(
    //         system.affiliation.toLowerCase(),
    //         deleteGroup
    //     );
    // };
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         title: meeter.appName,
    //         headerRight: () => (
    //             <>
    //                 <View>
    //                     <Text style={{ color: 'white' }}>WHAT</Text>
    //                 </View>
    //                 <Button
    //                     onPress={() =>
    //                         navigation.navigate('MeeterEdit', {
    //                             meetingId: meeting.meetingId,
    //                         })
    //                     }
    //                     color='white'
    //                     title='NEW'
    //                 />
    //             </>
    //         ),
    //     });
    // }, [navigation, meeter]);
    // useFocusEffect(
    //     useCallback(() => {
    //         // Do something when the screen is focused
    //         //-----------------------------------------
    //         // sort and load active meetings to FontDisplay
    //         //dispatch(getHistoricMeetings());

    //         getHistoricMeetings(
    //             meeter.affiliation.toLowerCase(),
    //             meeter.today
    //         ).then((tmp) => {
    //             function quickSort(prop) {
    //                 return function (b, a) {
    //                     if (a[prop] > b[prop]) {
    //                         return 1;
    //                     } else if (a[prop] < b[prop]) {
    //                         return -1;
    //                     }
    //                     return 0;
    //                 };
    //             }
    //             let currentMeetings = [];
    //             tmp.map((m) => {
    //                 currentMeetings.push(m);
    //             });

    //             let sortedResults = currentMeetings.sort(
    //                 quickSort('mtgCompKey')
    //             );
    //             setMeetings(sortedResults);
    //         });

    //         return () => {
    //             // Do something when the screen is unfocused
    //             // Useful for cleanup functions
    //         };
    //     }, [])
    // );

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
