import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/ui/CustomInput';
import { useTheme } from 'react-native-paper';
import CustomButton from '../../components/ui/Auth/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { registerUser } from '../../jerichoQL/providers/users.provider';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { printObject } from '../../utils/helpers';
const ConfirmEmailScreen = () => {
    const route = useRoute();
    const mtrTheme = useTheme();
    const { control, handleSubmit, watch } = useForm({
        defaultValues: { username: route?.params?.username },
    });
    //used to reference username on resend code.
    const username = watch('username');

    const navigation = useNavigation();

    const onConfirmPressed = async (data) => {
        try {
            const response = await Auth.confirmSignUp(data.username, data.code);
            console.log('confirmSignUp_reponse', response);
            navigation.navigate('SignIn');
        } catch (e) {
            Alert.alert('Failure Meeter user registration', e.message);
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    const onResendPress = async () => {
        try {
            await Auth.resendSignUp(username);
            Alert.alert('Success', 'Code was resent to your email');
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={mtrStyles(mtrTheme).root}>
                <Text style={mtrStyles(mtrTheme).title}>
                    Enter Confirmation Code
                </Text>
                <View style={mtrStyles(mtrTheme).instructionsContainer}>
                    <Text style={mtrStyles(mtrTheme).instructionsText}>
                        A code has been sent to your email. Please enter your
                        username.
                    </Text>
                    <Text style={mtrStyles(mtrTheme).notEmailText}>
                        (not email)
                    </Text>
                    <Text style={mtrStyles(mtrTheme).instructionsText}>
                        Then enter that code below.
                    </Text>
                </View>
                <CustomInput
                    name='username'
                    control={control}
                    placeholder='Username'
                    rules={{
                        required: 'Username code is required',
                    }}
                />

                <CustomInput
                    name='code'
                    control={control}
                    placeholder='Enter your confirmation code'
                    rules={{
                        required: 'Confirmation code is required',
                    }}
                />

                <CustomButton
                    text='Confirm'
                    onPress={handleSubmit(onConfirmPressed)}
                />

                <CustomButton
                    text='Resend code'
                    onPress={onResendPress}
                    type='SECONDARY'
                />

                <CustomButton
                    text='Back to Sign in'
                    onPress={onSignInPress}
                    type='TERTIARY'
                />
            </View>
        </ScrollView>
    );
};
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        root: {
            alignItems: 'center',
            padding: 20,
            marginTop: 75,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: mtrTheme.colors.background,
            margin: 10,
        },
        instructionsContainer: {
            alignItems: 'center',
            padding: 20,
        },
        instructionsText: {
            fontSize: 20,
            textAlign: 'center',
            fontFamily: 'Roboto-Regular',
        },
        notEmailText: {
            fontSize: 18,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.critical,
        },
    });
const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        marginTop: 75,
    },

    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
});

export default ConfirmEmailScreen;
