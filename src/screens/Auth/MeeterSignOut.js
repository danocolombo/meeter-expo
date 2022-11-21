import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { logout } from '../../features/usersSlice';
import { logout as meetingsSignout } from '../../features/meetingsSlice';
import { logout as profilesLogout } from '../../features/profilesSlice';
import { logout as systemLogout } from '../../features/systemSlice';
const MeeterSignOut = (props) => {
    const action = props?.action;
    const dispatch = useDispatch();
    //console.log('ACTION:', action);
    useEffect(() => {
        dispatch(logout());
        dispatch(meetingsSignout());
        dispatch(profilesLogout());
        dispatch(systemLogout());
        Auth.signOut();
    }, []);

    return (
        <View>
            <Text>AmplifySignOut</Text>
        </View>
    );
};

export default MeeterSignOut;
