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

    const clearUser = async () => {
        setUserProfile(null);
    };
    const saveUserProfile = async (profile) => {
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
        if (!resultantProfile) {
            return;
        }
        const userLocation = {
            id: userProfile?.location?.id,
            street: resultantProfile.location.street,
            city: resultantProfile.location.city,
            stateProv: resultantProfile.location.stateProv,
            postalCode: resultantProfile?.location?.postalCode,
        };
        const updatedUserLocation = await API.graphql({
            query: mutations.updateLocation,
            variables: {
                input: userLocation,
            },
        });
        const userData = {
            id: userProfile.id,
            phone: resultantProfile?.phone,
            birthday: resultantProfile?.birthday.slice(0, 10),
            shirt: resultantProfile?.shirt,
            picture: resultantProfile?.picture,
        };
        let combinedProfile = {};
        try {
            // const updatedUser = await API.graphql({
            //     query: mutations.updateUserProfile,
            //     variables: { input: userData },
            // });
            const updatedUser = await API.graphql({
                query: mutations.updateUser,
                variables: { input: userData },
            });
            combinedProfile = { ...userProfile, updatedUser };
        } catch (error) {
            printObject('UC:58-->ERROR updateUserProfile:\n', error);
        }
        printObject('UC:34-->combinedProfile:\n', combinedProfile);
        console.info('UC:58-->Profile Updated');
    };
    const passValue = async (sub) => {
        console.log('UC:62-->passValue(sub):', sub);
    };

    return (
        <UserContext.Provider
            value={{
                userProfile,
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
