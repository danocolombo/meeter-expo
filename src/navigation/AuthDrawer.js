import React from 'react';
import { View, Text, Button } from 'react-native';
import { withTheme } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MeetingsConfig from './BottomNav';

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
            })}
        >
            <Drawer.Screen
                name='Landing'
                // component={() => <LandingScreen theme={props.theme} />}
                component={LandingComponent}
                options={({ navigation }) => ({
                    title: meeter.appName,
                    drawerLabel: 'Main',
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
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Logout' component={MeeterSignOut} />
        </Drawer.Navigator>
    );
};

export default withTheme(AuthDrawer);
