import {
    StyleSheet,
    Text,
    View,
    FlatList,
    AppState,
    ViewBase,
    ImageBackground,
    SafeAreaView,
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

import { LocalizationProvider, LocalizationContext } from 'expo-localization';
import { useDispatch, useSelector } from 'react-redux';
import { Surface, ActivityIndicator, useTheme, FAB } from 'react-native-paper';
import MeetingListCard from '../components/Meeting.List.Card';
import {
    getActiveMeetings,
    getAllMeetings,
    getAllMeetingsG,
} from '../features/meetings/meetingsThunks';
import { printObject } from '../utils/helpers';
//   FUNCTION START
//   ===============
const ActiveScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.profile);
    const meeter = useSelector((state) => state.system.meeter);
    const [activeMeetings, setActiveMeetings] = useState(null);
    const meetings = useSelector((state) => state.meetings.meetings);

    const [isLoading, setIsLoading] = useState(false);
    const getCurrentDateInUserTimezone = useCallback(() => {
        const locales = Localization.getLocales();
        if (locales && locales.length > 0) {
            const userTimezone = locales[0].timezone;
            const currentDate = new Date();
            const userTimezoneDate = new Date(
                currentDate.toLocaleString('en-US', { timeZone: userTimezone })
            );
            return userTimezoneDate.toISOString().split('T')[0]; // Returns date in 'YYYY-MM-DD' format
        }
        return null;
    }, []);

    useLayoutEffect(() => {
        let headerLabelColor = '';
        if (Platform.OS === 'ios') {
            headerLabelColor = 'white';
        }
        navigation.setOptions({
            title: meeter.appName,
        });
    }, [navigation, meeter]);

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            // dispatch(getAllMeetings({ code: userProfile.activeOrg.code }))
            dispatch(getAllMeetingsG({ orgId: userProfile.activeOrg.id }))
                .then(() => {
                    return dispatch(getActiveMeetings());
                })
                .then((action) => {
                    const results = action.payload;
                    if (results.length > 0) {
                        setActiveMeetings(results);
                        // setMeetings(results);
                    } else {
                        setActiveMeetings([]);
                    }
                    setIsLoading(false);
                })
                // .then(() => {
                //     dispatch(listAllMeetings());
                // })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsLoading(false);
                });
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            const tday = '2023-08-01';
            const aMeetings = meetings.filter((m) => m.meetingDate >= tday);

            setActiveMeetings(aMeetings);
            setIsLoading(false);
        }, [meetings])
    );

    const handleNewRequest = () => {
        navigation.navigate('MeetingNew');
    };
    // printObject('ASRTK:97-->meetings:\n', meetings);
    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator
                    color={mtrTheme.colors.activityIndicator}
                    size={80}
                />
            </View>
        );
    }
    printObject('AST:84-->meetings:\n', meetings);
    // printObject('ASRTK:109-->activeMeetings:\n', activeMeetings);
    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>ACTIVE</Text>
                    {userProfile?.activeOrg?.role === 'manage' && (
                        <FAB
                            icon='calendar-plus'
                            style={styles.FAB}
                            onPress={handleNewRequest}
                        />
                    )}
                </View>

                <View style={{ padding: 10 }}>
                    <Text style={mtrTheme.subTitleSmall}>
                        Click event for details!
                    </Text>
                </View>

                <FlatList
                    data={activeMeetings}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <MeetingListCard meeting={item} active={true} />
                    )}
                />
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
