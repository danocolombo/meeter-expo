import { StyleSheet, Text, View } from 'react-native';
import React, {
    useLayoutEffect,
    useEffect,
    useState,
    useCallback,
} from 'react';
import { Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import {
    useNavigation,
    useFocusEffect,
    useNavigationState,
} from '@react-navigation/native';
import ProfileForm from '../components/ProfileForm';
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

const ProfileScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const hMeetings = useSelector((state) => state.meetings.historicMeetings);
    const [meetings, setMeetings] = useState([]);
    const uns = useNavigationState((state) => state);
    const [isLoading, setIsLoading] = useState(false);
    // useFocusEffect(
    //     useCallback(() => {
    //         // alert(JSON.stringify(uns));
    //         //alert('Historic: focused');
    //         setIsLoading(true);
    //         printObject('###HISTORIC:uns###', uns);
    //         let currentMeetings = [];
    //         getSupportedMeetings(meeter.affiliation.toLowerCase())
    //             .then((results) => {
    //                 console.log('got results');
    //                 results.forEach((m) => {
    //                     currentMeetings.push(m);
    //                 });
    //                 let key =
    //                     meeter.affiliation.toLowerCase() +
    //                     '#' +
    //                     meeter.today.substring(0, 4) +
    //                     '#' +
    //                     meeter.today.substring(4, 6) +
    //                     '#' +
    //                     meeter.today.substring(6, 8);
    //                 // get yesterdays date
    //                 let filteredMeetings = currentMeetings.filter(
    //                     (m) => m.mtgCompKey < key
    //                 );
    //                 printObject('filteredMeeings', filteredMeetings);
    //                 function quickSort(prop) {
    //                     return function (b, a) {
    //                         if (a[prop] > b[prop]) {
    //                             return 1;
    //                         } else if (a[prop] < b[prop]) {
    //                             return -1;
    //                         }
    //                         return 0;
    //                     };
    //                 }
    //                 let sortedResults = filteredMeetings.sort(
    //                     quickSort('mtgCompKey')
    //                 );
    //                 setMeetings(sortedResults);
    //             })
    //             .catch((error) => {
    //                 printObject('ERROR GETTING SUPPORTED MEETINGS', error);
    //             });
    //         setIsLoading(false);
    //         // Do something when the screen is focused
    //         return () => {
    //             //alert('ActiveScreen was unfocused');
    //             // Do something when the screen is unfocused
    //             // Useful for cleanup functions
    //         };
    //     }, [])
    // );
    const handleCommit = () => {};
    const handleCancel = () => {};
    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>Profile Screen</Text>
                </View>

                <ProfileForm onCommit={handleCommit} onCancel={handleCancel} />
            </Surface>
        </>
    );
};

export default ProfileScreen;

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
