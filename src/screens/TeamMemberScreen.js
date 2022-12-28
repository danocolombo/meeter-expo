import { Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import { Storage } from 'aws-amplify';
import { useTheme } from 'react-native-paper';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useUserContext } from '../contexts/UserContext';
import { useSysContext } from '../contexts/SysContext';
import { printObject } from '../utils/helpers';
import TeamGroupCard from '../components/teams/Team.Group.Card';
import { getTeam } from '../jerichoQL/providers/team';

const TeamMemberScreen = (props) => {
    const teamMember = props.route.params.teamMember;
    const mtrTheme = useTheme();
    const { meeter } = useSysContext();
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

    useFocusEffect(
        useCallback(() => {
            //* determine the initial values
        }, [])
    );
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
                                onPress={toggleGroups}
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
