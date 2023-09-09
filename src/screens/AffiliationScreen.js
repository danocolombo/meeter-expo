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
import React, {
    useCallback,
    useRef,
    useState,
    useLayoutEffect,
    useEffect,
} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../jerichoQL/mutations';
import * as queries from '../jerichoQL/queries';
import { printObject } from '../utils/helpers';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MEETER_DEFAULTS } from '../constants/meeter';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
    joinOrganization,
    saveUserProfile,
    updatePermissions,
    changeDefaultOrg,
    errorTest,
} from '../features/user/userThunks';
import { clearAllMembers, clearTeamSlice } from '../features/team/teamSlice';
import { clearGroupSlice } from '../features/groups/groupsSlice';
import { clearMeetingsSlice } from '../features/meetings/meetingsSlice';
import { unsubscribeFromMeetingCreation } from '../features/meetings/meetingsSubscriptions';
const AffiliationScreen = (props) => {
    const navigate = useNavigation();
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    const affCodeInputRef = useRef(null);
    const userProfile = useSelector((state) => state.user.profile);
    const [perms, setPerms] = useState(null);
    const joinOrgError = useSelector((state) => state.user.error);
    const meeter = useSelector((state) => state.system);
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [showDupModal, setShowDupModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [affCode, setAffCode] = useState('');
    const [availableAffiliations, setAvailableAffiliations] = useState([]);
    const [pendingAffs, setPendingAffs] = useState([]);
    const [activeAffs, setActiveAffs] = useState([]);
    //* dropdown variables
    const [ddOpen, setDDOpen] = useState(false);
    const [ddValue, setDDValue] = useState(null);
    const [ddValues, setDDValues] = useState([]);
    const [showDefaultChangedDialog, setShowDefaultChangedDialog] =
        useState(false);
    const [affiliationOpen, setAffiliationOpen] = useState(false);
    const [affiliationValue, setAffiliationValue] = useState(null);
    const [aff, setAff] = useState([]);
    const [logout, setLogout] = useState(false);
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
                // let numberOfUniqueCodes = new Set();

                // userProfile.affiliations.items.forEach((item) => {
                //     const organizationCode = item.organization.code;
                //     console.log('Adding organization code:', organizationCode);
                //     numberOfUniqueCodes.add(organizationCode);
                // });
                // const uniqueOrganizationCodes = [...numberOfUniqueCodes];
                // console.log('Unique organization codes:', numberOfUniqueCodes);
                // printObject(
                //     'AF:75-->uniqueOrganizationCodes:\n',
                //     uniqueOrganizationCodes
                // );

                // setAffCount(uniqueOrganizationCodes.length);
                async function getAffList() {
                    if (userProfile?.affiliations?.items) {
                        if (userProfile?.affiliations.items.length > 1) {
                            let affList = [];
                            const allAffs = userProfile.affiliations.items;
                            //* find any pending affiliations
                            const pendingAffiliations = allAffs.filter(
                                (entry) => {
                                    if (entry.status === 'pending') {
                                        return entry;
                                    }
                                }
                            );
                            if (pendingAffiliations.length > 0) {
                                setPendingAffs(pendingAffiliations);
                            }
                            //* find active affiliations, make options
                            //* array of objects to display in dropdown
                            //* [ {label: "Name of Org", value: "org-id"}]
                            // printObject('AS:91-->allAffs:\n', allAffs);
                            const activeAffiliations = allAffs.filter(
                                (entry) => {
                                    if (entry.status === 'active') {
                                        return {
                                            label: entry.organization.name,
                                            value: entry.organization.id,
                                        };
                                    }
                                }
                            );

                            //* Create a map to group affiliations by organization id

                            const uniqueValuesMap = new Map();
                            const summary = activeAffiliations.reduce(
                                (result, entry) => {
                                    if (
                                        !uniqueValuesMap.has(
                                            entry.organization.code
                                        )
                                    ) {
                                        // Check for uniqueness based on organization code
                                        uniqueValuesMap.set(
                                            entry.organization.code,
                                            true
                                        );
                                        result.push({
                                            label: entry.organization.name, // You can use name as label
                                            value: entry.organization.id, // You can use id as value
                                        });
                                    }
                                    return result;
                                },
                                []
                            );
                            //* Sort the summary array by organization label
                            summary.sort((a, b) =>
                                a.label.localeCompare(b.label)
                            );
                            //* now remove the current active org
                            const targetValue = userProfile.activeOrg.id;
                            const filteredSummary = summary.filter(
                                (entry) => entry.value !== targetValue
                            );
                            setActiveAffs(filteredSummary);
                            setDDValues(filteredSummary);
                            // setAff(filteredSummary);
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
    const onAffiliationOpen = useCallback(() => {
        setAffiliationOpen(false);
    }, []);
    const handleSaveChange = () => {
        console.log('ddValue:', ddValue);
        dispatch
            .changeDefaultOrg({ profile: userProfile, orgId: ddValue })
            .then((changeResults) => {});
    };
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
        // printObject('AS:102A-->userProfile', userProfile);
        // printObject('AS:102-->existing: ', existing);
        if (existing) {
            setIsUpdating(false);
            setShowDupModal(true);
            return;
        }
        // console.log('AS:103-->calling thunk...');
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
                            errorMsg = 'Unrecognized code';
                            break;
                        default:
                            console.log('default');
                            console.log(errorMessage.slice(0, 2));
                            errorMsg = errorMessage;
                            break;
                    }

                    console.error(errorMsg);
                } else {
                    // printObject(
                    //     'AS:149-->AffiliactionScreen::handleNewCode not rejected\n',
                    //     null
                    // );
                    console.error('Request submitted.');
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
    const onDDOpen = useCallback(() => {
        // do whatever you want when it opens, maybe close other things?
    }, []);
    const onChange = useCallback(() => {
        // do whatever you want when it changes, maybe close other things?
        setDDOpen(false);
    }, []);

    function showCurrentAffiliations() {
        let affs = [];
        userProfile.affiliations.items.forEach((a) => {
            affs.push({ [a.organization.code]: a.id });
        });
        printObject('Affiliations\n', affs);
    }
    const handleSaveDefaultOrg = async () => {
        //* -----------------------------------------
        //* user has selected a new default org. save
        //* profile and have them logout.
        //* -----------------------------------------
        dispatch(
            changeDefaultOrg({ profile: userProfile, orgId: ddValue })
        ).then((changeResults) => {
            //      changeDefaultOrg complete
            setShowChangeModal(true);
        });
    };
    const handleSaveChangeActive = async () => {
        //* -----------------------------------------
        //* user has selected a new org to switch to
        //* -----------------------------------------
        //      get the affiliation value of the guest
        //      for the org picked
        // printObject('AS:340-->userProfile:\n', userProfile);
        const desiredObject = userProfile.affiliations.items.find((item) => {
            return (
                item.role === 'guest' &&
                item.status === 'active' &&
                item.organization.id === ddValue
            );
        });
        // printObject('AS:347-->desiredObject:\n', desiredObject);
        const updatedUserProfile = {
            ...userProfile,
            activeOrg: desiredObject,
        };
        // printObject('AS:350-->updatedUserProfile:\n', updatedUserProfile);
        dispatch(saveUserProfile(updatedUserProfile)).then((profileResults) => {
            //* --------------------------------
            //* userProfile is changed, now clear
            //* the slices
            //* --------------------------------
            // dispatch(unsubscribeFromMeetingCreation());
            // printObject('AS:371-->profileResults:\n', profileResults);
            const newProfile = profileResults?.payload?.userProfile;
            dispatch(
                updatePermissions({
                    affiliations: newProfile.affiliations.items,
                    orgId: ddValue,
                })
            ).then((updatePermsResults) => {
                // printObject(
                //     'AS:377-->updatePermsResults:\n',
                //     updatePermsResults
                // );
                //dispatch(clearTeamSlice());
                //dispatch(clearGroupSlice());
                //dispatch(clearMeetingsSlice());
                console.error('Organization Changed');
            });
        });
    };
    const goToLogoutScreen = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Logout' }],
        });
    };
    const handleOrgChangeLogout = () => {
        setLogout(true);
        setShowChangeModal(false);
        //now go logout
    };
    useEffect(() => {
        if (logout) {
            goToLogoutScreen();
        }
    }, [logout]);
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
    // printObject('AS:248-->userProfile:\n', userProfile);
    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <>
                        <KeyboardAvoidingView behavior='padding'>
                            <Modal
                                visible={showChangeModal}
                                animationStyle='slide'
                            >
                                <Surface
                                    style={
                                        mtrStyles(mtrTheme)
                                            .modalConfirmationContainer
                                    }
                                >
                                    <View
                                        style={
                                            mtrStyles(mtrTheme)
                                                .screenTitleContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .screenTitleText
                                            }
                                        >
                                            CONFIRMATION
                                        </Text>
                                    </View>
                                    <View
                                        style={
                                            mtrStyles(mtrTheme)
                                                .confirmationSurface
                                        }
                                    >
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .confirmationContainer
                                            }
                                        >
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .confirmationText
                                                }
                                            >
                                                The affiliation change has been
                                                made.
                                            </Text>
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .confirmationText
                                                }
                                            >
                                                You will now be logged out and
                                                when you log in again you will
                                                be in that organization.
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalButtonContainer
                                            }
                                        >
                                            <TouchableOpacity
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .modalButton
                                                }
                                                onPress={() =>
                                                    handleOrgChangeLogout()
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
                                    </View>
                                </Surface>
                            </Modal>
                            <Modal
                                visible={showDupModal}
                                animationStyle='slide'
                            >
                                <Surface
                                    style={mtrStyles(mtrTheme).modalContainer}
                                >
                                    <View style={{ marginTop: 30 }}>
                                        <Text style={mtrTheme.screenTitle}>
                                            NOTIFICATION
                                        </Text>
                                    </View>
                                    <View
                                        style={mtrStyles(mtrTheme).infoSurface}
                                    >
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
                                                You already have affiliation
                                                requested. If you cannot change
                                                to affiliation, please contact
                                                the organization leader to check
                                                status.
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalButtonContainer
                                            }
                                        >
                                            <TouchableOpacity
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .modalWarningButton
                                                }
                                                onPress={() =>
                                                    setShowDupModal(false)
                                                }
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
                                    </View>
                                </Surface>
                            </Modal>
                            <>
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
                                    {pendingAffs?.length > 0 && (
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .pendingContainer
                                            }
                                        >
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .pendingHeaderText
                                                }
                                            >
                                                Pending Requests
                                            </Text>
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .pendingText
                                                }
                                            >
                                                The following organizations have
                                                been requested. Please check
                                                with organization leader for
                                                status.
                                            </Text>
                                            {pendingAffs.map((org) => (
                                                <Text
                                                    key={org.organization.id}
                                                    style={
                                                        mtrStyles(mtrTheme)
                                                            .pendingOrgText
                                                    }
                                                >
                                                    {org?.organization?.name}
                                                </Text>
                                            ))}
                                        </View>
                                    )}

                                    {userProfile?.activeOrg?.id ===
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
                                    {activeAffs?.length > 0 && (
                                        <>
                                            <View
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .changeAffContainer
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

                                                <View
                                                    style={
                                                        mtrStyles(mtrTheme)
                                                            .dropDownContainer
                                                    }
                                                >
                                                    <View
                                                        style={{
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                            zIndex: 3000,
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                marginHorizontal: 10,
                                                                width: '70%',
                                                                marginVertical: 5,
                                                                zIndex: 3000,
                                                            }}
                                                        >
                                                            <DropDownPicker
                                                                style={{
                                                                    borderColor:
                                                                        '#B7B7B7',
                                                                    height: 50,
                                                                    backgroundColor:
                                                                        'white',
                                                                }}
                                                                open={ddOpen}
                                                                value={ddValue} //genderValue
                                                                items={ddValues}
                                                                setOpen={
                                                                    setDDOpen
                                                                }
                                                                setValue={
                                                                    setDDValue
                                                                }
                                                                setItems={
                                                                    setDDValues
                                                                }
                                                                placeholder='Select Organization'
                                                                placeholderStyle={{
                                                                    borderColor:
                                                                        '#B7B7B7',
                                                                    color: 'blue',
                                                                }}
                                                                onOpen={
                                                                    onDDOpen
                                                                }
                                                                // onChangeValue={onChange}
                                                                zIndex={3000}
                                                                zIndexInverse={
                                                                    1000
                                                                }
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                                {ddValue && (
                                                    <View
                                                        style={{
                                                            zIndex: 200,
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <TouchableOpacity
                                                            onPress={
                                                                handleSaveDefaultOrg
                                                            }
                                                            style={[
                                                                mtrStyles(
                                                                    mtrTheme
                                                                ).saveButton,
                                                            ]}
                                                        >
                                                            <Text
                                                                style={
                                                                    mtrStyles(
                                                                        mtrTheme
                                                                    )
                                                                        .changeButtonText
                                                                }
                                                            >
                                                                Save Change
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
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
                            </>
                        </KeyboardAvoidingView>
                    </>
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
        screenTitleContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 10,
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.lightText,
        },
        infoSurface: {
            // flex: 1,
            flexDirection: 'column',
            marginVertical: 10,
            maxWidth: '90%',
            backgroundColor: mtrTheme.colors.lightGraphic,
            // width: '90%',
            // marginHorizontal: 20,
            // marginTop: 20,
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
            color: mtrTheme.colors.lightText,
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
        modalConfirmationContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        confirmationSurface: {
            backgroundColor: 'white',
            borderRadius: 10,
            marginHorizontal: 20,
            marginVertical: 5,
            paddingBottom: 10,
        },
        confirmationContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingVertical: 10,
            zIndex: 1000,
        },
        confirmationText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 20,
            color: mtrTheme.colors.darkText,
            paddingVertical: 5,
            textAlign: 'center',
        },
        introContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingVertical: 10,
            zIndex: 1000,
        },
        changeAffContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingVertical: 10,
            zIndex: 3000,
        },
        introText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 20,
            color: mtrTheme.colors.darkText,
            paddingVertical: 5,
            textAlign: 'center',
        },
        pendingContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingVertical: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            backgroundColor: mtrTheme.colors.accent,
        },
        pendingHeaderText: {
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
        },
        pendingText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 16,
            color: mtrTheme.colors.darkText,
            paddingVertical: 5,
            textAlign: 'center',
        },
        pendingOrgText: {
            fontFamily: 'Roboto-BoldItalic',
            fontSize: 16,
            color: mtrTheme.colors.darkText,
            paddingVertical: 5,
            textAlign: 'center',
        },
        activeContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingVertical: 10,
        },
        activeText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 20,
            color: mtrTheme.colors.darkText,
            paddingVertical: 5,
            textAlign: 'center',
        },

        dropDownContainer: {
            // flex: 1,
            // flexDirection: 'row',
            borderWidth: 1,
            alignItems: 'center',
            // borderColor: 'black',
            backgroundColor: mtrTheme.colors.lightGraphic,
            // marginLeft: '20%',
            zIndex: 3000,
        },
        dropdownPicker: {
            borderColor: '#B7B7B7',
            height: 50,
            // width: '100%',
        },
        // dropDownWrapper: {
        //     // flexDirection: 'row',
        //     // backgroundColor: 'lightgrey',
        //     fontFamily: 'Roboto-Regular',
        //     fontSize: 20,
        //     // width: '80%',
        //     justifyContent: 'center',
        // },

        // dropdownWas: {
        //     height: 40,
        //     borderColor: 'gray',
        //     color: 'black',
        //     fontWeight: 500,
        //     fontSize: 30,
        //     backgroundColor: 'lightgrey',
        //     marginVertical: 1,
        //     minWidth: '80%',
        //     maxWidth: '80%',
        //     borderWidth: 0.5,
        //     borderRadius: 1,
        //     // paddingHorizontal: 2,
        //     paddingVertical: 0,
        // },

        // placeholderStyles: {
        //     color: 'grey',
        // },
        // dropdownAffiliation: {
        //     marginHorizontal: 10,
        //     width: '50%',
        //     marginBottom: 15,
        // },
        // dropdownPlaceholderStyles: {
        //     color: 'grey',
        // },

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
        saveButtonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        saveButton: {
            backgroundColor: mtrTheme.colors.mediumGreen,
            borderRadius: 5,
            marginHorizontal: 3,
            marginTop: 10,
            maxWidth: 150,
        },
        changeButton: {
            backgroundColor: mtrTheme.colors.mediumGreen,
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
