import React from 'react';
import { View, Text, Button } from 'react-native';
import { withTheme } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import MeetingsConfig from './BottomNav';
import CustomDrawer from './CustomDrawer';
import LandingScreen from '../screens/LandingScreen';
import ActiveScreen from '../screens/ActiveScreen';
import MeeterSignOut from '../screens/Auth/MeeterSignOut';
import ProfileScreen from '../screens/ProfileScreen';

//import { Colors } from '../constants/colors';
import { printObject } from '../utils/helpers';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AuthDrawer = (navigation) => {
    const mtrTheme = useTheme();
    // printObject('mtrTheme:', mtrTheme);
    const user = useSelector((state) => state.users.currentUser);
    const meeter = useSelector((state) => state.system);
    // printObject('PF:17-->user', user);
    let manager = false;
    if (
        user?.affiliations?.active?.role === 'lead' ||
        user?.affiliations?.active?.role === 'director' ||
        user?.affiliations?.active?.role === 'superuser'
    ) {
        manager = true;
    }
    let patron = false;
    if (
        user?.affiliations?.active?.role === 'rep' ||
        user?.affiliations?.active?.role === 'lead' ||
        user?.affiliations?.active?.role === 'director' ||
        user?.affiliations?.active?.role === 'superuser'
    ) {
        patron = true;
    }
    const LandingComponent = (props) => (
        <LandingScreen theme={props.theme} {...props} />
    );
    // {user?.stateRep || user?.stateLead || user?.superuser} : (

    return (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: mtrTheme.colors.background,
                },
                tabBarActiveTintColor: 'white',
                drawerActiveBackgroundColor:
                    mtrTheme.colors.navDrawerActiveBackground,
                drawerActiveTintColor: mtrTheme.colors.navDrawerActiveTint,
                drawerInactiveBackgroundColor:
                    mtrTheme.colors.navDrawerInactiveBackground,
                drawerInactiveTintColor: mtrTheme.colors.navDrawerInactiveTint,
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                },
            })}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                name='Landing'
                // component={() => <LandingScreen theme={props.theme} />}
                component={LandingComponent}
                options={({ navigation }) => ({
                    title: meeter.appName,
                    drawerLabel: 'Main',
                    drawerIcon: ({ color }) => (
                        <Ionicons name='home-outline' size={22} color={color} />
                    ),
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },

                    headerTintColor: 'white',
                    tabBarStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    tabBarActiveTintColor: 'white',
                })}
            />

            <Drawer.Screen
                name='Meetings'
                // component={() => <LandingScreen theme={props.theme} />}
                component={MeetingsConfig}
                options={({ navigation }) => ({
                    title: meeter.appName,
                    // headerRight: () => (
                    //     <>
                    //         <Button
                    //             onPress={() =>
                    //                 navigation.navigate('MeeterEdit', {
                    //                     meetingId: meeting.meetingId,
                    //                 })
                    //             }
                    //             color='white'
                    //             title='NEW'
                    //         />
                    //     </>
                    // ),
                    drawerLabel: 'Meetings',
                    drawerIcon: ({ color }) => (
                        <Ionicons
                            name='calendar-outline'
                            size={22}
                            color={color}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },

                    headerTintColor: 'white',
                    tabBarStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    tabBarActiveTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='Groups'
                options={({ navigation }) => ({
                    drawerIcon: ({ color }) => (
                        <Ionicons
                            name='people-outline'
                            size={22}
                            color={color}
                        />
                    ),
                })}
                component={MeeterSignOut}
            />
            <Stack.Screen
                name='Profile'
                options={({ navigation }) => ({
                    drawerLabel: 'Profile',
                    title: meeter.appName,
                    drawerIcon: ({ color }) => (
                        <Ionicons
                            name='person-outline'
                            size={22}
                            color={color}
                        />
                    ),
                })}
                component={ProfileScreen}
            />
        </Drawer.Navigator>
    );
};

export default withTheme(AuthDrawer);
