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
import { Surface, useTheme, ActivityIndicator, FAB } from 'react-native-paper';
import {
    useNavigation,
    useFocusEffect,
    useNavigationState,
} from '@react-navigation/native';
import { useUserContext } from '../contexts/UserContext';
import HistoryList from '../components/HistoryList';
import { getSupportedMeetings } from '../providers/meetings';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthContext } from '../contexts/AuthContext';
import MeetingListCard from '../components/Meeting.List.Card';
//import { getHistoricMeetings } from '../features/meetingsSlice';
import {
    printObject,
    getDateMinusDays,
    createMtgCompKey,
} from '../utils/helpers';
import { getHistoricMeetings } from '../features/meetings/meetingsThunks';
const HistoricScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { userProfile } = useUserContext();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const uns = useNavigationState((state) => state);
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
    const handleNewRequest = () => {
        navigation.navigate('MeetingNew');
    };
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

    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View style={styles.screenHeader}>
                    <Text style={styles.screenHeaderText}>
                        Historic Meetings
                    </Text>
                    <Text style={mtrTheme.subTitleSmall}>
                        Click event for details!
                    </Text>
                </View>
                {displayMeetings && (
                    <>
                        {displayMeetings && (
                            <FlatList
                                data={displayMeetings}
                                keyExtractor={(item) => item.meetingId}
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
        color: 'white',
    },
    bgImageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});
