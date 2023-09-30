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
import { useSelector, useDispatch } from 'react-redux';
import {
    useNavigation,
    useIsFocused,
    useNavigationState,
    useFocusEffect,
} from '@react-navigation/native';
import CustomButton from '../components/ui/CustomButton';
import { Badge } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addGroup } from '../features/meetings/meetingsThunks';
import GenderSelectors from '../components/GenderSelectors';
import NumberInput from '../components/ui/NumberInput';
import Input from '../components/ui/Input';
import {
    Surface,
    withTheme,
    useTheme,
    ActivityIndicator,
} from 'react-native-paper';

//   FUNCTION START
//   ================
const GroupNewScreen = ({ route }) => {
    const meeting = route.params.meeting;
    // printObject('GNS:59-->meeting', meeting);
    const meetingId = meeting.id;
    const navigation = useNavigation();
    const userProfile = useSelector((state) => state.user.profile);
    let group = {};
    const mtrTheme = useTheme();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    // const groups = useSelector((state) => state.meetings.groups);
    // const user = useSelector((state) => state.users.profile);
    const meeter = useSelector((state) => state.system);
    const [modalDeleteConfirmVisible, setModalDeleteConfirmVisible] =
        useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const compKey =
        userProfile?.activeOrg.code.toLowerCase() +
        '#' +
        meeting?.meetingDate?.slice(0, 4) +
        '#' +
        meeting?.meetingDate?.slice(5, 7) +
        '#' +
        meeting?.meetingDate?.slice(8, 10) +
        '#' +
        meeting?.id;
    const [values, setValues] = useState({
        meetingId: meetingId,
        id: '0',
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

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName || 'Meeter',
            headerBackTitle: 'Cancel',
        });
    }, [navigation, group]);

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

    const handleFormSubmit = () => {
        // console.log('GNS:159-->handleFormSubmit--->values\n', values);
        // printObject('GNS:160-->route.params.meeting:\n', route.params);
        dispatch(
            addGroup({
                group: values,
                meetingId: meeting.id,
                orgId: userProfile.activeOrg.id,
            })
        );
        // dispatch(saveNewGroup(values));
        // mutation.mutate(values);
        navigation.goBack();
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
        <Surface style={mtrStyles(mtrTheme).surface}>
            <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                <Text style={mtrStyles(mtrTheme).screenTitleText}>
                    NEW GROUP
                </Text>
            </View>
            <View style={mtrStyles(mtrTheme).selectorRow}>
                <GenderSelectors
                    setPick={setGenderValue}
                    pick={values.gender}
                />
            </View>
            <View style={mtrStyles(mtrTheme).attendanceRow}>
                <NumberInput
                    value={values.attendance}
                    numberStyle={{ color: mtrTheme.colors.lightText }}
                    graphicStyle={{ color: mtrTheme.colors.lightText }}
                    onAction={inputChangedHandler.bind(this, 'attendance')}
                />
            </View>
            <View style={mtrStyles(mtrTheme).inputRow}>
                <Input
                    label='Group Title'
                    labelStyle={mtrStyles(mtrTheme).inputLabelText}
                    textInputConfig={{
                        backgroundColor: isTitleValid
                            ? mtrTheme.colors.lightGrey
                            : mtrTheme.colors.errorTextBox,
                        value: values.title,
                        paddingHorizontal: 5,
                        fontSize: 24,
                        color: mtrTheme.colors.darkGraphic,
                        marginHorizontal: 0,
                        placeholder: 'Group Title',
                        style: { color: mtrTheme.colors.darkGraphic },
                        fontWeight: '500',

                        letterSpacing: 0,
                        onChangeText: inputChangedHandler.bind(this, 'title'),
                    }}
                />
            </View>
            {!isTitleValid && (
                <View style={mtrStyles(mtrTheme).inputErrorContainer}>
                    <Text style={mtrStyles(mtrTheme).inputErrorText}>
                        REQUIRED: minimum length = 3
                    </Text>
                </View>
            )}
            <View style={mtrStyles(mtrTheme).inputRow}>
                <Input
                    label='Location'
                    labelStyle={mtrStyles(mtrTheme).inputLabelText}
                    textInputConfig={{
                        backgroundColor: isLocationValid
                            ? mtrTheme.colors.lightGrey
                            : mtrTheme.colors.errorTextBox,
                        paddingHorizontal: 5,
                        value: values.location,
                        fontSize: 24,
                        color: mtrTheme.colors.darkGraphic,
                        capitalize: 'words',
                        marginHorizontal: 0,
                        placeholder: 'where was group?',
                        style: { color: mtrTheme.colors.darkGraphic },

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
            <View style={mtrStyles(mtrTheme).inputRow}>
                <Input
                    label='Facilitator'
                    labelStyle={mtrStyles(mtrTheme).inputLabelText}
                    textInputConfig={{
                        backgroundColor: mtrTheme.colors.lightGrey,
                        paddingHorizontal: 5,
                        fontSize: 24,
                        value: values.facilitator,
                        color: mtrTheme.colors.darkGraphic,
                        capitalize: 'words',
                        marginHorizontal: 0,
                        placeholder: 'who facilitated?',
                        style: { color: mtrTheme.colors.darkGraphic },

                        fontWeight: '500',
                        letterSpacing: 0,
                        onChangeText: inputChangedHandler.bind(
                            this,
                            'facilitator'
                        ),
                    }}
                />
            </View>
            <View style={mtrStyles(mtrTheme).inputRow}>
                <Input
                    label='Co-Faciliatator'
                    labelStyle={mtrStyles(mtrTheme).inputLabelText}
                    textInputConfig={{
                        backgroundColor: mtrTheme.colors.lightGrey,
                        paddingHorizontal: 5,
                        fontSize: 24,
                        value: values.cofacilitator,
                        color: mtrTheme.colors.darkGraphic,
                        width: '100%',
                        capitalize: 'words',
                        marginHorizontal: 0,
                        placeholder: 'who co-facilitated?',
                        style: { color: mtrTheme.colors.darkGraphic },
                        fontWeight: '500',
                        letterSpacing: 0,
                        onChangeText: inputChangedHandler.bind(
                            this,
                            'cofacilitator'
                        ),
                    }}
                />
            </View>
            <View style={mtrStyles(mtrTheme).inputRow}>
                <Input
                    label='Notes'
                    labelStyle={mtrStyles(mtrTheme).inputLabelText}
                    textInputConfig={{
                        backgroundColor: mtrTheme.colors.lightGrey,
                        paddingHorizontal: 10,
                        fontSize: 24,
                        color: mtrTheme.colors.darkGraphic,
                        value: values.notes,
                        capitalize: 'sentence',
                        autoCorrect: true,
                        marginHorizontal: 5,
                        placeholder: '',
                        style: { color: mtrTheme.colors.darkGraphic },
                        fontWeight: '500',
                        letterSpacing: 0,
                        multiline: true,
                        minHeight: 100,
                        onChangeText: inputChangedHandler.bind(this, 'notes'),
                    }}
                />
            </View>

            <View style={mtrStyles(mtrTheme).buttonContainer}>
                <CustomButton
                    text='SAVE'
                    bgColor={mtrTheme.colors.mediumGreen}
                    fgColor={mtrTheme.colors.lightText}
                    type='PRIMARY'
                    enabled={isTitleValid && isLocationValid}
                    onPress={handleFormSubmit}
                />
            </View>
        </Surface>
    );
};
export default GroupNewScreen;
const styles = StyleSheet.create({});
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        surface: { flex: 1 },
        screenTitleContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.accent,
        },
        activityIndicatorContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {
            color: mtrTheme.colors.lightGraphic,
        },
        selectorRow: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: mtrTheme.colors.lightGraphic,
            borderRadius: 5,
            paddingVertical: 5,
            marginTop: 10,
            marginHorizontal: 10,
        },
        attendanceRow: {
            marginVertical: 5,
            marginTop: 15,
            marginBottom: 0,
        },
        inputRow: {
            marginHorizontal: 20,
            marginVertical: 5,
        },
        inputLabelText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
            fontWeight: '500',
            color: 'white',
        },
        inputErrorContainer: {
            marginHorizontal: 30,
        },
        inputErrorText: {
            color: mtrTheme.colors.accent,
            fontFamily: 'Roboto-MediumItalic',
            fontSize: 18,
        },
        buttonContainer: {
            marginTop: 10,
            marginHorizontal: 20,
        },
    });
