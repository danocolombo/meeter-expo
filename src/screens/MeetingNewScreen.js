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
import MeetingForm from '../components/MeetingFormRTK';
import { addMeeting } from '../features/meetings/meetingsThunks';
import {
    createAWSUniqueID,
    createMtgCompKey,
    isDateDashBeforeToday,
    printObject,
} from '../utils/helpers';
import { addMeetingDDB } from '../providers/meetings';
import { sub } from 'react-native-reanimated';
//   FUNCTION START
//   ================
const MeetingNewScreen = ({ route }) => {
    const mtrTheme = useTheme();
    const userProfile = useSelector((state) => state.user.profile);
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const meeter = useSelector((state) => state.system);

    const handleUpdate = (values) => {
        const newId = createAWSUniqueID();

        const submitValues = {
            meeting: { id: newId, mtgCompKey: mck, ...values },
            orgId: userProfile.activeOrg.id,
        };
        printObject('MNS:42-->submitValues:\n', submitValues);
        // dispatch(addMeeting(submitValues));
        navigate.goBack();
    };
    const handleAddMeeting = (values) => {
        const newId = createAWSUniqueID();
        const submitValues = {
            meeting: { id: newId, ...values },
            orgId: userProfile.activeOrg.id,
        };
        printObject('MNS:48-->submitValues:\n', submitValues);
        dispatch(addMeeting(submitValues));
        navigate.goBack();
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
                        <View>
                            <Text>MeetingNewScreen</Text>
                        </View>
                        <MeetingForm
                            meetingId={null}
                            handleSubmit={handleAddMeeting}
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
