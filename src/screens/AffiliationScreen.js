import {
    Text,
    View,
    StyleSheet,
    Alert,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Modal,
} from 'react-native';
import Picker from '@react-native-picker/picker';
import { useTheme, Surface, ActivityIndicator } from 'react-native-paper';
import React, { useCallback, useState, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Input from '../components/ui/Input';
import { Dropdown } from 'react-native-element-dropdown';
import { API } from 'aws-amplify';
import * as mutations from '../jerichoQL/mutations';
import { useUserContext } from '../contexts/UserContext';
import { printObject } from '../utils/helpers';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const AffiliationScreen = (props) => {
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const { userProfile, updateHeroMessage } = useUserContext();
    // printObject('AFF:34-->userProfile:', userProfile);
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
            //title: meeter.appName,
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
                            printObject('uniqueAffs:\n', uniqueAffs);
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
                style={{
                    backgroundColor: mtrTheme.colors.background,

                    flex: 1,
                    paddingVertical: 20,
                }}
            >
                <KeyboardAvoidingView>
                    <Modal visible={showChangeModal} animationStyle='slide'>
                        <Surface style={styles(mtrTheme).modalContainer}>
                            <View>
                                <Text style={styles(mtrTheme).modalTitle}>
                                    NOTIFICATION
                                </Text>
                            </View>
                            <View
                                style={styles(mtrTheme).modalMessageContainer}
                            >
                                <Text style={styles(mtrTheme).modalMessageText}>
                                    The affiliations change has been made. For
                                    the change to take effect, please logout and
                                    log back in to switch affiliations.
                                </Text>
                            </View>
                            <View style={styles(mtrTheme).modalButtonContainer}>
                                <TouchableOpacity
                                    style={styles(mtrTheme).modalButton}
                                    onPress={() => setShowChangeModal(false)}
                                >
                                    <Text
                                        style={styles(mtrTheme).modalButtonText}
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
                            <View style={styles(mtrTheme).introContainer}>
                                <Text style={styles(mtrTheme).introText}>
                                    Affiliations are how the system associates
                                    your activity with a specific organization.{' '}
                                </Text>
                            </View>
                            <View style={styles(mtrTheme).introContainer}>
                                <Text style={styles(mtrTheme).introText}>
                                    If you have access to other affiliates, you
                                    can switch to them by selecting them in the
                                    dropdown list, and tap "CHANGE"
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    // borderWidth: 1,
                                    // borderColor: 'yellow',
                                    marginLeft: '20%',
                                }}
                            >
                                <View
                                    style={styles(mtrTheme).dropDownContainer}
                                >
                                    <View>
                                        <Dropdown
                                            style={[
                                                styles(mtrTheme).dropdown,
                                                isAffiliationFocus && {
                                                    borderColor: 'blue',
                                                },
                                            ]}
                                            placeholderStyle={
                                                styles(mtrTheme)
                                                    .placeholderStyle
                                            }
                                            selectedTextStyle={
                                                styles(mtrTheme)
                                                    .selectedTextStyle
                                            }
                                            inputSearchStyle={
                                                styles(mtrTheme)
                                                    .inputSearchStyle
                                            }
                                            containerStyle={
                                                styles(mtrTheme)
                                                    .dropDownContainer
                                            }
                                            itemContainerStyle={{
                                                paddingVertical: 0,
                                                marginVertical: 0,
                                            }}
                                            iconStyle={
                                                styles(mtrTheme).iconStyle
                                            }
                                            data={availableAffiliations}
                                            search={false}
                                            maxHeight={300}
                                            labelField='label'
                                            placeholder='available affiliations'
                                            valueField='value'
                                            // placeholder={!isShirtFocus ? 'Shirt' : '...'}
                                            //searchPlaceholder='Search...'
                                            value={affiliationSelected}
                                            onFocus={() =>
                                                setIsAffiliationFocus(true)
                                            }
                                            onBlur={() =>
                                                setIsAffiliationFocus(false)
                                            }
                                            onChange={(item) => {
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
                            {affiliationSelected && (
                                <View>
                                    <View
                                        style={
                                            styles(mtrTheme)
                                                .changeButtonContainer
                                        }
                                    >
                                        <TouchableOpacity
                                            onPress={() => handleSaveClick()}
                                            style={
                                                styles(mtrTheme).changeButton
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles(mtrTheme)
                                                        .changeButtonText
                                                }
                                            >
                                                CHANGE
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            <View style={styles(mtrTheme).introContainer}>
                                <Text style={styles(mtrTheme).introText}>
                                    If you have been invited to join a team,
                                    enter the code you were provided below and
                                    you can join.
                                </Text>
                            </View>

                            <View style={mtrTheme.profileFormRowStyle}>
                                <View
                                    style={{
                                        minWidth: '90%',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <View
                                        style={{
                                            borderColor: 'white',
                                            borderWidth: 1,
                                            justifyContent: 'center',
                                            marginRight: 10,
                                        }}
                                    >
                                        <TextInput
                                            minWidth={80}
                                            backgroundColor='lightgrey'
                                            value={affCode}
                                            style={{
                                                textAlign: 'center',
                                                padding: 5,
                                            }}
                                            onChangeText={handleCodeChange}
                                            keyboardType='default'
                                            maxLength={3}
                                        />
                                    </View>

                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('Affiliation')
                                        }
                                        style={styles(mtrTheme).changeButton}
                                    >
                                        <Text
                                            style={
                                                styles(mtrTheme)
                                                    .changeButtonText
                                            }
                                        >
                                            REQUEST
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* Use a light status bar on iOS to account for the black space above the modal */}
                            <StatusBar
                                style={Platform.OS === 'ios' ? 'light' : 'auto'}
                            />
                        </View>
                    </>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
};

const styles = (mtrTheme) =>
    StyleSheet.create({
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
            color: 'white',
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
            color: 'white',
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
            color: 'white',
            paddingVertical: 5,
            textAlign: 'center',
        },
        dropDownContainer: {
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
            fontFamily: 'Roboto-Bold',
            fontSize: 22,
            color: 'black',
            paddingLeft: 10,
            paddingVertical: 5,
        },
        inputSearchStyle: {},
        changeButtonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
        },
        changeButton: {
            backgroundColor: mtrTheme.colors.lightBlue,
            borderRadius: 5,
        },
        changeButtonText: {
            fontSize: 16,
            fontColor: 'white',
            fontFamily: 'Roboto-Regular',
            textAlign: 'center',
            paddingHorizontal: 20,
            paddingVertical: 5,
        },
        messageBox: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: '80%',
        },
    });
export default AffiliationScreen;
