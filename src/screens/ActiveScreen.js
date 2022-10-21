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
import { printObject } from '../utils/helpers';
import { current } from '@reduxjs/toolkit';
const ActiveScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const meeter = useSelector((state) => state.system);
    const aMeetings = useSelector((state) => state.meetings.activeMeetings);
    const [meetings, setMeetings] = useState([]);
    const uns = useNavigationState((state) => state);
    useFocusEffect(
        React.useCallback(() => {
            // alert(JSON.stringify(uns));
            alert('ActiveScree: focused');
            printObject('###ACTIVE:uns###', uns);
            let currentMeeings = [];
            aMeetings.map((m) => {
                currentMeeings.push(m);
            });
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
            let sortedResults = currentMeeings.sort(quickSort('mtgCompKey'));
            setMeetings(sortedResults);
            // Do something when the screen is focused
            return () => {
                alert('ActiveScree was unfocused');
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
                        data={meetings}
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
