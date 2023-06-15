import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useUserContext } from '../contexts/UserContext';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import systemSlice from '../features/systemSlice';
import NewMembers from '../screens/team/NewMembers.tab';
import ActiveMembers from '../screens/team/ActiveMembers.tab';
import InactiveMembers from '../screens/team/InactiveMembers.tab';
const BottomTab = createBottomTabNavigator();
const TeamConfig = () => {
    const mtrTheme = useTheme();
    const { userProfile } = useUserContext();
    const { appName } = useSelector((state) => state.system);
    let director = false;
    if (userProfile?.ActiveOrg?.affiliations.active.role === 'director') {
        director = true;
    }

    return (
        <BottomTab.Navigator
            initialRouteName='ActiveMembers'
            screenOptions={{
                headerShown: false,
            }}
        >
            <BottomTab.Screen
                name='NewMembers'
                id='NEW'
                component={NewMembers}
                options={{
                    title: appName,
                    id: 'NEW_MEMBERS',
                    tabBarLabel: ({ focused, color, fontSize }) => (
                        <Text
                            style={{
                                color: focused ? 'white' : 'black',
                                fontSize: 14,
                                fontWeight: '500',
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            New Requests
                        </Text>
                    ),
                    tabBarActiveBackgroundColor: 'lightgrey',
                    tabBarInactiveBackgroundColor: 'yellow',
                    tabBarIcon: ({ focused, color, size }) => (
                        <AntDesign
                            name='caretleft'
                            size={14}
                            color={focused ? 'white' : 'black'}
                        />
                    ),
                }}
            />

            <BottomTab.Screen
                name='ActiveMembers'
                id='ACTIVE'
                component={ActiveMembers}
                options={{
                    title: appName,
                    id: 'ACTIVE_MEMBERS',
                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={{
                                color: focused ? 'white' : 'black',
                                fontSize: 14,
                                fontWeight: '500',
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            ACTIVE
                        </Text>
                    ),
                    tabBarActiveBackgroundColor: 'green',
                    tabBarInactiveBackgroundColor: 'lightgrey',
                    tabBarIcon: ({ focused, color, size }) => (
                        <AntDesign
                            name='caretright'
                            size={14}
                            color={focused ? 'white' : 'black'}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name='InactiveMembers'
                id='INACTIVE'
                component={InactiveMembers}
                options={{
                    title: appName,
                    id: 'INACTIVE_MEMBERS',
                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={{
                                color: focused ? 'white' : 'black',
                                fontSize: 14,
                                fontWeight: '500',
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            INACTIVE
                        </Text>
                    ),
                    tabBarActiveBackgroundColor: 'green',
                    tabBarInactiveBackgroundColor: 'lightgrey',
                    tabBarIcon: ({ focused, color, size }) => (
                        <AntDesign
                            name='caretright'
                            size={14}
                            color={focused ? 'white' : 'black'}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export default TeamConfig;
