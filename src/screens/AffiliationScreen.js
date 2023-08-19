import {
    Text,
    View,
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';
import { useTheme, Surface, ActivityIndicator } from 'react-native-paper';
import React, { useCallback, useRef, useState, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../jerichoQL/mutations';
import * as queries from '../jerichoQL/queries';
import { printObject } from '../utils/helpers';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MEETER_DEFAULTS } from '../constants/meeter';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { joinOrganization, errorTest } from '../features/user/userThunks';
const AffiliationScreen = (props) => {
    const navigate = useNavigation();
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    const affCodeInputRef = useRef(null);
    const userProfile = useSelector((state) => state.user.profile);
    const joinOrgError = useSelector((state) => state.user.error);
    const meeter = useSelector((state) => state.system);
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [showDupModal, setShowDupModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [affCode, setAffCode] = useState('');
    const [availableAffiliations, setAvailableAffiliations] = useState([]);
    const [isStateFocus, setIsStateFocus] = useState(false);
    const [isAffiliationFocus, setIsAffiliationFocus] = useState(false);
    const [theMessage, setTheMessage] = useState();
    const [affiliationSelected, setAffiliationSelected] = useState(null);
    const [affCount, setAffCount] = useState(0);

    useLayoutEffect(() => {
        navigate.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Back',
        });
    }, [navigate]);
    useFocusEffect(
        useCallback(() => {
            try {
                const numberOfUniqueCodes = new Set();

                userProfile.affiliations.items.forEach((item) => {
                    numberOfUniqueCodes.add(item.organization.code);
                });
                setAffCount(numberOfUniqueCodes.size);
                async function getAffList() {
                    if (userProfile?.affiliations?.items) {
                        if (userProfile?.affiliations.items.length > 1) {
                            let affList = [];
                            const allAffs = userProfile.affiliations.items;
                            allAffs.forEach((a) => {
                                if (
                                    a.organization.id !=
                                        userProfile.activeOrg.id &&
                                    (a.status === 'active' ||
                                        a.status === 'new')
                                ) {
                                    let entry = {
                                        label: a.organization.name,
                                        value: a.organization.id,
                                    };
                                    affList.push(entry);
                                }
                            });
                            const uniqueAffs = affList.filter(
                                (obj, index, self) =>
                                    index ===
                                    self.findIndex((t) => t.id === obj.id)
                            );
                            setAvailableAffiliations(uniqueAffs);
                        }
                    }
                }
                getAffList();
                affCodeInputRef.current.focus();
            } catch (error) {
                console.log('HM:51-->unexpected error:\n', error);
            }
        }, [])
    );
    const handleCodeChange = (text) => {
        // Regular expression that matches only alphabetical characters
        const regex = /^[a-zA-Z]*$/;
        if (regex.test(text)) {
            setAffCode(text.substr(0, 3).toUpperCase());
        }
    };
    const handleNewCodeClick = () => {
        setIsUpdating(true);
        if (affCode.length !== 3) return;
        setIsUpdating(true);
        //* check if user already has requested access
        const existing = userProfile.affiliations.items.find(
            (a) => a.organization.code.toUpperCase() === affCode.toUpperCase()
        );
        printObject('AS:102A-->userProfile', userProfile);
        printObject('AS:102-->existing: ', existing);
        if (existing) {
            setIsUpdating(false);
            setShowDupModal(true);
            return;
        }
        console.log('AS:103-->calling thunk...');
        dispatch(
            joinOrganization({ userProfile: userProfile, newCode: affCode })
        )
            .then((resultAction) => {
                // printObject('AS:112-->resultAction:\n', resultAction);
                if (joinOrganization.rejected.match(resultAction)) {
                    const errorMessage = resultAction.error.message; // Access the error message
                    let errorMsg = '';
                    switch (errorMessage.slice(0, 2)) {
                        case '01':
                            errorMsg = 'System Error 01: profile required';
                            break;
                        case '02':
                            errorMsg = 'System Error 02: code required';
                            break;
                        case '03':
                            errorMsg = 'You already have access';
                            break;
                        case '04':
                            errorMsg = 'Invalid code submitted';
                        default:
                            errorMsg = errorMessage;
                            break;
                    }

                    console.error(errorMsg);
                } else {
                    printObject(
                        'AS:109-->errorTest complete. Function done:\n',
                        null
                    );
                    navigate.goBack();
                }

                setIsUpdating(false);
                // setShowChangeModal(true);
            })
            .catch((error) => {
                console.error('AS:126-->An unexpected error occurred:', error);
                // Handle any other unexpected errors

                setIsUpdating(false);
            });
    };

    const handleNewCodeClick2 = () => {
        if (affCode.length !== 3) return;
        setIsUpdating(true);
        //* check if user already has requested access
        const existing = userProfile.affiliations.items.find(
            (a) => a.organization.code.toUpperCase() === affCode.toUpperCase()
        );
        if (existing.length > 0) {
            setIsUpdating(false);
            setShowDupModal(true);
        }
        dispatch(
            joinOrganization({ userProfile: userProfile, newCode: affCode })
        ).catch((error) => {
            if (error.message === 'USER_PROFILE_MISSING') {
                console.log('AS:107-->User profile is missing.');
            } else if (error.message === 'NEW_CODE_MISSING') {
                console.log('AS:109-->New code is missing.');
            } else if (error.message === 'NEW_CODE_DUPLICATE') {
                console.log(
                    'AS:111-->You already have affiliation for this new code.'
                );
            } else {
                printObject('AS:113-->dispatch(error):\n', error);
                console.log('AS:114-->An error occurred:', error.message);
            }
        });
        if (joinOrgError) {
            // Display an alert or handle the error message
            console.log('AS:121-->Error:', joinOrgError);
        }
        if (joinOrgError) {
            switch (joinOrgError.slice(0, 6)) {
                case 'UT:297':
                    Alert.alert('you already have affiliation');
                    break;

                default:
                    Alert.alert(joinOrgError);
                    break;
            }
        }
        printObject('AS:134-->joinOrgError:\n', joinOrgError);
        setIsUpdating(false);
        // setShowChangeModal(true);
    };
    const handleSaveClick = () => {
        //* update the users default id
        try {
            const updateInfo = {
                id: userProfile.id,
                organizationDefaultUsersId: affiliationSelected,
            };
            API.graphql({
                query: mutations.updateUser,
                variables: { input: updateInfo },
            })
                .then((results) => {
                    printObject('affiliation changed:\n', results);
                    setShowChangeModal(true);
                })
                .catch((error) => {
                    console.log(error);
                    console.error(error);
                });
        } catch (error) {
            console.log('AS:114-->unexpected error:\n', error);
        }
        setIsUpdating(false);
    };
    function inputChangedHandler(inputIdentifier, enteredValue) {
        // console.log('inputChangeHandler::inputIdentifier:', inputIdentifier);
        if (inputIdentifier === 'affiliate') {
            setAffiliationSelected(enteredValue);
            return;
        }
    }
    function showCurrentAffiliations() {
        let affs = [];
        userProfile.affiliations.items.forEach((a) => {
            affs.push({ [a.organization.code]: a.id });
        });
        printObject('Affiliations\n', affs);
    }
    if (isUpdating) {
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
    printObject('AS:248-->userProfile:\n', userProfile);
    return (
        <>
            <SafeAreaView
                style={mtrStyles(mtrTheme).surface}
                // style={{
                //     backgroundColor: mtrTheme.colors.background,

                //     flex: 1,
                //     paddingVertical: 20,
                // }}
            >
                <ScrollView tyle={mtrStyles(mtrTheme).surface}>
                    <KeyboardAvoidingView behavior='padding'>
                        <Modal visible={showChangeModal} animationStyle='slide'>
                            <Surface style={mtrStyles(mtrTheme).modalContainer}>
                                <View>
                                    <Text
                                        style={mtrStyles(mtrTheme).modalTitle}
                                    >
                                        NOTIFICATION
                                    </Text>
                                </View>
                                <View
                                    style={
                                        mtrStyles(mtrTheme)
                                            .modalMessageContainer
                                    }
                                >
                                    <Text
                                        style={
                                            mtrStyles(mtrTheme).modalMessageText
                                        }
                                    >
                                        The affiliations change has been made.
                                        For the change to take effect, please
                                        logout and log back in to switch
                                        affiliations.
                                    </Text>
                                </View>
                                <View
                                    style={
                                        mtrStyles(mtrTheme).modalButtonContainer
                                    }
                                >
                                    <TouchableOpacity
                                        style={mtrStyles(mtrTheme).modalButton}
                                        onPress={() =>
                                            setShowChangeModal(false)
                                        }
                                    >
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalButtonText
                                            }
                                        >
                                            OK
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Surface>
                        </Modal>
                        <Modal visible={showDupModal} animationStyle='slide'>
                            <Surface style={mtrStyles(mtrTheme).modalContainer}>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={mtrTheme.screenTitle}>
                                        NOTIFICATION
                                    </Text>
                                </View>
                                <View style={mtrStyles(mtrTheme).infoSurface}>
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).introContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme).introText
                                            }
                                        >
                                            You already have affiliation
                                            defined. If you cannot change to
                                            affiliation, please contact the
                                            organization leader to check status.
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={
                                        mtrStyles(mtrTheme).modalButtonContainer
                                    }
                                >
                                    <TouchableOpacity
                                        style={
                                            mtrStyles(mtrTheme)
                                                .modalWarningButton
                                        }
                                        onPress={() => setShowDupModal(false)}
                                    >
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalWarningButtonText
                                            }
                                        >
                                            OK
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Surface>
                        </Modal>
                        <>
                            <View>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={mtrTheme.screenTitle}>
                                        AFFILIATIONS
                                    </Text>
                                </View>
                                <View style={mtrStyles(mtrTheme).infoSurface}>
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).introContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme).introText
                                            }
                                        >
                                            Affiliations are how the system
                                            associates your activity with a
                                            specific organization.{' '}
                                        </Text>
                                    </View>

                                    {userProfile.activeOrg.id ===
                                    MEETER_DEFAULTS.ORGANIZATION_ID ? (
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .introContainer
                                            }
                                        >
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .introText
                                                }
                                            >
                                                This session is currently
                                                associated with the test system.
                                            </Text>
                                        </View>
                                    ) : null}
                                    {affCount > 1 && (
                                        <>
                                            <View
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .introContainer
                                                }
                                            >
                                                <Text
                                                    style={
                                                        mtrStyles(mtrTheme)
                                                            .introText
                                                    }
                                                >
                                                    You have access to other
                                                    affiliations, you can switch
                                                    by selecting in the dropdown
                                                    list, and tap "CHANGE"
                                                </Text>
                                            </View>
                                            <View
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .dropDownContainer
                                                }
                                            >
                                                <View
                                                    style={
                                                        mtrStyles(mtrTheme)
                                                            .dropDownWrapper
                                                    }
                                                >
                                                    <View>
                                                        <Dropdown
                                                            style={[
                                                                mtrStyles(
                                                                    mtrTheme
                                                                ).dropdown,
                                                                isAffiliationFocus && {
                                                                    borderColor:
                                                                        'blue',
                                                                },
                                                            ]}
                                                            placeholderStyle={
                                                                mtrStyles(
                                                                    mtrTheme
                                                                )
                                                                    .placeholderStyle
                                                            }
                                                            selectedTextStyle={
                                                                mtrStyles(
                                                                    mtrTheme
                                                                )
                                                                    .selectedTextStyle
                                                            }
                                                            inputSearchStyle={
                                                                mtrStyles(
                                                                    mtrTheme
                                                                )
                                                                    .inputSearchStyle
                                                            }
                                                            containerStyle={
                                                                mtrStyles(
                                                                    mtrTheme
                                                                )
                                                                    .dropDownContainer
                                                            }
                                                            itemContainerStyle={{
                                                                paddingVertical: 0,
                                                                marginVertical: 0,
                                                            }}
                                                            iconStyle={
                                                                mtrStyles(
                                                                    mtrTheme
                                                                ).iconStyle
                                                            }
                                                            data={
                                                                availableAffiliations
                                                            }
                                                            search={false}
                                                            maxHeight={300}
                                                            labelField='label'
                                                            placeholder='available affiliations'
                                                            valueField='value'
                                                            // placeholder={!isShirtFocus ? 'Shirt' : '...'}
                                                            //searchPlaceholder='Search...'
                                                            value={
                                                                affiliationSelected
                                                            }
                                                            onFocus={() =>
                                                                setIsAffiliationFocus(
                                                                    true
                                                                )
                                                            }
                                                            onBlur={() =>
                                                                setIsAffiliationFocus(
                                                                    false
                                                                )
                                                            }
                                                            onChange={(
                                                                item
                                                            ) => {
                                                                inputChangedHandler(
                                                                    'affiliate',
                                                                    item.value
                                                                ),
                                                                    //setStateValue(item.value);
                                                                    setIsAffiliationFocus(
                                                                        false
                                                                    );
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </>
                                    )}

                                    {affiliationSelected && (
                                        <View>
                                            <View
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .changeButtonContainer
                                                }
                                            >
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        handleSaveClick()
                                                    }
                                                    style={
                                                        mtrStyles(mtrTheme)
                                                            .changeButton
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            mtrStyles(mtrTheme)
                                                                .changeButtonText
                                                        }
                                                    >
                                                        CHANGE
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).introContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme).introText
                                            }
                                        >
                                            If you have been invited to join an
                                            organization, enter the code you
                                            were provided below and send
                                            request.
                                        </Text>
                                    </View>
                                    <View style={mtrTheme.profileFormRowStyle}>
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .buttonWrapper
                                            }
                                        >
                                            <View
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .affInputContainer
                                                }
                                            >
                                                <TextInput
                                                    ref={affCodeInputRef} // Set the ref here
                                                    minWidth={80}
                                                    backgroundColor={
                                                        mtrTheme.colors
                                                            .mediumGraphic
                                                    }
                                                    value={affCode}
                                                    style={
                                                        mtrStyles(mtrTheme)
                                                            .affCodeInputText
                                                    }
                                                    onChangeText={
                                                        handleCodeChange
                                                    }
                                                    keyboardType='default'
                                                    maxLength={3}
                                                />
                                            </View>

                                            <TouchableOpacity
                                                onPress={handleNewCodeClick}
                                                style={[
                                                    mtrStyles(mtrTheme)
                                                        .changeButton,
                                                    {
                                                        opacity:
                                                            affCode.length === 3
                                                                ? 1
                                                                : 0.5,
                                                    }, // Set opacity based on condition
                                                ]}
                                                disabled={affCode.length !== 3} // Disable the button based on condition
                                            >
                                                <Text
                                                    style={
                                                        mtrStyles(mtrTheme)
                                                            .changeButtonText
                                                    }
                                                >
                                                    REQUEST
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={mtrStyles(mtrTheme).infoRow}>
                                        <TouchableOpacity
                                            onPress={showCurrentAffiliations}
                                            // Disable the button based on condition
                                        >
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme).infoText
                                                }
                                            >
                                                INFO ({affCount})
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Use a light status bar on iOS to account for the black space above the modal */}
                                <StatusBar
                                    style={
                                        Platform.OS === 'ios' ? 'light' : 'auto'
                                    }
                                />
                            </View>
                        </>
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        surface: {
            flex: 1,
            backgroundColor: mtrTheme.colors.background,
            justifyContent: 'center',
            alignItems: 'center',
        },
        infoSurface: {
            backgroundColor: mtrTheme.colors.lightGraphic,
            // width: '90%',
            marginHorizontal: 20,
            marginTop: 20,
            paddingBottom: 20,
            borderRadius: 10,
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        modalTitle: {
            fontSize: 28,
            color: mtrTheme.colors.darkText,
            fontFamily: 'Roboto-Bold',
            textAlign: 'center',
        },
        modalMessageContainer: {
            marginVertical: 20,
            marginHorizontal: 15,
        },
        modalMessageText: {
            color: 'white',
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
            textAlign: 'center',
        },
        modalButtonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
        },
        modalButton: {
            backgroundColor: mtrTheme.colors.lightBlue,
            borderRadius: 5,
        },
        modalButtonText: {
            fontSize: 16,
            color: mtrTheme.colors.darkText,
            fontFamily: 'Roboto-Regular',
            textAlign: 'center',
            paddingHorizontal: 30,
            paddingVertical: 5,
        },
        modalWarningButton: {
            backgroundColor: mtrTheme.colors.warning,
            borderRadius: 5,
        },
        modalWarningButtonText: {
            fontSize: 16,
            color: mtrTheme.colors.darkText,
            fontFamily: 'Roboto-Regular',
            textAlign: 'center',
            paddingHorizontal: 30,
            paddingVertical: 5,
        },
        body: {
            color: 'white',
        },
        introContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingVertical: 10,
        },
        introText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 20,
            color: mtrTheme.colors.darkText,
            paddingVertical: 5,
            textAlign: 'center',
        },

        dropDownContainer: {
            flexDirection: 'column',
            // borderWidth: 1,
            // borderColor: 'yellow',
            marginLeft: '20%',
        },
        dropDownWrapper: {
            // flexDirection: 'row',
            // backgroundColor: 'lightgrey',
            fontFamily: 'Roboto-Regular',
            fontSize: 20,
            // width: '80%',
            justifyContent: 'center',
        },
        dropdown: {
            height: 40,
            borderColor: 'gray',
            color: 'black',
            fontWeight: 500,
            fontSize: 30,
            backgroundColor: 'lightgrey',
            marginVertical: 1,
            minWidth: '80%',
            maxWidth: '80%',
            borderWidth: 0.5,
            borderRadius: 1,
            // paddingHorizontal: 2,
            paddingVertical: 0,
        },
        placeholderStyle: {
            backgroundColor: 'lightgrey',
            color: 'black',
            fontFamily: 'Roboto-Regular',
            fontSize: 20,
            paddingLeft: 10,
            paddingVertical: 5,
        },
        selectedTextStyle: {
            // backgroundColor: 'lightgrey',
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
            color: mtrTheme.colors.darkText,
            paddingLeft: 10,
            paddingVertical: 5,
        },
        inputSearchStyle: {},
        affCodeInputText: {
            color: mtrTheme.colors.darkText,
            textAlign: 'center',
            backgroundColor: mtrTheme.colors.lightGraphic,
            borderColor: mtrTheme.colors.mediumGrey,
            borderWidth: 1,
            borderRadius: 5,
            padding: 5,
            textTransform: 'uppercase',
        },
        affInputContainer: {
            paddingVertical: 5,
        },
        textInputContainer: {
            borderColor: 'white',
            backgroundColor: mtrTheme.colors.mediumGraphic,
            borderWidth: 1,
            justifyContent: 'center',
            marginRight: 10,
        },
        changeButtonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
        },
        buttonWrapper: {
            flexDirection: 'column',

            alignItems: 'center',
            justifyContent: 'space-around',
        },
        changeButton: {
            backgroundColor: mtrTheme.colors.success,
            borderRadius: 5,
            marginHorizontal: 3,
            marginTop: 10,
        },
        changeButtonText: {
            fontSize: 14,
            color: mtrTheme.colors.lightText,
            fontFamily: 'Roboto-Regular',
            textAlign: 'center',
            paddingHorizontal: 20,
            paddingVertical: 5,
        },
        infoRow: {
            marginLeft: 'auto',
            marginRight: 10,
        },
        infoText: {
            color: mtrTheme.colors.mediumText,
        },
    });
export default AffiliationScreen;
