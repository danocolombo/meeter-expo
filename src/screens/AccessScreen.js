import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
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
    const [isLoading, setIsLoading] = useState(true);
    const [inactiveMembers, setInactiveMembers] = useState([]);
    const [newMembers, setNewMembers] = useState([]);
    const [activeMembers, setActiveMembers] = useState([]);
    const mtrTheme = useTheme();
    const userProfile = useSelector((state) => state.user.profile);
    useFocusEffect(
        useCallback(() => {
            // dispatch(getProfiles);
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
    useEffect(() => {
        setStoredProfiles(allProfiles);
    }, [allProfiles]);
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
        <View style={mtrStyles(mtrTheme).surface}>
            <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                <Text style={mtrStyles(mtrTheme).screenTitleText}>ACCESS</Text>
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

            {newMembers && (
                <>
                    <View style={mtrStyles(mtrTheme).headerContainer}>
                        <Text style={mtrStyles(mtrTheme).headerText}>
                            NEW MEMBER REQUESTS ({newMembers.length})
                        </Text>
                    </View>
                    <FlatList
                        data={newMembers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TeamGroupCard
                                team={item}
                                listType='new'
                                active={true}
                                handleDelete={() => {}}
                            />
                        )}
                    />
                </>
            )}
            {activeMembers && (
                <>
                    <View style={mtrStyles(mtrTheme).headerContainer}>
                        <Text style={mtrStyles(mtrTheme).headerText}>
                            ACTIVE MEMBERS ({activeMembers.length})
                        </Text>
                    </View>
                    <FlatList
                        data={activeMembers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TeamGroupCard
                                team={item}
                                listType='active'
                                active={true}
                                handleDelete={() => {}}
                            />
                        )}
                    />
                </>
            )}
            {inactiveMembers && (
                <>
                    <View style={mtrStyles(mtrTheme).headerContainer}>
                        <Text style={mtrStyles(mtrTheme).headerText}>
                            INACTIVE MEMBERS ({newMembers.length})
                        </Text>
                    </View>
                    <FlatList
                        data={inactiveMembers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TeamGroupCard
                                team={item}
                                listType='inactive'
                                active={true}
                                handleDelete={() => {}}
                            />
                        )}
                    />
                </>
            )}
        </View>
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
