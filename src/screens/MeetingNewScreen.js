import React, { useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Surface, useTheme, withTheme } from 'react-native-paper';
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
const MeetingNewScreen = ({ route, navigation }) => {
    const userProfile = useSelector((state) => state.user.profile);
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const meeter = useSelector((state) => state.system);
    const mtrTheme = useTheme();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
        });
    }, [navigation, meeter]);

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
    printObject('MNS:48-->userProfile:\n', userProfile);
    return (
        <>
            <View
                style={{ flex: 1, backgroundColor: mtrTheme.colors.background }}
            >
                <View>
                    <Text style={{ backgroundColor: mtrTheme.colors.accent }}>
                        MeetingNewScreen
                    </Text>
                </View>
                <ScrollView>
                    <MeetingForm
                        meetingId={null}
                        handleSubmit={handleAddMeeting}
                    />
                </ScrollView>
            </View>
        </>
    );
};

export default withTheme(MeetingNewScreen);

const styles = StyleSheet.create({});
