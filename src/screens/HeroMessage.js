import {
    Text,
    View,
    StyleSheet,
    Alert,
    SafeAreaView,
    KeyboardAvoidingView,
} from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Input from '../components/ui/Input';
import CustomButton from '../components/ui/Auth/CustomButton';
import { printObject } from '../utils/helpers';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserProfile } from '../features/user/userThunks';
const HeroMessageScreen = (props) => {
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.profile);
    const [isUpdating, setIsUpdating] = useState(false);
    const [theMessage, setTheMessage] = useState(
        userProfile?.activeOrg?.heroMessage
    );
    const handleSaveClick = () => {
        // need to update organization.heroMessage and
        // and userProfile.activeOrg.heroMessage
        setIsUpdating(true);
        try {
            //* update the hero message in profile and save it...
            const updatedActiveOrg = {
                ...userProfile.activeOrg,
                heroMessage: theMessage,
            };
            const updatedUserProfile = {
                ...userProfile,
                activeOrg: updatedActiveOrg,
            };
            dispatch(saveUserProfile(updatedUserProfile));
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
    printObject('HM:93-->userProfile:\n', userProfile);
    return (
        <>
            <SafeAreaView style={mtrStyles(mtrTheme).container}>
                <ScrollView>
                    <KeyboardAvoidingView behavior='padding'>
                        <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                            <Text style={mtrStyles(mtrTheme).screenTitleText}>
                                Welcome Message
                            </Text>
                        </View>

                        <View style={mtrStyles(mtrTheme).instructionContainer}>
                            <Text style={mtrStyles(mtrTheme).instructionText}>
                                Update the message your team will see on the
                                home screen.
                            </Text>
                        </View>
                        <View style={mtrStyles(mtrTheme).inputRow}>
                            <Input
                                label='Your Message'
                                labelStyle={mtrStyles(mtrTheme).inputLabel}
                                textInputConfig={{
                                    backgroundColor: mtrTheme.colors.lightGrey,
                                    paddingHorizontal: 4,
                                    fontSize: 20,

                                    color: mtrTheme.colors.darkText,
                                    value: theMessage,
                                    capitalize: 'sentence',
                                    autoCorrect: true,
                                    marginHorizontal: 0,
                                    placeholder: 'enter a welcome message',
                                    style: mtrStyles(mtrTheme).inputStyle,
                                    fontWeight: '500',
                                    letterSpacing: 0,
                                    multiline: true,
                                    minHeight: 100,
                                    onChangeText: (x) => setTheMessage(x),
                                }}
                            />
                        </View>
                        <View style={mtrStyles(mtrTheme).buttonContainer}>
                            <CustomButton
                                text={
                                    isUpdating
                                        ? 'Updating...'
                                        : 'UPDATE MESSAGE'
                                }
                                bgColor={mtrTheme.colors.success}
                                fgColor={mtrTheme.colors.lightText}
                                type='PRIMARY'
                                enabled='true'
                                onPress={() => handleSaveClick()}
                            />
                        </View>
                        {/* Use a light status bar on iOS to account for the black space above the modal */}
                        <StatusBar
                            style={Platform.OS === 'ios' ? 'light' : 'auto'}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        container: {
            backgroundColor: mtrTheme.colors.background,
            flex: 1,
            paddingVertical: 20,
        },
        screenTitleContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.accent,
        },
        instructionContainer: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginBottom: 10,
            marginTop: 20,
            marginHorizontal: 30,
        },
        instructionText: {
            fontFamily: 'Roboto-Medium',
            fontSize: 18,
            fontWeight: '500',
            color: mtrTheme.colors.accent,
            textAlign: 'center',
        },
        inputRow: {
            marginHorizontal: 5,
            alignItems: 'center',
        },
        inputLabel: {
            fontSize: 24,
            color: 'white',
            marginLeft: 20,
        },
        buttonContainer: {
            marginHorizontal: 20,
            paddingVertical: 20,
        },
    });
export default HeroMessageScreen;
