import { useState, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Image,
    View,
    Text,
    Pressable,
    Alert,
    useWindowDimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Surface, useTheme } from 'react-native-paper';
import CustomButton from '../components/ui/CustomButton';
import { deleteMeetingGroups } from '../providers/groups';
import { deleteMeetingFromDDB } from '../providers/meetings';
import {
    printObject,
    dateDashMadePretty,
    dateIsBeforeToday,
} from '../utils/helpers';
import { deleteMeeting } from '../features/meetings/meetingsThunks';
const DeleteConfirmScreen = ({ route, navigation }) => {
    printObject('DCS:24-->params:\n', route.params);
    const meeting = useSelector((state) =>
        state.meetings.meetings.find((m) => m.id === route?.params?.id)
    );
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    const id = route?.params?.id;
    printObject('DCS:28-->params:\n', route.params);
    const { width } = useWindowDimensions();
    const meeter = useSelector((state) => state.system);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
        });
    }, [navigation, meeter]);
    const handleDeleteRequest = () => {
        if (!meeting) {
            // Handle the case where the meeting object is not found
            console.error('Meeting not found.');
            return;
        }
        dispatch(deleteMeeting(meeting))
            .then(() => {
                navigation.navigate('Meetings');
            })
            .catch((error) => {
                console.error('Error deleting meeting:', error);
            });
    };

    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>PLEASE CONFIRM</Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    <Surface
                        style={{
                            backgroundColor: 'white',
                            width: '90%',
                            height: 300,
                            borderRadius: 10,
                        }}
                    >
                        <View style={{ padding: 20 }}>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        textAlign: 'center',
                                    }}
                                >
                                    Your are about to delete the following
                                    meeting.
                                </Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        fontFamily: 'Roboto-Bold',
                                        textAlign: 'center',
                                    }}
                                >
                                    {dateDashMadePretty(meeting?.meetingDate)}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontFamily: 'Roboto-Medium',
                                        textAlign: 'center',
                                    }}
                                >
                                    {meeting.meetingType}: {meeting.title}
                                </Text>
                                <Text
                                    style={{
                                        paddingTop: 20,
                                        fontSize: 16,
                                        fontFamily: 'Roboto-Bold',

                                        color: mtrTheme.colors.critical,
                                        textAlign: 'center',
                                    }}
                                >
                                    NOTE: ALL GROUPS FOR THE MEETING WILL BE
                                    DELETED AS WELL.
                                </Text>

                                <View
                                    style={{
                                        marginVertical: 20,
                                    }}
                                >
                                    <CustomButton
                                        text='Yes, DELETE'
                                        bgColor='red'
                                        fgColor='white'
                                        onPress={() => handleDeleteRequest()}
                                    />
                                </View>
                            </View>
                        </View>
                    </Surface>
                </View>
                <StatusBar style='auto' />
            </Surface>
        </>
    );
};
export default DeleteConfirmScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        paddingTop: 58,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
});
