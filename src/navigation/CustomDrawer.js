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
import React from 'react';
import { usersSlice } from '../features/usersSlice';
import { useAuthContext } from '../contexts/AuthContext';
import { useSysContext } from '../contexts/SysContext';

const CustomDrawer = (props) => {
    const mtrTheme = useTheme();
    const user = useSelector((state) => state.users.currentUser);
    const { profilePic } = useAuthContext();
    const { systemDef } = useSysContext();
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

                    borderTopWidth: 1,
                    borderTopColor: '#ccc',
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
                    onPress={() => {}}
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
