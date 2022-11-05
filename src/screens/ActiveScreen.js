import {
    StyleSheet,
    Text,
    View,
    FlatList,
    AppState,
    ViewBase,
    ImageBackground,
} from 'react-native';
import React, {
    useState,
    useLayoutEffect,
    useEffect,
    useCallback,
} from 'react';
import {
    useNavigation,
    useFocusEffect,
    useNavigationState,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Surface, ActivityIndicator, useTheme, FAB } from 'react-native-paper';
import MeetingListCard from '../components/Meeting.List.Card';
import { FontDisplay } from 'expo-font';
import { dateNumToDateDash, printObject } from '../utils/helpers';
import { focusManager } from '@tanstack/react-query';
import { current } from '@reduxjs/toolkit';
import ActiveList from '../components/ActiveList';
import { getSupportedMeetings } from '../providers/meetings';
const ActiveScreen = () => {
    const DANO = false;
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const meeter = useSelector((state) => state.system);
    const [displayMeetings, setDisplayMeetings] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
        });
    }, [navigation, meeter]);

    const handleNewRequest = () => {
        navigation.navigate('MeetingNew');
    };

    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>ACTIVE</Text>
                    {meeter.userRole !== 'guest' && (
                        <FAB
                            icon='calendar-plus'
                            style={styles.FAB}
                            onPress={handleNewRequest}
                        />
                    )}
                </View>

                <View style={{ padding: 10 }}>
                    <Text style={mtrTheme.subTitleSmall}>
                        Click event for details.
                    </Text>
                </View>
                <View>
                    <ActiveList meetings={displayMeetings} />
                </View>
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
