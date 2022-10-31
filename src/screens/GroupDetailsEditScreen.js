import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    useWindowDimensions,
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
import {
    Surface,
    withTheme,
    useTheme,
    ActivityIndicator,
} from 'react-native-paper';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import MeetingListCard from '../components/Meeting.List.Card';
import {
    updateGroupValues,
    addGroupValues,
    deleteIndividualGroup,
} from '../features/meetingsSlice';
import DateBall from '../components/ui/DateBall';
import MeetingCardDate from '../components/ui/Meeting.Card.Date';
import { Style } from 'domelementtype';
import GroupForm from '../components/GroupForm';
const GroupDetailsEditScreen = ({ route, navigation }) => {
    const groupId = route.params.groupId;
    const meetingId = route.params.meetingId;
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const groups = useSelector((state) => state.meetings.groups);
    const user = useSelector((state) => state.users.currentUser);
    const meeter = useSelector((state) => state.system);
    const [modalDeleteConfirmVisible, setModalDeleteConfirmVisible] =
        useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [group, setGroup] = useState();
    const [isLocationValid, setIsLocationValid] = useState(
        group?.location?.length > 2 ? true : false
    );
    const [isTitleValid, setIsTitleValid] = useState(
        group?.title?.length > 2 ? true : false
    );
    const [values, setValues] = useState({
        meetingId: group?.meetingId ? group.meetingId : meetingId,
        groupId: group?.groupId ? group.groupId : '0',
        gender: group?.gender ? group.gender : 'x',
        title: group?.title ? group.title : '',
        attendance: group?.attendance ? parseInt(group.attendance) : 0,
        location: group?.location ? group.location : '',
        facilitator: group?.facilitator ? group.facilitator : '',
        cofacilitator: group?.cofacilitator ? group.cofacilitator : '',
        notes: group?.notes ? group.notes : '',
    });
    const uns = useNavigationState((state) => state);
    useEffect(() => {
        setIsLoading(true);
        if (groupId !== '0') {
            let grp = [];
            groups.forEach((g) => {
                if (g.groupId === groupId) {
                    grp.push(g);
                }
            });
            printObject('grp value', grp);
            setValues(grp[0]);
            setGroup(grp[0]);
            if (grp[0].title.length < 3) {
                setIsTitleValid(false);
            } else {
                setIsTitleValid(true);
            }
            if (grp[0].location.length < 3) {
                setIsLocationValid(false);
            } else {
                setIsLocationValid(true);
            }
        }
        setIsLoading(false);
    }, []);

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
        setValues((curInputValues) => {
            return {
                ...curInputValues,
                gender: enteredValue,
            };
        });
    }
    function inputChangedHandler(inputIdentifier, enteredValue) {
        setValues((curInputValues) => {
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
        if (values.groupId === '0') {
            dispatch(addGroupValues(values));
            navigation.goBack();
            // navigation.navigate('MeetingDetails', {
            //     meetingId: values.meetingId,
            // });
        } else {
            dispatch(updateGroupValues(values));
            navigation.goBack();
            // navigation.navigate('MeetingDetails', {
            //     meetingId: values.meetingId,
            // });
        }
    };
    const inputStyle = {
        paddingLeft: 0,
        fontSize: 24,
        fontWeight: '800',
        color: 'black',
        marginHorizontal: 10,
    };
    const handleDeleteConfirmClick = () => {
        setIsLoading(true);
        setTimeout(function () {
            setModalDeleteConfirmVisible(false);
            dispatch(deleteIndividualGroup(values.groupId));

            console.log('handleDeleteConfirmClick complete.');
            navigation.navigate('MeetingDetails', {
                meetingId: meetingId,
            });
            // navigation.goBack();
            // navigation.dispatch(
            //     StackActions.push('AuthenticatedDrawer', {
            //         screen: 'Meetings',
            //     })
            // );
        }, 10);
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
                <ActivityIndicator color={'blue'} size={80} />
            </View>
        );
    }
    return (
        <>
            <Modal visible={modalDeleteConfirmVisible} animationStyle='slide'>
                <Surface
                    style={[
                        mtrTheme.meetingEditDeleteModalSurface,
                        { height: height * 0.8 },
                    ]}
                >
                    <View>
                        <Text style={mtrTheme.meetingEditDeleteModalTitle}>
                            Confirm Your Delete Request
                        </Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: 'grey',
                            minWidth: width * 0.5,
                            borderRadius: 10,
                            padding: 10,
                            marginVertical: 20,
                        }}
                    >
                        <View
                            style={
                                mtrTheme.meetingEditDeleteModalMeetingContainer
                            }
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {values.gender === 'f' ? (
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.meetingEditDeleteModalMeetingText
                                            }
                                        >
                                            Women's{' '}
                                        </Text>
                                    </View>
                                ) : null}
                                {values.gender === 'm' ? (
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.meetingEditDeleteModalMeetingText
                                            }
                                        >
                                            Men's{' '}
                                        </Text>
                                    </View>
                                ) : null}
                                <View>
                                    <Text
                                        style={
                                            mtrTheme.meetingEditDeleteModalMeetingText
                                        }
                                    >
                                        {values.title}
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text
                                    style={
                                        mtrTheme.meetingEditDeleteModalMeetingText
                                    }
                                >
                                    Location:{' '}
                                </Text>

                                <Text
                                    style={
                                        mtrTheme.meetingEditDeleteModalMeetingText
                                    }
                                >
                                    {values.location}
                                </Text>
                            </View>
                            {values.facilitator && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={
                                            mtrTheme.meetingEditDeleteModalMeetingText
                                        }
                                    >
                                        Facilitator:{' '}
                                    </Text>
                                    <Text
                                        style={
                                            mtrTheme.meetingEditDeleteModalMeetingText
                                        }
                                    >
                                        {values.facilitator}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View
                        style={mtrTheme.meetingEditDeleteModalButtonContainer}
                    >
                        <View style={{ width: width * 0.35, marginRight: 20 }}>
                            <CustomButton
                                text='No, cancel'
                                onPress={() =>
                                    setModalDeleteConfirmVisible(false)
                                }
                            />
                        </View>
                        <View style={{ width: width * 0.35, marginLeft: 20 }}>
                            <CustomButton
                                text='Yes, DELETE'
                                bgColor='red'
                                fgColor='black'
                                onPress={() => handleDeleteConfirmClick()}
                            />
                        </View>
                    </View>
                </Surface>
            </Modal>
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
                            backgroundColor: isTitleValid
                                ? 'lightgrey'
                                : mtrTheme.colors.errorTextBox,
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
                    <View style={mtrTheme.groupEditInputErrorContainer}>
                        <Text style={mtrTheme.groupEditInputErrorText}>
                            REQUIRED: minimum length = 3
                        </Text>
                    </View>
                )}
                <View style={mtrTheme.groupEditRowBasic}>
                    <Input
                        label='Location'
                        labelStyle={mtrTheme.groupFormInputTitle}
                        textInputConfig={{
                            backgroundColor: isLocationValid
                                ? 'lightgrey'
                                : mtrTheme.colors.errorTextBox,
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
                    <View style={mtrTheme.groupEditInputErrorContainer}>
                        <Text style={mtrTheme.groupEditInputErrorText}>
                            REQUIRED: minimum length = 3
                        </Text>
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
                        enabled={isTitleValid && isLocationValid}
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
