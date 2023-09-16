import { StyleSheet, Text, View, FlatList, AppState } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import * as queries from '../jerichoQL/queries';
import { useSelector, useDispatch } from 'react-redux';
import { API } from 'aws-amplify';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Surface, useTheme, ActivityIndicator, FAB } from 'react-native-paper';
import DefaultGroupCard from '../components/groups/Default.Group.Card';
import CustomButton from '../components/ui/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { printObject } from '../utils/helpers';
import {
    loadDefaultGroups,
    deleteDefaultGroup,
} from '../features/groups/groupsThunks';
import { NativeScreen } from 'react-native-screens';

const DefaultGroupsScreen = () => {
    const mtrTheme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.profile);
    const defaultGroups = useSelector((state) => state.groups.defaultGroups);
    const [displayGroups, setDisplayGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function onAppStateChange(status) {
        if (Platform.OS !== 'web') {
            focusManager.setFocused(status === 'active');
        }
    }

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
            <View style={mtrStyles(mtrTheme).activityIndicatorContainer}>
                <ActivityIndicator
                    color={mtrStyles(mtrTheme).activityIndicator}
                    size={80}
                />
            </View>
        );
    }
    return (
        <View style={mtrStyles(mtrTheme).container}>
            <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                <Text style={mtrStyles(mtrTheme).screenTitleText}>
                    DEFAULT GROUPS
                </Text>
            </View>

            <View style={mtrStyles(mtrTheme).subtitleContainer}>
                <Text style={mtrStyles(mtrTheme).subtitleText}>
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
            <View style={mtrStyles(mtrTheme).buttonContainer}>
                <CustomButton
                    text='ADD DEFAULT GROUP'
                    bgColor={mtrTheme.colors.mediumGreen}
                    fgColor={mtrTheme.colors.lightText}
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

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        container: {
            backgroundColor: mtrTheme.colors.background,
            flex: 1,
        },
        screenTitleContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.lightText,
        },
        subtitleContainer: {
            paddingVertical: 10,
            paddingHorizontal: 50,
            marginBottom: 10,
            marginHorizontal: 30,
        },
        subtitleText: {
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            fontWeight: '500',
            color: mtrTheme.colors.accent,
            textAlign: 'center',
        },
        activityIndicatorContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {
            color: mtrTheme.colors.lightGraphic,
        },
        buttonContainer: {
            marginHorizontal: 20,
            paddingBottom: 20,
        },
    });
