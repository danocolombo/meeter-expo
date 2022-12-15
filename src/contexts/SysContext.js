import { createContext, useEffect, useState, useContext } from 'react';
import * as queries from '../graphql/queries';
import { API } from 'aws-amplify';

//import { DataStore } from '@aws-amplify/datastore';
//import { System } from '../models';
import { printObject } from '../utils/helpers';

const SysContext = createContext({});

const SysContextProvider = ({ children }) => {
    const [meeter, setMeeter] = useState(null);

    useEffect(() => {
        // DataStore.query(System).then(setMeeter);
    }, []);
    const sysSignOut = async () => {
        try {
            console.log('CHKCHKCHKCHK');
            if (meeter) {
                console.log('YEPYEPYEP');
                setMeeter(null);
                console.log('SC:23--> after setMeeter(null)');
                return true;
            }
        } catch (error) {
            printObject('SC:21-->error sysSignOut:\n', error);
            return false;
        }
    };
    const loadSystem = async () => {
        //      pull the initial information from DB
        try {
            const systemInfo = await API.graphql({
                query: queries.listSystems,
                variables: { limit: 1 },
            });
            const systemVariables = systemInfo?.data?.listSystems?.items[0];
            delete systemVariables?.id;
            delete systemVariables?.createdAt;
            delete systemVariables?.updatedAt;
            setMeeter(systemVariables);
        } catch (error) {
            printObject('SC:31-->systemInfo TryCatch failure:\n', error);
            return;
        }
    };
    //printObject('AuthContext-->authUser:', authUser);
    return (
        <SysContext.Provider value={{ meeter, loadSystem, sysSignOut }}>
            {children}
        </SysContext.Provider>
    );
};

export default SysContextProvider;

export const useSysContext = () => useContext(SysContext);
