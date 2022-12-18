import { StyleSheet, Text, View, FlatList, AppState } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import * as queries from '../jerichoQL/queries';
import { API } from 'aws-amplify';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Surface, useTheme, FAB } from 'react-native-paper';
import DefaultGroupCard from '../components/groups/Default.Group.Card';
import { useSysContext } from '../contexts/SysContext';
import { useUserContext } from '../contexts/UserContext';
import CustomButton from '../components/ui/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as mutations from '../jerichoQL/mutations';
import { printObject } from '../utils/helpers';

const DefaultGroupsScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const { meeter, defaultGroups } = useSysContext();
    const { userProfile } = useUserContext();
    const [groups, setGroups] = useState([]);
    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }
    useFocusEffect(
        useCallback(() => {
            const subscription = AppState.addEventListener(
                'change',
                onAppStateChange
            );
            getDefaultGroups();
            return () => subscription.remove();
        }, [])
    );
    useEffect(() => {
        getDefaultGroups().then(() => {
            console.log('DONE');
        });
    }, []);
    async function getDefaultGroups() {
        try {
            const systemInfo = await API.graphql({
                query: queries.getOrganizationDefaultGroups,
                variables: { id: userProfile.activeOrg.id },
            });
            const defaultGroups =
                systemInfo.data.getOrganization.defaultGroups.items;
            setGroups(defaultGroups);
        } catch (error) {
            printObject('DGS:52-->systemInfo TryCatch failure:\n', error);
            return;
        }
    }
    async function deleteDefaultGroup(value) {
        try {
            const results = await API.graphql({
                query: mutations.deleteDefaultGroup,
                variables: { input: { id: value } },
            });
        } catch (error) {
            printObject('failed to delete default group:', error);
        }
        getDefaultGroups();
    }
    const handleDeleteRequest = (value) => {
        deleteDefaultGroup(value);
    };
    const handleNewRequest = () => {
        navigation.navigate('DGModal');
    };
    return (
        // <SafeAreaView
        //     style={[
        //         mtrTheme.defaultGroupScreenSafeArea,
        //         {
        //             flexDirection: 'column',
        //             backgroundColor: mtrTheme.colors.background,
        //             justifyContent: 'flex-start',
        //             borderWidth: 1,
        //             borderColor: 'yellow',
        //         },
        //     ]}
        // >
        <View
            style={{
                backgroundColor: mtrTheme.colors.background,

                flex: 1,
            }}
        >
            <View>
                <Text style={mtrTheme.screenTitle}>DEFAULT MEETINGS</Text>
            </View>

            <View
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 50,
                    marginBottom: 10,
                    marginHorizontal: 30,
                }}
            >
                <Text style={mtrTheme.subTitleSmall}>
                    Default meetings can be dynamically added to meetings.
                </Text>
            </View>
            {groups && (
                <>
                    {groups && (
                        <FlatList
                            data={groups}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <DefaultGroupCard
                                    group={item}
                                    active={true}
                                    handleDelete={handleDeleteRequest}
                                />
                            )}
                        />
                    )}
                </>
            )}
            <View style={{ marginHorizontal: 20, paddingBottom: 20 }}>
                <CustomButton
                    text='ADD DEFAULT GROUP'
                    bgColor={mtrTheme.colors.success}
                    fgColor='white'
                    type='PRIMARY'
                    enabled='true'
                    onPress={() => handleNewRequest()}
                />
            </View>
        </View>
        // </SafeAreaView>
    );
};

export default DefaultGroupsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});
