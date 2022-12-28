import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import {
    NavigationContainer,
    NavigationHelpersContext,
    StackActions,
} from '@react-navigation/native';
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
import { useSysContext } from '../contexts/SysContext';
import { useAuthContext } from '../contexts/AuthContext';
import { useUserContext } from '../contexts/UserContext';
import LandingScreen from '../screens/LandingScreen';
import SignInScreen from '../screens/Auth/SignIn';
import SignUpScreen from '../screens/Auth/SignUp';
import ConfirmEmailScreen from '../screens/Auth/ConfirmEmail';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import NewPasswordScreen from '../screens/Auth/NewPassword';
import MeetingDetailsScreen from '../screens/MeetingDetailsScreen';
import TeamMemberScreen from '../screens/TeamMemberScreen'; // import MeetingDelete from '../screens/MeetingDelete';
import MeetingDetailsEditScreen from '../screens/MeetingDetailsEditScreen';
import MeetingNewScreen from '../screens/MeetingNewScreen';
import GroupDetailsScreen from '../screens/GroupDetailsScreen';
import GroupDetailsEditScreen from '../screens/GroupDetailsEditScreen';
import GroupNewScreen from '../screens/GroupNewScreen';
import ProfileScreen from '../screens/profille/ProfileScreen';
import { logout } from '../features/usersSlice';
// import { logout as meetingsSignout } from '../features/meetingsSlice';
// import { logout as profilesLogout } from '../features/profilesSlice';
// import { logout as systemLogout } from '../features/systemSlice';
import { useDispatch } from 'react-redux';
// import ProfilePicModal from '../screens/ProfilePicModal';
import DeleteConfirmScreen from '../screens/DeleteConfirmScreen';
import DeleteGroupConfirmScreen from '../screens/DeleteGroupConfirmScreen';
import DGModalScreen from '../components/modals/DefaultGroup.modal';
import AuthDrawer from './AuthDrawer';
import { Auth, Hub, Cache } from 'aws-amplify';
import MeeterSignOut from '../screens/Auth/MeeterSignOut';
import { printObject } from '../utils/helpers';
const Stack = createNativeStackNavigator();
function MeeterStack(props) {
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    const { meeter, sysSignOut } = useSysContext();
    const { authSignOut } = useAuthContext();
    const { useSignOut } = useUserContext();
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
                    title: meeter?.appName,
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name='DGModal'
                    component={DGModalScreen}
                    options={({ navigation }) => ({
                        title: meeter?.appName,
                        headerStyle: {
                            backgroundColor: mtrTheme.colors.background,
                        },
                        headerTintColor: 'white',
                    })}
                />
            </Stack.Group>
            <Stack.Screen
                name='MeetingEdit'
                component={MeetingDetailsEditScreen}
                options={({ navigation }) => ({
                    title: meeter?.appName,
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='MeetingNew'
                component={MeetingNewScreen}
                options={({ navigation }) => ({
                    title: meeter?.appName,
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='GroupNew'
                component={GroupNewScreen}
                options={({ navigation }) => ({
                    title: meeter?.appName,
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
                    title: meeter?.appName,
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
                    title: meeter?.appName,
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='TeamMember'
                component={TeamMemberScreen}
                options={({ navigation }) => ({
                    title: meeter?.appName,
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            />
            {/* <Stack.Screen
                name='ProfilePicModal'
                component={ProfilePicModal}
                options={({ navigation }) => ({
                    title: 'Meeter',
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            /> */}
            <Stack.Screen
                name='DeleteConfirm'
                component={DeleteConfirmScreen}
                options={({ navigation }) => ({
                    title: meeter?.appName,
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='DeleteGroupConfirm'
                component={DeleteGroupConfirmScreen}
                options={({ navigation }) => ({
                    title: meeter?.appName,
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
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
                options={({ navigation }) => ({
                    title: meeter?.appName,
                    headerStyle: {
                        backgroundColor: mtrTheme.colors.background,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='Logout'
                component={MeeterSignOut}
                options={({ navigation }) => ({
                    title: meeter?.appName,
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
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    const { meeter, loadSystem } = useSysContext();
    const { clearUser } = useUserContext();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(undefined);
    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({
                bypassCache: true,
            });
            if (authUser?.attributes?.sub) {
                setIsUserAuthenticated(authUser);
            } else {
                setIsUserAuthenticated(null);
            }
        } catch (e) {
            setIsUserAuthenticated(null);
        }
    };
    const getSystemVariables = async () => {
        try {
            loadSystem().then((res) => {
                // printObject('NAV:203-->system:\n', res);
            });
        } catch (error) {
            printObject('NAV:206-->error loading system', error);
        }
    };

    useEffect(() => {
        getSystemVariables();
        checkUser();
    }, []);
    useEffect(() => {
        const listener = (data) => {
            if (data.payload.event === 'signIn') {
                checkUser();
            } else if (data.payload.event === 'signOut') {
                Cache.clear();
                clearUser();
                printObject('NAV:221-->signOut() received', '');
                // try {
                //     authSignOut()
                //         .then(() => console.log('authSignOut complete'))
                //         .catch((e) => console.log('authSignOut failure:', e));
                //     sysSignOut()
                //         .then(() => console.log('sysSignOut complete'))
                //         .then((e) => {
                //             printObject('CD:48-->sysSignOut failure:', e);
                //         });
                //     Auth.signOut();
                // } catch (error) {
                //     printObject('signUserOut error:', error);
                // }

                setIsUserAuthenticated(false);

                // dispatch(logout());
                // dispatch(meetingsSignout());
                // dispatch(profilesLogout());
                // dispatch(systemLogout());
            }
        };
        try {
            Hub.listen('auth', listener);
        } catch (error) {
            printObject('NAV:241-->hub listener catch:\n', error);
        }

        //make suree to unsubscribe....
        return () => Hub.remove('auth', listener);
    }, []);

    return (
        <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {isUserAuthenticated ? (
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
