import {
    StyleSheet,
    Text,
    View,
    ViewBase,
    ImageBackground,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Surface, useTheme } from 'react-native-paper';

const NewMeetingScreen = () => {
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
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
                    <Text style={mtrTheme.screenTitle}>NEW MEETING</Text>
                </View>
            </Surface>
        </>
    );
};

export default NewMeetingScreen;

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
