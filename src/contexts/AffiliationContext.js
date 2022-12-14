import { createContext, useEffect, useState, useContext } from 'react';
// import { DataStore } from '@aws-amplify/datastore';
// import { Affiliations } from '../models';
import { printObject } from '../utils/helpers';

const AffiliationContext = createContext({});

const AffiliationContextProvider = ({ children }) => {
    //   check for Affiliation
    const [userAffiliations, setUserAffiliations] = useState(null);

    const refreshAffiliations = async (profileId) => {
        console.log('AffiliationContext:13-->not implemented');
        // DataStore.query(Affiliations, (affs) =>
        //     affs.profileID('eq', profileId)
        // ).then(setUserAffiliations);
    };
    return (
        <AffiliationContext.Provider
            value={{
                userAffiliations,
                refreshAffiliations,
            }}
        >
            {children}
        </AffiliationContext.Provider>
    );
};

export default AffiliationContextProvider;

export const useAffiliationContext = () => useContext(AffiliationContext);
