import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import LandingScreen from '../screens/LandingScreen';
import SignInScreen from '../screens/Auth/SignIn';
import SignUpScreen from '../screens/Auth/SignUp';
import ConfirmEmailScreen from '../screens/Auth/ConfirmEmail';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import NewPasswordScreen from '../screens/Auth/NewPassword';
import MeetingDetailsScreen from '../screens/MeetingDetailsScreen';
import MeetingDetailsEditScreen from '../screens/MeetingDetailsEditScreen';
import GroupDetailsScreen from '../screens/GroupDetailsScreen';
import GroupDetailsEditScreen from '../screens/GroupDetailsEditScreen';

import AuthDrawer from './AuthDrawer';
import { Auth, Hub } from 'aws-amplify';
const Stack = createNativeStackNavigator();
function MeeterStack(props) {
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const [userCheck, setUserCheck] = useState(undefined);
    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({
                bypassCache: true,
            });
            setUserCheck(authUser);
        } catch (e) {
            setUserCheck(null);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        const listener = (data) => {
            if (
                data.payload.event === 'signIn' ||
                data.payload.event === 'signOut'
            ) {
                checkUser();
            }
        };

        Hub.listen('auth', listener);
        return () => Hub.remove('auth', listener);
    }, []);
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='AuthenticatedDrawer'
                component={AuthDrawer}
                // component={AuthDrawerComponent}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='MeetingDetails'
                component={MeetingDetailsScreen}
                options={({ navigation }) => ({
                    title: 'Meeter',
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            />

            <Stack.Screen
                name='MeetingEdit'
                component={MeetingDetailsEditScreen}
                options={({ navigation }) => ({
                    title: 'Meeter',
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            />

            <Stack.Screen
                name='GroupDetails'
                component={GroupDetailsScreen}
                options={({ navigation }) => ({
                    title: 'Meeter',
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            />

            <Stack.Screen
                name='GroupEdit'
                component={GroupDetailsEditScreen}
                options={({ navigation }) => ({
                    title: 'Meeter',
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            />
        </Stack.Navigator>
    );
}
//   --------- Navigation !!!!! ----------------
function Navigation() {
    const user = useSelector((state) => state.users.currentUser);
    const [userCheck, setUserCheck] = useState(undefined);
    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({
                bypassCache: true,
            });
            setUserCheck(authUser);
        } catch (e) {
            setUserCheck(null);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    // this is as listener to the Amplify hub (events)
    useEffect(() => {
        const listener = (data) => {
            if (
                data.payload.event === 'signIn' ||
                data.payload.event === 'signOut'
            ) {
                checkUser();
            }
        };

        Hub.listen('auth', listener);
        return () => Hub.remove('auth', listener);
    }, []);
    return (
        <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {user?.jwtToken ? (
                        <Stack.Screen
                            name='MeeterStack'
                            component={MeeterStack}
                        />
                    ) : (
                        <>
                            <Stack.Screen
                                name='SignIn'
                                component={SignInScreen}
                            />
                            <Stack.Screen
                                name='SignUp'
                                component={SignUpScreen}
                            />
                            <Stack.Screen
                                name='ConfirmEmail'
                                component={ConfirmEmailScreen}
                            />
                            <Stack.Screen
                                name='ForgotPassword'
                                component={ForgotPasswordScreen}
                            />
                            <Stack.Screen
                                name='NewPassword'
                                component={NewPasswordScreen}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </GestureHandlerRootView>
        </NavigationContainer>
    );
}

export default Navigation;
