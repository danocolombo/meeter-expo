import { Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useUserContext } from '../contexts/UserContext';
import { useSysContext } from '../contexts/SysContext';
import { printObject } from '../utils/helpers';
import { updateAffiliations } from '../jerichoQL/providers/affiliations.provider';

const TeamMemberScreen = (props) => {
    const teamMember = props.route.params.teamMember;
    const mtrTheme = useTheme();
    const { meeter } = useSysContext();
    const { userProfile } = useUserContext();
    const [isUpdating, setIsUpdating] = useState(false);
    const [pictureObject, setPictureObject] = useState(
        props.route.params.pictureUri
    );
    const mealsOriginalValue = teamMember.activeRoles.includes('meals');
    const groupsOriginalValue = teamMember.activeRoles.includes('groups');
    const manageOriginalValue = teamMember.activeRoles.includes('manage');
    const [meals, setMeals] = useState(
        teamMember.activeRoles.includes('meals')
    );
    const [groups, setGroups] = useState(
        teamMember.activeRoles.includes('groups')
    );
    const [manage, setManage] = useState(
        teamMember.activeRoles.includes('manage')
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
            userId: userProfile.id,
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
            <View
                style={{
                    backgroundColor: mtrTheme.colors.background,
                    flex: 1,
                }}
            >
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
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
                    <Text style={{ color: 'white' }}>{teamMember.phone}</Text>
                    <Text style={{ color: 'white' }}>{teamMember.email}</Text>
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        padding: 10,
                    }}
                >
                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                        <View style={{ justifyContent: 'center' }}>
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
                        <View
                            style={{ justifyContent: 'center', marginLeft: 10 }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 30,
                                }}
                            >
                                Meals
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>
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
                        <View
                            style={{ justifyContent: 'center', marginLeft: 10 }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 30,
                                }}
                            >
                                Small Groups
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>
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
                        <View
                            style={{ justifyContent: 'center', marginLeft: 10 }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 30,
                                }}
                            >
                                Manage
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                        {(meals !== mealsOriginalValue ||
                            groups !== groupsOriginalValue ||
                            manage !== manageOriginalValue) && (
                            <TouchableOpacity
                                onPress={saveChanges}
                                style={{
                                    width: 150,
                                    backgroundColor: 'green',
                                    borderRadius: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontFamily: 'Roboto-Bold',
                                        fontSize: 20,
                                        padding: 10,
                                        textAlign: 'center',
                                    }}
                                >
                                    SAVE
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </>
    );
};

export default TeamMemberScreen;
