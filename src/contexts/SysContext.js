import { createContext, useEffect, useState, useContext } from 'react';
import { DataStore } from 'aws-amplify';
import { System } from '../models';
import { printObject } from '../utils/helpers';

const SysContext = createContext({});

const SysContextProvider = ({ children }) => {
    const [meeter, setMeeter] = useState(null);

    useEffect(() => {
        DataStore.query(System).then(setMeeter);
    }, []);
    //printObject('AuthContext-->authUser:', authUser);
    return (
        <SysContext.Provider value={{ meeter }}>{children}</SysContext.Provider>
    );
};

export default SysContextProvider;

export const useSysContext = () => useContext(SysContext);
