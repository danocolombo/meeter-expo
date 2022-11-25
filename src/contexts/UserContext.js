import { createContext, useEffect, useState, useContext } from 'react';
import { DataStore } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react-native/dist/Storage';
import { User, Affiliations } from '../models';
import { useAuthContext } from './AuthContext';
import { printObject } from '../utils/helpers';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const { authUser, cognitoSub } = useAuthContext();
    const [userProfile, setUserProfile] = useState(null);
    const [userAffiliates, setUserAffiliates] = useState(null);
    const [currentRole, setCurrentRole] = useState('guest');
    const loadUserProfile = async () => {
        //printObject('UC:14__> loadUserProfile variable: ', sub);

        const theUser = {
            sub: authUser?.attributes?.sub,
            firstName: authUser?.attributes?.given_name,
            lastName: authUser?.attributes?.family_name,
            login: authUser?.attributes?.preferred_username,
            email: authUser?.attributes?.email,
        };

        await DataStore.query(User, (u) =>
            u.sub('eq', authUser?.attributes?.sub)
        )
            .then((profile) => {
                printObject('UC:27__> profile(User entry)', profile);
                setUserProfile({ ...theUser, ...profile[0] });
            })
            .catch((e) => {
                printObject('UC:30__> Error getting User data:\n', e);
            });
        DataStore.query(Affiliations)
            .then((res) => printObject('ALL_AFFS:', res))
            .catch((e) => printObject('AFFS_E', e));
        await DataStore.query(Affiliations, (a) =>
            a.userID('eq', userProfile.id)
        )
            .then((affs) => {
                printObject('UC:39__>userProfile.id:', userProfile.id);
                printObject('UC:39__> affiliates', affs);
                setUserAffiliates(affs);
            })
            .catch((e) => {
                printObject('UC:30__> Error getting Affiliates data:\n', e);
            });
    };
    return (
        <UserContext.Provider
            value={{
                userProfile,
                currentRole,
                loadUserProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);
