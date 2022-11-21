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

const DeleteConfirmScreen = ({ route, navigation }) => {
    const mtrTheme = useTheme();
    const meeting = route.params.meeting;
    const { width } = useWindowDimensions();
    const meeter = useSelector((state) => state.system);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
        });
    }, [navigation, meeter]);
    const handleDeleteRequest = () => {
        deleteMeetingGroups(meeting.meetingId)
            .then((result) => {
                //printObject('DCS:35-->RESULT', result);
                if (result.data.status !== '200') {
                    // printObject('DCS:37-->result', result);
                    Alert.alert(
                        'Error deleting groups, please contact support.'
                    );
                    return;
                }
                // console.log('DCS:45-->>YES-YES-YES-YES');
                deleteMeetingFromDDB(meeting.meetingId)
                    .then((res) => {
                        // printObject('DCS:48-->res', res);
                        if (res.data.status !== '200') {
                            // printObject('DCS:42-->res', res);
                            Alert.alert(
                                'Error deleting meeting, please contact support.'
                            );
                            return;
                        }
                        if (dateIsBeforeToday(meeting.meetingDate)) {
                            navigation.navigate('HistoricMeetings');
                        } else {
                            navigation.navigate('ActiveMeetings');
                        }
                        return;
                    })
                    .catch((error) => {
                        printObject('DCS:64-->error', error);
                    });
            })
            .catch((error) => {
                printObject('DCS:68-->error', error);
            });
        return;
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
                                    Your are about to delete the followoing
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
                                    {dateDashMadePretty(meeting.meetingDate)}
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
                                        fgColor='black'
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
