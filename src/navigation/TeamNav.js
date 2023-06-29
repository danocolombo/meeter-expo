import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useUserContext } from '../contexts/UserContext';
import { useSelector } from 'react-redux';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import systemSlice from '../features/systemSlice';
import NewMembers from '../screens/team/NewMembers.tab';
import ActiveMembers from '../screens/team/ActiveMembers.tab';
import InactiveMembers from '../screens/team/InactiveMembers.tab';
const BottomTab = createBottomTabNavigator();
const TeamConfig = () => {
    const mtrTheme = useTheme();
    const { userProfile } = useUserContext();
    const newMembers = useSelector((state) => state.team.newMembers);
    const { appName } = useSelector((state) => state.system);
    const [newCountLabel, setNewCountLabel] = useState(0);

    useEffect(() => {
        setNewCountLabel(newMembers?.length);
    }, [newMembers]);
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
                    // tabBarStyle: { backgroundColor: 'blue' },
                    tabBarLabel: ({ focused, color, fontSize }) => (
                        <Text
                            style={{
                                color: newCountLabel > 0 ? 'red' : 'black',
                                backgroundColor:
                                    newCountLabel > 0 ? 'yellow' : 'white',
                                fontSize: 14,
                                fontWeight: '500',
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            New Requests ({newCountLabel})
                        </Text>
                    ),
                    tabBarActiveBackgroundColor:
                        newCountLabel > 0 ? 'yellow' : 'green',
                    // tabBarInactiveBackgroundColor: 'lightgrey',

                    tabBarIcon: ({ focused, color, size }) => (
                        <Entypo
                            name='new'
                            size={30}
                            color={newCountLabel > 0 ? 'black' : 'white'}
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
                    // tabBarInactiveBackgroundColor: 'lightgrey',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Entypo
                            name='check'
                            size={30}
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
                    // tabBarInactiveBackgroundColor: 'lightgrey',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Entypo
                            name='block'
                            size={30}
                            color={focused ? 'white' : 'black'}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export default TeamConfig;
