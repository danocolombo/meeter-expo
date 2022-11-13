import React, { useLayoutEffect, useCallback, useState } from 'react';
import { Text, View, AppState, useWindowDimensions, Modal } from 'react-native';
import { Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../components/ui/CustomButton';
import ProfileForm from '../components/ProfileForm';
import {
    FetchProfile,
    UpdateProfile,
} from '../components/common/hooks/userQueries';
import { updateCurrentUser } from '../features/usersSlice';
import { printObject } from '../utils/helpers';

//   FUNCTION START
//   ==============
const ProfileScreen = (props) => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    const meeter = useSelector((state) => state.system);
    const user = useSelector((state) => state.users.currentUser);
    const [showMessage, setShowMessage] = useState(false);
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
            console.log('PROFILE refetched');
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
        // printObject('PS:44--handleUpdate::values', values);
        UpdateProfile(values)
            .then((res) => {
                printObject('UpdateProfile res:', res);
                let newReduxUser = {
                    ...values,
                    jwtToken: user.jwtToken,
                };
                dispatch(updateCurrentUser(newReduxUser));
                printObject('newUser:', newReduxUser);
                printObject('user.currentUser:', user);

                setShowMessage(true);
                return;
            })
            .catch((err) => {
                printObject('updateProfile provider failed:', err);
                console.warn('updateProfile provider failed');

                return;
            });
    };
    const dismissMessage = () => {
        setShowMessage(false);
    };
    const handleCancel = () => {
        console.log('User Cancelled');
    };
    const PROFILE = useQuery(
        ['profile', user.uid],
        () => FetchProfile(user.uid),
        {
            cacheTime: 300000, // 5 min
            enabled: true,
        }
    );
    let profile = {};
    if (PROFILE.data) {
        profile = PROFILE.data.body;
        console.log('data: profile copied');
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
                <ActivityIndicator
                    size={75}
                    color={mtrTheme.colors.activityIndicator}
                />
            </View>
        );
    }
    if (PROFILE.isError) {
        console.error('PROFILE ERROR:', PROFILE.error);
    }

    return (
        <>
            {PROFILE.isRefetching ? (
                <View>
                    <Text style={{ color: mtrTheme.colors.accent }}>
                        refetching...
                    </Text>
                </View>
            ) : null}
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
                    profile={profile}
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                />
            </Surface>
        </>
    );
};

export default ProfileScreen;
