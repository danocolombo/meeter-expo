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
import { deleteGroupFromDDB, deleteMeetingGroups } from '../providers/groups';
import { deleteMeetingFromDDB } from '../providers/meetings';
import {
    printObject,
    dateDashMadePretty,
    dateIsBeforeToday,
} from '../utils/helpers';

const DeleteGroupConfirmScreen = ({ route, navigation }) => {
    const mtrTheme = useTheme();
    const group = route.params.group;
    const meeting = route.params.meeting;
    const meeter = useSelector((state) => state.system);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
        });
    }, [navigation, meeter]);
    const handleDeleteRequest = () => {
        deleteGroupFromDDB(group.groupId)
            .then((result) => {
                if (result.status !== 200) {
                    Alert.alert(
                        'Error deleting groups, please contact support.'
                    );
                    return;
                }
                navigation.navigate('MeetingDetails', meeting);
                return;
            })
            .catch((e) => {
                console.log(
                    'deleteGroupFromDDB. Unexpected error',
                    JSON.stringify(e)
                );
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
                                    group.
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
                                        paddingTop: 20,
                                        fontSize: 20,
                                        fontFamily: 'Roboto-Medium',
                                        textAlign: 'center',
                                    }}
                                >
                                    {group.gender === 'f' ? (
                                        <Text>Women's</Text>
                                    ) : group.gender === 'm' ? (
                                        <Text>Men's</Text>
                                    ) : null}{' '}
                                    {group.title}
                                </Text>
                                {group.location && (
                                    <Text
                                        style={{
                                            paddingTop: 0,
                                            fontSize: 20,
                                            fontFamily: 'Roboto-Medium',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Location:
                                        {group.location}
                                    </Text>
                                )}
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
export default DeleteGroupConfirmScreen;
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
