import React, { useEffect, useState, useLayoutEffect, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity,
    useWindowDimensions,
    Platform,
} from 'react-native';
import * as Localization from 'expo-localization';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import DateBall from '../components/ui/DateBall';
import DateStack from '../components/ui/DateStack';
import {
    Surface,
    useTheme,
    Badge,
    ActivityIndicator,
} from 'react-native-paper';
import { printObject, dateDashToDateObject } from '../utils/helpers';
import GroupListCard from '../components/Group.List.Card';
import CustomButton from '../components/ui/CustomButton';
import {
    addDefaultGroups,
    deleteGroupFromMeeting,
} from '../features/meetings/meetingsThunks';

//   FUNCTION START
//   ==============
const MeetingDetails = (props) => {
    const id = props.route.params.id;
    // printObject('MDST:60-->props.route.params :\n', props.route.params);
    const mtrTheme = useTheme();
    const userProfile = useSelector((state) => state.user.profile);
    const [showDefaultsButton, setShowDefaultButton] = useState(true);
    const dispatch = useDispatch();
    const newPerms = useSelector((state) => state.user.perms);
    const [authority, setAuthority] = useState(
        newPerms.includes('manage') || newPerms.includes('groups') || false
    );
    const meeter = useSelector((state) => state.system);

    const defaultGroups = useSelector((state) => state.groups.defaultGroups);
    const navigation = useNavigation();
    let historic = false;
    const userTimeZone = Localization.timezone;
    const [isLoading, setIsLoading] = useState(false);
    const meeting = useSelector((state) =>
        state.meetings.meetings.find((m) => m.id === id)
    );
    const meetingGroups =
        useSelector(
            (state) =>
                state.meetings.meetings.find((m) => m.id === id)?.groups?.items
        ) || [];

    const memoizedMeetingGroups = useMemo(() => meetingGroups, [meetingGroups]);
    // printObject('MDST:91-->defaultGroups:\n', defaultGroups);
    // printObject('MDST:92-->meeting:\n', meeting);
    // Check if the meeting does not exist
    if (!meeting) {
        // If meeting is not found, you can set a flag to indicate that
        // the navigation should occur after rendering is complete.
        const navigateBack = true;

        // Return the loading indicator or null here
        // (no navigation action should be taken within this block)
    }
    const [dateValue, setDateValue] = useState(
        meeting?.meetingDate ? new Date(meeting?.meetingDate) : new Date()
    );
    const { width, height } = useWindowDimensions();
    useEffect(() => {
        if (meeting?.meetingDate) {
            // setDateString(meeting.date);
            let dateObj = dateDashToDateObject(meeting.meetingDate);
            // setMeetingDate(meeting.meetingDate); // Update meetingDate whenever the meeting.meetingDate changes
            setDateValue(dateObj);
        } else {
            // setDateString(new Date().toISOString().substring(0, 10));
            setDateValue(new Date());
        }
    }, [meeting]); // Add meeting dependency to this useEffect to handle changes in the meeting object

    useLayoutEffect(() => {
        let headerLabelColor = '';
        if (Platform.OS === 'ios') {
            headerLabelColor = mtrTheme.colors.lightText;
        }
        // printObject('MDS:87-->userProfile:\n', userProfile);

        if (newPerms.includes('manage') || newPerms.includes('meals')) {
            navigation.setOptions({
                title: meeter.appName || 'Meeter',
                headerBackTitle: 'Back',
                headerRight: () => (
                    <Button
                        onPress={() =>
                            navigation.navigate('MeetingEdit', {
                                id: id,
                                // handleDelete: handleDeleteRequest,
                            })
                        }
                        // color='red'
                        color={mtrTheme.colors.lightText}
                        title='Edit'
                    />
                ),
            });
        } else {
            navigation.setOptions({
                title: meeter.appName || 'Meeter',
                headerBackTitle: 'Back',
            });
        }
    }, [navigation, meeter]);

    async function newGetGroups() {
        try {
            await dispatch(getGroupsForMeeting({ meetingId: id })).then(() => {
                // console.log('DONE getGroups');
            });
        } catch (error) {
            printObject('DGS:142-->error getGroups');
        }
    }
    function handleDeleteRequest(values) {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        const deleteRequest = {
            meetingId: id,
            groupId: values,
        };
        dispatch(deleteGroupFromMeeting(deleteRequest));
        setIsLoading(false);
    }

    const handleAddDefaults = async () => {
        setIsLoading(true);
        dispatch(
            addDefaultGroups({
                meeting: meeting,
                orgId: userProfile.activeOrg.id,
                defaultGroups: defaultGroups,
            })
        );
        setIsLoading(false);
    };
    //if (data) {
    const formattedDate = dateValue?.toLocaleDateString('en-US', {
        timeZone: userTimeZone,
    });

    if (dateValue === null) {
        setDateValue(new Date());
    }
    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator
                    color={mtrTheme.colors.activityIndicator}
                    size={80}
                />
            </View>
        );
    }
    // printObject('MDST:240-->meeting:\n', meeting);
    // printObject('MDST:264-->defaultGroups\n', defaultGroups);
    // printObject('MDST:267-->userProfile:\n', userProfile);
    // printObject('MDST:268-->perms\n', perms);
    // printObject('MDST:270-->newUserProfile\n', newUserProfile);
    // printObject('MDST:272-->newPerms:\n', newPerms);
    // printObject('MDST:273-->authority:', authority);
    if (!meeting) {
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

        // If meeting is not found and isLoading is false, navigate back
        navigation.goBack();
        return null; // Return null to avoid rendering the rest of the component
    }
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
    // printObject('MDST:213-->meetig', meeting);
    return (
        <Surface style={mtrStyles(mtrTheme).surface}>
            <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                <Text style={mtrStyles(mtrTheme).screenTitleText}>
                    {meeting?.meetingType}
                </Text>
            </View>
            <View style={mtrStyles(mtrTheme).firstRow}>
                <View style={mtrStyles(mtrTheme).dateWrapper}>
                    {Platform.OS === 'ios' && (
                        <View style={mtrStyles(mtrTheme).dateContainerIOS}>
                            <DateBall date={formattedDate} />
                        </View>
                    )}
                    {Platform.OS === 'android' && (
                        <View style={mtrStyles(mtrTheme).dateContainerAndroid}>
                            <DateStack date={formattedDate} />
                        </View>
                    )}
                </View>
                <View style={{ flex: 1 }}>
                    <View style={mtrStyles(mtrTheme).row1col2}>
                        {meeting?.meetingType !== 'Testimony' && (
                            <View style={mtrStyles(mtrTheme).textColumn}>
                                <Text style={mtrStyles(mtrTheme).detailsTitle}>
                                    {meeting.title}
                                </Text>
                            </View>
                        )}
                        <View style={mtrStyles(mtrTheme).textColumn}>
                            <Text style={mtrStyles(mtrTheme).subTitle}>
                                {meeting?.meetingType !== 'Testimony'
                                    ? meeting.supportContact
                                    : meeting.title}
                            </Text>
                        </View>
                        {meeting?.worship && (
                            <View style={mtrStyles(mtrTheme).worshipContainer}>
                                <MaterialCommunityIcons
                                    name='music'
                                    size={20}
                                    color='white'
                                />
                                <Text style={mtrStyles(mtrTheme).worshipText}>
                                    {meeting?.worship}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            <View style={mtrStyles(mtrTheme).row}>
                <View style={mtrStyles(mtrTheme).detailsContainer}>
                    <Text style={mtrTheme.detailsRowLabel}>
                        {historic ? 'Meal:' : 'Meal Plans:'}
                    </Text>
                </View>
                <View style={{ marginHorizontal: 2 }}>
                    <Text style={mtrTheme.detailsRowValue}>
                        {meeting.meal === '' ? 'TBD' : meeting.meal}
                    </Text>
                </View>
                {historic && (
                    <View style={mtrStyles(mtrTheme).detailsBadgeContainer}>
                        <Badge
                            size={30}
                            style={mtrStyles(mtrTheme).detailsBadge}
                        >
                            {meeting.mealCount}
                        </Badge>
                    </View>
                )}
            </View>
            {!historic && (
                <View style={mtrStyles(mtrTheme).row}>
                    <View style={mtrStyles(mtrTheme).detailsContainer}>
                        <Text style={mtrTheme.detailsRowLabel}>
                            Meal Contact:
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 2 }}>
                        <Text style={mtrTheme.detailsRowValue}>
                            {meeting.mealContact === ''
                                ? 'TBD'
                                : meeting.mealContact}
                        </Text>
                    </View>
                </View>
            )}
            {historic && (
                <View style={mtrStyles(mtrTheme).row}>
                    <View style={mtrStyles(mtrTheme).detailsContainer}>
                        <Text style={mtrTheme.detailsRowLabel}>
                            Attendance:
                        </Text>
                    </View>

                    <View style={mtrStyles(mtrTheme).detailsBadgeContainer}>
                        <Badge
                            size={30}
                            style={mtrStyles(mtrTheme).detailsBadge}
                        >
                            {meeting.attendanceCount}
                        </Badge>
                    </View>
                </View>
            )}
            {meeting.newcomersCount > 0 && (
                <View style={mtrStyles(mtrTheme).row}>
                    <View style={mtrStyles(mtrTheme).detailsContainer}>
                        <Text style={mtrTheme.detailsRowLabel}>Newcomers:</Text>
                    </View>

                    <View style={mtrStyles(mtrTheme).detailsBadgeContainer}>
                        <Badge
                            size={30}
                            style={mtrStyles(mtrTheme).detailsBadge}
                        >
                            {meeting.newcomersCount}
                        </Badge>
                    </View>
                </View>
            )}
            {meeting.notes && (
                <View style={mtrStyles(mtrTheme).notesContainer}>
                    <Text style={mtrStyles(mtrTheme).notesText}>
                        {meeting.notes}
                    </Text>
                </View>
            )}
            <View style={mtrStyles(mtrTheme).openShareSection}>
                <View style={mtrStyles(mtrTheme).openShareContainer}>
                    <Text style={mtrStyles(mtrTheme).openShareGroupsText}>
                        Open-Share Groups
                    </Text>
                    {(newPerms.includes('manage') ||
                        newPerms.includes('groups')) && (
                        <View
                            style={mtrStyles(mtrTheme).openShareButtonContainer}
                        >
                            <TouchableOpacity
                                key={0}
                                onPress={() =>
                                    navigation.navigate('GroupNew', {
                                        meeting,
                                    })
                                }
                                style={({ pressed }) =>
                                    pressed && mtrStyles(mtrTheme).pressed
                                }
                            >
                                <FontAwesome5
                                    name='plus-circle'
                                    size={20}
                                    color={mtrTheme.colors.lightText}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
            <FlatList
                key={Math.random()} // Add a random key to force re-render
                data={memoizedMeetingGroups}
                keyExtractor={(item) => item.id}
                persistentScrollbar={true}
                renderItem={({ item }) => (
                    <GroupListCard
                        group={item}
                        meeting={meeting}
                        authority={authority}
                        handleDeleteRequest={handleDeleteRequest}
                    />
                )}
                ListHeaderComponent={
                    <View
                        style={
                            mtrStyles(mtrTheme)
                                .openShareGroupsListHeaderContainer
                        }
                    >
                        {memoizedMeetingGroups.length > 0 && (
                            <Text
                                style={
                                    mtrStyles(mtrTheme)
                                        .openShareGroupsListHeaderText
                                }
                            >
                                Scroll to see all groups
                            </Text>
                        )}
                    </View>
                }
                ListFooterComponent={
                    <View
                        style={
                            mtrStyles(mtrTheme)
                                .openShareGroupsListFooterContainer
                        }
                    >
                        {memoizedMeetingGroups.length > 0 && (
                            <Text
                                style={
                                    mtrStyles(mtrTheme)
                                        .openShareGroupsListFooterText
                                }
                            >
                                End of Group List
                            </Text>
                        )}
                    </View>
                }
                showsVerticalScrollIndicator={true}
                indicatorStyle={mtrTheme.colors.lightGraphic}
            />
            {authority && showDefaultsButton && (
                <View style={mtrStyles(mtrTheme).defaultGroupsButtonContainer}>
                    <CustomButton
                        text='Add Default Groups'
                        bgColor={mtrTheme.colors.buttonFillMedium}
                        fgColor={mtrTheme.colors.buttonTextLight}
                        type='STANDARD'
                        onPress={() => handleAddDefaults()}
                    />
                </View>
            )}
        </Surface>
    );
};

// export default withTheme(MeetingDetails);
export default MeetingDetails;

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        surface: {
            flex: 1,
        },
        screenTitleContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.screenTitleTextLight,
        },

        activityIndicatorContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {
            color: mtrTheme.colors.lightGraphic,
        },
        firstRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 0,
            marginHorizontal: 10,
        },
        row1col2: {
            // flex: 1,
            flexDirection: 'column',
            marginLeft: 5,
        },
        textColumn: {
            alignContent: 'flex-start',
        },
        dateWrapper: {
            margin: 5,
        },
        dateContainerIOS: {
            padding: 5,
        },
        dateContainerAndroid: {
            padding: 1,
        },
        detailsContainer: { marginLeft: 20 },
        detailsBadgeContainer: {
            marginLeft: 'auto',
            padding: 10,
        },
        detailsBadge: {
            backgroundColor: mtrTheme.colors.lightGraphic,
            textColor: mtrTheme.colors.darkText,
        },
        detailsTitle: {
            fontSize: 24,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.accent,
        },
        openShareGroupsText: {
            color: mtrTheme.colors.lightText,
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Roboto-Regular',
            textAlign: 'center',
            paddingVertical: 5,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 5,
        },
        subTitle: {
            fontSize: 22,
            fontWeight: '300',
            fontFamily: 'Roboto-Regular',
            color: mtrTheme.colors.accent,
        },
        countLabel: {
            fontFamily: 'Roboto-Regular',
            color: mtrTheme.colors.lightText,
            fontSize: 24,
            fontWeight: '400',
        },
        worshipContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'flex-start',
            paddingVertical: 5,
        },
        worshipText: {
            fontSize: 22,
            marginLeft: 5,
            fontFamily: 'Roboto-Regular',
            color: mtrTheme.colors.accent,
        },
        notesContainer: {
            marginHorizontal: 10,
            marginBottom: 15,
            borderRadius: 5,
            paddingHorizontal: 15,
            backgroundColor: mtrTheme.colors.lightGraphic,
        },
        notesText: {
            color: mtrTheme.colors.darkText,
            fontFamily: 'Roboto-Regular',
            fontSize: 24,
        },
        openShareSection: {
            borderTopColor: mtrTheme.colors.accent,
            borderBottomColor: mtrTheme.colors.accent,
            marginHorizontal: 20,
            marginBottom: 5,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderTopWidth: StyleSheet.hairlineWidth,
        },
        openShareContainer: {
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'center',
        },
        openShareButtonContainer: {
            justifyContent: 'center',
            marginLeft: 10,
        },
        openShareGroupsListHeaderContainer: {
            alignItems: 'center',
            // paddingVertical: 10,
        },
        openShareGroupsListHeaderText: {
            color: mtrTheme.colors.accent,
            fontFamily: 'Roboto-Regular',
        },
        openShareGroupsListFooterContainer: {
            alignItems: 'center',
            // paddingVertical: 10,
        },
        openShareGroupsListFooterText: {
            color: mtrTheme.colors.accent,
            fontFamily: 'Roboto-Regular',
        },
        defaultGroupsButtonContainer: {
            marginHorizontal: 20,
            paddingBottom: 20,
        },
    });
const styles = StyleSheet.create({});
