import React, {
    useEffect,
    useState,
    useLayoutEffect,
    useCallback,
} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    Alert,
    FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { useSelector, useDispatch } from 'react-redux';
import {
    useNavigation,
    useIsFocused,
    useFocusEffect,
} from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import * as SplashScreen from 'expo-splash-screen';
import Logo from '../../assets/M-square.png';
import CustomButton from '../components/ui/CustomButton';
// import { Colors } from '../constants/colors';
import {
    Surface,
    withTheme,
    useTheme,
    ActivityIndicator,
} from 'react-native-paper';
import { dateNumToDateDash, printObject } from '../utils/helpers';
//import MeetingListCard from '../components/Meeting.List.Card';
import { useAuthContext } from '../contexts/AuthContext';
import { useUserContext } from '../contexts/UserContext';
import { useSysContext } from '../contexts/SysContext';
import { useAffiliationContext } from '../contexts/AffiliationContext';
import profilesSlice from '../features/profilesSlice';

//      ====================================
//      FUNCTION START
const LandingScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [activeMeeting, setActiveMeeting] = useState();
    const [nextMeeting, setNextMeeting] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { meeter, heroMessage } = useSysContext();
    const { resolveCognitoUser, authUser } = useAuthContext();
    const { userProfile, saveUserProfile, defineUserProfile } =
        useUserContext();

    const authorizeUser = async (u) => {
        let currentUserInfo;
        console.log('LS:61--authorizeUser: user\n', u);
        Auth.currentUserInfo()
            .then((u) => {
                currentUserInfo = u;
                printObject('LS:62-->currentUserInfo response:\n', u);
                return;
                if (u?.attributes?.sub) {
                    //      get the profile from graphQL
                    resolveCognitoUser(u?.attributes?.sub)
                        .then((user) => {
                            printObject(
                                'LS:64--> resolvedCognitoUser:\n',
                                user
                            );
                            //      set the activeSession
                            defineUserProfile(user).then((uProfile) => {
                                printObject(
                                    'LS:68-->defineUserProfile complete:\n',
                                    uProfile
                                );
                            });

                            // setProfile(user);
                        })
                        .catch((error) => {
                            printObject(
                                'LS:75-->Error resolving cognito user:\n',
                                error.message
                            );
                        });
                } else {
                    console.log('NONONONONO USERUSERUSERUSERUSER');
                }

                return;
            })
            .catch((error) => {
                printObject('LS:88-->Auth.currentUserInfo failure:\n', error);
            });
    };
    const authorizeUser1 = async (user) => {
        let currentUserInfo;
        let currentSession;

        Auth.currentUserInfo().then((u) => {
            currentUserInfo = u;
            if (u?.attributes?.sub) {
                // printObject('LS:62-->currentUserInfo response:\n', u);
                loadCognitoInfo(u)
                    .then(() => {
                        // console.log('loadCognitoInfo success');
                        loadUserProfile()
                            .then((response) =>
                                console.log('LS:67-->loadUserProfile success')
                            )
                            .catch((e) =>
                                console.log('LS:70-->loadUserProfile error:', e)
                            );

                        // console.log('LS:73-->authorizeUser complete');
                    })
                    .catch((e) => {
                        printObject(
                            'LS:77--> error setting Cognito User in Auth Context',
                            e
                        );
                        setIsLoading(false);
                    });
            } else {
                console.log('LS:130-->>> NOOOOOO SSSSUUUUUUUUUBBBB');
            }
        });
        Auth.currentSession().then((data) => {
            currentSession = data;
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
        });
    }, [navigation, meeter]);

    const checkUserStatus = async () => {
        console.log('LS:146-->checkUserStatus start');
        Auth.currentAuthenticatedUser()
            .then((u) => {
                console.log('LS:148-->currentAuthenticatedUser:\n', u);

                if (u?.attributes?.sub) {
                    console.log('LS:149-->sub:', u.attributes.sub);
                    authorizeUser(u)
                        .then((au) => {
                            printObject('LS:150-->au response', au);
                            console.log('LS:151__authorizeUser then...');
                            return au;
                        })
                        .catch((e) => {
                            setIsLoading(false);
                            printObject('LS: 156--> error authorizing:', e);
                            return e;
                        });
                } else {
                    console.warn('LS:164-no cognito sub');
                }
            })
            .catch((response) => {
                navigation.navigate('SignIn');
            });
    };

    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (!userProfile?.activeSesson?.id) {
            setIsLoading(true);
            checkUserStatus()
                .then((res) => {
                    console.log('LS:178-->checkUserStatus complete');
                    console.log('LS:179-->userProfile:', userProfile);
                })
                .catch((e) => {
                    printObject('LS:182-->checkUserStatus error:\n', e);
                });
            setIsLoading(false);
        }
    }, []);
    if (isLoading) {
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
            <Surface style={styles.welcomeSurface}>
                <View style={{ marginTop: 20 }}>
                    <Text style={mtrTheme.screenTitle}>WELCOME</Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Image style={styles.logo} source={Logo} />
                </View>
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                    <Text
                        style={{
                            fontFamily: 'Merriweather-Bold',
                            fontSize: 20,
                            color: mtrTheme.colors.landingAppName,
                        }}
                    >
                        {userProfile?.activeSession?.organization?.name}
                    </Text>
                </View>

                {/* <>
                    <View style={{ marginTop: 10 }}>
                        <Text style={mtrTheme.landingAnnouncement}>
                            Next Meeting...
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <MeetingListCard
                            meeting={activeMeeting}
                            active={true}
                        />
                    </View>r
                </> */}

                <>
                    <View style={mtrTheme.landingHeroMessageContainer}>
                        <Text style={mtrTheme.landingHeroMessageText}>
                            {userProfile?.activeSession?.heroMessage}
                        </Text>
                    </View>
                </>

                {/* {userProfile?.activeSession?.heroMessage && (
                    <View style={mtrTheme.landingHeroMessageContainer}>
                        <Text style={mtrTheme.landingHeroMessageText}>
                            {userProfile?.firstName} {userProfile.lastName}
                        </Text>
                        <Text style={mtrTheme.landingHeroMessageText}>
                            {userProfile?.sub}
                        </Text>
                        <Text style={mtrTheme.landingHeroMessageText}>
                            {userProfile?.userActiveOrgId}
                        </Text>
                    </View>
                )} */}

                {userProfile?.ActiveOrg?.heroMessage && (
                    <>
                        <View style={mtrTheme.landingHeroMessageContainer}>
                            <Text style={mtrTheme.landingHeroMessageText}>
                                {userProfile?.ActiveOrg?.heroMessage}
                            </Text>
                        </View>
                    </>
                )}
            </Surface>
        </>
    );
};
export default withTheme(LandingScreen);
const styles = StyleSheet.create({
    bgImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 240,
        height: 124,
    },
    heroImageContainer: {
        // flexDirection: 'column',
        marginTop: 10,

        justifyContent: 'center',
        alignItems: 'center',
        // height: '100%',
    },
    mainTextContainer: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    subTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 34,
        letterSpacing: 0.5,
        fontWeight: '600',
        // color: 'white',
        textAlign: 'center',
    },
    announcement: {
        marginTop: 20,
        color: 'white',
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        // color: 'white',
    },
    affiliateHeader: {
        paddingTop: 20,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleText: {
        paddingBottom: 20,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    infoText: {
        // color: 'white',
        fontSize: 24,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '85%',
        height: '65%',
    },
    modalContainer: {
        marginTop: '200',
        // alignSelf: 'flex-end',
    },
    welcomeSurface: {
        flex: 1,
        // padding: 12,
        // marginVertical: 8,
        // backgroundColor: Colors.primary500,
        // marginHorizontal: 10,
        // justifyContent: 'space-between',
        // borderRadius: 10,
        // elevation: 5,
        // shadowColor: 'grey',
        // shadowRadius: 8,
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.6,
    },
    modalSurface: {
        marginTop: '50%',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        // elevation: 3,
        shadowColor: 'grey',
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    modalInfoWrapper: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    modalTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalButtonContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalButtonWrapper: {
        marginHorizontal: 10,
    },
});
