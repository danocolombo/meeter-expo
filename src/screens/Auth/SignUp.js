import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Alert,
    Modal,
    TouchableWithoutFeedback,
    useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/ui/CustomInput';
import { FAB } from 'react-native-paper';
import CustomButton from '../../components/ui/Auth/CustomButton';
import SocialSignInButtons from '../../components/ui/Auth/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
// import { TERMS_CONDITIONS } from '../../../constants/TermsConditions';
// import { PRIVACY_POLICY } from '../../../constants/PrivacyPolicy';
import RenderHtml from 'react-native-render-html';
import { Auth } from 'aws-amplify';
const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const [loading, setLoading] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const { width, height } = useWindowDimensions();
    const { control, handleSubmit, watch } = useForm();
    const pwd = watch('password');
    const navigation = useNavigation();

    const handleTermsClose = () => {
        setShowTerms(false);
    };
    const handlePrivacyClose = () => {
        setShowPrivacy(false);
    };
    const onRegisterPressed = async (data) => {
        if (loading) {
            return;
        }
        //setLoading(true);
        const { username, password, email, firstName, lastName } = data;
        try {
            const response = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    given_name: firstName,
                    family_name: lastName,
                    preferred_username: username,
                },
            });
            console.log('response', response);
            navigation.navigate('ConfirmEmail', { username });
        } catch (e) {
            Alert.alert('Yikes', e.message);
        }
        //setLoading(false);
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed');
    };

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    };

    return (
        <>
            <Modal visible={showTerms} animationStyle='slide'>
                <View>
                    <FAB
                        icon='check'
                        style={[styles.FAB, { top: 70 }]}
                        onPress={handleTermsClose}
                    />
                    <View style={{ marginTop: 70 }}>
                        <Text
                            style={{
                                paddingLeft: 10,
                                fontSize: 24,
                                fontWeight: '500',
                            }}
                        >
                            Terms & Conditions
                        </Text>
                    </View>
                    <ScrollView
                        style={{ marginTop: 10, paddingHorizontal: 10 }}
                    >
                        <RenderHtml contentWidth={width} source={''} />
                    </ScrollView>
                </View>
            </Modal>
            <Modal visible={showPrivacy} animationStyle='slide'>
                <View>
                    <FAB
                        icon='check'
                        style={[styles.FAB, { top: 70 }]}
                        onPress={handlePrivacyClose}
                    />
                    <View style={{ marginTop: 70 }}>
                        <Text
                            style={{
                                paddingLeft: 10,
                                fontSize: 24,
                                fontWeight: '500',
                            }}
                        >
                            Privacy Policy
                        </Text>
                    </View>
                    <ScrollView
                        style={{ marginTop: 10, paddingHorizontal: 10 }}
                    >
                        <RenderHtml contentWidth={width} source={''} />
                    </ScrollView>
                </View>
            </Modal>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.root}>
                    <Text style={styles.title}>Create an account</Text>

                    <CustomInput
                        name='firstName'
                        control={control}
                        placeholder='First Name'
                        rules={{
                            required: 'First name is required',
                            minLength: {
                                value: 2,
                                message:
                                    'First name should be at least 2 characters long',
                            },
                            maxLength: {
                                value: 12,
                                message:
                                    'First name should be max 12 characters long',
                            },
                        }}
                    />
                    <CustomInput
                        name='lastName'
                        control={control}
                        placeholder='Last Name'
                        rules={{
                            required: 'Last name is required',
                            minLength: {
                                value: 4,
                                message:
                                    'Last name should be at least 4 characters long',
                            },
                            maxLength: {
                                value: 15,
                                message:
                                    'Last name should be max 15 characters long',
                            },
                        }}
                    />
                    <CustomInput
                        name='email'
                        control={control}
                        placeholder='Email'
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: EMAIL_REGEX,
                                message: 'Email is invalid',
                            },
                        }}
                    />
                    <CustomInput
                        name='username'
                        control={control}
                        placeholder='Username (used to login)'
                        secureTextEntry={false}
                        rules={{
                            required: 'Username is required',
                            minLength: {
                                value: 4,
                                message:
                                    'Username should be at least 6 characters long',
                            },
                            maxLength: {
                                value: 24,
                                message:
                                    'Username should be max 24 characters long',
                            },
                        }}
                    />

                    <CustomInput
                        name='password'
                        control={control}
                        placeholder='Password'
                        secureTextEntry
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message:
                                    'Password should be at least 8 characters long',
                            },
                        }}
                    />
                    <CustomInput
                        name='password-repeat'
                        control={control}
                        placeholder='Repeat Password'
                        secureTextEntry
                        rules={{
                            validate: (value) =>
                                value === pwd || 'Password do not match',
                        }}
                    />

                    <CustomButton
                        text={loading ? 'Signing up...' : 'Sign up'}
                        onPress={handleSubmit(onRegisterPressed)}
                    />

                    <Text style={[styles.text, { paddingHorizontal: 10 }]}>
                        By registering, you confirm that you accept our{' '}
                        <Text
                            style={styles.link}
                            onPress={() => setShowTerms(true)}
                        >
                            Terms of Use
                        </Text>{' '}
                        and{' '}
                        <Text
                            style={styles.link}
                            onPress={() => setShowPrivacy(true)}
                        >
                            Privacy Policy
                        </Text>
                    </Text>
                    {/* 
                <SocialSignInButtons /> */}

                    <CustomButton
                        text='Have an account? Sign in'
                        onPress={onSignInPress}
                        type='TERTIARY'
                    />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        marginTop: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
        textAlign: 'center',
    },
    link: {
        color: 'blue',
    },
    FAB: {
        position: 'absolute',
        marginRight: 16,
        right: 0,
        // bottom: 0,
        backgroundColor: 'green',
    },
});

export default SignUpScreen;
