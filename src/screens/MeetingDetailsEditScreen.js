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
    Button,
    AppState,
    Modal,
} from 'react-native';
import MeetingForm from '../components/MeetingForm';
import { useSelector, useDispatch } from 'react-redux';
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
import { useMutation } from '@tanstack/react-query';
import { updateMeetingDDB } from '../providers/meetings';
import { DeleteMeeting } from '../components/common/hooks/meetingQueries';
import { FetchMeeting } from '../components/common/hooks/meetingQueries';
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

            return () => subscription.remove();
        }, [])
    );
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

    const mutation = useMutation({
        mutationFn: (meetingId) => {
            return (
                DeleteMeeting(meetingId),
                {
                    onSuccess: () => {
                        queryCache.invalidateQueries(['meetings', meetingId]);
                    },
                    enabled: true,
                }
            );
        },
    });
    const handleDeleteConfirmClick = () => {
        setIsLoading(true);
        setModalDeleteConfirmVisible(false);
        let noGroupsIssue = true;
        let deleteGroups = [];
        if (groups.length > 0) {
            groups.map((g) => {
                deleteGroups.push(g.groupId);
            });
            console.log('MDES:120-->BEFORE dispatch(deleteGroupList)');
            noGroupsIssue = dispatch(deleteGroupList(deleteGroups));
            console.log('MDES:122-->AFTER dispatch(deleteGroupList)');
        }
        console.log('MDES:125-->AFTER GROUPS');
        if (noGroupsIssue) {
            console.log('MDES:127-->noGroupsIssue is true');
            let deleteRequest = mutation.mutate(meeting.meetingId);
            if (deleteRequest) {
                console.log('MDES:129-->deleteMtg true');
            } else {
                console.log('MDES:131-->deleteMtg false');
            }
        } else {
            console.log('MDES:134-->noGroupsIssue is false');
        }

        if (isDateDashBeforeToday(meeting.meetingDate)) {
            navigation.navigate('HistoricMeeings');
        } else {
            navigation.navigate('ActiveMeetings');
        }
        setIsLoading(false);
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
    const flipModal = (v) => {
        if (v) {
            showModal = true;
        } else {
            showModal = false;
        }
    };
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
                <ActivityIndicator size={75} color='#293462' />
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
                                onPress={() => flipModal(true)}
                            />
                        </View>
                    </View>
                </Surface>
            </Modal>
            {meeting?.meetingId && (
                <MeetingForm
                    meeting={meeting}
                    handleUpdate={handleUpdate}
                    handleDeleteRequest={() =>
                        setModalDeleteConfirmVisible(true)
                    }
                />
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
