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
    const [isLoading, setIsLoading] = useState(false);
    const userProfile = useSelector((state) => state.user.profile);
    const meeting = useSelector((state) => state.system);

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
        // check if authenticated and no profile
        if (!userProfile?.id) {
            handleInfoRequest().then(() => console.log('good'));
        }
        if (userProfile?.activeOrg?.status !== 'active') {
            // console.log('LS:102-->NOT ACTIVE');
            setTeamApproved(false);
        } else {
            setTeamApproved(true);
        }
    }, []);
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
    printObject('LS:140-->userProfile:\n', userProfile);
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
                        <View style={mtrStyles(mtrTheme).heroContainer}>
                            <Text style={mtrStyles(mtrTheme).heroText}>
                                You do not have authorization to access the
                                default affiliation. Please go to your profile
                                and change your affiliation.
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
    });
