import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Surface, useTheme } from 'react-native-paper';
import { useUserContext } from '../contexts/UserContext';
import MeetingForm from '../components/MeetingFormRTK';
import { addMeeting } from '../features/meetings/meetingsThunks';
import { isDateDashBeforeToday, printObject } from '../utils/helpers';
import { addMeetingDDB } from '../providers/meetings';
//   FUNCTION START
//   ================
const MeetingNewScreen = ({ route }) => {
    const mtrTheme = useTheme();
    const { userProfile } = useUserContext();
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const meeter = useSelector((state) => state.system);

    const handleUpdate = (values) => {
        dispatch(addMeeting(values));
        navigate.goBack();
        // addMeetingDDB(values)
        //     .then((res) => {
        //         printObject('MNS:77-->addMeetingDDB res:', res);
        //         //dispatch(addMeeting(res));
        //         // console.log('dispatch(updateMeeting) returned');

        //         if (isDateDashBeforeToday(values.meetingDate)) {
        //             navigation.navigate('HistoricMeetings');
        //         } else {
        //             navigation.navigate('ActiveMeetings');
        //         }
        //         return;
        //     })
        //     .catch((err) => {
        //         printObject('addMeeting provider failed:', err);
        //         console.warn('addMeeting provider failed');

        //         return;
        //     });
    };

    return (
        <>
            {/* <KeyboardAvoidingView style={{ flex: 1 }}> */}
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        behavior='padding'
                        style={{ flex: 1 }}
                    >
                        <MeetingForm
                            meetingId={null}
                            handleUpdate={handleUpdate}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </>
    );
};

export default MeetingNewScreen;

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
