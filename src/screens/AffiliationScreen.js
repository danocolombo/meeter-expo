import {
    Text,
    View,
    StyleSheet,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { useTheme, Surface, ActivityIndicator } from 'react-native-paper';
import React, { useCallback, useState, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dropdown } from 'react-native-element-dropdown';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../jerichoQL/mutations';
import * as queries from '../jerichoQL/queries';
import { printObject } from '../utils/helpers';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MEETER_DEFAULTS } from '../constants/meeter';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const AffiliationScreen = (props) => {
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const userProfile = useSelector((state) => state.user.profile);
    const meeter = useSelector((state) => state.system);
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [affCode, setAffCode] = useState('');
    const [availableAffiliations, setAvailableAffiliations] = useState([]);
    const [isStateFocus, setIsStateFocus] = useState(false);
    const [isAffiliationFocus, setIsAffiliationFocus] = useState(false);
    const [theMessage, setTheMessage] = useState();
    const [affiliationSelected, setAffiliationSelected] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
            headerBackTitle: 'Back',
        });
    }, [navigation]);
    useFocusEffect(
        useCallback(() => {
            try {
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
        if (affCode.length !== 3) return;
        setIsUpdating(true);
        //todo - check the code
        let org = {};
        let theCode = 'WBC';
        try {
            async function getTheOrg() {
                const orgResponse = await API.graphql(
                    graphqlOperation(queries.listOrganizations, {
                        filter: { code: { eq: affCode.toLowerCase() } },
                    })
                );
                if (orgResponse.data.listOrganizations.items.length > 0) {
                    console.log('YES');
                    org = orgResponse.data.listOrganizations.items[0];
                    //todo - add as userProfile default org
                    const updateInfo = {
                        id: userProfile.id,
                        organizationDefaultUsersId: org.id,
                    };
                    try {
                        const updatedUser = await API.graphql({
                            query: mutations.updateUser,
                            variables: { input: updateInfo },
                        });
                        printObject('AS:115-->updatedUser:', updatedUser);
                    } catch (error) {
                        printObject('unexpected error updating user:', error);
                    }
                    //todo - if valid add affiliation
                    try {
                        const insertInfo = {
                            organizationAffiliationsId: org.id,
                            role: 'new',
                            status: 'active',
                            userAffiliationsId: userProfile.id,
                        };
                        API.graphql({
                            query: mutations.createAffiliation,
                            variables: { input: insertInfo },
                        })
                            .then((results) => {
                                console.log('affiliation inserted');
                                printObject('AS:135-->results:\n', results);
                            })
                            .catch((error) => {
                                console.log(error);
                                console.error(error);
                            });
                    } catch (error) {
                        console.log('a.p:142-->unexpected error:\n', error);
                    }

                    printObject('AS:103-->org', org);
                }
            }
            getTheOrg();
        } catch (error) {}

        //todo - display Modal
        setIsUpdating(false);
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
                        <>
                            <View>
                                <Text style={{ color: 'white' }}>
                                    Affiliation Screen
                                </Text>
                            </View>
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
                                                You need to provide an
                                                affiliation code to get started.
                                                You can use MTR to view a
                                                sample.
                                            </Text>
                                        </View>
                                    ) : (
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
                                                    If you have access to other
                                                    affiliates, you can switch
                                                    to them by selecting them in
                                                    the dropdown list, and tap
                                                    "CHANGE"
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
                                            If you have been invited to join a
                                            team, enter the code you were
                                            provided below and get connected.
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
                                                onPress={() =>
                                                    handleNewCodeClick()
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
                                                    REQUEST
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
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
            color: mtrTheme.colors.mediumText,
            fontFamily: 'Roboto-Bold',
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
            color: mtrTheme.colors.lightText,
            textAlign: 'center',
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
            backgroundColor: mtrTheme.colors.lightBlue,
            borderRadius: 5,
            marginHorizontal: 3,
        },
        changeButtonText: {
            fontSize: 14,
            color: mtrTheme.colors.lightText,
            fontFamily: 'Roboto-Regular',
            textAlign: 'center',
            paddingHorizontal: 20,
            paddingVertical: 5,
        },
    });
export default AffiliationScreen;
