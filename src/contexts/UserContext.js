import { createContext, useEffect, useState, useContext } from 'react';
import { DataStore } from 'aws-amplify';
import { User } from '../models';
import { useAuthContext } from './AuthContext';
import { printObject } from '../utils/helpers';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const { authUser, cognitoSub } = useAuthContext();
    const [userProfile, setUserProfile] = useState(null);
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
                setUserProfile({ ...theUser, ...profile[0] });
            })
            .catch((e) => {
                printObject('UC:30__> Error getting User data:\n', e);
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
