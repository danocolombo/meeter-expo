import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import { Badge } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Surface, withTheme, useTheme } from 'react-native-paper';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import MeetingListCard from '../components/Meeting.List.Card';
import { getMeetingGroups, clearGroups } from '../features/meetingsSlice';
import DateBall from '../components/ui/DateBall';
import MeetingCardDate from '../components/ui/Meeting.Card.Date';
import { Style } from 'domelementtype';
import GroupForm from '../components/GroupForm';
const GroupDetailsEditScreen = ({ route, navigation }) => {
    const group = route.params.group;
    const meeting = route.params.meeting;
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    const meeter = useSelector((state) => state.system);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
            headerRight: () => (
                <>
                    <TouchableOpacity
                        onPress={() => setModalDeleteConfirmVisible(true)}
                    >
                        <MaterialCommunityIcons
                            name='delete-forever'
                            size={30}
                            color={mtrTheme.colors.critical}
                        />
                    </TouchableOpacity>
                </>
            ),
        });
    }, [navigation, group]);
    //printObject('GDES:39-->meeting:', meeting);
    return (
        <>
            <ScrollView style={{ height: '100%' }}>
                <Surface style={mtrTheme.groupEditSurface}>
                    <View>
                        <Text style={mtrTheme.screenTitle}>GROUP DETAILS</Text>
                    </View>
                    <View style={mtrTheme.groupEditFormContainer}>
                        <GroupForm group={group} meeting={meeting} />
                    </View>
                </Surface>
            </ScrollView>
        </>
    );
};
export default withTheme(GroupDetailsEditScreen);
const styles = StyleSheet.create({});
