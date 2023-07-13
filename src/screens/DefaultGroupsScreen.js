import { StyleSheet, Text, View, FlatList, AppState } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import * as queries from '../jerichoQL/queries';
import { useSelector, useDispatch } from 'react-redux';
import { API } from 'aws-amplify';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Surface, useTheme, ActivityIndicator, FAB } from 'react-native-paper';
import DefaultGroupCard from '../components/groups/Default.Group.Card';
import { useSysContext } from '../contexts/SysContext';
import { useUserContext } from '../contexts/UserContext';
import CustomButton from '../components/ui/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as mutations from '../jerichoQL/mutations';
import { printObject } from '../utils/helpers';
import {
    loadDefaultGroups,
    deleteDefaultGroup,
} from '../features/groups/groupsThunks';

const DefaultGroupsScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { userProfile } = useUserContext();
    const defaultGroups = useSelector((state) => state.groups.defaultGroups);
    const [displayGroups, setDisplayGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            dispatch(loadDefaultGroups({ id: userProfile.activeOrg.id }));
            setIsLoading(false);
            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
        setDisplayGroups(defaultGroups);
    }, [defaultGroups]);

    const handleDeleteRequest = (value) => {
        dispatch(deleteDefaultGroup({ groupId: value }));
    };
    const handleNewRequest = () => {
        navigation.navigate('DGModal');
    };
    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator
                    color={mtrTheme.colors.activityIndicator}
                    size={80}
                />
            </View>
        );
    }
    return (
        <View
            style={{
                backgroundColor: mtrTheme.colors.background,

                flex: 1,
            }}
        >
            <View>
                <Text style={mtrTheme.screenTitle}>DEFAULT GROUPS</Text>
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
                    Default groups can be dynamically added to meetings.
                </Text>
            </View>
            {displayGroups && (
                <>
                    {displayGroups && (
                        <FlatList
                            data={displayGroups}
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
