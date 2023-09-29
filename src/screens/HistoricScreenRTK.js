import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Surface, useTheme, ActivityIndicator, FAB } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import MeetingListCard from '../components/Meeting.List.Card';
import { printObject } from '../utils/helpers';
import { getHistoricMeetings } from '../features/meetings/meetingsThunks';
const HistoricScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const mtrTheme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [displayMeetings, setDisplayMeetings] = useState([]);

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            dispatch(getHistoricMeetings())
                .then((action) => {
                    const results = action.payload;
                    if (results.length > 0) {
                        setDisplayMeetings(results);
                    } else {
                        setDisplayMeetings([]);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false);
                });
        }, [])
    );

    if (isLoading) {
        return (
            <View style={mtrStyles(mtrTheme).activityIndicatorContainer}>
                <ActivityIndicator
                    color={mtrStyles(mtrTheme).activityIndicator}
                    size={80}
                />
            </View>
        );
    }

    return (
        <>
            <Surface style={mtrStyles(mtrTheme).screenSurface}>
                <View style={mtrStyles(mtrTheme).screenHeader}>
                    <Text style={mtrStyles(mtrTheme).screenHeaderText}>
                        Historic Meetings
                    </Text>
                    <Text style={mtrStyles(mtrTheme).subTitleSmall}>
                        Click event for details!
                    </Text>
                </View>
                {displayMeetings && (
                    <>
                        {displayMeetings && (
                            <FlatList
                                key={Math.random()} // Add a random key to force re-render
                                data={displayMeetings}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <MeetingListCard
                                        meeting={item}
                                        active={true}
                                    />
                                )}
                            />
                        )}
                    </>
                )}
            </Surface>
        </>
    );
};

export default HistoricScreen;
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        screenSurface: {
            flex: 1,
            backgroundColor: mtrTheme.colors.background,
        },
        activityIndicatorContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {
            color: mtrTheme.colors.lightGraphic,
        },
        screenHeader: {
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenHeaderText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.lightText,
        },
        subTitleSmall: {
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            fontWeight: '500',
            color: mtrTheme.colors.accent,
            textAlign: 'center',
            paddingBottom: 5,
        },
    });
