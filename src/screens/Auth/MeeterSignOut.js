import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { logout as groupsLogout } from '../../features/groups/groupsSlice';
import { logout as userLogout } from '../../features/user/userSlice';
import { logout as meetingsLogout } from '../../features/meetings/meetingsSlice';
import { logout as teamLogout } from '../../features/team/teamSlice';
import { logout as systemLogout } from '../../features/system/systemSlice';
import { printObject } from '../../utils/helpers';
const MeeterSignOut = (props) => {
    const action = props?.action;
    const dispatch = useDispatch();
    useEffect(() => {
        const signOutAndClearRedux = async () => {
            try {
                // Dispatch all the logout actions concurrently
                const logoutActions = [
                    dispatch(groupsLogout()),
                    dispatch(meetingsLogout()),
                    dispatch(teamLogout()),
                    dispatch(systemLogout()),
                    dispatch(userLogout()),
                ];

                // Wait for all logout actions to complete
                await Promise.all(logoutActions);

                // Once all Redux dispatches are complete, sign out from AWS
                await Auth.signOut();

                console.log('Auth.signOut() complete');
            } catch (error) {
                printObject('MSO:28-->error trying to logout', error);
            }
        };

        // Call the async function to perform logout
        signOutAndClearRedux();
    }, []);

    return (
        <View>
            <Text>AmplifySignOut</Text>
        </View>
    );
};

export default MeeterSignOut;
