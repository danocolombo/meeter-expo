import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import NewMemberCard from '../../components/teams/NewMemberCard';
import { useTeamContext } from '../../contexts/TeamContext';
import { changeAffiliation } from '../../jerichoQL/providers/affiliations.provider';
import { printObject } from '../../utils/helpers';
const NewMembers = () => {
    // need orgId
    const { newMembers, loadTeam } = useTeamContext();
    function actionHandler({ action, userId, orgId, roleId }) {
        if (action === 'ACCEPT') {
            console.log(
                'SET affiliation ' + roleId + ' role: guest, status: active'
            );
            const newValues = {
                affiliationId: roleId,
                newRoleValue: 'guest',
                newStatusValue: 'active',
            };
            changeAffiliation(newValues)
                .then((response) => {
                    printObject('changeAffiliation response:\n', response);
                })
                .then((response) => {
                    loadTeam().then(() => {
                        console.log('done');
                    });
                });

            /* insert role: 'guest', status: active for organizationId */
        } else if (action === 'DECLINE') {
            console.log('DECLINE USER:', userId, ' on ', orgId);
            const newValues = {
                affiliationId: roleId,
                newRoleValue: 'guest',
                newStatusValue: 'inactive',
            };
            changeAffiliation(newValues)
                .then((response) => {
                    printObject('changeAffiliation response:\n', response);
                })
                .then((response) => {
                    loadTeam().then(() => {
                        console.log('done');
                    });
                });
        }
    }
    if (newMembers.length < 1) {
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
