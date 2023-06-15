import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { useTeamContext } from '../../contexts/TeamContext';
import { useUserContext } from '../../contexts/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { printObject } from '../../utils/helpers';
const ActiveMembers = () => {
    const { userProfile } = useUserContext();
    // need orgId
    const { members, newMembers, activeMembers, inactiveMembers, loadTeam } =
        useTeamContext();
    useFocusEffect(
        useCallback(() => {
            printObject('userProfile:\n', userProfile);
            printObject('activeOrg:', userProfile?.activeOrg?.id);
            loadTeam(userProfile?.activeOrg?.id);
            console.log('loaded');
        }, [])
    );
    printObject('members:\n', members);
    printObject('newMembers:\n', newMembers);
    printObject('inactiveMembers:\n', inactiveMembers);
    printObject('activeMembers:\n', activeMembers);
    return (
        <View>
            <Text style={{ padding: 10, fontSize: 18 }}>
                New Requests: {newMembers.length}
            </Text>
            <Text style={{ padding: 10, fontSize: 18 }}>
                ActiveMembers: {activeMembers.length}
            </Text>
            <Text style={{ padding: 10, fontSize: 18 }}>
                Inactive Members: {inactiveMembers.length}
            </Text>
        </View>
    );
};

export default ActiveMembers;

const styles = StyleSheet.create({});
