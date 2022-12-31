import React, { useLayoutEffect, useCallback, useState } from 'react';
import {
    Text,
    View,
    AppState,
    useWindowDimensions,
    Modal,
    Alert,
} from 'react-native';
import { Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { focusManager } from '@tanstack/react-query';
//import { S3Image } from 'aws-amplify-react-native';
import CustomButton from '../../components/ui/CustomButton';
import ProfileForm from '../../components/Profile/ProfileForm';
import { useUserContext, up } from '../../contexts/UserContext';

import { printObject } from '../../utils/helpers';
import { StatusBar } from 'expo-status-bar';

//   FUNCTION START
//   ==============
const ProfileScreen = (props) => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const { userProfile, updateUserProfile } = useUserContext();
    const [showMessage, setShowMessage] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }
    useFocusEffect(
        useCallback(() => {
            const subscription = AppState.addEventListener(
                'change',
                onAppStateChange
            );
            return () => subscription.remove();
        }, [])
    );
    useLayoutEffect(() => {
        navigation.setOptions({
            //title: meeter.appName,
            headerBackTitle: 'Back',
        });
    }, [navigation]);

    const handleUpdate = (values) => {
        const updateProfileData = async (values) => {
            updateUserProfile(values)
                .then(() => {
                    console.log('profile updated');
                })
                .catch((e) => {
                    printObject('error saving profile:', e);
                });
        };
        printObject('PS:45-->form submit values:\n', values);
        setIsSaving(true);
        updateProfileData(values)
            .then(() => {
                setIsSaving(false);
                Alert.alert('Profile Updated.');
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const dismissMessage = () => {
        setShowMessage(false);
    };
    const handleCancel = () => {
        console.log('User Cancelled');
    };
    if (isSaving) {
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
            <StatusBar style='light' />
            <Modal visible={showMessage} animationStyle='slide'>
                <Surface
                    style={[
                        mtrTheme.profileMessageModalSurface,
                        { height: height * 0.8 },
                    ]}
                >
                    <View>
                        <Text style={mtrTheme.profileMessageModalTitle}>
                            Profile Saved
                        </Text>
                    </View>

                    <View style={mtrTheme.profileMessageModalButtonContainer}>
                        <View style={{ width: width * 0.35, marginLeft: 20 }}>
                            <CustomButton
                                text='OK'
                                bgColor='green'
                                fgColor='white'
                                onPress={() => dismissMessage()}
                            />
                        </View>
                    </View>
                </Surface>
            </Modal>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>Profile Screen</Text>
                </View>

                <ProfileForm
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                    profile={userProfile}
                />
            </Surface>
        </>
    );
};

export default ProfileScreen;
