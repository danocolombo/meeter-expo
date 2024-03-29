import {
    StyleSheet,
    Text,
    View,
    Modal,
    StatusBar,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    loadTeam,
    deactivateMember,
    updateActiveMember,
} from '../../features/team/teamThunks';
import { useTheme, Surface } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { printObject } from '../../utils/helpers';
import MemberCard from '../../components/teams/MemberCard';
import DetailModal from './DetailModal';
const ActiveMembers = () => {
    const mtrTheme = useTheme();
    const userProfile = useSelector((state) => state.user.profile);
    const dispatch = useDispatch();
    const [displayMembers, setDisplayMembers] = useState([]);
    const [detailedMember, setDetailedMember] = useState(null);
    const [isLocallyLoading, setIsLocallyLoading] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [editFlag, setEditFlag] = useState(true);
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                console.log('NEW_FETCH');
                setIsLocallyLoading(true);
                try {
                    dispatch(loadTeam(userProfile?.activeOrg?.id))
                        .then((results) => {
                            // printObject('AMT:41-->results:\n', results);
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
        }, [])
    );

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
    function memberDetailsHandler(id) {
        // console.log('AMT:107-->id:', id);
        const member = displayMembers.find((m) => m.id === id);
        setDetailedMember(member);
        // printObject('AMT:110-->detailedMember:\n', member);
        setShowDetailsModal(true);
    }

    if (isLocallyLoading) {
        console.log('HERE-2');
        return (
            <View style={mtrStyles(mtrTheme).loadingContainer}>
                <ActivityIndicator size='large' color='yellow' />
            </View>
        );
    }
    // printObject('AMT:123-->detailedMember:\n', detailedMember);
    return (
        <>
            <Surface style={mtrStyles(mtrTheme).screenSurface}>
                <View style={mtrStyles(mtrTheme).screenHeader}>
                    <Text style={mtrStyles(mtrTheme).screenHeaderText}>
                        Active Users
                    </Text>
                </View>
                <Modal visible={showDetailsModal} animationType='slide'>
                    <DetailModal
                        detailedMember={detailedMember}
                        onClick={() => setShowDetailsModal(false)}
                    />
                </Modal>

                <>
                    <FlatList
                        key={Math.random()} // Add a random key to force re-render
                        data={displayMembers}
                        renderItem={({ item }) => (
                            <MemberCard
                                member={item}
                                editFlag={editFlag}
                                deactivate={deactivateHandler}
                                addAffiliation={addAffiliationHandler}
                                onDetailRequest={memberDetailsHandler}
                                updatePermission={updatePermissionHandler}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                    <StatusBar style='auto' />
                </>
            </Surface>
        </>
    );
};

export default ActiveMembers;
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        screenSurface: {
            flex: 1,
            backgroundColor: mtrTheme.colors.background,
        },
        screenHeader: {
            marginTop: 10,
            marginBottom: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        screenHeaderText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.lightText,
        },
    });
