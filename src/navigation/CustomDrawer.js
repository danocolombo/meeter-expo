import {
    ImageBackground,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { usersSlice } from '../features/usersSlice';
import { useAuthContext } from '../contexts/AuthContext';
import { useSysContext } from '../contexts/SysContext';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = (props) => {
    const mtrTheme = useTheme();
    const user = useSelector((state) => state.users.currentUser);
    //const { profilePic } = useAuthContext();
    const { systemDef } = useSysContext();
    const [profilePicture, setProfilePicture] = useState(null);
    const navigation = useNavigation();
    // useEffect(() => {
    //     if (profilePic) {
    //         setProfilePicture(profilePic);
    //     } else if (systemDef?.defaultProfilePic) {
    //         setProfilePicture(systemDef.defaultProfilePic);
    //     }
    // }, [profilePic, systemDef]);

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
                    style={{ padding: 20, marginBottom: 10 }}
                >
                    {profilePicture && (
                        <Image
                            source={{
                                uri: profilePic
                                    ? profilePic
                                    : systemDef.defaultProfilePic,
                            }}
                            style={{
                                height: 80,
                                width: 80,
                                borderRadius: 40,
                            }}
                        />
                    )}
                    <Text style={{ color: mtrTheme.colors.accent }}>
                        {user.firstName} {user.lastName}
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
                    //borderTopWidth: 1,
                    //borderTopColor: '#ccc',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Logout')}
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
