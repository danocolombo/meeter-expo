import React, { useLayoutEffect, useCallback } from 'react';
import { Text, View, AppState } from 'react-native';
import { Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import ProfileForm from '../components/ProfileForm';
import {
    FetchProfile,
    UpdateProfile,
} from '../components/common/hooks/userQueries';
import { printObject } from '../utils/helpers';

//   FUNCTION START
//   ==============
const ProfileScreen = (props) => {
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const user = useSelector((state) => state.users.currentUser);
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
            PROFILE.refetch();

            return () => subscription.remove();
        }, [])
    );
    useLayoutEffect(() => {
        navigation.setOptions({
            //title: meeter.appName,
            headerBackTitle: 'Back',
        });
    }, [navigation, meeter]);
    const handleUpdate = (values) => {
        UpdateProfile(values)
            .then((res) => {
                printObject('updateGroupDDB res:', res);

                return;
            })
            .catch((err) => {
                printObject('updateProfile provider failed:', err);
                console.warn('updateProfile provider failed');

                return;
            });
    };
    const handleCancel = () => {
        console.log('User Cancelled');
    };
    const PROFILE = useQuery(
        ['profile', user.uid],
        () => FetchProfile(user.uid),
        {
            cacheTime: 2000,
            enabled: true,
        }
    );
    let profile = {};
    if (PROFILE.data) {
        profile = PROFILE.data.body;
    }
    if (PROFILE.isLoading) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size={75} color='#293462' />
            </View>
        );
    }
    if (PROFILE.isError) {
        console.error('PROFILE ERROR:', PROFILE.error);
    }
    return (
        <>
            <Surface style={mtrTheme.screenSurface}>
                <View>
                    <Text style={mtrTheme.screenTitle}>Profile Screen</Text>
                </View>

                <ProfileForm
                    profile={profile}
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                />
            </Surface>
        </>
    );
};

export default ProfileScreen;
