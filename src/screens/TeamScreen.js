import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import React, { useState, useEffect, useCallback } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { printObject } from '../utils/helpers';
import TeamGroupCard from '../components/teams/Team.Group.Card';
// import { getTeam } from '../jerichoQL/providers/team.provider';
import { getProfiles } from '../features/profilesSlice';
import { getAffiliationsForTeam } from '../jerichoQL/providers/affiliations.provider';
import { getAffiliationsUsersByOrgId } from '../jerichoQL/providers/team.provider';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
const TeamScreen = () => {
    const dispatch = useDispatch();
    const [storedProfiles, setStoredProfiles] = useState([]);
    const allProfiles = useSelector((store) => store.profiles.allProfiles);
    const [isLoading, setIsLoading] = useState(true);
    const [teamMembers, setTeamMembers] = useState([]);
    const [inactiveMembers, setInactiveMembers] = useState([]);
    const [newMembers, setNewMembers] = useState([]);
    const [activeMembers, setActiveMembers] = useState([]);
    const mtrTheme = useTheme();
    const { userProfile } = useUserContext();
    useFocusEffect(
        useCallback(() => {
            printObject('TS:20-->allProfiles:\n', allProfiles);
            dispatch(getProfiles);
            getAffiliationsUsersByOrgId(userProfile.activeOrg.id)
                .then((theTeam) => {
                    console.log('THEN - BACK');
                    setTeamMembers(theTeam);
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
                    console.log('TS:73->CATCH\n', error, ' - return');
                });
            setIsLoading(false);
        }, [])
    );
    useEffect(() => {
        setStoredProfiles(allProfiles);
        printObject('storedProfiles:', storedProfiles);
    }, [allProfiles]);
    if (isLoading) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }
    return (
        <>
            <View
                style={{
                    backgroundColor: mtrTheme.colors.background,
                    flex: 1,
                }}
            >
                <View>
                    <Text style={mtrTheme.screenTitle}>TEAM MEMBERS</Text>
                </View>

                <View
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 30,
                        marginBottom: 10,
                        marginHorizontal: 30,
                    }}
                >
                    <Text style={mtrTheme.subTitleSmall}>
                        These are the current users that have access to this
                        affiliation. Click each one for more details.
                    </Text>
                    <Text
                        style={[
                            mtrTheme.subTitleSmall,
                            {
                                marginTop: 10,
                            },
                        ]}
                    >
                        New member requests will be highlighted and you can take
                        appropriate action as you see fit.
                    </Text>
                    <View>
                        <Text style={{ color: 'white' }}>
                            NEW:{newMembers.length}
                        </Text>
                    </View>
                </View>

                {newMembers && (
                    <>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>
                                NEW MEMBER REQUESTS
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
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>
                                ACTIVE MEMBERS
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
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>
                                INACTIVE MEMBERS
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
        </>
    );
};

export default TeamScreen;
const styles = StyleSheet.create({
    // pressed: {
    //     opacity: 0.75,
    // },
    // rootContainer: {
    //     marginHorizontal: 10,
    // },
    // teamMemberItem: {
    //     marginVertical: 5,
    //     // paddingBottom: 5,
    //     backgroundColor: 'darkgrey',
    //     flexDirection: 'row',
    //     //justifyContent: 'space-between',
    //     borderRadius: 10,
    //     elevation: 3,
    //     shadowColor: 'yellow',
    //     shadowRadius: 4,
    //     shadowOffset: { width: 1, height: 1 },
    //     shadowOpacity: 0.4,
    // },
    headerContainer: {
        paddingVertical: 5,
    },
    headerText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
    },
    accentText: {
        fontSize: 16,
        fontWeight: '400',
    },
});
