import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useTeamContext } from '../../contexts/TeamContext';
import { useUserContext } from '../../contexts/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { printObject } from '../../utils/helpers';
import MemberCard from '../../components/teams/MemberCard';
const ActiveMembers = () => {
    const { userProfile } = useUserContext();
    // need orgId
    const { members, newMembers, activeMembers, inactiveMembers, loadTeam } =
        useTeamContext();
    const [editFlag, setEditFlag] = useState(false);
    useFocusEffect(
        useCallback(() => {
            printObject('userProfile:\n', userProfile);
            printObject('activeOrg:', userProfile?.activeOrg?.id);
            loadTeam(userProfile?.activeOrg?.id);
            console.log('loaded');
        }, [])
    );
    // printObject('members:\n', members);
    // printObject('newMembers:\n', newMembers);
    // printObject('inactiveMembers:\n', inactiveMembers);
    // printObject('activeMembers:\n', activeMembers);

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ padding: 10, fontSize: 18 }}>
                New Requests: {newMembers?.length || 0}
            </Text>
            <Text style={{ padding: 10, fontSize: 18 }}>
                ActiveMembers: {activeMembers?.length || 0}
            </Text>
            <Text style={{ padding: 10, fontSize: 18 }}>
                Inactive Members: {inactiveMembers?.length || 0}
            </Text>
            <FlatList
                data={members}
                renderItem={({ item }) => (
                    <MemberCard member={item} editFlag={editFlag} />
                )}
                keyExtractor={(item) => item.id}
            />
            {/* <View style={{ view: 1 }}>
                {members.map((member, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'lightgrey',
                            padding: 5,
                            marginVertical: 5,
                            marginHorizontal: 10,
                            flex: 1, // Take up remaining vertical space
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                flex: 1,
                                height: 20,
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>
                                {member.firstName} {member.lastName}
                            </Text>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>ONE</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </View> */}
        </View>
    );
};

export default ActiveMembers;

const styles = StyleSheet.create({});
