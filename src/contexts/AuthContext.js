import { createContext, useEffect, useState, useContext } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';
import { printObject } from '../utils/helpers';

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);
    const sub = authUser?.attributes?.sub;

    useEffect(() => {
        try {
            Auth.currentAuthenticatedUser({ bypassCache: true })
                .then(setAuthUser)
                .catch((e) => printObject('system starting...'));
        } catch (error) {
            console.log('yep:', error.message);
        }
    }, []);

    useEffect(() => {
        DataStore.query(User, (user) => user.sub('eq', sub)).then((users) =>
            setDbUser(users[0])
        );
    }, [sub]);
    //printObject('AuthContext-->authUser:', authUser);
    return (
        <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
