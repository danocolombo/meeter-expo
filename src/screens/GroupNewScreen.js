import React, {
    useEffect,
    useState,
    useCallback,
    useLayoutEffect,
} from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    AppState,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { focusManager } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import {
    useNavigation,
    useIsFocused,
    useNavigationState,
    useFocusEffect,
} from '@react-navigation/native';
import { useMutation, queryCache } from '@tanstack/react-query';
import CustomButton from '../components/ui/CustomButton';
import { Badge } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PutGroup } from '../components/common/hooks/groupQueries';
import GenderSelectors from '../components/GenderSelectors';
import NumberInput from '../components/ui/NumberInput';
import Input from '../components/ui/Input';
import {
    Surface,
    withTheme,
    useTheme,
    ActivityIndicator,
} from 'react-native-paper';
import { printObject, isDateDashBeforeToday } from '../utils/helpers';
import MeetingListCard from '../components/Meeting.List.Card';
import {
    updateGroupValues,
    addGroupValues,
    deleteIndividualGroup,
} from '../features/meetingsSlice';
import DateBall from '../components/ui/DateBall';
import MeetingCardDate from '../components/ui/Meeting.Card.Date';
import { Style } from 'domelementtype';
import GroupForm from '../components/GroupForm';
//   FUNCTION START
//   ================
const GroupNewScreen = ({ route, navigation }) => {
    const meeting = route.params.meeting;
    const meetingId = meeting.meetingId;
    let group = {};
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const groups = useSelector((state) => state.meetings.groups);
    const user = useSelector((state) => state.users.currentUser);
    const meeter = useSelector((state) => state.system);
    const [modalDeleteConfirmVisible, setModalDeleteConfirmVisible] =
        useState(false);

    //const [group, setGroup] = useState();
    var data = new Date();
    // printObject('data', data);
    const yr = parseInt(data.getFullYear());
    let mo = parseInt(data.getMonth());
    const da = parseInt(data.getDate());
    const hr = parseInt(data.getHours());
    const mi = parseInt(data.getMinutes());
    //month and day lengths if applicable
    mo = mo + 1;
    const moFix = ('0' + mo.toString()).slice(-2);
    const daFix = ('0' + da.toString()).slice(-2);
    const today = yr.toString() + '-' + moFix + '-' + daFix;
    const compKey =
        meeter.affiliation.toLowerCase() +
        '#' +
        yr.toString() +
        '#' +
        moFix +
        '#' +
        daFix;
    const [values, setValues] = useState({
        meetingId: meetingId,
        groupId: '0',
        gender: 'x',
        title: '',
        attendance: 0,
        location: '',
        grpCompKey: compKey,
        facilitator: '',
        cofacilitator: '',
        notes: '',
    });
    const uns = useNavigationState((state) => state);
    // useEffect(() => {
    //     setIsLoading(true);
    //     if (groupId !== '0') {
    //         let grp = [];
    //         groups.forEach((g) => {
    //             if (g.groupId === groupId) {
    //                 grp.push(g);
    //             }
    //         });
    //         printObject('grp value', grp);
    //         setValues(grp[0]);
    //         setGroup(grp[0]);
    //         if (grp[0].title.length < 3) {
    //             setIsTitleValid(false);
    //         } else {
    //             setIsTitleValid(true);
    //         }
    //         if (grp[0].location.length < 3) {
    //             setIsLocationValid(false);
    //         } else {
    //             setIsLocationValid(true);
    //         }
    //     }
    //     setIsLoading(false);
    // }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Cancel',
        });
    }, [navigation, group]);
    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }

    function setGenderValue(enteredValue) {
        setValues((curInputValues) => {
            let gck = compKey + '#' + enteredValue;
            return {
                ...curInputValues,
                gender: enteredValue,
                grpCompKey: gck,
            };
        });
    }
    function inputChangedHandler(inputIdentifier, enteredValue) {
        setValues((curInputValues) => {
            if (inputIdentifier === 'title') {
                if (enteredValue.length < 3) {
                    setIsTitleValid(false);
                } else {
                    setIsTitleValid(true);
                }
            }
            if (inputIdentifier === 'location') {
                if (enteredValue.length < 3) {
                    setIsLocationValid(false);
                } else {
                    setIsLocationValid(true);
                }
            }
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }
    const mutation = useMutation({
        mutationFn: (values) => {
            return (
                PutGroup(values),
                {
                    onSuccess: (group) => {
                        queryCache.invalidateQueries([
                            'group',
                            meeting.meetingId,
                        ]);
                    },
                }
            );
        },
    });
    const handleFormSubmit = () => {
        //printObject('GNS:173-->values', values);
        mutation.mutate(values);
        navigation.navigate('MeetingDetails', meeting);
    };
    const inputStyle = {
        paddingLeft: 0,
        fontSize: 24,
        fontWeight: '800',
        color: 'black',
        marginHorizontal: 10,
    };

    const [isLocationValid, setIsLocationValid] = useState(
        group?.location?.length > 2 ? true : false
    );
    const [isTitleValid, setIsTitleValid] = useState(
        group?.title?.length > 2 ? true : false
    );

    return (
        <>
            {mutation.isLoading ? (
                'Adding group...'
            ) : (
                <>
                    {mutation.isError ? (
                        <View>
                            <Text>
                                An error occurred: {mutation.error.message}
                            </Text>
                        </View>
                    ) : null}

                    {mutation.isSuccess ? (
                        <View>
                            <Text>Group added!</Text>
                        </View>
                    ) : null}
                    <Surface style={mtrTheme.groupEditSurface}>
                        <View>
                            <Text style={mtrTheme.screenTitle}>NEW GROUP</Text>
                        </View>
                        <View style={mtrTheme.groupEditRow}>
                            <GenderSelectors
                                setPick={setGenderValue}
                                pick={values.gender}
                            />
                        </View>
                        <View
                            style={[
                                mtrTheme.groupEditRowBasic,
                                { marginTop: 15, marginBottom: 0 },
                            ]}
                        >
                            <NumberInput
                                value={values.attendance}
                                numberStyle={{ color: 'white' }}
                                graphicStyle={{ color: 'white' }}
                                onAction={inputChangedHandler.bind(
                                    this,
                                    'attendance'
                                )}
                            />
                        </View>
                        <View style={mtrTheme.groupEditRowBasic}>
                            <Input
                                label='Group Title'
                                labelStyle={mtrTheme.groupFormInputTitle}
                                textInputConfig={{
                                    backgroundColor: isTitleValid
                                        ? 'lightgrey'
                                        : mtrTheme.colors.errorTextBox,
                                    value: values.title,
                                    paddingHorizontal: 5,
                                    fontSize: 24,
                                    color: 'black',
                                    marginHorizontal: 0,
                                    placeholder: 'Group Title',
                                    style: { color: 'black' },
                                    fontWeight: '500',

                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'title'
                                    ),
                                }}
                            />
                        </View>
                        {!isTitleValid && (
                            <View style={mtrTheme.groupEditInputErrorContainer}>
                                <Text style={mtrTheme.groupEditInputErrorText}>
                                    REQUIRED: minimum length = 3
                                </Text>
                            </View>
                        )}
                        <View style={mtrTheme.groupEditRowBasic}>
                            <Input
                                label='Location'
                                labelStyle={mtrTheme.groupFormInputTitle}
                                textInputConfig={{
                                    backgroundColor: isLocationValid
                                        ? 'lightgrey'
                                        : mtrTheme.colors.errorTextBox,
                                    paddingHorizontal: 5,
                                    value: values.location,
                                    fontSize: 24,
                                    color: 'black',
                                    capitalize: 'words',
                                    marginHorizontal: 0,
                                    placeholder: 'where was group?',
                                    style: { color: 'black' },

                                    fontWeight: '500',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'location'
                                    ),
                                }}
                            />
                        </View>
                        {!isLocationValid && (
                            <View style={mtrTheme.groupEditInputErrorContainer}>
                                <Text style={mtrTheme.groupEditInputErrorText}>
                                    REQUIRED: minimum length = 3
                                </Text>
                            </View>
                        )}
                        <View style={mtrTheme.groupEditRowBasic}>
                            <Input
                                label='Faciliatator'
                                labelStyle={mtrTheme.groupFormInputTitle}
                                textInputConfig={{
                                    backgroundColor: 'lightgrey',
                                    paddingHorizontal: 5,
                                    fontSize: 24,
                                    value: values.facilitator,
                                    color: 'black',
                                    capitalize: 'words',
                                    marginHorizontal: 0,
                                    placeholder: 'who facilitated?',
                                    style: { color: 'black' },

                                    fontWeight: '500',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'facilitator'
                                    ),
                                }}
                            />
                        </View>
                        <View style={mtrTheme.groupEditRowBasic}>
                            <Input
                                label='Co-Faciliatator'
                                labelStyle={mtrTheme.groupFormInputTitle}
                                textInputConfig={{
                                    backgroundColor: 'lightgrey',
                                    paddingHorizontal: 5,
                                    fontSize: 24,
                                    value: values.cofacilitator,
                                    color: 'black',
                                    width: '100%',
                                    capitalize: 'words',
                                    marginHorizontal: 0,
                                    placeholder: 'who co-facilitated?',
                                    style: { color: 'black' },
                                    fontWeight: '500',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'cofacilitator'
                                    ),
                                }}
                            />
                        </View>
                        <View style={mtrTheme.groupEditRowBasic}>
                            <Input
                                label='Notes'
                                labelStyle={mtrTheme.groupFormInputTitle}
                                textInputConfig={{
                                    backgroundColor: 'lightgrey',
                                    paddingHorizontal: 10,
                                    fontSize: 24,
                                    color: 'black',
                                    value: values.notes,
                                    capitalize: 'sentence',
                                    autoCorrect: true,
                                    marginHorizontal: 5,
                                    placeholder: '',
                                    style: { color: 'black' },
                                    fontWeight: '500',
                                    letterSpacing: 0,
                                    multiline: true,
                                    minHeight: 100,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'notes'
                                    ),
                                }}
                            />
                        </View>

                        <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                            <CustomButton
                                text='SAVE'
                                bgColor={mtrTheme.colors.success}
                                fgColor='white'
                                type='PRIMARY'
                                enabled={isTitleValid && isLocationValid}
                                onPress={handleFormSubmit}
                            />
                        </View>
                    </Surface>
                </>
            )}
            {/* </ScrollView> */}
        </>
    );
};
export default withTheme(GroupNewScreen);
const styles = StyleSheet.create({});
