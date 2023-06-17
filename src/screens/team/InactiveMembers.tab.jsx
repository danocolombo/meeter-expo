import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import InactiveMemberCard from '../../components/teams/Team.InactiveMember.Card';
import { useTeamContext } from '../../contexts/TeamContext';
const InactiveMembers = () => {
    // need orgId
    const { inactiveMembers } = useTeamContext();
    return (
        <View>
            {inactiveMembers &&
                inactiveMembers.map((m) => {
                    return <InactiveMemberCard member={m} />;
                })}
            <Text>InactiveMembers : {inactiveMembers?.length || 0}</Text>
        </View>
    );
};

export default InactiveMembers;

const styles = StyleSheet.create({});
