import {
    Text,
    View,
    StyleSheet,
    Alert,
    SafeAreaView,
    KeyboardAvoidingView,
} from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import { Storage } from 'aws-amplify';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../components/ui/Auth/CustomButton';
import { printObject } from '../utils/helpers';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
const StorageTestScreen = (props) => {
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.profile);
    const [isUpdating, setIsUpdating] = useState(false);
    const handleSaveClick = () => {
        // need to update organization.heroMessage and
        // and userProfile.activeOrg.heroMessage
        setIsUpdating(true);
        try {
        } catch (error) {
            console.log('ST:33-->unexpected error:\n', error);
        }
        setIsUpdating(false);
    };
    Storage.list('public/') // for listing ALL files without prefix, pass '' instead
        .then(({ results }) => console.log(results))
        .catch((err) => console.log(err));
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
    // printObject('HM:93-->userProfile:\n', userProfile);
    return (
        <>
            <SafeAreaView style={mtrStyles(mtrTheme).container}>
                <ScrollView>
                    <KeyboardAvoidingView behavior='padding'>
                        <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                            <Text style={mtrStyles(mtrTheme).screenTitleText}>
                                Storage Test Screen
                            </Text>
                        </View>
                        <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                            <Text style={{ color: 'white' }}>private</Text>
                            <Text style={{ color: 'white' }}>protected</Text>
                            <Text style={{ color: 'white' }}>public</Text>
                        </View>

                        <View style={mtrStyles(mtrTheme).instructionContainer}>
                            <Text style={mtrStyles(mtrTheme).instructionText}>
                                This tests the AWS storage features
                            </Text>
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
export default StorageTestScreen;
