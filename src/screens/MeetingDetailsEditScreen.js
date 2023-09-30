import React, { useState, useLayoutEffect } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName || 'Meeter',
            headerBackTitle: 'Cancel',
        });
    }, [navigation, meeter]);

    const handleUpdate = (values) => {
        setIsLoading(true);
        dispatch(updateMeeting(values));
        setIsLoading(false);
        navigate.goBack();
    };

    if (isLoading) {
        return (
            <View style={mtrStyles(mtrTheme).activityIndicatorContainer}>
                <ActivityIndicator
                    color={mtrStyles(mtrTheme).activityIndicator}
                    size={80}
                />
            </View>
        );
    }
    return (
        <>
            <View style={mtrStyles(mtrTheme).container}>
                {id && (
                    <ScrollView>
                        <MeetingForm
                            meetingId={id}
                            handleSubmit={handleUpdate}
                        />
                    </ScrollView>
                )}
            </View>
        </>
    );
};
export default MeetingDetailsEditScreen;

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: mtrTheme.colors.background,
        },
        activityIndicatorContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {
            color: mtrTheme.colors.lightGraphic,
        },
    });
