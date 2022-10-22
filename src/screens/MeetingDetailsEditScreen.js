import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    Platform,
    Button,
    Alert,
    Modal,
} from 'react-native';
import MeetingForm from '../components/MeetingForm';
import Input from '../components/ui/Input';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
// import * as Application from 'expo-application';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CurrencyInput from 'react-native-currency-input';
import { FontAwesome5 } from '@expo/vector-icons';
import {
    useNavigation,
    useIsFocused,
    StackActions,
} from '@react-navigation/native';
import {
    getMeetingGroups,
    clearGroups,
    updateMeetingValues,
    deleteMeeting,
} from '../features/meetingsSlice';
import GroupList from '../components/GroupList';
import NumberInput from '../components/ui/NumberInput';
import DateBall from '../components/ui/DateBall';
import DateStack from '../components/ui/DateStack';
import CustomButton from '../components/ui/CustomButton';
import {
    Surface,
    withTheme,
    useTheme,
    Badge,
    ActivityIndicator,
} from 'react-native-paper';
import {
    printObject,
    isDateDashBeforeToday,
    todayMinus60,
} from '../utils/helpers';
import GroupListCard from '../components/Group.List.Card';
import MeetingListCard from '../components/Meeting.List.Card';
import TypeSelectors from '../components/TypeSelectors';
import { DrawerContentScrollView } from '@react-navigation/drawer';
//import MeetingDeleteModal from '../components/MeetingDeleteModal';
const MeetingDetailsEditScreen = ({ route, navigation }) => {
    const meeting = route.params.meeting;
    const mtrTheme = useTheme();
    //const navigation = useNavigation();
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const meeter = useSelector((state) => state.system);
    const groups = useSelector((state) => state.meetings.groups);
    const [modalDeleteConfirmVisible, setModalDeleteConfirmVisible] =
        useState(false);
    const historic = isDateDashBeforeToday(meeting.meetingDate);
    const [isLoading, setIsLoading] = useState(false);
    const gender = {
        f: "Women's",
        m: "Men's",
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
            headerRight: () => (
                <Button
                    onPress={() => setModalDeleteConfirmVisible(true)}
                    color='white'
                    title='DELETE'
                />
            ),
        });
    }, [navigation, meeter]);
    const handleUpdate = (values) => {
        console.log('handleUpdate received.');
        dispatch(updateMeetingValues(values));
        navigation.navigate('MeetingDetails', {
            meeting: values,
        });
    };

    const handleDeleteConfirmClick = () => {
        setIsLoading(true);
        setTimeout(function () {
            setIsLoading(false);
            setModalDeleteConfirmVisible(false);
            let deleteGroups = [];
            if (groups.length > 0) {
                groups.map((g) => {
                    deleteGroups.push(g.groupId);
                });
            }
            // console.log('meetingId:', meeting.meetingId);
            // console.log('deleteGroups:', deleteGroups);
            let deleteRequest = dispatch(
                deleteMeeting(meeting.meetingId, deleteGroups)
            );
            printObject('deleteRequest', deleteRequest);
            console.log('back1');
            navigation.dispatch(
                StackActions.push('AuthenticatedDrawer', {
                    screen: 'Meetings',
                })
            );
        }, 1000);
        // navigation.dispatch(
        //     StackActions.push('AuthenticatedDrawer', {
        //         screen: 'Meetings',
        //     })
        // );
        // navigation.goBack();
    };
    const deleteCancelHandler = () => {
        Alert.alert('new delete cancel');
    };
    const deleteConfirmHandler = () => {
        Alert.alert('new delete confirm');
        setIsLoading(true);
        setTimeout(function () {
            setIsLoading(false);
            navigation.dispatch(
                StackActions.push('AuthenticatedDrawer', {
                    screen: 'Meetings',
                })
            );
        }, 1000);

        // navigation.dispatch(
        //     StackActions.push('AuthenticatedDrawer', {
        //         screen: 'Meetings',
        //     })
        // );
    };
    if (isLoading) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size={75} color='#293462' />
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
                        style={mtrTheme.meetingEditDeleteModalMeetingContainer}
                    >
                        <View>
                            <Text
                                style={
                                    mtrTheme.meetingEditDeleteModalMeetingText
                                }
                            >
                                {meeting.meetingDate}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={
                                    mtrTheme.meetingEditDeleteModalMeetingText
                                }
                            >
                                {meeting.meetingType}
                            </Text>

                            <Text
                                style={
                                    mtrTheme.meetingEditDeleteModalMeetingText
                                }
                            >
                                {meeting.title}
                            </Text>
                        </View>
                    </View>
                    {groups.length > 0 && (
                        <Text style={{ color: 'white' }}>
                            You will also delete the associate groups.
                        </Text>
                    )}
                    {groups.length > 0
                        ? groups.map((g) => {
                              return (
                                  <View>
                                      <Text
                                          style={
                                              mtrTheme.meetingEditDeleteModalMeetingText
                                          }
                                      >
                                          {gender[g.gender]} {g.title}
                                      </Text>
                                  </View>
                              );
                          })
                        : null}

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
            <MeetingForm meeting={meeting} handleUpdate={handleUpdate} />
        </>
    );
};
export default withTheme(MeetingDetailsEditScreen);
const styles = StyleSheet.create({
    surface: {
        flex: 1,
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 10,
    },
    row: {
        flexDirection: 'row',

        marginHorizontal: 60,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    countRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 60,
        marginVertical: 5,
    },

    dateWrapper: {
        margin: 5,
    },
    costLabel: {
        fontSize: 20,
        fontWeight: '600',
    },
    costInput: {
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 6,
        width: 100,
        backgroundColor: 'lightgrey',
        marginHorizontal: 0,
        borderColor: 'lightgrey',
        paddingHorizontal: 12,
        height: 45,
    },
    buttonContainer: { marginTop: 10, marginHorizontal: 20 },
    button: {
        backgroundColor: 'blue',
        marginHorizontal: 20,
        marginTop: 20,
    },
    modalContainer: {
        marginTop: 50,
        // alignSelf: 'flex-end',
    },
    modalSurface: {
        marginTop: 100,
        marginHorizontal: 10,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
