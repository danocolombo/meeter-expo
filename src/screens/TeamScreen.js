import { Text, View, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import React, { useState, useEffect, useCallback } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { printObject } from '../utils/helpers';
import TeamGroupCard from '../components/teams/Team.Group.Card';
import { getTeam } from '../jerichoQL/providers/team.provider';
import { useFocusEffect } from '@react-navigation/native';

const TeamScreen = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const mtrTheme = useTheme();
    const { userProfile } = useUserContext();
    useFocusEffect(
        useCallback(() => {
            getTeam(userProfile.activeOrg.id)
                .then((theTeam) => {
                    setTeamMembers(theTeam);
                })
                .catch((error) => {
                    printObject('getTeam error:\n', error);
                });
        }, [])
    );

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
                </View>
                {teamMembers && (
                    <>
                        <FlatList
                            data={teamMembers}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TeamGroupCard
                                    team={item}
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
