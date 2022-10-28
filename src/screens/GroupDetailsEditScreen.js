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
import {
    useNavigation,
    useIsFocused,
    useNavigationState,
    useFocusEffect,
} from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import { Badge } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GenderSelectors from '../components/GenderSelectors';
import NumberInput from '../components/ui/NumberInput';
import Input from '../components/ui/Input';
import { Surface, withTheme, useTheme } from 'react-native-paper';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import MeetingListCard from '../components/Meeting.List.Card';
import { getMeetingGroups, clearGroups } from '../features/meetingsSlice';
import { updateGroupValues, addGroupValues } from '../features/meetingsSlice';
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
    const [isLocationValid, setIsLocationValid] = useState(
        group?.location?.length > 2 ? true : false
    );
    const [isTitleValid, setIsTitleValid] = useState(
        group?.title?.length > 2 ? true : false
    );
    const [values, setValeus] = useState({
        meetingId: meeting.meetingId,
        groupId: group.groupId ? group.groupId : '0',
        gender: group.gender ? group.gender : 'x',
        title: group.title ? group.title : '',
        attendance: group.attendance ? parseInt(group.attendance) : 0,
        location: group.location ? group.location : '',
        facilitator: group.facilitator ? group.facilitator : '',
        cofacilitator: group.cofacilitator ? group.cofacilitator : '',
        notes: group.notes ? group.notes : '',
    });
    const uns = useNavigationState((state) => state);
    useFocusEffect(
        React.useCallback(() => {
            // alert(JSON.stringify(uns));
            alert('GroupDetailsEditScreen: focused');
            printObject('###EDIT:uns###', uns);
            // Do something when the screen is focused
            return () => {
                alert('GroupDetailsEditScreen was unfocused');
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );
    // printObject('start values', values);
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
    function setGenderValue(enteredValue) {
        setValeus((curInputValues) => {
            return {
                ...curInputValues,
                gender: enteredValue,
            };
        });
    }
    function inputChangedHandler(inputIdentifier, enteredValue) {
        setValeus((curInputValues) => {
            if (inputIdentifier === 'title') {
                if (enteredValue.length < 3) {
                    setIsTitleValid(false);
                } else {
                    setIsTitleValid(true);
                }
            }
            if (inputIdentifier === 'location') {
                if (enteredValue.length < 3) {
                    setIsLocationValid(false);
                } else {
                    setIsLocationValid(true);
                }
            }
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }
    const handleFormSubmit = () => {
        printObject('submit values:', values);
        if (values.groupId === '0') {
            dispatch(addGroupValues(values));
            navigation.goBack();
        } else {
            dispatch(updateGroupValues(values));
            //navigation.goBack();
            navigation.navigate('MeetingDetails', {
                meeting: values,
            });
        }
        return;

        //   handle SAVE request
        if (values.groupId === undefined) {
            console.log('yep');
            values.groupId = 0;
            dispatch(addGroupValues(values));
        } else {
            dispatch(updateGroupValues(values));
        }
        navigation.navigate('MeetingDetails', {
            meeting: meeting,
        });
    };
    const inputStyle = {
        paddingLeft: 0,
        fontSize: 24,
        fontWeight: '800',
        color: 'black',
        marginHorizontal: 10,
    };
    //printObject('GDES:39-->meeting:', meeting);
    return (
        <>
            {/* <ScrollView style={{ height: '100%' }}> */}
            <Surface style={mtrTheme.groupEditSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>GROUP DETAILS</Text>
                </View>
                <View style={mtrTheme.groupEditRow}>
                    <GenderSelectors
                        setPick={setGenderValue}
                        pick={values.gender}
                    />
                </View>
                <View
                    style={[
                        mtrTheme.groupEditRowBasic,
                        { marginTop: 15, marginBottom: 0 },
                    ]}
                >
                    <NumberInput
                        value={values.attendance}
                        numberStyle={{ color: 'white' }}
                        graphicStyle={{ color: 'white' }}
                        onAction={inputChangedHandler.bind(this, 'attendance')}
                    />
                </View>
                <View style={mtrTheme.groupEditRowBasic}>
                    <Input
                        label='Group Title'
                        labelStyle={mtrTheme.groupFormInputTitle}
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            value: values.title,
                            paddingHorizontal: 5,
                            fontSize: 24,
                            color: 'black',
                            marginHorizontal: 0,
                            placeholder: 'Group Title',
                            style: { color: 'black' },
                            fontWeight: '500',

                            letterSpacing: 0,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'title'
                            ),
                        }}
                    />
                </View>
                {!isTitleValid && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>minimum length = 3</Text>
                    </View>
                )}
                <View style={mtrTheme.groupEditRowBasic}>
                    <Input
                        label='Location'
                        labelStyle={mtrTheme.groupFormInputTitle}
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            paddingHorizontal: 5,
                            value: values.location,
                            fontSize: 24,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 0,
                            placeholder: 'where was group?',
                            style: { color: 'black' },

                            fontWeight: '500',
                            letterSpacing: 0,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'location'
                            ),
                        }}
                    />
                </View>
                {!isLocationValid && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>minimum length = 3</Text>
                    </View>
                )}
                <View style={mtrTheme.groupEditRowBasic}>
                    <Input
                        label='Faciliatator'
                        labelStyle={mtrTheme.groupFormInputTitle}
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            paddingHorizontal: 5,
                            fontSize: 24,
                            value: values.facilitator,
                            color: 'black',
                            capitalize: 'words',
                            marginHorizontal: 0,
                            placeholder: 'who facilitated?',
                            style: { color: 'black' },

                            fontWeight: '500',
                            letterSpacing: 0,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'facilitator'
                            ),
                        }}
                    />
                </View>
                <View style={mtrTheme.groupEditRowBasic}>
                    <Input
                        label='Co-Faciliatator'
                        labelStyle={mtrTheme.groupFormInputTitle}
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            paddingHorizontal: 5,
                            fontSize: 24,
                            value: values.cofacilitator,
                            color: 'black',
                            width: '100%',
                            capitalize: 'words',
                            marginHorizontal: 0,
                            placeholder: 'who co-facilitated?',
                            style: { color: 'black' },
                            fontWeight: '500',
                            letterSpacing: 0,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'cofacilitator'
                            ),
                        }}
                    />
                </View>
                <View style={mtrTheme.groupEditRowBasic}>
                    <Input
                        label='Notes'
                        labelStyle={mtrTheme.groupFormInputTitle}
                        textInputConfig={{
                            backgroundColor: 'lightgrey',
                            paddingHorizontal: 10,
                            fontSize: 24,
                            color: 'black',
                            value: values.notes,
                            capitalize: 'sentence',
                            autoCorrect: true,
                            marginHorizontal: 5,
                            placeholder: '',
                            style: { color: 'black' },
                            fontWeight: '500',
                            letterSpacing: 0,
                            multiline: true,
                            minHeight: 100,
                            onChangeText: inputChangedHandler.bind(
                                this,
                                'notes'
                            ),
                        }}
                    />
                </View>

                <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                    <CustomButton
                        text='SAVE'
                        bgColor={mtrTheme.colors.success}
                        fgColor='white'
                        type='PRIMARY'
                        enabled={isTitleValid}
                        onPress={handleFormSubmit}
                    />
                </View>
            </Surface>
            {/* </ScrollView> */}
        </>
    );
};
export default withTheme(GroupDetailsEditScreen);
const styles = StyleSheet.create({});
