import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    SectionList,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import React, { useState, useEffect, useCallback } from 'react';
import { printObject } from '../utils/helpers';
import TeamGroupCard from '../components/teams/Team.Group.Card';
import { getProfiles } from '../features/profilesSlice';
// import { getAffiliationsUsersByOrgId } from '../jerichoQL/providers/team.provider';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAffiliationsUsersByOrgId } from '../features/system/systemThunks';
const TeamScreen = () => {
    const dispatch = useDispatch();
    const [storedProfiles, setStoredProfiles] = useState([]);
    const allProfiles = useSelector((store) => store.profiles.allProfiles);
    const [isLoading, setIsLoading] = useState(false);
    const [inactiveMembers, setInactiveMembers] = useState([]);
    const [newMembers, setNewMembers] = useState([]);
    const [activeMembers, setActiveMembers] = useState([]);
    const mtrTheme = useTheme();
    const userProfile = useSelector((state) => state.user.profile);
    useFocusEffect(
        useCallback(() => {
            // dispatch(getProfiles);
            setIsLoading(true);
            dispatch(
                getAffiliationsUsersByOrgId({ id: userProfile.activeOrg.id })
            )
                .then((data) => {
                    const theTeam = data.payload;
                    printObject('AS:31-->theTeam:\n', theTeam);

                    let nMembers = [];
                    let iMembers = [];
                    let aMembers = [];

                    theTeam.forEach((tm) => {
                        const roles = tm.roles;
                        const isNew = roles.some((role) => role.role === 'new');

                        if (isNew) {
                            nMembers.push(tm);
                        }

                        const isInactive = roles.some(
                            (role) => role.status === 'inactive'
                        );

                        if (isInactive) {
                            iMembers.push(tm);
                        } else {
                            aMembers.push(tm);
                        }
                    });
                    setActiveMembers(aMembers);
                    setInactiveMembers(iMembers);
                    setNewMembers(nMembers);
                })
                .catch((error) => {
                    console.log('AS:73->CATCH\n', error, ' - return');
                });
            setIsLoading(false);
        }, [])
    );
    // useEffect(() => {
    //     setStoredProfiles(allProfiles);
    // }, [allProfiles]);
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
        <SafeAreaView style={{ flex: 1 }}>
            <View style={mtrStyles(mtrTheme).surface}>
                <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                    <Text style={mtrStyles(mtrTheme).screenTitleText}>
                        ACCESS
                    </Text>
                </View>

                <View style={mtrStyles(mtrTheme).subtitleContainer}>
                    <Text style={mtrStyles(mtrTheme).subtitleText}>
                        These are the users affiliated with this organization.
                    </Text>
                    <Text style={mtrStyles(mtrTheme).subtitleText}>
                        Click each one for more details.
                    </Text>
                    <Text style={mtrStyles(mtrTheme).subtitleText}>
                        New member requests will be highlighted and you can take
                        appropriate action as you see fit.
                    </Text>
                </View>

                <SectionList
                    sections={[
                        {
                            title: `NEW MEMBER REQUESTS (${newMembers.length})`,
                            data: newMembers,
                        },
                        {
                            title: `ACTIVE MEMBERS (${activeMembers.length})`,
                            data: activeMembers,
                        },
                        {
                            title: `INACTIVE MEMBERS (${inactiveMembers.length})`,
                            data: inactiveMembers,
                        },
                    ]}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({ item }) => (
                        <TeamGroupCard
                            team={item}
                            listType={'activeMembers'}
                            active={true}
                            handleDelete={() => {}}
                        />
                    )}
                    renderSectionHeader={({ section }) => (
                        <View style={mtrStyles(mtrTheme).headerContainer}>
                            <Text style={mtrStyles(mtrTheme).headerText}>
                                {section.title}
                            </Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default TeamScreen;
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        surface: {
            flex: 1,
            backgroundColor: mtrTheme.colors.background,
        },
        activityIndicatorContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        activityIndicator: {
            color: mtrTheme.colors.lightGraphic,
        },
        screenTitleContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.accent,
        },
        subtitleContainer: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginBottom: 10,
            marginHorizontal: 0,
        },
        subtitleText: {
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            fontWeight: '500',
            color: mtrTheme.colors.accent,
            textAlign: 'center',
        },
        sectionContainer: {},
        sectionTitle: { color: mtrTheme.colors.lightText },
        headerContainer: {
            paddingVertical: 5,
        },
        headerText: {
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
            color: 'white',
            fontWeight: '500',
        },
    });
