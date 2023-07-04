import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import NewMemberCard from '../../components/teams/NewMemberCard';
import { useSelector, useDispatch } from 'react-redux';
import { acceptMember, declineMember } from '../../features/team/teamThunks';
import { useTeamContext } from '../../contexts/TeamContext';
import { printObject } from '../../utils/helpers';
import { acc } from 'react-native-reanimated';
const NewMembers = () => {
    const dispatch = useDispatch();
    // need orgId
    const newMembers = useSelector((state) => state.team.newMembers);
    function actionHandler({ action, userId, orgId, roleId }) {
        console.log('action:', action);
        console.log('userId:', userId);
        console.log('orgId:', orgId);
        console.log('roleId:', roleId);

        if (action === 'ACCEPT') {
            let acceptedMember = newMembers.find((m) => m.id === userId);
            // acceptedMember.action = 'acceptMember';
            // printObject('NMT:22-->acceptedMember:\n', acceptedMember);
            let input = { member: { ...acceptedMember } };
            dispatch(acceptMember(input));
        } else if (action === 'DECLINE') {
            const declinedMember = newMembers.find((m) => m.id === userId);
            printObject('NMT:40-->declinedMember:\n', declinedMember);
            let input = { member: { ...declinedMember } };
            dispatch(declineMember(input));
        }
    }
    if (newMembers?.length < 1) {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={styles.pageTitleContainer}>
                    <Text style={styles.pageTitle}>Inactive Members</Text>
                </View>
                <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                    <Text>There are no new membership requests.</Text>
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.pageTitleContainer}>
                <Text style={styles.pageTitle}>New Membership Requests</Text>
            </View>
            <View>
                <Text
                    style={{ fontSize: 18, padding: 10, marginHorizontal: 10 }}
                >
                    These are new membership requests. Pressing ACCEPT will
                    allow the user to be a guest in this project. If DECLINE is
                    selected the user will be placed in the Inactive list.
                </Text>
            </View>
            <View style={{ paddingHorizontal: 5 }}>
                <FlatList
                    data={newMembers}
                    renderItem={({ item }) => (
                        <NewMemberCard member={item} action={actionHandler} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};

export default NewMembers;

const styles = StyleSheet.create({
    pageTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    editContainer: {
        flexDirection: 'row',
    },
    editButton: {
        marginLeft: 'auto',
        marginRight: 10,
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
    },
});
