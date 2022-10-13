import {
    StyleSheet,
    Text,
    View,
    ViewBase,
    FlatList,
    ImageBackground,
} from 'react-native';
import React, { useLayoutEffect, useEffect } from 'react';
import { Surface, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import MeetingListCard from '../components/Meeting.List.Card';
import { getHistoricMeetings } from '../features/meetingsSlice';

const HistoricScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const hMeetings = useSelector((state) => state.meetings.historicMeetings);
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
    useEffect(() => {
        dispatch(getHistoricMeetings());
    }, []);

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
                        data={hMeetings}
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
