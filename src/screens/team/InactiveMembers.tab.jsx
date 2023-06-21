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
            <>
                <View>
                    <Text>There are no inactive users identified.</Text>
                </View>
            </>
        );
    }
    return (
        <View style={{ paddingHorizontal: 5 }}>
            <FlatList
                data={inactiveMembers}
                renderItem={({ item }) => (
                    <InactiveMemberCard member={item} editFlag={editFlag} />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default InactiveMembers;

const styles = StyleSheet.create({});
