import React, { useLayoutEffect, useCallback, useState } from 'react';
import { Text, View, AppState, useWindowDimensions, Modal } from 'react-native';
import { Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { focusManager } from '@tanstack/react-query';
//import { S3Image } from 'aws-amplify-react-native';
import CustomButton from '../../components/ui/CustomButton';
import ProfileForm from '../../components/Profile/ProfileForm';
import { useUserContext } from '../../contexts/UserContext';

import { printObject } from '../../utils/helpers';

//   FUNCTION START
//   ==============
const ProfileScreen = (props) => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const mtrTheme = useTheme();

    // const { meeter } = useSysContext();
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
        // setIsSaving(true);
        // values.username = user.username;
        // if (!values.defaultClient) {
        //     values.defaultClient = 'mtr';
        //     values.defaultClientId = '88j16596c6382dee0d7a8dtc';
        // }
        // if (!values?.affiliations?.active?.value) {
        //     // should never get here, but just in case
        //     values.affiliations = DEFAULT_AFFILIATIONS.affiliations;
        // }
        // // clean the unwanted root values
        // delete values?.residenceStreet;
        // delete values?.residenceCity;
        // delete values?.residenceStateProv;
        // delete values?.residencePostalCode;
        // // printObject('PS:71--handleUpdate::values(>>>DDB)', values);
        // UpdateProfile(values)
        //     .then((res) => {
        //         // printObject('UpdateProfile res:', res);
        //         let newReduxUser = {
        //             ...values,
        //             jwtToken: user.jwtToken,
        //         };
        //         dispatch(updateCurrentUser(newReduxUser));
        //         // printObject('newUser:', newReduxUser);
        //         // printObject('user.currentUser:', user);
        //         setIsSaving(false);
        //         setShowMessage(true);
        //         return;
        //     })
        //     .catch((err) => {
        //         setIsSaving(false);
        //         Alert.alert('Error saving profile. Please try again later.');
        //         printObject('updateProfile provider failed:', err);
        //         console.warn('updateProfile provider failed');
        //         return;
        //     });
        // setIsSaving(false);
    };
    const dismissMessage = () => {
        setShowMessage(false);
    };
    const handleCancel = () => {
        console.log('User Cancelled');
    };

    return (
        <>
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
                />
            </Surface>
        </>
    );
};

export default ProfileScreen;
