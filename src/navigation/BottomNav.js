import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome, AntDesign } from '@expo/vector-icons';
import HistoricScreen from '../screens/HistoricScreen';
import ActiveScreen from '../screens/ActiveScreen';
import AdminScreen from '../screens/AdminScreen';
import systemSlice from '../features/systemSlice';
const BottomTab = createBottomTabNavigator();
const MeetingsConfig = () => {
    const mtrTheme = useTheme();
    const { appName } = useSelector((state) => state.system);
    let user = useSelector((state) => state.users.currentUser);
    let director = false;
    if (user.affiliations.active.role === 'director') {
        director = true;
    }

    return (
        <BottomTab.Navigator
            initialRouteName='ActiveMeetings'
            screenOptions={{
                headerShown: false,
                headerRight: () => (
                    <Button
                        onPress={() =>
                            navigation.navigate('MeetingEdit', {
                                meeting: meeting,
                            })
                        }
                        // color='red'
                        color={headerLabelColor}
                        title='Edit'
                    />
                ),
                // tabBarStyle: { backgroundColor: 'green' },
            }}
        >
            <BottomTab.Screen
                name='HistoricMeetings'
                id='HISTORY'
                component={HistoricScreen}
                options={{
                    title: appName,
                    id: 'HISTORIC_MEETINGS',
                    tabBarLabel: ({ focused, color, fontSize }) => (
                        <Text
                            style={{
                                color: focused ? 'white' : 'black',
                                fontSize: 14,
                                fontWeight: '500',
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            HISTORY
                        </Text>
                    ),
                    tabBarActiveBackgroundColor: 'green',
                    tabBarInactiveBackgroundColor: 'lightgrey',
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
                name='ActiveMeetings'
                id='ACTIVE'
                component={ActiveScreen}
                options={{
                    title: appName,
                    id: 'ACTIVE_MEETINGS',
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
        </BottomTab.Navigator>
    );
};

export default MeetingsConfig;
