import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable,
    ActivityIndicator,
    ScrollView,
    Dimensions,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    loadTeam,
    deactivateMember,
    updateActiveMember,
} from '../../features/team/teamThunks';

import { useFocusEffect } from '@react-navigation/native';
import { printObject } from '../../utils/helpers';
import MemberCard from '../../components/teams/MemberCard';
const ActiveMembers = () => {
    const userProfile = useSelector((state) => state.user.profile);
    const dispatch = useDispatch();
    const activeMembers = useSelector((state) => state.team.activeMembers);
    const isLoading = useSelector((state) => state.team.isLoading);
    const { height: screenHeight } = Dimensions.get('window');
    const flatListHeight = screenHeight - 200; // Subtract the height of the bottom tab bar

    const [editFlag, setEditFlag] = useState(true);
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    dispatch(loadTeam(userProfile?.activeOrg?.id));
                } catch (error) {
                    // Handle the error, e.g., display an error message
                    console.log(
                        'AM:32-->Error occurred while loading team:',
                        error
                    );
                }
            };
            fetchData();
        }, [dispatch, userProfile?.activeOrg?.id])
    );

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
        const exiledMember = activeMembers.find(
            (m) => m.id === settings?.memberId
        );

        dispatch(deactivateMember(exiledMember));
    }
    function updatePermissionHandler(settings) {
        dispatch(updateActiveMember(settings));
    }
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
            <View>
                <Text>screens/team/ActiveMembers.tab</Text>
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
                    <Text>ACTIVE MEMBERS</Text>
                </View>
                <FlatList
                    style={{ height: flatListHeight }} // Set the calculated height
                    data={activeMembers}
                    renderItem={({ item }) => (
                        <MemberCard
                            member={item}
                            editFlag={editFlag}
                            deactivate={deactivateHandler}
                            addAffiliation={addAffiliationHandler}
                            updatePermission={updatePermissionHandler}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};

export default ActiveMembers;
