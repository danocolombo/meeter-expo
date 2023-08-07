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
import { useSelector, useDispatch } from 'react-redux';
import {
    useNavigation,
    useIsFocused,
    useFocusEffect,
} from '@react-navigation/native';
import Logo from '../../assets/M-square.png';
import {
    Surface,
    withTheme,
    useTheme,
    ActivityIndicator,
} from 'react-native-paper';
import { dateNumToDateDash, printObject } from '../utils/helpers';
import { StatusBar } from 'expo-status-bar';
import { Auth } from 'aws-amplify';
import { loginUser } from '../features/user/userThunks';
import { loadDefaultGroups } from '../features/groups/groupsThunks';
//      ====================================
//      FUNCTION START
const LandingScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [teamApproved, setTeamApproved] = useState(false);
    const [activeMeeting, setActiveMeeting] = useState();
    const [nextMeeting, setNextMeeting] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const userProfile = useSelector((state) => state.user.profile);
    const [welcomeMessage, setWelcomeMessage] = useState(
        userProfile?.activeOrg?.heroMessage
    );
    const [systemData, setSystemData] = useState(
        useSelector((state) => state.system)
    );
    const sysRedux = useSelector((state) => state.system);
    const meeter = useSelector((state) => state.system.meeter);
    const systemInfo = useSelector((state) => state.system);
    const teamInfo = useSelector((state) => state.team);
    const userInfo = useSelector((state) => state.user);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
        });
    }, [navigation, meeter]);

    useFocusEffect(
        useCallback(() => {
            if (userProfile?.activeOrg?.heroMessage) {
                setWelcomeMessage(userProfile?.activeOrg?.heroMessage);
            } else {
                setWelcomeMessage('Welcome...');
            }
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
    // printObject('LS:131-->systemRedux:\n', sysRedux);
    // printObject('LS:138-->systemInfo:\n', systemInfo);
    // printObject('LS:139-->teamInfo:\n', teamInfo);
    // printObject('LS:140-->userProfile:\n', userProfile);
    return (
        <>
            <StatusBar style='light' />
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
                        {userProfile?.activeOrg?.organization?.name}
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
                {teamApproved && (
                    <>
                        {userProfile?.activeOrg?.heroMessage && (
                            <View style={mtrTheme.landingHeroMessageContainer}>
                                <Text style={mtrTheme.landingHeroMessageText}>
                                    {userProfile.activeOrg.heroMessage}
                                </Text>
                            </View>
                        )}
                    </>
                )}
                {!teamApproved && (
                    <>
                        <View style={mtrTheme.landingHeroMessageContainer}>
                            <Text style={mtrTheme.landingHeroMessageText}>
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
