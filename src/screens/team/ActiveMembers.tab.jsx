import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadTeam } from '../../features/team/teamThunks';

// import { useTeamContext } from '../../contexts/TeamContext';
import { useUserContext } from '../../contexts/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { deactivateUser } from '../../jerichoQL/providers/affiliations.provider';
import { printObject } from '../../utils/helpers';
import MemberCard from '../../components/teams/MemberCard';
const ActiveMembers = () => {
    const { userProfile } = useUserContext();
    // need orgId
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();
    const allMembers = useSelector((state) => state.team.allMembers);
    const activeMembers = useSelector((state) => state.team.activeMembers);
    const inactiveMembers = useSelector((state) => state.team.inactiveMembers);
    const newMembers = useSelector((state) => state.team.newMembers);

    const isLoading = useSelector((state) => state.team.isLoading); // Access the isLoading state from the Redux store

    const [editFlag, setEditFlag] = useState(false);
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    dispatch(loadTeam(userProfile?.activeOrg?.id));
                } catch (error) {
                    // Handle the error, e.g., display an error message
                    console.log('Error occurred while loading team:', error);
                }
            };

            fetchData();

            return () => {
                // Clean-up function (optional) if needed
            };
        }, [dispatch, userProfile?.activeOrg?.id])
    );
    useEffect(() => {
        if (members) {
            members.forEach((m) => {
                console.log('name:' + m.firstName);
            });
        }
    }, [members]);
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
            color: editFlag ? 'black' : 'white',
            padding: 5,
        },
    });
    function addAffiliationHandler(settings) {}
    function deactivateHandler(settings) {
        console.log('DE-ACTIVATE....', settings?.memberId);
        deactivateUser(settings)
            .then(() => {
                loadTeam();
            })
            .catch((err) => {
                printObject('AMT:48-->error deactivateUser:\n', err);
            });
    }
    // printObject('AM:46-->members:\n', members);
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='blue' />
            </View>
        );
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.pageTitleContainer}>
                <Text style={styles.pageTitle}>Active Members</Text>
            </View>
            <View style={{ marginLeft: 'auto' }}>
                <Pressable
                    onPress={() => setEditFlag(!editFlag)}
                    style={[
                        styles.editButton,
                        { backgroundColor: editFlag ? 'yellow' : 'blue' },
                    ]}
                >
                    <Text style={styles.editButtonText}>
                        {editFlag ? 'SAVE' : 'EDIT'}
                    </Text>
                </Pressable>
            </View>
            <View style={{ paddingHorizontal: 5 }}>
                <View>
                    <Text>ALL MEMBERS</Text>
                </View>
                <FlatList
                    data={allMembers}
                    renderItem={({ item }) => (
                        <MemberCard
                            member={item}
                            editFlag={editFlag}
                            deactivate={deactivateHandler}
                            addAffiliation={addAffiliationHandler}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={{ paddingHorizontal: 5 }}>
                <View>
                    <Text>ACTIVE MEMBERS</Text>
                </View>
                <FlatList
                    data={activeMembers}
                    renderItem={({ item }) => (
                        <MemberCard
                            member={item}
                            editFlag={editFlag}
                            deactivate={deactivateHandler}
                            addAffiliation={addAffiliationHandler}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={{ paddingHorizontal: 5 }}>
                <View>
                    <Text>INACTIVE MEMBERS</Text>
                </View>
                <FlatList
                    data={inactiveMembers}
                    renderItem={({ item }) => (
                        <MemberCard
                            member={item}
                            editFlag={editFlag}
                            deactivate={deactivateHandler}
                            addAffiliation={addAffiliationHandler}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={{ paddingHorizontal: 5 }}>
                <View>
                    <Text>NEW MEMBERS</Text>
                </View>
                <FlatList
                    data={newMembers}
                    renderItem={({ item }) => (
                        <MemberCard
                            member={item}
                            editFlag={editFlag}
                            deactivate={deactivateHandler}
                            addAffiliation={addAffiliationHandler}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};

export default ActiveMembers;
