import {
    Text,
    View,
    StyleSheet,
    Alert,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import Picker from '@react-native-picker/picker';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import React, { useCallback, useState, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Input from '../components/ui/Input';
import { Dropdown } from 'react-native-element-dropdown';
import { API } from 'aws-amplify';
import * as queries from '../jerichoQL/queries';
import * as mutations from '../jerichoQL/mutations';
import CustomButton from '../components/ui/Auth/CustomButton';
import { useUserContext } from '../contexts/UserContext';
import { printObject } from '../utils/helpers';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const AffiliationScreen = (props) => {
    const affiliationOptions = [
        { label: 'Wynnbrook', value: 'wbc' },
        { label: 'Christ Community', value: 'ccc' },
        { label: 'Village Church', value: 'vcp' },
    ];
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const { userProfile, updateHeroMessage } = useUserContext();
    const [isUpdating, setIsUpdating] = useState(false);
    const [affCode, setAffCode] = useState('');
    const [isStateFocus, setIsStateFocus] = useState(false);
    const [isAffiliationFocus, setIsAffiliationFocus] = useState(false);
    const [theMessage, setTheMessage] = useState();
    const [affiliationSelected, setAffiliationSelected] = useState('item1');
    useLayoutEffect(() => {
        navigation.setOptions({
            //title: meeter.appName,
            headerBackTitle: 'Back',
        });
    }, [navigation]);
    useFocusEffect(
        useCallback(() => {
            try {
                async function getTheMessage() {
                    const orgResponse = await API.graphql({
                        query: queries.getOrganization,
                        variables: {
                            id: userProfile?.activeOrg?.id,
                        },
                    });
                    printObject('HM:43-->orgResponse', orgResponse);

                    setTheMessage(
                        orgResponse.data.getOrganization.heroMessage || ''
                    );
                }
                getTheMessage();
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
        return;
        // need to update organization.heroMessage and
        // and userProfile.activeOrg.heroMessage
        setIsUpdating(true);
        try {
            const updateInfo = {
                id: userProfile.activeOrg.id,
                heroMessage: theMessage,
            };
            API.graphql({
                query: mutations.updateOrgHeroMessage,
                variables: { input: updateInfo },
            })
                .then((results) => {
                    updateHeroMessage(
                        results.data.updateOrganization.heroMessage
                    );
                })
                .catch((error) => {
                    console.log(error);
                    console.error(error);
                });
        } catch (error) {
            console.log('HM:58-->unexpected error:\n', error);
        }
        setIsUpdating(false);
        Alert.alert('Message Updated');
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
                    <View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={mtrTheme.screenTitle}>
                                AFFILIATIONS
                            </Text>
                        </View>
                        <View style={styles(mtrTheme).introContainer}>
                            <Text style={styles(mtrTheme).introText}>
                                Affiliations are how the system associates your
                                activity with a specific organization.{' '}
                            </Text>
                        </View>
                        <View style={styles(mtrTheme).introContainer}>
                            <Text style={styles(mtrTheme).introText}>
                                If you have access to other affiliates, you can
                                switch to them by selecting them in the dropdown
                                list, and tap "CHANGE"
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
                            <View style={styles(mtrTheme).dropDownContainer}>
                                <View>
                                    <Dropdown
                                        style={[
                                            styles(mtrTheme).dropdown,
                                            isAffiliationFocus && {
                                                borderColor: 'blue',
                                            },
                                        ]}
                                        placeholderStyle={
                                            styles(mtrTheme).placeholderStyle
                                        }
                                        selectedTextStyle={
                                            styles(mtrTheme).selectedTextStyle
                                        }
                                        inputSearchStyle={
                                            styles(mtrTheme).inputSearchStyle
                                        }
                                        containerStyle={
                                            styles(mtrTheme).dropDownContainer
                                        }
                                        itemContainerStyle={{
                                            paddingVertical: 0,
                                            marginVertical: 0,
                                        }}
                                        iconStyle={styles(mtrTheme).iconStyle}
                                        data={affiliationOptions}
                                        search={false}
                                        maxHeight={300}
                                        labelField='label'
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
                                                setIsAffiliationFocus(false);
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <View
                                style={styles(mtrTheme).changeButtonContainer}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('Affiliation')
                                    }
                                    style={styles(mtrTheme).changeButton}
                                >
                                    <Text
                                        style={
                                            styles(mtrTheme).changeButtonText
                                        }
                                    >
                                        CHANGE
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles(mtrTheme).introContainer}>
                            <Text style={styles(mtrTheme).introText}>
                                If you have been invited to join a team, enter
                                the code you were provided below and you can
                                join.
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
                                            styles(mtrTheme).changeButtonText
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
