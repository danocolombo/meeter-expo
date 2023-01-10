import {
    Text,
    View,
    StyleSheet,
    Alert,
    SafeAreaView,
    KeyboardAvoidingView,
} from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Input from '../components/ui/Input';
import { API } from 'aws-amplify';
import * as queries from '../jerichoQL/queries';
import * as mutations from '../jerichoQL/mutations';
import CustomButton from '../components/ui/Auth/CustomButton';
import { useUserContext } from '../contexts/UserContext';
import { printObject } from '../utils/helpers';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const HeroMessageScreen = (props) => {
    const mtrTheme = useTheme();
    const { userProfile, updateHeroMessage } = useUserContext();
    const [isUpdating, setIsUpdating] = useState(false);
    const [theMessage, setTheMessage] = useState();
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
    const handleSaveClick = () => {
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
                <ScrollView>
                    <KeyboardAvoidingView behavior='padding'>
                        <View>
                            <View style={{ marginTop: 30 }}>
                                <Text style={mtrTheme.screenTitle}>
                                    Welcome Message
                                </Text>
                            </View>

                            <View
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    marginBottom: 10,
                                    marginTop: 20,
                                    marginHorizontal: 30,
                                }}
                            >
                                <Text style={mtrTheme.subTitleSmall}>
                                    Update the message your team will see on the
                                    home screen.
                                </Text>
                            </View>
                            <View style={styles.rowStyle}>
                                <Input
                                    label=''
                                    labelStyle={{
                                        fontSize: 24,
                                        color: 'white',
                                        marginLeft: 20,
                                    }}
                                    textInputConfig={{
                                        backgroundColor: 'lightgrey',
                                        paddingHorizontal: 10,
                                        fontSize: 20,
                                        color: 'black',
                                        value: theMessage,
                                        capitalize: 'sentence',
                                        autoCorrect: true,
                                        marginHorizontal: 20,
                                        placeholder: 'enter a welcome message',
                                        style: {
                                            color: 'black',
                                            borderRadius: 5,
                                        },
                                        fontWeight: '500',
                                        letterSpacing: 0,
                                        multiline: true,
                                        minHeight: 100,
                                        onChangeText: (x) => setTheMessage(x),
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    marginHorizontal: 20,
                                    paddingVertical: 20,
                                }}
                            >
                                <CustomButton
                                    text={
                                        isUpdating
                                            ? 'Updating...'
                                            : 'UPDATE MESSAGE'
                                    }
                                    bgColor={mtrTheme.colors.success}
                                    fgColor='white'
                                    type='PRIMARY'
                                    enabled='true'
                                    onPress={() => handleSaveClick()}
                                />
                            </View>
                            {/* Use a light status bar on iOS to account for the black space above the modal */}
                            <StatusBar
                                style={Platform.OS === 'ios' ? 'light' : 'auto'}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
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
export default HeroMessageScreen;
