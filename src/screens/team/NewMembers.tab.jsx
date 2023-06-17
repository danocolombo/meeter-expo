import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTeamContext } from '../../contexts/TeamContext';
import NewMemberCard from '../../components/teams/Team.NewMember.Card';
import { printObject } from '../../utils/helpers';
const NewMembers = ({ setNewRequestsCount }) => {
    const { newMembers } = useTeamContext();
    if (newMembers?.length < 1) {
        return (
            <View>
                <Text>No New Requests Pending</Text>
            </View>
        );
    }
    printObject('newMembers:\n', newMembers);
    return (
        <View>
            <Text style={{ fontSize: 18 }}>
                NewMembers: {newMembers?.length || 0}
            </Text>
            {newMembers.forEach((element) => {
                printObject('NAME:', element.firstName);
                <NewMemberCard member={element} />;
            })}
            <Text style={{ fontSize: 18 }}>
                NewMembers: {newMembers[0].firstName}
            </Text>
        </View>
    );
};

export default NewMembers;

const styles = StyleSheet.create({});
