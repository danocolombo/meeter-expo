import {
    View,
    Text,
    Image,
    ScrollView,
    Modal,
    StyleSheet,
    StatusBar,
    useWindowDimensions,
    Alert,
} from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Logo from '../../../assets/M-square.png';
import CustomInput from '../../components/ui/CustomInput';
import CustomButton from '../../components/ui/Auth/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { ActivityIndicator, useTheme, Surface } from 'react-native-paper';
import { printObject } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import {
    defineAndSaveUserProfile,
    loginUser,
    saveUserProfile,
} from '../../features/user/userThunks';
import { logout } from '../../features/user/userSlice';
import { getAllMeetings } from '../../features/meetings/meetingsThunks';
import { loadDefaultGroups } from '../../features/groups/groupsThunks';
//   FUNCTION START
const SignInScreen = () => {
    const mtrTheme = useTheme();
    const [loading, setLoading] = useState(false);
    const [showLoginError, setShowLoginError] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    useEffect(() => {
        dispatch(logout());
    }, []);
    console.log('Errors', errors);
    // need this to pass the username on to forgot password
    const user = watch('username');
    const onSignInPressed = async (data) => {
        console.log('onSignInPressed');
        if (loading) {
            return;
        }
        setLoading(true);
        console.log('loading true');
        try {
            const response = await Auth.signIn(data.username, data.password);
            const signInData = {
                signInUserSession: response.signInUserSession,
            };

            try {
                const loginResults = await dispatch(loginUser(signInData));

                const SUResults = await dispatch(
                    saveUserProfile(loginResults.payload.profile)
                );

                const defGroupsResults = await dispatch(
                    loadDefaultGroups({
                        id: loginResults.payload.profile.activeOrg.id,
                    })
                );
                const getAllMeetingsResults = await dispatch(
                    getAllMeetings({
                        orgId: loginResults.payload.profile.activeOrg.id,
                        code: loginResults.payload.profile.activeOrg.code,
                    })
                );

                // You can now work with getAllMeetingsResults here if needed.
            } catch (error) {
                // Handle errors here.
                setLoginError(error);
                setShowLoginError(true);
                throw new Error('Error occurred during sign-in');
            }

            console.log('done with loginUser dispatch');
        } catch (error) {
            switch (error.code) {
                case 'UserNotFoundException':
                    setLoginError(error.message);
                    setShowLoginError(true);
                    break;
                case 'PasswordResetRequiredException':
                    setLoginError(error.message);
                    setShowLoginError(true);
                    break;
                case 'NotAuthorizedException':
                    setLoginError(error.message);
                    setShowLoginError(true);
                    break;
                default:
                    setLoginError(error.message);
                    setShowLoginError(true);
                    break;
            }
        } finally {
            setLoading(false); // Set loading to false after the try/catch block
        }
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };
    const forgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword', { user });
    };
    const onCodeConfirm = () => {
        navigation.navigate('ConfirmEmail');
    };
    if (loading) {
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
            <View style={mtrStyles(mtrTheme).root}>
                <Modal visible={showLoginError} animationStyle='slide'>
                    <View style={mtrStyles(mtrTheme).modal}>
                        <View style={mtrStyles(mtrTheme).modalHeaderContainer}>
                            <Text style={mtrStyles(mtrTheme).modalHeaderText}>
                                Login Error
                            </Text>
                        </View>
                        <View style={mtrStyles(mtrTheme).modalSurfaceContainer}>
                            <Surface style={mtrStyles(mtrTheme).modalSurface}>
                                <View
                                    style={mtrStyles(mtrTheme).warningContainer}
                                >
                                    <Text
                                        style={mtrStyles(mtrTheme).warningText}
                                    >
                                        {loginError}
                                    </Text>
                                </View>

                                <View
                                    style={mtrStyles(mtrTheme).buttonContainer}
                                >
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).buttonWrapper
                                        }
                                    >
                                        <CustomButton
                                            text='OK'
                                            bgColor={
                                                mtrTheme.colors.mediumGreen
                                            }
                                            fgColor={mtrTheme.colors.lightText}
                                            onPress={() =>
                                                setShowLoginError(false)
                                            }
                                        />
                                    </View>
                                </View>
                            </Surface>
                        </View>
                        <StatusBar style='auto' />
                    </View>
                </Modal>
                {/* <Image
                    source={Logo}
                    // styles={[styles.logo, { height: height * 0.1 }]}
                    // resizeMode='stretch'
                /> */}
                {/* <Image style={styles.tinyLogo} source={Logo} /> */}
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Image style={mtrStyles(mtrTheme).logo} source={Logo} />
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
                    text={loading ? 'Loading...' : 'Sign In'}
                    onPress={handleSubmit(onSignInPressed)}
                />
                <CustomButton
                    text='Forgot Password'
                    onPress={forgotPasswordPressed}
                    type='TERTIARY'
                    vPadding={10}
                />
                {/* <SocialSignInButtons /> */}
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPressed}
                    type='TERTIARY'
                    vPadding={5}
                />
                <CustomButton
                    text='Need to enter confirmation code?'
                    onPress={onCodeConfirm}
                    type='TERTIARY'
                    vPadding={0}
                />
            </View>
        </ScrollView>
    );
};

export default SignInScreen;
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
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
        surface: {
            flex: 1,
            backgroundColor: mtrTheme.colors.background,
        },
        activityIndicatorContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {
            color: mtrTheme.colors.lightGraphic,
        },
        screenTitleContainer: {
            paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.lightText,
        },
        subtitleContainer: {},
        subtitleText: {
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            fontWeight: '500',
            color: mtrTheme.colors.accent,
            textAlign: 'center',
            paddingBottom: 5,
        },
        modal: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mtrTheme.colors.background,
        },
        modalHeaderContainer: {
            backgroundColor: mtrTheme.colors.background,
        },
        modalHeaderText: {
            fontFamily: 'Roboto-Bold',
            fontSize: 28,
            fontWeight: '700',
            color: mtrTheme.colors.lightText,
            textAlign: 'center',
            paddingTop: 10,
        },
        modalSurfaceContainer: {
            alignItems: 'center',
            marginTop: 15,
        },
        modalSurface: {
            backgroundColor: mtrTheme.colors.lightGraphic,
            width: '90%',
            borderRadius: 10,
            padding: 20,
        },
        warningContainer: {
            padding: 10,
        },
        warningText: {
            fontSize: 20,
            textAlign: 'center',
            fontFamily: 'Roboto-Regular',
        },
        dateContainer: { marginTop: 20 },
        dateText: {
            fontSize: 24,
            fontFamily: 'Roboto-Bold',
            textAlign: 'center',
        },
        meetingInfoContainer: {},
        meetingInfoText: {
            fontSize: 18,
            fontFamily: 'Roboto-Medium',
            textAlign: 'center',
        },
        noteContainer: {
            marginHorizontal: 20,
        },
        noteText: {
            paddingTop: 20,
            fontSize: 16,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.critical,
            textTransform: 'uppercase',
            textAlign: 'center',
        },
        buttonContainer: {
            marginVertical: 10,
        },
        buttonWrapper: {},
        FAB: {
            position: 'absolute',
            margin: 10,

            right: 0,
            bottom: -30,
            backgroundColor: 'green',
        },
    });
