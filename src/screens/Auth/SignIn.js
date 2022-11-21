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
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, useTheme } from 'react-native-paper';
// import { ALL_EVENTS } from '../../../../data/getRegionalEvents';
import { updateCurrentUser } from '../../features/usersSlice';
// import { getProfile } from '../../providers/users';
import { getAffiliate } from '../../providers/system';
// import { loadRallies } from '../../features/ralliesSlice';
import { loadRegistrations } from '../../features/usersSlice';
import {
    updateAppName,
    setRegion,
    setEventRegion,
    updateAffiliate,
    updateAffiliateTitle,
    updateStateProv,
    updateAffiliationString,
    updateUserRole,
} from '../../features/systemSlice';
import { getProfile } from '../../providers/users';
import {
    loadActiveMeetings,
    loadHistoricMeetings,
    loadMeetings,
} from '../../features/meetingsSlice';
import { getSupportedMeetings } from '../../providers/meetings';
import { getToday, printObject, dateNumToDateDash } from '../../utils/helpers';
import { DEFAULT_AFFILIATIONS } from '../../constants/meeter';
//   FUNCTION START
const SignInScreen = () => {
    const mtrTheme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const meeter = useSelector((state) => state.system);
    const { profilePic } = useAuthContext();
    const { defaultProfilePic } = useSysContext();
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
                } else {
                    // console.log('the user is good...');
                }
            })
            .catch((e) => {
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
        let currentUserInfo = {};
        let currentSession = {};
        await Auth.currentUserInfo().then((u) => {
            currentUserInfo = u;
        });
        await Auth.currentSession().then((data) => {
            currentSession = data;
        });
        //printObject('SI:139-->currentUserInfo:', currentUserInfo);
        //printObject('SI:140-->currentSession:', currentSession);
        //   ----------------------------------------------
        //   build theUser object
        //   ----------------------------------------------
        let i = currentSession?.idToken?.payload?.sub;
        let u = currentSession?.idToken?.payload['cognito:username'];
        let fn = currentSession?.idToken?.payload?.given_name;
        let ln = currentSession?.idToken?.payload?.family_name;
        let e = currentSession?.idToken?.payload?.email;
        let j = currentSession?.idToken?.jwtToken;
        let theUser = {};
        theUser.uid = i;
        theUser.username = u;
        theUser.firstName = fn;
        theUser.lastName = ln;
        theUser.email = e;
        theUser.jwtToken = j;
        //   ----------------------------------------------
        //   get User info from Amplify
        //   ----------------------------------------------

        printObject('SI:163-->profilePic', profilePic);
        printObject('SI:163-->defaultProfilePic', defaultProfilePic);

        //   ----------------------------------------------
        //   get user profile from DDB
        //   ----------------------------------------------
        let fullUserInfo = {};
        await getProfile(theUser.uid).then((profileResponse) => {
            // console.log('profileResponse', profileResponse);
            switch (profileResponse.statusCode) {
                case 200:
                    // profile found
                    let profileInfo = profileResponse.userProfile;
                    fullUserInfo = { ...theUser, ...profileInfo };
                    fullUserInfo.profile = true;
                    break;
                case 404:
                    // no profile for uid
                    fullUserInfo = theUser;
                    fullUserInfo.profile = false;
                    break;
                default:
                    // we should get the error code, message and error
                    console.log('StatusCode: ', profileResponse.statusCode);
                    console.log('Message: ', profileResponse.message);
                    console.log('Error:', profileResponse.error);
                    // Alert.alert('Error getting the profile information');
                    fullUserInfo = theUser;
                    break;
            }

            dispatch(updateCurrentUser(fullUserInfo));
            //   get system.region and system.eventRegion
        });
        //   ----------------------------------------------
        //   get affiliate info from DDB
        //   ----------------------------------------------
        if (!fullUserInfo?.affiliations) {
            // use default affiliations
            fullUserInfo = {
                ...fullUserInfo,
                affiliations: DEFAULT_AFFILIATIONS.affiliations,
            };
        }
        //printObject('SI:199-->fullUserInfo:', fullUserInfo);
        dispatch(updateCurrentUser(fullUserInfo));
        getAffiliate(fullUserInfo.affiliations.active.value)
            .then((response) => {
                if (response.statusCode === 200) {
                    dispatch(
                        updateAffiliationString(
                            fullUserInfo.affiliations.active.value
                        )
                    );
                    dispatch(updateAffiliate(response.body[0]));
                    dispatch(updateAppName(response.body[0].appName));
                    dispatch(
                        updateAffiliateTitle(
                            fullUserInfo?.affiliations?.active?.label
                        )
                    );
                    if (fullUserInfo?.affiliations?.active?.role) {
                        dispatch(
                            updateUserRole(
                                fullUserInfo?.affiliations?.active?.role
                            )
                        );
                    } else {
                        dispatch(updateUserRole('guest'));
                    }
                } else {
                    console.log('response.statusCode:', response.statusCode);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log('OH SNAP\n', err);
            });
        let today = dateNumToDateDash(meeter.today);
        getSupportedMeetings(fullUserInfo.affiliations.active.value)
            .then((results) => {
                if (results.length > 0) {
                    dispatch(loadMeetings(results));
                }
            })
            .catch((error) => printObject('242_ERROR', error));
        setIsLoading(false);
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
