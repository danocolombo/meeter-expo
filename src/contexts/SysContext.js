import { createContext, useEffect, useState, useContext } from 'react';
import * as queries from '../graphql/queries';
import { API } from 'aws-amplify';

//import { DataStore } from '@aws-amplify/datastore';
//import { System } from '../models';
import { printObject } from '../utils/helpers';

const SysContext = createContext({});

const SysContextProvider = ({ children }) => {
    const [meeter, setMeeter] = useState(null);
    const [defaultGroups, setDefaultGroups] = useState([]);
    useEffect(() => {
        getDefaultGroups();
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
    const getDefaultGroups = async () => {
        const DefaultGroups = [
            {
                id: '834f0f09-f98d-42e7-a78c-dcca56sje82b',
                gender: 'x',
                title: 'Newcomers',
                location: 'Main',
                facilitator: 'Dick & Jane',
            },
            {
                id: '67e30f09-f98d-42e7-a78c-dcca5j2ld-99a',
                gender: 'f',
                title: 'A-Z',
                location: 'Room 9',
                facilitator: 'Mary',
            },
            {
                id: '9sw12hf09-f98d-42e7-a78c-dcca5f99f317',
                gender: 'f',
                title: 'Grief',
                location: 'Room 1',
                facilitator: 'Suz',
            },
            {
                id: '3i8734f09-f98d-42e7-a78c-dcca88dm3di7',
                gender: 'm',
                title: 'A-Z',
                location: 'Room 3',
                facilitator: 'Jon',
            },
        ];
        setDefaultGroups(DefaultGroups);
    };
    //printObject('AuthContext-->authUser:', authUser);
    return (
        <SysContext.Provider
            value={{ meeter, loadSystem, sysSignOut, defaultGroups }}
        >
            {children}
        </SysContext.Provider>
    );
};

export default SysContextProvider;

export const useSysContext = () => useContext(SysContext);
