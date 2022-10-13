import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
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
        });
    }, [navigation, group]);
    //printObject('GDES:39-->meeting:', meeting);
    return (
        <>
            <ScrollView>
                <Surface style={styles.surface}>
                    <View
                        style={{
                            width: '95%',
                            height: '100%',

                            backgroundColor: 'white',
                        }}
                    >
                        <View
                            style={{
                                margin: 4,
                                borderWidth: 1,
                                borderColor: 'black',
                                width: 'auto',
                                height: '100%',
                            }}
                        >
                            <View
                                style={{
                                    margin: 2,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    width: 'auto',
                                    height: '100%',
                                }}
                            >
                                <View>
                                    <Text style={mtrTheme.editScreenTitle}>
                                        GROUP DETAILS
                                    </Text>
                                </View>
                                <View>
                                    <GroupForm
                                        group={group}
                                        meeting={meeting}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Surface>
            </ScrollView>
        </>
    );
};
export default withTheme(GroupDetailsEditScreen);
const styles = StyleSheet.create({
    surface: {
        flex: 1,
        alignItems: 'center',
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },

    dateWrapper: {
        margin: 5,
    },
});
