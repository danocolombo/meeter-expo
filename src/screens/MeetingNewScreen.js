import {
    StyleSheet,
    Text,
    View,
    ViewBase,
    ImageBackground,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Surface, useTheme } from 'react-native-paper';
import MeetingForm from '../components/MeetingForm';
import { addNewMeeting } from '../features/meetingsSlice';
import { FlipInXDown } from 'react-native-reanimated';
import { isDateDashBeforeToday, printObject } from '../utils/helpers';

const MeetingNewScreen = (props) => {
    const navigation = useNavigation();
    console.log(props.route.name);
    // printObject('props', props);
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const meeter = useSelector((state) => state.system);
    var data = new Date();
    // printObject('data', data);
    const yr = parseInt(data.getFullYear());
    let mo = parseInt(data.getMonth());
    const da = parseInt(data.getDate());
    const hr = parseInt(data.getHours());
    const mi = parseInt(data.getMinutes());
    //month and day lengths if applicable
    mo = mo + 1;
    const moFix = ('0' + mo.toString()).slice(-2);
    const daFix = ('0' + da.toString()).slice(-2);
    const today = yr.toString() + '-' + moFix + '-' + daFix;
    const compKey =
        meeter.affiliation.toLowerCase() +
        '#' +
        yr.toString() +
        '#' +
        moFix +
        '#' +
        daFix;
    const meeting = {
        announcementsContact: '',
        attendanceCount: 0,
        avContact: '',
        cafeContact: '',
        cafeCount: 0,
        childrenCount: 0,
        childrenContact: '',
        cleanupContact: '',
        clientId: meeter.affiliation.toLowerCase(),
        closingContact: '',
        donations: 0,
        facilitatorContact: '',
        greeterContact2: '',
        greeterContact1: '',
        meal: '',
        mealContact: '',
        mealCount: 0,
        meetingDate: today,
        meetingId: '0',
        meetingType: 'Lesson',
        mtgCompKey: compKey,
        newcomersCount: 0,
        notes: '',
        nurseryContact: '',
        nurseryCount: 0,
        resourceContact: '',
        securityContact: '',
        setupContact: '',
        supportContact: '',
        title: '',
        transportationContact: '',
        transportationCount: 0,
        worship: '',
        youthContact: '',
        youthCount: 0,
    };
    const handleUpdate = (values) => {
        console.log('handlePut received.');
        printObject('MNS:84-->values', values);
        dispatch(addNewMeeting(values));
        if (isDateDashBeforeToday(values.meetingDate)) {
            navigation.navigate('HistoricMeeings');
        } else {
            navigation.navigate('ActiveMeetings');
        }
    };

    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>NEW MEETING</Text>
                </View>
                <MeetingForm meeting={meeting} handleUpdate={handleUpdate} />
            </Surface>
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
