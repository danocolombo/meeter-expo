import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { changeAffiliation } from '../../jerichoQL/providers/affiliations.provider';
import { useSelector, useDispatch } from 'react-redux';
import { activateMember } from '../../features/team/teamThunks';
import InactiveMemberCard from '../../components/teams/InactiveMemberCard';
import { useTeamContext } from '../../contexts/TeamContext';
import { printObject } from '../../utils/helpers';
const InactiveMembers = () => {
    const dispatch = useDispatch();
    // need orgId
    const inactiveMembers = useSelector((state) => state.team.inactiveMembers);

    function actionHandler({ action, userId, orgId, roleId }) {
        if (action === 'GRANT') {
            console.log(
                'IMT:11-->GRANT ' + roleId + ' role: guest, status: active'
            );
            const grantedMember = inactiveMembers.find((m) => m.id === userId);
            printObject('IMT:20-->grantedMember:\n', grantedMember);
            dispatch(activateMember(grantedMember));
            // const newValues = {
            //     affiliationId: roleId,
            //     newRoleValue: 'guest',
            //     newStatusValue: 'active',
            // };
            // changeAffiliation(newValues)
            //     .then((response) => {
            //         printObject(
            //             'IMT:20-->changeAffiliation response:\n',
            //             response
            //         );
            //     })
            //     .then((response) => {
            //         loadTeam().then(() => {
            //             console.log('done');
            //         });
            //     });
        }
        if (action === 'ACCEPT') {
            console.log(
                'SET affiliation ' + roleId + ' role: guest, status: active'
            );
            // const newValues = {
            //     affiliationId: roleId,
            //     newRoleValue: 'guest',
            //     newStatusValue: 'active',
            // };
            // changeAffiliation(newValues)
            //     .then((response) => {
            //         printObject('changeAffiliation response:\n', response);
            //     })
            //     .then((response) => {
            //         loadTeam().then(() => {
            //             console.log('done');
            //         });
            //     });

            /* insert role: 'guest', status: active for organizationId */
        } else if (action === 'DECLINE') {
            console.log('DECLINE USER:', userId, ' on ', orgId);
            // const newValues = {
            //     affiliationId: roleId,
            //     newRoleValue: 'guest',
            //     newStatusValue: 'inactive',
            // };
            // changeAffiliation(newValues)
            //     .then((response) => {
            //         printObject('changeAffiliation response:\n', response);
            //     })
            //     .then((response) => {
            //         loadTeam().then(() => {
            //             console.log('done');
            //         });
            //     });
        }
    }
    if (inactiveMembers.length < 1) {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={styles.pageTitleContainer}>
                    <Text style={styles.pageTitle}>Inactive Members</Text>
                </View>
                <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                    <Text>There are no inactive users identified.</Text>
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.pageTitleContainer}>
                <Text style={styles.pageTitle}>Inactive Members</Text>
            </View>
            <View>
                <Text
                    style={{ fontSize: 18, padding: 10, marginHorizontal: 10 }}
                >
                    These users have either previously been a part of the team
                    or have requested access, but all of these users do not have
                    access at this time. You can grant access as guest (view
                    only) and adjust permissions on the ACTIVE tab.
                </Text>
            </View>
            <View style={{ paddingHorizontal: 5 }}>
                <FlatList
                    data={inactiveMembers}
                    renderItem={({ item }) => (
                        <InactiveMemberCard
                            member={item}
                            action={actionHandler}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};

export default InactiveMembers;

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
