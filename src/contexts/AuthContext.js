import { createContext, useEffect, useState, useContext } from 'react';
import * as queries from '../corinthQL/queries';
import { MEETER_DEFAULTS } from '../constants/meeter';
import { API } from 'aws-amplify';
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

    const authSignOut = async () => {
        setAuthUser(null);
        setCognitoSub(null);
        setJwtToken(null);
    };

    const defineUser = async (sub) => {
        try {
            //      get graphQL user
            const gqlProfileData = await API.graphql({
                query: queries.usersBySub,
                variables: { sub: sub },
            });
            const gqlProfile = gqlProfileData.data.usersBySub.items[0];
            //      set activeOrg based on profile defaultOrg and affiliations
            const clientData = gqlProfile.affiliations.items.filter(
                (a) => a.organization.id === gqlProfile.defaultOrg.id
            );
            const client = clientData[0];
            const activeOrg = {
                id: client.organization.id,
                code: client.organization.code,
                name: client.organization.name,
                heroMessage: client.organization.heroMessage,
                role: client.role,
                status: client.status,
            };
            const updatedProfile = { ...gqlProfile, activeOrg };
            return updatedProfile;
            //todo: what does it look like when new user and no profile?
            //todo------------------------------------------------------
        } catch (error) {
            printObject('AC:34-->theUserInfo TryCatch failure:\n', error);
            return;
        }
    };

    const clearAuthUser = () => {
        setAuthUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                authUser,
                cognitoSub,
                setJwtToken,
                jwtToken,

                clearAuthUser,
                authSignOut,
                defineUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
