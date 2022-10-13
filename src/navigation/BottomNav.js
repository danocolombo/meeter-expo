import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome, AntDesign } from '@expo/vector-icons';
import HistoricScreen from '../screens/HistoricScreen';
import ActiveScreen from '../screens/ActiveScreen';
import NewMeetingScreen from '../screens/NewMeetingScreen';
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
            screenOptions={{ headerShown: false }}
        >
            <BottomTab.Screen
                name='HistoricMeetings'
                component={HistoricScreen}
                options={{
                    title: appName,
                    tabBarLabel: ({ focused, color, fontSize }) => (
                        <Text
                            style={{
                                color: focused
                                    ? mtrTheme.colors.navBarActiveText
                                    : mtrTheme.colors.navBarInactiveText,
                                fontSize: 16,
                                fontWeight: '500',
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            HISTORY
                        </Text>
                    ),
                    tabBarActiveBackgroundColor:
                        mtrTheme.colors.navBarActiveBackground,
                    tabBarInactiveBackgroundColor:
                        mtrTheme.colors.navBarInactiveBackground,
                    tabBarIcon: ({ focused, color, size }) => (
                        <AntDesign
                            name='caretleft'
                            size={24}
                            color={
                                focused
                                    ? mtrTheme.colors.navBarActiveText
                                    : mtrTheme.colors.navBarInactiveText
                            }
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name='NewMeeting'
                component={NewMeetingScreen}
                options={{
                    title: appName,
                    tabBarLabel: ({ focused, color, fontSize, fontWeight }) => (
                        <Text
                            style={{
                                color: focused
                                    ? mtrTheme.colors.navBarActiveText
                                    : mtrTheme.colors.navBarInactiveText,
                                fontSize: 16,
                                fontWeight: '500',
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            ADD
                        </Text>
                    ),
                    tabBarActiveBackgroundColor:
                        mtrTheme.colors.navBarActiveBackground,
                    tabBarInactiveBackgroundColor:
                        mtrTheme.colors.navBarInactiveBackground,
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesome
                            name='calendar-plus-o'
                            size={24}
                            color={
                                focused
                                    ? mtrTheme.colors.navBarActiveText
                                    : mtrTheme.colors.navBarInactiveText
                            }
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name='ActiveMeetings'
                component={ActiveScreen}
                options={{
                    title: appName,
                    tabBarLabel: ({ focused, color, size }) => (
                        <Text
                            style={{
                                color: focused
                                    ? mtrTheme.colors.navBarActiveText
                                    : mtrTheme.colors.navBarInactiveText,
                                fontSize: 16,
                                fontWeight: '500',
                                fontFamily: 'Roboto-Regular',
                            }}
                        >
                            ACTIVE
                        </Text>
                    ),
                    tabBarActiveBackgroundColor:
                        mtrTheme.colors.navBarActiveBackground,
                    tabBarInactiveBackgroundColor:
                        mtrTheme.colors.navBarInactiveBackground,
                    tabBarIcon: ({ focused, color, size }) => (
                        <AntDesign
                            name='caretright'
                            size={24}
                            color={
                                focused
                                    ? mtrTheme.colors.navBarActiveText
                                    : mtrTheme.colors.navBarInactiveText
                            }
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export default MeetingsConfig;
