import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import {
    View,
    Text,
    Alert,
    Button,
    StyleSheet,
    Modal,
    Image,
} from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { useSelector, useDispatch } from 'react-redux';
import {
    useNavigation,
    useIsFocused,
    useFocusEffect,
    useNavigationState,
} from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import { Badge } from 'react-native-paper';
import {
    Surface,
    withTheme,
    useTheme,
    ActivityIndicator,
} from 'react-native-paper';
import { deleteGroupEntry } from '../features/meetingsSlice';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import MeetingListCard from '../components/Meeting.List.Card';
import { getMeetingGroups, clearGroups } from '../features/meetingsSlice';
import DateBall from '../components/ui/DateBall';
import MeetingCardDate from '../components/ui/Meeting.Card.Date';
import { Style } from 'domelementtype';
const GroupDetailsScreen = ({ route, navigation }) => {
    let routeGroup = route.params.group;
    const meeting = route.params.meeting;
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const user = useSelector((state) => state.users.currentUser);
    const meeter = useSelector((state) => state.system);
    const groups = useSelector((state) => state.meetings.groups);
    const [group, setGroup] = useState({});
    const uns = useNavigationState((state) => state);
    useEffect(() => {
        setIsLoading(true);
        console.log('id:', route.params.group.groupId);
        console.log('groups:', groups.length);

        let grp = [];
        groups.forEach((g) => {
            if (g.groupId === route.params.group.groupId) {
                grp.push(g);
            }
        });
        printObject('grp value', grp);
        setGroup(grp[0]);
        setIsLoading(false);
    }, [groups]);

    useLayoutEffect(() => {
        let headerLabelColor = '';
        if (Platform.OS === 'ios') {
            headerLabelColor = 'white';
        }
        if (meeter.userRole !== 'guest') {
            navigation.setOptions({
                title: meeter.appName,
                headerBackTitle: 'Back',
                headerRight: () => (
                    <Button
                        onPress={() =>
                            navigation.navigate('GroupEdit', {
                                groupId: route.params.group.groupId,
                            })
                        }
                        // color='red'
                        color={headerLabelColor}
                        title='Edit'
                    />
                ),
            });
        }
    }, [navigation, meeter]);
    const handleDeleteClick = () => {
        dispatch(deleteGroupEntry(group.groupId));
        navigation.navigate('MeetingDetails', { meeting, meeting });
    };
    const WAShandleDeleteClick = () => {
        setShowConfirmDelete(true);
    };
    const handleConfirmCancel = () => {
        setShowConfirmDelete(false);
    };
    const handleConfirmDelete = () => {
        setShowConfirmDelete(false);
        dispatch(deleteGroupEntry(group.groupId));
        //     setShowConfirmDelete(false);
        navigation.navigate('MeetingDetails', { meeting, meeting });
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
            <View style={{ flex: 1 }}>
                {/* <Modal visible={showConfirmDelete} animationStyle='slide'> */}
                <Modal visible={showConfirmDelete}>
                    <Surface
                        style={[styles.surfaceContainer, { marginTop: 70 }]}
                    >
                        <View style={styles.titleContainer}>
                            <Text
                                style={[
                                    styles.titleText,
                                    { textAlign: 'center' },
                                ]}
                            >
                                YOU ARE ABOUT TO PERMANENTLY DELETE THIS GROUP.
                            </Text>
                        </View>
                        <View
                            style={{
                                marginVertical: 20,
                                marginHorizontal: 30,
                                borderRadius: 20,

                                backgroundColor: mtrTheme.colors.accent,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 18 }}>
                                {group.gender === 'm'
                                    ? "Men's"
                                    : group.gender === 'f'
                                    ? "Women's"
                                    : ''}{' '}
                                {group.title}
                            </Text>
                            <Text>{group.location}</Text>
                            <Text>{group.facilitator}</Text>
                            <Text>{group.cofacilitator}</Text>
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <CustomButton
                                text='CANCEL DELETE'
                                bgColor='lightgrey'
                                type='CANCEL'
                                fgColor='black'
                                onPress={handleConfirmCancel}
                            />
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <CustomButton
                                text='DELETE GROUP'
                                bgColor='red'
                                fgColor='white'
                                type='DELETE'
                                onPress={handleConfirmDelete}
                            />
                        </View>
                    </Surface>
                </Modal>
                <Surface style={styles.surface}>
                    <View
                        style={{
                            width: '95%',
                            height: '100%',

                            backgroundColor: mtrTheme.backgroundColor,
                        }}
                    >
                        <View
                            style={{
                                margin: 4,
                                // borderWidth: 1,
                                // borderColor: '#FEDB39',
                                width: 'auto',
                                height: 'auto',
                            }}
                        >
                            <View
                                style={{
                                    // margin: 2,
                                    // borderWidth: 1,
                                    // borderColor: '#D61C4E',
                                    width: 'auto',
                                    height: 'auto',
                                    paddingHorizontal: 0,
                                }}
                            >
                                <View>
                                    <Text style={mtrTheme.screenTitle}>
                                        GROUP DETAILS
                                    </Text>
                                </View>
                                <View style={mtrTheme.groupCardTopRow}>
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.groupCardDetailsLabel
                                            }
                                        >
                                            Title:
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.groupCardDetailsData
                                            }
                                        >
                                            {group.gender === 'f' && (
                                                <Text
                                                    style={
                                                        mtrTheme.groupCardDetailsData
                                                    }
                                                >
                                                    Women's {group.title}
                                                </Text>
                                            )}
                                            {group.gender === 'm' && (
                                                <Text
                                                    style={
                                                        mtrTheme.groupCardDetailsData
                                                    }
                                                >
                                                    Men's {group.title}
                                                </Text>
                                            )}
                                            {group.gender === 'x' && (
                                                <Text
                                                    style={
                                                        mtrTheme.groupCardDetailsData
                                                    }
                                                >
                                                    {group.title}
                                                </Text>
                                            )}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginLeft: 'auto',
                                            marginRight: 0,
                                        }}
                                    >
                                        <Badge
                                            size={40}
                                            style={
                                                mtrTheme.groupDetailsAttendanceBadge
                                            }
                                        >
                                            {group.attendance}
                                        </Badge>
                                    </View>
                                </View>
                                <View style={mtrTheme.groupCardRow}>
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.groupCardDetailsLabel
                                            }
                                        >
                                            Location:
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.groupCardDetailsData
                                            }
                                        >
                                            {group.location}
                                        </Text>
                                    </View>
                                </View>
                                <View style={mtrTheme.groupCardRow}>
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.groupCardDetailsLabel
                                            }
                                        >
                                            Faciliator:
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.groupCardDetailsData
                                            }
                                        >
                                            {group.facilitator}
                                        </Text>
                                    </View>
                                </View>
                                <View style={mtrTheme.groupCardRow}>
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.groupCardDetailsLabel
                                            }
                                        >
                                            Co-faciliator:
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.groupCardDetailsData
                                            }
                                        >
                                            {group.cofacilitator}
                                        </Text>
                                    </View>
                                </View>
                                <View style={mtrTheme.groupCardRow}>
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.groupCardDetailsLabel
                                            }
                                        >
                                            Notes:
                                        </Text>
                                    </View>
                                </View>
                                <View style={mtrTheme.groupCardRow}>
                                    <View>
                                        <Text
                                            style={
                                                mtrTheme.groupDetailsNotesText
                                            }
                                        >
                                            {group.notes}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* <View style={styles.buttonContainer}>
                            <CustomButton
                                text='DELETE'
                                bgColor='red'
                                fgColor='white'
                                type='DELETE'
                                onPress={handleDeleteClick}
                            />
                        </View> */}
                    </View>
                </Surface>
            </View>
        </>
    );
};
export default withTheme(GroupDetailsScreen);
const styles = StyleSheet.create({
    surface: {
        flex: 1,
        alignItems: 'center',
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },

    dateWrapper: {
        margin: 5,
    },
    buttonContainer: { marginTop: 20, marginHorizontal: 20 },
    button: {
        backgroundColor: 'blue',
        marginHorizontal: 20,
        marginTop: 20,
    },
    surfaceContainer: {
        marginHorizontal: 10,
        width: '95%',
        marginHorizontal: 10,
        padding: 20,
    },
    titleContainer: {},
    titleText: {
        fontSize: 28,
        fontWeight: '600',
        color: 'white',
    },
});
