import React, {
    useEffect,
    useState,
    useCallback,
    useLayoutEffect,
} from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    Alert,
    AppState,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { useSelector, useDispatch } from 'react-redux';
import { focusManager } from '@tanstack/react-query';
import {
    useNavigation,
    useIsFocused,
    useNavigationState,
    useFocusEffect,
} from '@react-navigation/native';

import CustomButton from '../components/ui/CustomButton';

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
import { updateGroup } from '../features/meetings/meetingsThunks';
//   FUNCTION START
//   ================
const GroupDetailsEditScreen = ({ route, navigation }) => {
    const group = route.params.group;
    const meeting = route.params.meeting;
    //let group = {};
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const groups = useSelector((state) => state.meetings.groups);
    const user = useSelector((state) => state.user.profile);
    const meeter = useSelector((state) => state.system);
    const [modalDeleteConfirmVisible, setModalDeleteConfirmVisible] =
        useState(false);

    //const [group, setGroup] = useState();

    const uns = useNavigationState((state) => state);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
        });
    }, [navigation, group]);
    // function onAppStateChange(status) {
    //     if (Platform.OS !== 'web') {
    //         focusManager.setFocused(status === 'active');
    //     }
    // }

    const handleUpdate = (values) => {
        const valueRequest = {
            group: values,
            orgId: user.activeOrg.id,
        };
        dispatch(updateGroup(valueRequest));
        // navigation.goBack();
        // updateGroup(values).then((results) => {
        //     console.log('GDES:88-->done updating Group:', results);
        //     navigation.goBack();
        // });
        // upsertGroupToDDB(values)
        //     .then((response) => {
        //         // printObject('GDES:87-->response:', response);
        //         if (response.status === 200) {
        //             // GOOD TO GO, GO BACK TO MEETING DETAILS
        //             navigation.navigate('MeetingDetails', meeting);
        //         } else {
        //             Alert.alert('Error handling your request');
        //             return;
        //         }
        //     })
        //     .catch((e) => {
        //         console.log('upsertGroupToDDB unexpected error:', e);
        //     });
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
        // setTimeout(function () {
        //     setModalDeleteConfirmVisible(false);
        //     dispatch(deleteIndividualGroup(values.groupId));

        //     console.log('handleDeleteConfirmClick complete.');
        //     navigation.navigate('MeetingDetails', {
        //         meetingId: meeting.meetingId,
        //     });
        //     // navigation.goBack();
        //     // navigation.dispatch(
        //     //     StackActions.push('AuthenticatedDrawer', {
        //     //         screen: 'Meetings',
        //     //     })
        //     // );
        // }, 10);
    };

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
                                {group.gender === 'f' ? (
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
                                {group.gender === 'm' ? (
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
                                        {group.title}
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
                                    {group.location}
                                </Text>
                            </View>
                            {group.facilitator && (
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
                                        {group.facilitator}
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
            <GroupForm
                group={group}
                meeting={meeting}
                handleUpdate={handleUpdate}
            />
            {/* </ScrollView> */}
        </>
    );
};
export default withTheme(GroupDetailsEditScreen);
const styles = StyleSheet.create({});
