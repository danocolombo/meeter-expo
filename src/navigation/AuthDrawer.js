import React from 'react';
import { View, Text, Button } from 'react-native';
import { withTheme } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MeetingsConfig from './BottomNav';
import TeamConfig from './TeamNav';
import CustomDrawer from './CustomDrawer';
import LandingScreen from '../screens/LandingScreen';
import DefaultGroupsScreen from '../screens/DefaultGroupsScreen';
import TeamScreen from '../screens/TeamScreen';
// import TeamScreen from '../screens/TeamMemberScreen';
import HeroMessageScreen from '../screens/HeroMessage';
import ActiveScreen from '../screens/ActiveScreen';
import MeeterSignOut from '../screens/Auth/MeeterSignOut';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { useAuthContext } from '../contexts/AuthContext';
//import { Colors } from '../constants/colors';
import { printObject } from '../utils/helpers';
import { useUserContext } from '../contexts/UserContext';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const AuthDrawer = (navigation) => {
    const mtrTheme = useTheme();
    const { userProfile } = useUserContext();
    //printObject('AD:26-->userProfile', userProfile);
    // printObject('mtrTheme:', mtrTheme);
    const user = useSelector((state) => state.users.currentUser);
    const meeter = useSelector((state) => state.system);

    // console.log('AD: affiliations:', user)
    let manager = false;
    let patron = false;
    if (userProfile) {
        printObject('AD:40-->userProfile:\n', userProfile);
        if (
            userProfile.activeOrg?.role === 'manage' ||
            userProfile.activeOrg?.role === 'director' ||
            userProfile.activeOrg?.role === 'manager'
        ) {
            manager = true;
            patron = true;
        }
    }
    const LandingComponent = (props) => (
        <LandingScreen theme={props.theme} {...props} />
    );
    // {user?.stateRep || user?.stateLead || user?.manage} : (

    return (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: mtrTheme.colors.background,
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
            {userProfile?.activeOrg?.status === 'active' && (
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
            )}
            {userProfile?.activeOrg?.role === 'manage' && (
                <Drawer.Screen
                    name='Your Team'
                    component={TeamConfig}
                    options={({ navigation }) => ({
                        title: meeter.appName,

                        drawerLabel: 'My Team',
                        drawerIcon: ({ color }) => (
                            <Ionicons
                                name='people-outline'
                                size={28}
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
            )}
            {userProfile?.activeOrg?.role === 'manage' && (
                <Stack.Screen
                    name='Groups'
                    options={({ navigation }) => ({
                        title: 'Default Groups',
                        headerTitle: meeter.appName,
                        headerStyle: {
                            backgroundColor: mtrTheme.colors.background,
                        },
                        headerTintColor: 'white',
                        drawerIcon: ({ color }) => (
                            <Ionicons
                                name='md-people-circle-outline'
                                size={30}
                                color={color}
                            />
                        ),
                    })}
                    component={DefaultGroupsScreen}
                />
            )}
            {userProfile?.activeOrg?.role === 'manage' && (
                <Stack.Screen
                    name='Team'
                    options={({ navigation }) => ({
                        title: 'Your Team',
                        headerTitle: meeter.appName,
                        headerStyle: {
                            backgroundColor: mtrTheme.colors.background,
                        },
                        headerTintColor: 'white',

                        drawerIcon: ({ color }) => (
                            <Ionicons
                                name='people-outline'
                                size={28}
                                color={color}
                            />
                        ),
                    })}
                    component={TeamScreen}
                />
            )}
            {userProfile?.activeOrg?.role === 'manage' && (
                <Stack.Screen
                    name='Welcome'
                    options={({ navigation }) => ({
                        title: 'Welcome Message',
                        headerTitle: meeter.appName,
                        headerStyle: {
                            backgroundColor: mtrTheme.colors.background,
                        },
                        headerTintColor: 'white',

                        drawerIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name='message-outline'
                                size={24}
                                color={color}
                            />
                        ),
                    })}
                    component={HeroMessageScreen}
                />
            )}
            {/* <Stack.Screen
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
            /> */}
        </Drawer.Navigator>
    );
};

export default withTheme(AuthDrawer);
