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
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { printObject } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import {
    defineAndSaveUserProfile,
    loginUser,
} from '../../features/user/userThunks';
//   FUNCTION START
const SignInScreen = () => {
    const mtrTheme = useTheme();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [loggedInUser, setLoggedInUser] = useState(null);
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
        console.log('onSignInPressed');
        if (loading) {
            return;
        }
        setLoading(true);
        console.log('loading true');
        try {
            const response = await Auth.signIn(data.username, data.password);
            dispatch(loginUser(response));
            console.log('done with loginUser dispatch');
        } catch (error) {
            switch (error.code) {
                case 'UserNotFoundException':
                    console.warn(error.message);
                    break;
                case 'PasswordResetRequiredException':
                    console.warn(error.message);
                    break;
                case 'NotAuthorizedException':
                    console.warn(error.message);
                    break;
                default:
                    console.warn(error.message);
                    break;
            }
        }

        setLoading(false);
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };
    const forgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword', { user });
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
                    text={loading ? 'Loading...' : 'Sign In'}
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
