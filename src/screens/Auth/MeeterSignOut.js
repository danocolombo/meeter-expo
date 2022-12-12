import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { useAuthContext } from '../../contexts/AuthContext';
import { logout } from '../../features/usersSlice';
import { logout as meetingsSignout } from '../../features/meetingsSlice';
import { logout as profilesLogout } from '../../features/profilesSlice';
import { logout as systemLogout } from '../../features/systemSlice';
import { printObject } from '../../utils/helpers';
const MeeterSignOut = (props) => {
    const { setJwtToken, clearAuthUser } = useAuthContext();
    const action = props?.action;
    const dispatch = useDispatch();
    //console.log('ACTION:', action);
    useEffect(() => {
        try {
            dispatch(logout());
            dispatch(meetingsSignout());
            dispatch(profilesLogout());
            dispatch(systemLogout());
            setJwtToken(null);
            clearAuthUser();
            Auth.signOut().then(() =>
                console.log('Auth.signOut() complete').catch((e) => {
                    printObject('error Auth.signOut:', e);
                })
            );
        } catch (error) {
            printObject('MSO:28-->error trying to logout', error);
        }
    }, []);

    return (
        <View>
            <Text>AmplifySignOut</Text>
        </View>
    );
};

export default MeeterSignOut;
