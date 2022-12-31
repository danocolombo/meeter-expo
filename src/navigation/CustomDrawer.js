import {
    ImageBackground,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { Auth, Storage } from 'aws-amplify';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useSysContext, sysSignOut } from '../contexts/SysContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { printObject } from '../utils/helpers';

const CustomDrawer = (props) => {
    const mtrTheme = useTheme();
    const { meeter } = useSysContext();
    const { userProfile } = useUserContext();
    const { systemDef, sysSignOut } = useSysContext();
    const [profilePicture, setProfilePicture] = useState(null);
    const [pictureName, setPictureName] = useState(null);
    const [pictureObject, setPictureObject] = useState(null);
    const [useRole, setUserRole] = useState(null);
    const navigation = useNavigation();

    async function checkUserRole() {
        try {
            printObject('CD:37-->userProfile:\n', userProfile);
            console.log('CD:37-->role', userProfile?.activeOrg?.role);
            if (userProfile?.activeOrg?.role) {
                setUserRole(userProfile?.activeOrg?.role);
            } else {
                setUserRole('guest');
            }
        } catch (error) {
            console.log('CD:39-->error checkUserRole');
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            checkUserRole();
        }, [userProfile])
    );
    async function getPictureDetails() {
        let picRef = meeter.defaultProfilePicture;
        if (userProfile?.picture) {
            picRef = userProfile.picture;
            setPictureName(userProfile.picture);
        } else {
            setPictureName(meeter.defaultProfilePic);
            picRef = meeter.defaultProfilePicture;
        }
        try {
            Storage.get(picRef, {
                level: 'public',
            })
                .then((hardPic) => setPictureObject(hardPic))
                .catch((error) => {
                    printObject('CD:68-->error getting storage ref:\n', error);
                });
        } catch (error) {
            console.log('CD:71-->error Storeage.get\n', error);
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getPictureDetails()
                .then(() => {
                    console.log('CD:78-->picRef:', picRef);
                    console.log('CD:79-->pictureObject:', pictureObject);
                })
                .catch((error) => {
                    printObject('CD:82-->ERROR:\n', error);
                });
        }, [userProfile])
    );

    const signUserOut = async () => {
        Auth.signOut();
        //try {
        // authSignOut()
        //     .then(() => console.log('authSignOut complete'))
        //     .catch((e) => console.log('authSignOut failure:', e));
        // sysSignOut()
        //     .then(() => console.log('sysSignOut complete'))
        //     .then((e) => {
        //         printObject('CD:48-->sysSignOut failure:', e);
        //     });
        Auth.signOut();
        //} catch (error) {
        //    printObject('signUserOut error:', error);
        //}
    };
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    backgroundColor: '#fff',
                }}
            >
                <ImageBackground
                    source={require('../../assets/menu-bg.jpeg')}
                    style={{
                        padding: 5,
                        marginBottom: 10,
                        alignItems: 'center',
                    }}
                >
                    {pictureObject && (
                        <Image
                            source={{
                                uri: pictureObject,
                            }}
                            style={{
                                height: 80,
                                width: 80,
                                borderRadius: 40,
                            }}
                        />
                    )}
                    <Text style={{ color: mtrTheme.colors.accent }}>
                        {userProfile?.firstName} {userProfile?.lastName}
                    </Text>
                </ImageBackground>
                <View
                    style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}
                >
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    borderTopWidth: 1,
                    borderTopColor: '#ccc',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={{ paddingBottom: 15 }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons
                            name='person-outline'
                            size={22}
                            color={mtrTheme.colors.navDrawerInactiveTint}
                        />
                        <Text
                            style={{
                                paddingLeft: 5,
                                color: mtrTheme.colors.navDrawerInactiveTint,
                                fontFamily: 'Roboto-Medium',
                                fontSize: 15,
                            }}
                        >
                            Profile
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    paddingHorizontal: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => {}}
                    style={{ paddingVertical: 15 }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons
                            name='exit-outline'
                            size={22}
                            color={mtrTheme.colors.navDrawerInactiveTint}
                        />
                        <Text
                            style={{
                                paddingLeft: 5,
                                color: mtrTheme.colors.navDrawerInactiveTint,
                                fontFamily: 'Roboto-Medium',
                                fontSize: 15,
                            }}
                        >
                            Legal
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    marginTop: 10,
                    paddingHorizontal: 20,
                    marginBottom: 50,
                    //borderTopWidth: 1,
                    //borderTopColor: '#ccc',
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        signUserOut();
                    }}
                    style={{ paddingBottom: 15 }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons
                            name='exit-outline'
                            size={22}
                            color={mtrTheme.colors.navDrawerInactiveTint}
                        />
                        <Text
                            style={{
                                paddingLeft: 5,
                                color: mtrTheme.colors.navDrawerInactiveTint,
                                fontFamily: 'Roboto-Medium',
                                fontSize: 15,
                            }}
                        >
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
