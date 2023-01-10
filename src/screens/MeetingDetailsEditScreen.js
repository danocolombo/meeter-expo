import React, {
    useEffect,
    useState,
    useLayoutEffect,
    useCallback,
    useRef,
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
    Button,
    AppState,
    Modal,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import MeetingForm from '../components/MeetingForm';
import { useSelector, useDispatch } from 'react-redux';
import { focusManager } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import {
    updateMeeting,
    deleteGroupList,
    deleteMtg,
} from '../features/meetingsSlice';
import CustomButton from '../components/ui/CustomButton';
import { useFocusEffect } from '@react-navigation/native';
import {
    Surface,
    withTheme,
    useTheme,
    ActivityIndicator,
} from 'react-native-paper';
import { printObject, dateNumToDateDash } from '../utils/helpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { updateMeetingDDB } from '../providers/meetings';
//import { DeleteMeeting } from '../components/common/hooks/meetingQueries';
import { FetchMeeting } from '../components/common/hooks/meetingQueries';
import { deleteMeetingFromDDB } from '../providers/meetings';
import { deleteGroupFromDDB } from '../providers/groups';
import { isDateDashBeforeToday } from '../utils/helpers';

//    FUNCTION START
//    ===============
const MeetingDetailsEditScreen = ({ route, navigation }) => {
    // const showModal = useRef(false);
    const meetingId = route.params.meetingId;
    // console.log('MDES:56-->meetingId:', meetingId);
    const mtrTheme = useTheme();
    //const navigation = useNavigation();
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const meeter = useSelector((state) => state.system);
    const groups = useSelector((state) => state.meetings.groups);
    const meetings = useSelector((state) => state.meetings.meetings);
    //const [meeting, setMeeting] = useState();
    const [modalDeleteConfirmVisible, setModalDeleteConfirmVisible] =
        useState(false);
    // const historic = isDateDashBeforeToday(meeting.meetingDate);
    const [isLoading, setIsLoading] = useState(false);
    const gender = {
        f: "Women's",
        m: "Men's",
    };
    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }
    useFocusEffect(
        useCallback(() => {
            const subscription = AppState.addEventListener(
                'change',
                onAppStateChange
            );
            MEETING.refetch();
            printObject('MDES:79-->REFETCH', null);

            return () => subscription.remove();
        }, [])
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
        });
    }, [navigation, meeter]);

    const handleUpdate = (values) => {
        updateMeetingDDB(values)
            .then((res) => {
                printObject('updateMeetingDDB res:', res);
                dispatch(updateMeeting(res));
                // console.log('dispatch(updateMeeting) returned');
                navigation.navigate('MeetingDetails', {
                    meetingId: meetingId,
                });
                return;
            })
            .catch((err) => {
                printObject('updateMeeting provider failed:', err);
                console.warn('updateMeeting provider failed');

                return;
            });
    };

    const handleDeleteConfirmClick = () => {
        //setIsLoading(true);
        setModalDeleteConfirmVisible(false);
        let noGroupsIssue = true;
        let deleteGroups = [];
        if (groups.length > 0) {
            groups.map((g) => {
                deleteGroups.push(g.groupId);
            });
            console.log('MDES:120-->BEFORE dispatch(deleteGroupList)');
            //   NEED TO LOOP AND DELETE EACH GROUP
            deleteGroups.forEach((dg) => {
                deleteGroupFromDDB(dg)
                    .then((res) => {
                        console.log('Group ' + dg + ' deleted');
                    })
                    .catch((error) => {
                        console.log('deleteGroupFromDDB failure:', error);
                        noGroupsIssue = false;
                    });
            });

            noGroupsIssue = dispatch(deleteGroupList(deleteGroups));
            console.log('MDES:122-->AFTER dispatch(deleteGroupList)');
        }
        console.log('MDES:125-->AFTER GROUPS');
        if (noGroupsIssue) {
            console.log('MDES:153-->noGroupsIssue is true');
            deleteMeetingFromDDB(meetingId)
                .then((res) => {
                    setModalDeleteConfirmVisible(false);
                    printObject('deleteMeetingDDB success');
                    //dispatch(updateMeeting(res));
                    // console.log('dispatch(updateMeeting) returned');
                    navigation.navigate('MeetingDetails', {
                        meetingId: meetingId,
                    });
                    return;
                })
                .catch((err) => {
                    setModalDeleteConfirmVisible(false);
                    printObject('updateMeeting provider failed:', err);
                    console.warn('updateMeeting provider failed');

                    return;
                });
            setModalDeleteConfirmVisible(false);
            if (isDateDashBeforeToday(meeting.meetingDate)) {
                navigation.navigate('HistoricMeetings');
            } else {
                navigation.navigate('ActiveMeetings');
            }
            return;
        } else {
            console.log('MDES:177-->problems deleting groups');
            console.warn('Errors deleting groups/meeting');
        }
        return;
    };
    const MEETING = useQuery(
        ['meeting', meetingId],
        () => FetchMeeting(meetingId),
        {
            refetchInterval: 60000,
            cacheTime: 2000,
            enabled: true,
        }
    );

    let meeting = {};
    if (MEETING.data) {
        meeting = MEETING.data.body;
    }
    if (MEETING.isLoading) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator
                    size={75}
                    color={mtrTheme.colors.activityIndicator}
                />
            </View>
        );
    }
    if (MEETING.isError) {
        console.error('MEETING ERROR:', MEETING.error);
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
                                {meeting?.meetingDate}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={
                                    mtrTheme.meetingEditDeleteModalMeetingText
                                }
                            >
                                {meeting?.meetingType}
                            </Text>

                            <Text
                                style={
                                    mtrTheme.meetingEditDeleteModalMeetingText
                                }
                            >
                                {meeting?.title}
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
                                  <View key={g.groupId}>
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
                                onPress={() => flipModal(false)}
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
            {meeting?.meetingId && (
                <ScrollView>
                    <KeyboardAvoidingView
                        behavior='padding'
                        style={{ flex: 1 }}
                    >
                        <MeetingForm
                            meeting={meeting}
                            handleUpdate={handleUpdate}
                            // handleDeleteRequest={() =>
                            //     setModalDeleteConfirmVisible(true)
                            // }
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            )}
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
