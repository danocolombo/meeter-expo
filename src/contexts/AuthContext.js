import { createContext, useEffect, useState, useContext } from 'react';
import * as queries from '../jerichoQL/queries';
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
            printObject('AC:31-->gqlProfileData:\n', gqlProfileData);
            //*****************************************
            //* check if user has proflile
            //*****************************************
            if (gqlProfileData?.data?.usersBySub?.items[0]?.id) {
                console.log('IF---- where we belong');
                const gqlProfile = gqlProfileData.data.usersBySub.items[0];
                //      set activeOrg based on profile defaultOrg and affiliations
                let clientData = {};
                if (gqlProfile?.defaultOrg?.id) {
                    clientData = gqlProfile.affiliations.items.filter(
                        (a) => a.organization.id === gqlProfile.defaultOrg.id
                    );
                }
                let client = {};
                let activeOrg = {};
                if (clientData.length > 0) {
                    //* affiliation found...
                    client = clientData[0];
                    activeOrg = {
                        id: client.organization.id,
                        code: client.organization.code,
                        name: client.organization.name,
                        heroMessage: client.organization.heroMessage,
                        role: client.role,
                        status: client.status,
                    };
                } else {
                    //* this is default, no affiliations
                    activeOrg = {
                        id: MEETER_DEFAULTS.ORGANIZATION_ID,
                        code: MEETER_DEFAULTS.CODE,
                        name: MEETER_DEFAULTS.NAME,
                        heroMessage: MEETER_DEFAULTS.HERO_MESSAGE,
                        role: MEETER_DEFAULTS.ROLE,
                        status: 'active',
                    };
                }
                printObject('AC:68-->activeOrg:\n', activeOrg);
                const updatedProfile = { ...gqlProfile, activeOrg };
                return updatedProfile;
            } else {
                console.log('ELSE---HELP');
                //todo: what does it look like when new user and no profile?
                //todo------------------------------------------------------
                const activeOrg = {
                    id: MEETER_DEFAULTS.ORGANIZATION_ID,
                    code: MEETER_DEFAULTS.CODE,
                    name: MEETER_DEFAULTS.NAME,
                    heroMessage: MEETER_DEFAULTS.HERO_MESSAGE,
                    role: 'guest',
                    status: 'active',
                };
                const updatedProfile = { activeOrg };
                return updatedProfile;
            }
        } catch (error) {
            printObject('AC:87-->theUserInfo TryCatch failure:\n', error);
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
