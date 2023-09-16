import React, { useLayoutEffect, useCallback, useState } from 'react';
import {
    Text,
    View,
    AppState,
    useWindowDimensions,
    Modal,
    Alert,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../../components/ui/CustomButton';
import ProfileForm from '../../components/Profile/ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { printObject } from '../../utils/helpers';
import { StatusBar } from 'expo-status-bar';
import { saveUserProfile } from '../../features/user/userThunks';

//   FUNCTION START
//   ==============
const ProfileScreen = (props) => {
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const userProfile = useSelector((state) => state.user.profile);
    const [showMessage, setShowMessage] = useState(false);
    const [showPermissions, setShowPermissions] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const mtrStyles = (mtrTheme) =>
        StyleSheet.create({
            activityIndicatorContainer: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },
            screenTitle: {
                fontFamily: 'Roboto-Bold',
                fontSize: 28,
                fontWeight: '700',
                color: mtrTheme.colors.lightText,
                textAlign: 'center',
                paddingTop: 10,
            },
            modalSurface: {
                marginTop: 100,
                marginHorizontal: 10,
                borderRadius: 15,
                padding: 30,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 5,
                height: height * 0.8,
            },
            modalTitle: {
                fontFamily: 'Roboto-Bold',
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
                textAlign: 'center',
            },
            modalButtonContainer: {
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: 15,
            },
            modalButtonWrapper: {
                width: width * 0.35,
                marginLeft: 20,
                borderWith: 2,
                borderColor: 'white',
            },
        });
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName || 'Meeter',
            headerBackTitle: 'Back',
        });
    }, [navigation]);

    const handleUpdate = (values) => {
        dispatch(saveUserProfile(values));
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
            <View style={mtrStyles(mtrTheme).activityIndicatorContainer}>
                <ActivityIndicator color={mtrTheme.colors.accent} size={80} />
            </View>
        );
    }
    // printObject('PS:99-->pData:\n', pData);
    return (
        <>
            <StatusBar style='light' />
            <Modal visible={showMessage} animationStyle='slide'>
                <Surface style={mtrStyles(mtrTheme).modalSurface}>
                    <View>
                        <Text style={mtrStyles(mtrTheme).screenTitle}>
                            Profile Saved
                        </Text>
                    </View>

                    <View style={mtrStyles(mtrTheme).modalButtonContainer}>
                        <View style={{ width: width * 0.35, marginLeft: 20 }}>
                            <CustomButton
                                text='OK'
                                bgColor={mtrTheme.colors.mediumGreen}
                                fgColor='white'
                                onPress={() => dismissMessage()}
                            />
                        </View>
                    </View>
                </Surface>
            </Modal>
            <Modal visible={showPermissions} animationStyle='slide'>
                <Surface style={mtrStyles(mtrTheme).modalSurface}>
                    <View>
                        <Text style={mtrStyles(mtrTheme).modalTitle}>
                            Your Permissions
                        </Text>
                    </View>

                    <View style={mtrStyles(mtrTheme).modalButtonContainer}>
                        <View style={mtrStyles(mtrTheme).modalButtonWrapper}>
                            <CustomButton
                                text='OK'
                                bgColor='green'
                                fgColor='white'
                                onPress={() => setShowPermissions(false)}
                            />
                        </View>
                    </View>
                </Surface>
            </Modal>
            <Surface style={mtrTheme.screenSurface}>
                <View style={{ marginLeft: 'auto', paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => setShowPermissions(true)}>
                        <View>
                            <MaterialCommunityIcons
                                name='key-chain-variant'
                                size={24}
                                color='white'
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={mtrStyles(mtrTheme).screenTitle}>
                        Profile Screen
                    </Text>
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
