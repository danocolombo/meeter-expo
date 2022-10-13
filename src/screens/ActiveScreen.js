import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ViewBase,
    ImageBackground,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Surface, useTheme } from 'react-native-paper';
import MeetingListCard from '../components/Meeting.List.Card';
const ActiveScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const meeter = useSelector((state) => state.system);
    const aMeetings = useSelector((state) => state.meetings.activeMeetings);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerRight: () => (
                <Button
                    onPress={() =>
                        navigation.navigate('MeeterEdit', {
                            meetingId: meeting.meetingId,
                        })
                    }
                    // color='white'
                    title='NEW'
                />
            ),
        });
    }, [navigation, meeter]);
    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>ACTIVE</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={mtrTheme.subTitleSmall}>
                        Click event for details.
                    </Text>
                </View>
                {aMeetings && (
                    <FlatList
                        data={aMeetings}
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
});
