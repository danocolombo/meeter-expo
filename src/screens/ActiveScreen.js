import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ViewBase,
    ImageBackground,
} from 'react-native';
import React, { useState, useLayoutEffect, useCallback } from 'react';
import {
    useNavigation,
    useFocusEffect,
    useNavigationState,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Surface, useTheme, FAB } from 'react-native-paper';
import MeetingListCard from '../components/Meeting.List.Card';
import { FontDisplay } from 'expo-font';
import { dateNumToDateDash, printObject } from '../utils/helpers';
import { current } from '@reduxjs/toolkit';
import { getSupportedMeetings } from '../providers/meetings';
const ActiveScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const meeter = useSelector((state) => state.system);
    const meetings = useSelector((state) => state.meetings.meetings);
    const [displayMeetings, setDisplayMeetings] = useState([]);
    const uns = useNavigationState((state) => state);
    useFocusEffect(
        React.useCallback(() => {
            // alert(JSON.stringify(uns));
            alert('ActiveScree: focused');
            printObject('###ACTIVE:uns###', uns);
            let currentMeetings = [];
            getSupportedMeetings(meeter.affiliation.toLowerCase())
                .then((results) => {
                    console.log('got results');
                    results.forEach((m) => {
                        currentMeetings.push(m);
                    });
                    let targetDate = dateNumToDateDash(meeter.today);
                    let filteredMeetings = currentMeetings.filter(
                        (m) => m.meetingDate >= targetDate
                    );
                    printObject('filteredMeeings', filteredMeetings);
                    function quickSort(prop) {
                        return function (a, b) {
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
                    setDisplayMeetings(sortedResults);
                })
                .catch((error) => {
                    printObject('ERROR GETTING SUPPORTED MEETINGS', error);
                });

            // Do something when the screen is focused
            return () => {
                alert('ActiveScreen was unfocused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
        });
    }, [navigation, meeter]);
    // useFocusEffect(
    //     useCallback(() => {
    // Do something when the screen is focused
    //-----------------------------------------
    // sort and load active meetings to FontDisplay
    // let currentMeeings = [];
    // aMeetings.map((m) => {
    //     currentMeeings.push(m);
    // });
    // function quickSort(prop) {
    //     return function (a, b) {
    //         if (a[prop] > b[prop]) {
    //             return 1;
    //         } else if (a[prop] < b[prop]) {
    //             return -1;
    //         }
    //         return 0;
    //     };
    // }
    // let sortedResults = currentMeeings.sort(quickSort('mtgCompKey'));
    // setMeetings(sortedResults);
    // return () => {
    // Do something when the screen is unfocused
    // Useful for cleanup functions
    //         };
    //     }, [])
    // );
    const handleNewRequest = () => {
        navigation.navigate('MeetingNew');
    };
    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>ACTIVE</Text>
                    <FAB
                        icon='calendar-plus'
                        style={styles.FAB}
                        onPress={handleNewRequest}
                    />
                </View>

                <View style={{ padding: 10 }}>
                    <Text style={mtrTheme.subTitleSmall}>
                        Click event for details.
                    </Text>
                </View>
                {meetings && (
                    <FlatList
                        data={displayMeetings}
                        keyExtractor={(item) => item.meetingId}
                        renderItem={({ item }) => (
                            <MeetingListCard meeting={item} active={true} />
                        )}
                    />
                )}
            </Surface>
        </>
    );
};

export default ActiveScreen;

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
    FAB: {
        position: 'absolute',
        margin: 10,

        right: 0,
        bottom: -30,
        backgroundColor: 'green',
    },
});
