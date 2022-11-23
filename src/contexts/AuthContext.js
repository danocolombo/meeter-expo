import { createContext, useEffect, useState, useContext } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { Profile } from '../models';
import { printObject } from '../utils/helpers';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    //   cognitoUser
    const [authUser, setAuthUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    const sub = authUser?.attributes?.sub;

    useEffect(() => {
        //   load the cognito user
        try {
            Auth.currentAuthenticatedUser({ bypassCache: true })
                .then(setAuthUser)
                .catch((e) => printObject('system starting...'));
        } catch (error) {
            console.log('yep:', error.message);
        }
    }, []);

    useEffect(() => {
        //   once we get sub (cognito id), check for profile
        DataStore.query(Profile, (profile) => profile.sub('eq', sub)).then(
            (profiles) => setUserProfile(profiles[0])
        );
    }, [sub]);
    //printObject('AuthContext-->authUser:', authUser);
    return (
        <AuthContext.Provider
            value={{ authUser, userProfile, sub, setUserProfile }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
