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
//      ====================================
//      FUNCTION START
const LandingScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [teamApproved, setTeamApproved] = useState(false);
    const [guest, setGuest] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [access, setAccess] = useState(false);
    const userProfile = useSelector((state) => state.user.profile);
    const meeting = useSelector((state) => state.system);
    const perms = useSelector((state) => state.user.perms);
    const meeter = useSelector((state) => state.system.meeter);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName,
        });
    }, [navigation, meeter]);

    useFocusEffect(
        useCallback(() => {
            if (userProfile?.activeOrg?.id) {
                dispatch(loadDefaultGroups({ id: userProfile.activeOrg.id }));
            }
        }, [])
    );
    useEffect(() => {
        // printObject('LS:48-->perms:\n', perms);
        // printObject('LS:44-->userProfile:\n', userProfile);
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
    // useEffect(() => {
    //     // check if authenticated and no profile
    //     if (!userProfile?.id) {
    //         handleInfoRequest().then(() => console.log('systme ready'));
    //     }
    //     if (userProfile?.activeOrg?.status !== 'active') {
    //         // console.log('LS:102-->NOT ACTIVE');
    //         printObject('LS:68-->userProfile?:', userProfile);
    //         setAccess(false);
    //         setTeamApproved(false);
    //     } else {
    //         if (
    //             perms.includes('manage') ||
    //             perms.includes('meals') ||
    //             perms.includes('groups') ||
    //             perms.includes('director') ||
    //             perms.includes('superuser')
    //         ) {
    //             setAccess(true);
    //             setTeamApproved(true);
    //         }
    //     }
    // }, []);
    const handleInfoRequest = async () => {
        // printObject('<LS:109></LS:109>-->systemInfo:\n', systemInfo);
        // printObject('LS:110-->teamInfo:\n', teamInfo);
        // printObject('LS:111-->userProfile:\n', userProfile);
        try {
            const cau = await Auth.currentAuthenticatedUser();
            // printObject('LS:114-->Auth.currentAuthenticatedUser\n', cau);
            dispatch(loginUser(cau));
        } catch (error) {
            console.log('no authenticated user');
            Auth.signOut();
        }
    };

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
    // printObject('LS:131-->systemRedux:\n', sysRedux);
    // printObject('LS:138-->systemInfo:\n', systemInfo);
    // printObject('LS:139-->teamInfo:\n', teamInfo);
    // printObject('LS:140-->userProfile:\n', userProfile);
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
                {!teamApproved && (
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
                {guest && (
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
