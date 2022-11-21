import { createContext, useEffect, useState, useContext } from 'react';
import { DataStore } from 'aws-amplify';
import { MeeterSystem } from '../models';
import { printObject } from '../utils/helpers';

const SysContext = createContext({});

const SysContextProvider = ({ children }) => {
    const [systemDef, setSystemDef] = useState(null);

    useEffect(() => {
        DataStore.query(MeeterSystem).then((vers) => setSystemDef(vers[0]));
    }, []);
    //printObject('AuthContext-->authUser:', authUser);
    return (
        <SysContext.Provider value={{ systemDef }}>
            {children}
        </SysContext.Provider>
    );
};

export default SysContextProvider;

export const useSysContext = () => useContext(SysContext);
