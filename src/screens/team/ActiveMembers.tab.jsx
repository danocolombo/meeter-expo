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
import CustomButton from '../../components/CustomButton';
import { printObject } from '../../utils/helpers';
import MemberCard from '../../components/teams/MemberCard';
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
                            printObject('AMT:41-->results:\n', results);
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
        printObject('AMT:110-->detailedMember:\n', member);
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
    // printObject('AMT:154-->displayMembers:\n', displayMembers);
    return (
        <>
            <Surface style={mtrStyles(mtrTheme).screenSurface}>
                <View style={mtrStyles(mtrTheme).screenHeader}>
                    <Text style={mtrStyles(mtrTheme).screenHeaderText}>
                        Active Users
                    </Text>
                </View>
                <Modal visible={showDetailsModal} animationStyle='slide'>
                    <View style={mtrStyles(mtrTheme).modal}>
                        <View style={mtrStyles(mtrTheme).modalSurfaceContainer}>
                            <Surface style={mtrStyles(mtrTheme).modalSurface}>
                                <View
                                    style={mtrStyles(mtrTheme).modalDataWrapper}
                                >
                                    <Text
                                        style={
                                            mtrStyles(mtrTheme).modalMemberName
                                        }
                                    >
                                        {detailedMember?.firstName}{' '}
                                        {detailedMember?.lastName}
                                    </Text>
                                </View>
                                <View
                                    style={mtrStyles(mtrTheme).modalDataWrapper}
                                >
                                    <View style={mtrStyles(mtrTheme).modalRow}>
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalColumnHalf
                                            }
                                        >
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .modalDetailsLabel
                                                }
                                            >
                                                Username:
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalColumnHalf
                                            }
                                        >
                                            <Text>
                                                {detailedMember?.username}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={mtrStyles(mtrTheme).modalRow}>
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalRowCenter
                                            }
                                        >
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .modalSmallText
                                                }
                                            >
                                                sub: {detailedMember?.sub}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={mtrStyles(mtrTheme).modalRow}>
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalRowCenter
                                            }
                                        >
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .modalSmallText
                                                }
                                            >
                                                id: {detailedMember?.id}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={mtrStyles(mtrTheme).modalRow}>
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalRowCenter
                                            }
                                        >
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .modalSmallText
                                                }
                                            >
                                                phone: {detailedMember?.phone}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={mtrStyles(mtrTheme).modalRow}>
                                        <View
                                            style={
                                                mtrStyles(mtrTheme)
                                                    .modalRowCenter
                                            }
                                        >
                                            <Text
                                                style={
                                                    mtrStyles(mtrTheme)
                                                        .modalDetailsLabel
                                                }
                                            >
                                                Phone:
                                            </Text>

                                            <Text>{detailedMember?.phone}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={mtrStyles(mtrTheme).noteContainer}>
                                    <Text style={mtrStyles(mtrTheme).noteText}>
                                        NOTE: All groups for the meeting will be
                                        deleted as well.
                                    </Text>
                                </View>
                                <View
                                    style={mtrStyles(mtrTheme).buttonContainer}
                                >
                                    <View
                                        style={
                                            mtrStyles(mtrTheme).buttonWrapper
                                        }
                                    >
                                        <CustomButton
                                            text='OK'
                                            bgColor={
                                                mtrTheme.colors.mediumGreen
                                            }
                                            fgColor={mtrTheme.colors.lightText}
                                            onPress={() =>
                                                setShowDetailsModal(false)
                                            }
                                        />
                                    </View>
                                </View>
                            </Surface>
                        </View>
                    </View>
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
        modal: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mtrTheme.colors.background,
        },
        modalDataWrapper: {
            // marginHorizontal: 20,
            // flex: 1,
            borderColor: 'blue',
            borderWidth: 1,
        },
        modalMemberName: {
            fontFamily: 'Roboto-Bold',
            fontSize: 24,
            fontWeight: '700',
            color: mtrTheme.colors.background,
            textAlign: 'center',
            paddingTop: 0,
        },
        modalSurfaceContainer: {
            alignItems: 'center',
            marginTop: 15,
        },
        modalSurface: {
            backgroundColor: mtrTheme.colors.lightGraphic,
            width: '90%',
            borderRadius: 10,
            padding: 20,
        },
        modalRow: {
            flexDirection: 'row',
        },
        modalRowCenter: {
            flex: 1,
            alignItems: 'center',
        },
        modalColumnHalf: {
            flex: 0.5,
        },
        modalSmallText: {
            fontFamily: 'Roboto-Thin',
        },
        modalDetailsLabel: {
            fontFamily: 'Roboto-Bold',
            textAlign: 'right',
            paddingRight: 2,
        },
        modalDetailsData: {
            fontFamily: 'Roboto-Regular',
            textAlign: 'left',
            paddingRight: 2,
        },
    });
