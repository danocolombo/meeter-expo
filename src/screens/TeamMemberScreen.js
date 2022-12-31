import {
    Text,
    View,
    Image,
    Switch,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useTheme, Surface, ActivityIndicator } from 'react-native-paper';
import React, { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { printObject } from '../utils/helpers';
import { updateAffiliations } from '../jerichoQL/providers/affiliations.provider';

const TeamMemberScreen = (props) => {
    const teamMember = props.route.params.teamMember;
    printObject('teamMember***** ', teamMember);
    const mtrTheme = useTheme();
    const [showNotice, setShowNotice] = useState(
        teamMember.activeRoles ? false : true
    );
    const [showRemoveWarning, setShowRemoveWarning] = useState(false);
    const { userProfile } = useUserContext();
    const [isUpdating, setIsUpdating] = useState(false);
    const [pictureObject, setPictureObject] = useState(
        props.route.params.pictureUri
    );
    const mealsOriginalValue = teamMember?.activeRoles
        ? teamMember.activeRoles.includes('meals')
        : false;
    const groupsOriginalValue = teamMember?.activeRoles
        ? teamMember.activeRoles.includes('groups')
        : false;
    const manageOriginalValue = teamMember?.activeRoles
        ? teamMember.activeRoles.includes('manage')
        : false;
    const [meals, setMeals] = useState(
        teamMember?.activeRoles
            ? teamMember.activeRoles.includes('meals')
            : false
    );
    const [groups, setGroups] = useState(
        teamMember?.activeRoles
            ? teamMember.activeRoles.includes('groups')
            : false
    );
    const [manage, setManage] = useState(
        teamMember?.activeRoles
            ? teamMember.activeRoles.includes('manage')
            : false
    );
    const toggleMeals = () => setMeals((previousState) => !previousState);
    const toggleGroups = () => setGroups((previousState) => !previousState);
    const toggleManage = () => setManage((previousState) => !previousState);

    const saveChanges = () => {
        //*  We only get here if there were changes, so prepare the request
        setIsUpdating(true);
        let adds = [];
        let removes = [];
        //* check meals
        if (meals !== mealsOriginalValue) {
            if (mealsOriginalValue === false) {
                adds.push('meals');
            } else {
                removes.push('meals');
            }
        }
        if (groups !== groupsOriginalValue) {
            if (groupsOriginalValue === false) {
                adds.push('groups');
            } else {
                removes.push('groups');
            }
        }
        if (manage !== manageOriginalValue) {
            if (manageOriginalValue === false) {
                adds.push('manage');
            } else {
                removes.push('manage');
            }
        }

        const changeRequest = {
            organizationId: userProfile.activeOrg.id,
            userId: teamMember.id,
            add: adds,
            remove: removes,
        };

        updateAffiliations(changeRequest)
            .then(() => {
                console.log('updateAffiliations passed');
            })
            .catch((error) => {
                console.error(error);
            });
        setIsUpdating(false);
        Alert.alert('Permissions Updated');
    };
    const allowReadOnly = () => {
        Alert.alert('READ ONLY GRANTED');
    };

    if (isUpdating) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator
                    color={mtrTheme.colors.activityIndicator}
                    size={80}
                />
            </View>
        );
    }
    return (
        <>
            <Modal visible={showNotice} animationStyle='slide'>
                <Surface style={styles(mtrTheme).modalWrapper}>
                    <View style={styles(mtrTheme).modalContentWrapper}>
                        <Text style={styles(mtrTheme).modalNoticeHeader}>
                            NOTICE
                        </Text>
                    </View>
                    <View style={styles(mtrTheme).modalContentWrapper}>
                        <Text style={styles(mtrTheme).modalNoticeText}>
                            This user does not have any affiliation currently
                            with your organization.
                        </Text>
                    </View>
                    <View style={styles(mtrTheme).modalContentWrapper}>
                        <Text style={styles(mtrTheme).modalNoticeText}>
                            Currently the user can ONLY view your information.
                            You can grant them additional access, or you can
                            restrict them from your organization.
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowNotice(false)}
                        style={styles(mtrTheme).modalDismissButtonArea}
                    >
                        <View style={styles(mtrTheme).modalDimissButtonSurface}>
                            <Text
                                style={styles(mtrTheme).modalDismissButtonText}
                            >
                                OK
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Surface>
            </Modal>
            <View
                style={{
                    backgroundColor: mtrTheme.colors.background,
                    flex: 1,
                }}
            >
                <View style={{ paddingTop: 10, alignItems: 'center' }}>
                    {pictureObject && (
                        <>
                            <Image
                                source={{
                                    uri: pictureObject,
                                }}
                                style={{
                                    height: 160,
                                    aspectRatio: 1,
                                    borderRadius: 80,
                                    backgroundColor: 'white',
                                }}
                            />
                        </>
                    )}
                </View>
                <View>
                    <Text style={mtrTheme.screenTitle}>
                        {teamMember.firstName} {teamMember.lastName}
                    </Text>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                    }}
                >
                    {teamMember?.phone && (
                        <Text style={{ color: 'white' }}>
                            {teamMember.phone}
                        </Text>
                    )}
                    <Text style={{ color: 'white' }}>{teamMember.email}</Text>
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 20,
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                marginLeft: 0,
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: 'center',
                                }}
                            >
                                <Switch
                                    trackColor={{
                                        false: '#767577',
                                        true: mtrTheme.colors.success,
                                    }}
                                    thumbColor={meals ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor='#3e3e3e'
                                    onValueChange={toggleMeals}
                                    value={meals}
                                />
                            </View>
                            <View style={styles(mtrTheme).switchTextWrapper}>
                                <Text style={styles(mtrTheme).switchText}>
                                    Meals
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 0 }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Switch
                                    trackColor={{
                                        false: '#767577',
                                        true: mtrTheme.colors.success,
                                    }}
                                    thumbColor={groups ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor='#3e3e3e'
                                    onValueChange={toggleGroups}
                                    value={groups}
                                />
                            </View>
                            <View style={styles(mtrTheme).switchTextWrapper}>
                                <Text style={styles(mtrTheme).switchText}>
                                    Small Groups
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 0 }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Switch
                                    trackColor={{
                                        false: '#767577',
                                        true: mtrTheme.colors.success,
                                    }}
                                    thumbColor={manage ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor='#3e3e3e'
                                    onValueChange={toggleManage}
                                    value={manage}
                                />
                            </View>
                            <View style={styles(mtrTheme).switchTextWrapper}>
                                <Text style={styles(mtrTheme).switchText}>
                                    Manage
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles(mtrTheme).buttonSection}>
                        {!teamMember.activeRoles &&
                            !meals &&
                            !groups &&
                            !manage && (
                                <TouchableOpacity
                                    onPress={allowReadOnly}
                                    style={styles(mtrTheme).readOnlyButton}
                                >
                                    <Text style={styles(mtrTheme).readOnlyText}>
                                        ALLOW READ ONLY ACCESS
                                    </Text>
                                </TouchableOpacity>
                            )}
                        {!teamMember.activeRoles &&
                            !meals &&
                            !groups &&
                            !manage && (
                                <TouchableOpacity
                                    onPress={() => setShowRemoveWarning(true)}
                                    style={styles(mtrTheme).removeAllButton}
                                >
                                    <Text
                                        style={styles(mtrTheme).removeAllText}
                                    >
                                        REMOVE ALL ACCESS
                                    </Text>
                                </TouchableOpacity>
                            )}

                        {(meals !== mealsOriginalValue ||
                            groups !== groupsOriginalValue ||
                            manage !== manageOriginalValue) && (
                            <TouchableOpacity
                                onPress={saveChanges}
                                style={styles(mtrTheme).saveButton}
                            >
                                <Text style={styles(mtrTheme).saveText}>
                                    SAVE
                                </Text>
                            </TouchableOpacity>
                        )}
                        {teamMember.activeRoles &&
                            !meals &&
                            !groups &&
                            !manage && (
                                <TouchableOpacity
                                    onPress={() => setShowRemoveWarning(true)}
                                    style={styles(mtrTheme).removeAllButton}
                                >
                                    <Text
                                        style={styles(mtrTheme).removeAllText}
                                    >
                                        REMOVE ALL ACCESS
                                    </Text>
                                </TouchableOpacity>
                            )}
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = (mtrTheme) =>
    StyleSheet.create({
        modalWrapper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContentWrapper: {
            alignItems: 'center',
        },
        modalNoticeHeader: {
            fontFamily: 'Roboto-Bold',
            fontSize: 36,
            color: mtrTheme.colors.accent,
        },
        modalNoticeText: {
            fontFamily: 'Roboto-Medium',
            fontSize: 24,
            color: 'white',
            marginHorizontal: 30,
            marginVertical: 10,
        },
        modalDismissButtonArea: {
            width: 150,
            backgroundColor: mtrTheme.colors.success,
            marginTop: 25,
            borderRadius: 10,
        },
        modalDismissButtonText: {
            textAlign: 'center',
            color: 'white',
            padding: 10,
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
        },
        switchTextWrapper: {
            justifyContent: 'center',
            marginLeft: 20,
        },
        switchText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 30,
        },
        buttonSection: {
            alignItems: 'center',
            marginTop: 30,
        },
        readOnlyButton: {
            backgroundColor: 'green',
            borderRadius: 10,
        },
        readOnlyText: {
            color: 'white',
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
            padding: 10,
            textAlign: 'center',
        },
        removeAllButton: {
            marginTop: 15,
            backgroundColor: 'red',
            borderRadius: 10,
        },
        removeAllText: {
            color: 'white',
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
            padding: 10,
            textAlign: 'center',
        },
        saveButton: {
            width: 150,
            backgroundColor: 'green',
            borderRadius: 10,
        },
        saveText: {
            color: 'white',
            fontFamily: 'Roboto-Bold',
            fontSize: 20,
            padding: 10,
            textAlign: 'center',
        },
    });
export default TeamMemberScreen;
