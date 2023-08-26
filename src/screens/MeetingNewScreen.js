import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import MeetingForm from '../components/MeetingFormRTK';
import { addMeeting } from '../features/meetings/meetingsThunks';
import { createAWSUniqueID, printObject } from '../utils/helpers';
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
            title: meeter.appName || 'Meeter',
            headerBackTitle: 'Cancel',
        });
    }, [navigation, meeter]);

    const handleAddMeeting = (values) => {
        const newId = createAWSUniqueID();
        const submitValues = {
            meeting: { id: newId, ...values },
            orgId: userProfile.activeOrg.id,
        };
        // printObject('MNS:48-->submitValues:\n', submitValues);
        dispatch(addMeeting(submitValues));
        navigate.goBack();
    };
    return (
        <ScrollView style={mtrStyles(mtrTheme).surface}>
            <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                <Text style={mtrStyles(mtrTheme).screenTitleText}>
                    New Meeting
                </Text>
            </View>
            <MeetingForm meetingId={null} handleSubmit={handleAddMeeting} />
        </ScrollView>
    );
};

export default MeetingNewScreen;

const styles = StyleSheet.create({});
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        surface: {
            flex: 1,
            backgroundColor: mtrTheme.colors.background,
        },
        screenTitleContainer: {
            paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.accent,
        },
    });
