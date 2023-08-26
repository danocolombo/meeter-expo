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
    loadOrgUsers,
} from '../../features/team/teamThunks';
import { useTheme, Surface } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { printObject } from '../../utils/helpers';
import MemberCard from '../../components/teams/MemberCard';
const ActiveMembers = () => {
    const mtrTheme = useTheme();
    const userProfile = useSelector((state) => state.user.profile);
    const dispatch = useDispatch();
    const [displayMembers, setDisplayMembers] = useState([]);
    const [isLocallyLoading, setIsLocallyLoading] = useState(false);
    const { height: screenHeight } = Dimensions.get('window');
    const flatListHeight = screenHeight - 200; // Subtract the height of the bottom tab bar

    const [editFlag, setEditFlag] = useState(true);
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setIsLocallyLoading(true);
                try {
                    dispatch(loadTeam(userProfile?.activeOrg?.id))
                        .then((results) => {
                            setDisplayMembers(results.payload.active);
                            const totals = {
                                active: results.payload.active.length,
                                inactive: results.payload.inactive.length,
                                new: results.payload.new.length,
                            };
                        })
                        .catch((error) => {
                            console.log(
                                'AMT:46-->Error occurred while loading team:',
                                error
                            );
                        })
                        .finally(() => {
                            setIsLocallyLoading(false);
                        });
                } catch (error) {
                    // Handle the error, e.g., display an error message
                    console.log(
                        'AMT:56-->Error occurred while loading team:',
                        error
                    );
                }
                setIsLocallyLoading(false);
            };

            fetchData();
            // }, [dispatch, userProfile?.activeOrg?.id])
        }, [])
    );
    // useEffect(() => {
    //     setDisplayMembers(activeMembers);
    // }, []);
    const mtrStyles = (mtrTheme) =>
        StyleSheet.create({
            surface: {
                flex: 1,
                backgroundColor: mtrTheme.colors.background,
            },
            pageTitleContainer: {
                flexDirection: 'row',
                justifyContent: 'center',
                paddingVertical: 10,
            },
            screenTitleContainer: {
                paddingTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
            },
            screenTitleText: {
                fontSize: 30,
                fontFamily: 'Roboto-Bold',
                color: mtrTheme.colors.lightText,
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
        try {
            setIsLocallyLoading(true);
            const exiledMember = displayMembers.find(
                (m) => m.id === settings?.memberId
            );
            // printObject('AMT:96-->exiledMember:\n', exiledMember);
            dispatch(deactivateMember(exiledMember))
                .then((results) => {
                    const updatedDisplayMembers = displayMembers.filter(
                        (member) => member.id !== exiledMember.id
                    );

                    setDisplayMembers(updatedDisplayMembers);
                    // printObject('AMT:114-->results:\n', results);
                    // printObject('AMT:115-->displayMembers:\n', displayMembers);
                })
                .catch((error) => {
                    console.log(
                        'AMT:118-->Error occurred while deactivating member:',
                        error
                    );
                })
                .finally(() => {
                    setIsLocallyLoading(false);
                });
        } catch (error) {
            // Handle the error, e.g., display an error message
            console.log('AMT:56-->Error occurred while loading team:', error);
        }
    }
    function updatePermissionHandler(settings) {
        // add the current organization id to the settings object
        settings.orgId = userProfile.activeOrg.id;
        dispatch(updateActiveMember(settings));
    }

    if (isLocallyLoading) {
        console.log('HERE-2');
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='yellow' />
            </View>
        );
    }
    // printObject('AMT:154-->displayMembers:\n', displayMembers);
    return (
        <Surface style={mtrStyles(mtrTheme).surface}>
            <View style={{ flex: 1 }}>
                <View style={mtrStyles(mtrTheme).pageTitleContainer}>
                    <Text style={mtrStyles(mtrTheme).screenTitleText}>
                        Active Members
                    </Text>
                </View>

                {/* <View style={{ marginLeft: 'auto' }}>
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
            </View> */}
                <View style={{ paddingHorizontal: 5, flex: 1 }}>
                    {/* <View>
                    <Text>ACTIVE MEMBERS</Text>
                </View> */}
                    <FlatList
                        style={{ flex: 1 }} // Allow the FlatList to expand within its container
                        data={displayMembers}
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
        </Surface>
    );
};

export default ActiveMembers;
