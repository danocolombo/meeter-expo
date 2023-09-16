import React, {
    useEffect,
    useState,
    useLayoutEffect,
    useCallback,
} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    useNavigation,
    useIsFocused,
    useFocusEffect,
} from '@react-navigation/native';
import Logo from '../../assets/M-square.png';
import { Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import { printObject } from '../utils/helpers';
import { StatusBar } from 'expo-status-bar';
import { Auth } from 'aws-amplify';
import { loginUser } from '../features/user/userThunks';
import { loadDefaultGroups } from '../features/groups/groupsThunks';
import { getAllMeetings } from '../features/meetings/meetingsThunks';
//      ====================================
//      FUNCTION START
const LandingScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [teamApproved, setTeamApproved] = useState(false);
    const [guest, setGuest] = useState(false);
    const isLoading = useSelector((state) => state.user.isLoading);
    // const [localLoading, setLocalLoading] = useState(false);
    const [access, setAccess] = useState(false);
    const userProfile = useSelector((state) => state.user.profile);
    const meeting = useSelector((state) => state.system);
    const perms = useSelector((state) => state.user.perms);
    const meeter = useSelector((state) => state.system.meeter);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(undefined);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
        });
    }, [navigation, meeter]);
    useFocusEffect(
        useCallback(() => {
            try {
                async function checkUser() {
                    const authUser = await Auth.currentAuthenticatedUser({
                        bypassCache: true,
                    });
                    if (authUser?.attributes?.sub) {
                        setIsUserAuthenticated(authUser);
                    } else {
                        setIsUserAuthenticated(null);
                    }
                }
                checkUser();
            } catch (e) {
                setIsUserAuthenticated(null);
            }
        }, [])
    );
    const getMeetings = async () => {
        try {
            // setIsLoading(true);
            // printObject('LS:41-->userProfile:\n', userProfile);
            dispatch(
                getAllMeetings({
                    orgId: userProfile.activeOrg.id,
                    code: userProfile.activeOrg.code,
                })
            );
        } catch (error) {
            printObject('LS:51-->getAllMeetings catch error:\n', error);
        } finally {
            // setIsLoading(false);
        }
    };

    useEffect(() => {
        if (
            perms.includes('manage') ||
            perms.includes('meals') ||
            perms.includes('groups') ||
            perms.includes('director') ||
            perms.includes('superuser')
        ) {
            setTeamApproved(true);
        } else {
            if (
                userProfile?.activeOrg?.code === 'mtr' &&
                userProfile?.activeOrg.role === 'guest' &&
                userProfile?.activeOrg.status === 'active'
            ) {
                setTeamApproved(true);
                setGuest(true);
            } else {
                setTeamApproved(false);
            }
        }
    }, [perms]);

    if (isLoading) {
        return (
            <View style={mtrStyles(mtrTheme).activityIndicatorContainer}>
                <ActivityIndicator
                    color={mtrStyles(mtrTheme).activityIndicator}
                    size={80}
                />
            </View>
        );
    }
    if (!isLoading && isUserAuthenticated) {
        // at this point we expect the user to be defined with....
        // printObject('LS:132-->userProfile:\n', userProfile);
        if (!userProfile?.id) {
            // console.log('LS:138 no user profile');
            Auth.signOut()
                .then(() => {
                    // User has been successfully logged out
                    console.log('User has been logged out');
                })
                .catch((error) => {
                    // Handle any errors that occurred during logout
                    console.error('Error logging out:', error);
                });
        }
    }

    return (
        <>
            <StatusBar style='light' />
            <Surface style={mtrStyles(mtrTheme).welcomeSurface}>
                <View style={mtrStyles(mtrTheme).welcomeContainer}>
                    <Text style={mtrStyles(mtrTheme).welcomeText}>WELCOME</Text>
                </View>
                <View style={mtrStyles(mtrTheme).logoContainer}>
                    <Image style={mtrStyles(mtrTheme).logo} source={Logo} />
                </View>
                <View style={mtrStyles(mtrTheme).orgContainer}>
                    <Text style={mtrStyles(mtrTheme).orgText}>
                        {userProfile?.activeOrg?.name}
                    </Text>
                </View>
                {teamApproved && (
                    <>
                        {userProfile?.activeOrg?.heroMessage && (
                            <View style={mtrStyles(mtrTheme).heroContainer}>
                                <Text style={mtrStyles(mtrTheme).heroText}>
                                    {userProfile.activeOrg.heroMessage}
                                </Text>
                            </View>
                        )}
                    </>
                )}
                {!teamApproved && isUserAuthenticated && userProfile?.id && (
                    <>
                        <View style={mtrStyles(mtrTheme).accessContainer}>
                            <Text style={mtrStyles(mtrTheme).accessText}>
                                You do not have authorization to access the
                                default affiliation. Please go to your profile
                                and change your affiliation. Or contact this
                                affiliation leader.
                            </Text>
                        </View>
                    </>
                )}
                {guest && isUserAuthenticated && (
                    <>
                        <View style={mtrStyles(mtrTheme).accessContainer}>
                            <Text style={mtrStyles(mtrTheme).accessText}>
                                If you have a request/access code for an
                                organization, go to your profile and enter the
                                code.
                            </Text>
                        </View>
                    </>
                )}
            </Surface>
        </>
    );
};
export default LandingScreen;
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        activityIndicatorContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {
            color: mtrTheme.colors.lightGraphic,
        },
        welcomeSurface: {
            flex: 1,
        },
        welcomeContainer: {
            marginTop: 20,
        },
        welcomeText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.accent,
            textAlign: 'center',
        },
        logoContainer: {
            alignItems: 'center',
            marginTop: 30,
        },
        logo: {
            width: 240,
            height: 124,
        },
        orgContainer: {
            marginTop: 25,
            alignItems: 'center',
        },
        orgText: {
            fontFamily: 'Merriweather-Bold',
            fontSize: 20,
            color: mtrTheme.colors.landingAppName,
        },
        heroContainer: {
            backgroundColor: mtrTheme.colors.lightGraphic,
            margin: 20,
            borderRadius: 10,
            padding: 10,
        },
        heroText: {
            fontFamily: 'Roboto-Regular',
            marginVertical: 20,
            color: mtrTheme.colors.darkText,
            fontSize: 20,
            fontWeight: '400',
            textAlign: 'center',
        },
        accessContainer: {
            backgroundColor: mtrTheme.colors.warning,
            margin: 20,
            borderRadius: 10,
            padding: 10,
        },
        accessText: {
            fontFamily: 'Roboto-Regular',
            marginVertical: 20,
            color: mtrTheme.colors.darkText,
            fontSize: 20,
            fontWeight: '400',
            textAlign: 'center',
        },
    });
