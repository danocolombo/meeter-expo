import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import InactiveMemberCard from '../../components/teams/InactiveMemberCard';
import { useTeamContext } from '../../contexts/TeamContext';
const InactiveMembers = () => {
    // need orgId
    const { inactiveMembers } = useTeamContext();
    const [editFlag, setEditFlag] = useState(false);
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
                        <InactiveMemberCard member={item} editFlag={editFlag} />
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
