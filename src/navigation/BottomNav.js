import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import HistoricScreen from '../screens/HistoricScreen';
import ActiveScreen from '../screens/ActiveScreen';
import AdminScreen from '../screens/AdminScreen';
const BottomTab = createBottomTabNavigator();
const MeetingsConfig = () => {
    const mtrTheme = useTheme();
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
                    title: 'Meeter',
                    tabBarLabel: 'HISTORY',
                    tabBarInactiveBackgroundColor: mtrTheme.colors.disabled,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign
                            name='caretleft'
                            size={24}
                            color={mtrTheme.colors.darkText}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name='AdminScreen'
                component={AdminScreen}
                options={{
                    title: 'Meeter',
                    tabBarLabel: 'Active',
                    tabBarInactiveBackgroundColor: mtrTheme.colors.disabled,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome
                            name='users'
                            size={size}
                            color={mtrTheme.colors.darkText}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name='ActiveMeetings'
                component={ActiveScreen}
                options={{
                    title: 'Meeter',
                    tabBarLabel: 'Active',
                    tabBarInactiveBackgroundColor: mtrTheme.colors.disabled,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign
                            name='caretright'
                            size={24}
                            color={mtrTheme.colors.darkText}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export default MeetingsConfig;
