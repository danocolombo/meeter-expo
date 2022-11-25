import { createContext, useEffect, useState, useContext } from 'react';
import { Autn, DataStore } from 'aws-amplify';
import {
    dateDashMadePretty,
    isDateDashBeforeToday,
    printObject,
} from '../utils/helpers';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [cognitoSub, setCognitoSub] = useState(null);

    const [jwtToken, setJwtToken] = useState(null);

    const loadCognitoInfo = async (user) => {
        setAuthUser(user);
        setCognitoSub(user?.attributes?.sub);
    };
    const setDBUser = async (uSub) => {
        console.log('getUserProfile(uSub):', uSub);
        DataStore.query(User, (profile) => profile.sub('eq', uSub)).then(
            (profiles) => {
                printObject('AC:25__>profiles', profiles);
                return profiles[0];
            }
        );
    };
    const resolveAffiliation = async (AID) => {
        let aff = null;
        DataStore.query(Affiliations, (a) => a.profileID('eq', AID)).then(
            (affiliations) => {
                setAffiliation(affiliations[0]);
                aff = affiliations[0];
            }
        );

        printObject('AC:80-->check affiliation', affiliation);

        if (!affiliation) {
            //   create default affiliation
            //   {label: "Meeter Test System", role: "guest", value: "mtr", profileID: authUser.id}
            if (authUser?.id) {
                const defaultAffiliation = {
                    label: 'Meeter Test System',
                    role: 'guest',
                    value: 'mtr',
                    profileID: authUser.profileID,
                };
                printObject(
                    'AC:52__>making new affiliation:',
                    defaultAffiliation
                );
            } else {
                console.log('WE HAVE AFFILIATION: ', affiliation);
            }
        }
    };

    const authContextRefresh = async () => {
        isAuthComplete = false;
        setUserProfile(null);
        let isAuthenticated = false;
        let profileID = null;
        let cognitoSub = null;
        let cognitoUser = null;
        //   load the cognito user currentAuthenticatedUser
        //todo this will return an error "The user is not authenticated"
        try {
            Auth.currentAuthenticatedUser({ bypassCache: true })
                .then((res) => {
                    isAuthenticated = true;
                    printObject('AC:73-->Auth.currentAuthenticatedUser', res);
                    cognitoUser = res;
                    setAuthUser(res);

                    cognitoSub = res.attributes.sub;
                    //   console.log('AC:77-->cognitoSub:', cognitoSub);
                    Auth.currentSession()
                        .then((res) => {
                            let uProfile = null;
                            DataStore.query(User, (profile) =>
                                profile.sub('eq', cognitoSub)
                            ).then((profiles) => {
                                if (profiles.length < 1) {
                                    const createdProfile = {
                                        sub: cognitoSub,
                                        username:
                                            cognitoUser?.attributes
                                                ?.preferred_username,
                                        firstName:
                                            cognitoUser?.attributes?.given_name,
                                        lastName:
                                            cognitoUser?.attributes
                                                ?.family_name,
                                        email: cognitoUser?.attributes?.email,
                                        defaultClient: 'mtr',
                                        activeClientCode: 'mtr',
                                        activeClientRole: 'guest',
                                        activeClientName: 'Meeter Test Client',
                                    };
                                    printObject(
                                        'AC:100-->createdProfile:\n',
                                        createdProfile
                                    );
                                    //   CREATE NEW USER
                                    DataStore.save(new User(createdProfile))
                                        .then((newProfile) => {
                                            printObject(
                                                'AC:107-->user created:\n',
                                                newProfile
                                            );
                                            setUserProfile(newProfile);
                                        })
                                        .catch((e) =>
                                            printObject(
                                                'create new profile error',
                                                e
                                            )
                                        );
                                }
                                printObject('AC:119-->profiles', profiles);
                                setUserProfile(profiles[0]);
                                profileID = profiles[0]?.id;

                                DataStore.query(Affiliations, (a) =>
                                    a.profileID('eq', profileID)
                                ).then((affiliations) => {
                                    setAffiliations(affiliations);
                                    printObject(
                                        'AS:128-->affiliations:',
                                        affiliations
                                    );
                                    //isAuthComplete = true;
                                });
                                printObject('AC:133-->DONE_DONE');
                            });

                            // let uAffiliation = null;
                            // console.log('aID:', aID);
                            // resolveAffiliation(aID).then((res) => {
                            //     printObject('AS:91-->res:', res);
                            //     uAffiliation = res;
                            //     check++;
                            // });
                            // if (check === 3) {
                            //     isAuthComplete = true;
                            // }
                        })
                        .catch((e) =>
                            printObject('AC:37-->Auth.currentSession error', e)
                        );
                    return true;
                })
                .catch((e) => {
                    printObject('AC:25-->system starting...\n', e);
                    isAuthenticated = false;
                    return false;
                });
        } catch (error) {
            console.log('AC:27-->yep:', error.message);
        }
    };
    //   check for Affiliation

    const getProfile = async () => {
        //   once we get sub (cognito id), check for profile
        DataStore.query(User, (profile) => profile.sub('eq', sub)).then(
            (profiles) => setUserProfile(profiles[0])
        );
    };

    const checkAllAuth = async () => {
        Auth.currentAuthenticatedUser((res) =>
            printObject('AC:176__> currentAuthenticatedUser', res)
        ).catch((e) => printObject('currentAuthenticatedUser error', e));
        Auth.currentSession((res) =>
            printObject('AC:179__> currentSession', res)
        );
    };

    //printObject('AuthContext-->authUser:', authUser);
    return (
        <AuthContext.Provider
            value={{
                authUser,
                cognitoSub,
                loadCognitoInfo,
                setJwtToken,
                jwtToken,
                checkAllAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
