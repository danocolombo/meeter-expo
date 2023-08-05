import React, { useLayoutEffect } from 'react';
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
import MeetingForm from '../components/MeetingFormRTK';
import { useSelector, useDispatch } from 'react-redux';
import { focusManager } from '@tanstack/react-query';
// import { deleteGroupList, deleteMtg } from '../features/meetingsSlice';
import {
    updateMeeting,
    deleteMeeting,
} from '../features/meetings/meetingsThunks';
import CustomButton from '../components/ui/CustomButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
    Surface,
    withTheme,
    useTheme,
    ActivityIndicator,
} from 'react-native-paper';
import { printObject, dateNumToDateDash } from '../utils/helpers';
import { deleteGroupFromDDB } from '../providers/groups';
import { isDateDashBeforeToday } from '../utils/helpers';

//    FUNCTION START
//    ===============
const MeetingDetailsEditScreen = ({ route, navigation }) => {
    // const showModal = useRef(false);
    const { id, handleDelete } = route.params;
    // printObject('MDES:52-->route.params:\n', route.params);
    // console.log('MDES:56-->meetingId:', meetingId);
    const dispatch = useDispatch();
    const meeter = useSelector((state) => state.system);
    const mtrTheme = useTheme();
    const navigate = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
        });
    }, [navigation, meeter]);

    const handleUpdate = (values) => {
        printObject('MDES:81-->values:\n', values);
        dispatch(updateMeeting(values));
        navigate.goBack();
    };
    const handleDeleteRequest = (values) => {
        printObject('MDES:54-->handleDelete(values):\n', values);
        dispatch(deleteMeeting(values));
        // navigate('Meetings');
        // dispatch(deleteMeeting(meeting))
        //     .then(() => {
        //         navigation.navigate('Meetings');
        //     })
        //     .catch((error) => {
        //         console.error('Error deleting meeting:', error);
        //     });
        // navigation.goBack();
    };

    let meeting = {};

    return (
        <>
            <View
                style={{ flex: 1, backgroundColor: mtrTheme.colors.background }}
            >
                <View>
                    <Text style={{ backgroundColor: mtrTheme.colors.accent }}>
                        MeetingDetailsEditScreen
                    </Text>
                </View>
                {id && (
                    <ScrollView>
                        <MeetingForm
                            meetingId={id}
                            handleSubmit={handleUpdate}
                            handleDelete={handleDeleteRequest}
                        />
                    </ScrollView>
                )}
            </View>
        </>
    );
};
export default withTheme(MeetingDetailsEditScreen);

const styles = (mtrTheme) =>
    StyleSheet.create({
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
