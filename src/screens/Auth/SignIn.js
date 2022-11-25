import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    Alert,
} from 'react-native';
import axios from 'axios';
import React, { useState } from 'react';
import Logo from '../../../assets/M-square.png';
import CustomInput from '../../components/ui/CustomInput';
import CustomButton from '../../components/ui/Auth/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useAuthContext } from '../../contexts/AuthContext';
import { useSysContext } from '../../contexts/SysContext';
import { useAffiliationContext } from '../../contexts/AffiliationContext';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import { printObject } from '../../utils/helpers';

//   FUNCTION START
const SignInScreen = () => {
    const mtrTheme = useTheme();
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const { loadCognitoInfo, cognitoSub } = useAuthContext();
    const { refreshAffiliations, userAffiliations } = useAffiliationContext();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    console.log('Errors', errors);
    // need this to pass the username on to forgot password
    const user = watch('username');
    const onSignInPressed = async (data) => {
        setIsLoading(true);
        const { username, password } = data;
        //console.log(username, password);
        let alertPayload = {};
        let setAlert = {};
        await Auth.signIn(username, password)
            .then((user) => {
                //printObject('SI:55__>user:', user);
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                    Auth.completeNewPassword(
                        username, // the Cognito User Object
                        password,
                        []
                    )
                        .then((user) => {
                            // at this time the user is logged in if no MFA required
                            console.log(user);
                            loadCognitoInfo(user.attributes)
                                .then(() =>
                                    console.log('cognitoSub', cognitoSub)
                                )
                                .catch((e) =>
                                    printObject('loadCognitoInfo:catch e:', e)
                                );
                        })
                        .catch((e) => {
                            setIsLoading(false);
                            const alertPayload = {
                                msg: 'Authentication failed. Please check your credentials',
                                alertType: 'danger',
                            };
                            setAlert(alertPayload);
                            console.log(' need to return');
                            // return;
                        });
                }
                loadCognitoInfo(user)
                    .then(() => console.log('cognitoSub', cognitoSub))
                    .catch((e) => printObject('loadCognitoInfo:catch e:', e));
                setIsLoading(false);
                return;
            })
            .catch((e) => {
                // printObject('SI:80__>signIn error catch: e:', e);
                switch (e.code) {
                    case 'UserNotFoundException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'PasswordResetRequiredException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    case 'NotAuthorizedException':
                        alertPayload = {
                            msg: e.message,
                            alertType: 'danger',
                        };
                        break;
                    default:
                        alertPayload = {
                            msg: 'Signin error: [' + e.message + ']',
                            alertType: 'danger',
                        };
                        break;
                }
            });
        // if we have error loaded, let's return
        if (alertPayload.msg) {
            setIsLoading(false);
            Alert.alert(alertPayload.msg);
            alertPayload = {};

            return;
        }

        return;
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };
    const forgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword', { user });
    };
    if (isLoading) {
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
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                {/* <Image
                    source={Logo}
                    // styles={[styles.logo, { height: height * 0.1 }]}
                    // resizeMode='stretch'
                /> */}
                {/* <Image style={styles.tinyLogo} source={Logo} /> */}
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Image style={styles.logo} source={Logo} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontFamily: 'Merriweather-Bold',
                            fontSize: 40,
                            color: 'black',
                        }}
                    >
                        MEETER
                    </Text>
                </View>
                <CustomInput
                    name='username'
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 4,
                            message: 'Username minimum length is 4',
                        },
                    }}
                    placeholder='Username'
                    control={control}
                />
                <CustomInput
                    name='password'
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 3,
                            message: 'Password length too short',
                        },
                    }}
                    placeholder='Password'
                    control={control}
                    secureTextEntry
                />

                <CustomButton
                    text={isLoading ? 'Loading...' : 'Sign In'}
                    onPress={handleSubmit(onSignInPressed)}
                />
                <CustomButton
                    text='Forgot Password'
                    onPress={forgotPasswordPressed}
                    type='TERTIARY'
                />
                {/* <SocialSignInButtons /> */}
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPressed}
                    type='TERTIARY'
                />
            </View>
        </ScrollView>
    );
};

export default SignInScreen;
const styles = StyleSheet.create({
    root: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
        // width: '100%',
        marginHorizontal: 20,
    },
    logo: {
        width: 240,
        height: 124,
    },
    tinyLogo: {
        width: 225,
        height: 225,
    },
});
