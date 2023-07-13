import { createContext, useEffect, useState, useContext } from 'react';
// import { DataStore } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../jerichoQL/mutations';
import { useAuthContext } from './AuthContext';
import { MEETER_DEFAULTS } from '../constants/meeter';
import { printObject } from '../utils/helpers';
import { defaultFallbackFonts } from 'react-native-render-html';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [perms, setPerms] = useState([]);
    const clearUser = async () => {
        setUserProfile(null);
        setPerms([]);
    };
    const saveUserProfile = async (profile) => {
        let p = [];
        async function defineAuthority() {
            const applicableAffiliations = profile?.affiliations?.items.filter(
                (item) => item?.organization?.id === profile?.activeOrg?.id
            );

            applicableAffiliations.forEach((perm) => {
                // printObject('UC:29-->perm', perm);
                if (perm.status === 'active' && perm.role !== 'guest') {
                    p.push(perm.role);
                }
            });
        }
        defineAuthority();
        // printObject('UC:29-->perms:\n', p);
        setPerms(p);

        setUserProfile(profile);
    };
    const updateHeroMessage = async (theMessage) => {
        let heroMessage = theMessage;
        let originalActiveOrg = userProfile.activeOrg;
        let activeOrg = { ...originalActiveOrg, heroMessage };
        let updateValues = { ...userProfile, activeOrg };
        // console.log('#########################');
        // printObject('UC:25-->updateValues:\n', updateValues);
        // console.log('#########################');

        setUserProfile(updateValues);
    };
    const updateUserProfile = async (resultantProfile) => {
        // printObject('UC:55-->resultantProfile:\n', resultantProfile);
        if (!resultantProfile) {
            return;
        }

        setUserProfile(resultantProfile);
    };
    const passValue = async (sub) => {
        console.log('UC:62-->passValue(sub):', sub);
    };

    return (
        <UserContext.Provider
            value={{
                userProfile,
                perms,
                setUserProfile,
                saveUserProfile,
                updateUserProfile,
                passValue,
                clearUser,
                updateHeroMessage,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);
