import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { withTheme } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MeetingsConfig from './BottomNav';
import TeamConfig from './TeamNav';
import CustomDrawer from './CustomDrawer';
import LandingScreen from '../screens/LandingScreen';
import DefaultGroupsScreen from '../screens/DefaultGroupsScreen';
import AccessScreen from '../screens/AccessScreen';
import HeroMessageScreen from '../screens/HeroMessage';
import { printObject } from '../utils/helpers';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
import { onCreateMeeting } from '../graphql/subscriptions';
import { addSubscriptionMeeting } from '../features/meetings/meetingsThunks';
import {
    setupSubscriptions,
    unsubscribeAll,
} from '../subscriptions/AuthDrawerSubscriptions';
const AuthDrawer = (navigation) => {
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.profile);
    const perms = useSelector((state) => state.user.perms);
    //printObject('AD:26-->userProfile', userProfile);
    // printObject('mtrTheme:', mtrTheme);
    const meeter = useSelector((state) => state.system);

    //* subscription to new meetings
    // useEffect(() => {
    //     const subscription = API.graphql(
    //         graphqlOperation(onCreateMeeting)
    //     ).subscribe({
    //         next: (data) => {
    //             const meeting = data.value.data.onCreateMeeting;
    //             console.log('New meeting:', meeting);
    //             dispatch(addSubscriptionMeeting(meeting))
    //                 .then((results) => {
    //                     console.log('back from dispatch');
    //                     printObject('AD:44-->results:\n', results);
    //                 })
    //                 .catch((error) => {
    //                     console.log('error from dispatch');
    //                     printObject('AD:48-->error:\n', error);
    //                 });
    //             // Dispatch a Redux action or update state as needed
    //         },
    //         error: (error) => {
    //             console.error('Subscription error:', error);
    //         },
    //     });

    //     // Clean up the subscription when the component unmounts
    //     return () => {
    //         subscription.unsubscribe();
    //     };
    // }, []); // Empty dependency array to ensure the effect runs only once
    useEffect(() => {
        setupSubscriptions(dispatch);

        // Clean up all subscriptions when the component unmounts
        return () => {
            unsubscribeAll();
        };
    }, []);
    // console.log('AD: affiliations:', user)
    let manager = false;
    let patron = false;
    if (userProfile) {
        // printObject('AD:40-->userProfile:\n', userProfile);
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
                        title: meeter.appName || 'Meeter',
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
            {perms?.includes('manage') && (
                <Drawer.Screen
                    name={meeter.appName || 'Meeter'}
                    component={TeamConfig}
                    options={({ navigation }) => ({
                        title: meeter.appName || 'Meeter',

                        drawerLabel: 'User Access',
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
            {(perms?.includes('manage') || perms?.includes('groups')) && (
                <Stack.Screen
                    name='Groups'
                    options={({ navigation }) => ({
                        title: meeter.appName || 'Groups',
                        headerTitle: meeter.appName || 'Meeter',
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
            {/* {perms?.includes('manage') && (
                <Stack.Screen
                    name='Team'
                    options={({ navigation }) => ({
                        title: 'Access',
                        headerTitle: meeter.appName,
                        headerStyle: {
                            backgroundColor: mtrTheme.colors.background,
                        },
                        headerTintColor: 'white',

                        drawerIcon: ({ color }) => (
                            <Ionicons
                                name='key-outline'
                                size={28}
                                color={color}
                            />
                        ),
                    })}
                    component={AccessScreen}
                />
            )} */}
            {perms?.includes('manage') && (
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
