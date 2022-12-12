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
    const { authUser, defineUser } = useAuthContext();
    const { userProfile, saveUserProfile, passValue } = useUserContext();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
        });
    }, [navigation, meeter]);

    async function getUserDefined() {
        const cau = await Auth.currentAuthenticatedUser();
        const user = await defineUser(cau.attributes.sub);
        saveUserProfile(user);
        console.log('LS:147-->user:', user);
    }

    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (!userProfile?.activeOrg?.id) {
            setIsLoading(true);
            console.log('LS:179-->before');
            getUserDefined();
            // .then(() => {
            //     console.log('LS:180-->then');
            //     console.log('LS:184-->userProfile:\n', userProfile);
            // })
            // .catch((e) => {
            //     console.log('LS:187-->catch:', e);
            // });
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

                <>
                    <View style={mtrTheme.landingHeroMessageContainer}>
                        <Text style={mtrTheme.landingHeroMessageText}>
                            {userProfile?.activeOrg?.heroMessage}
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
