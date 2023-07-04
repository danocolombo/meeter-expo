import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Permissions from './Permissions';
import {
    updateAffiliationStatus,
    addNewAffiliationForUser,
    removeAffiliation,
} from '../../jerichoQL/providers/affiliations.provider';
import { useTeamContext } from '../../contexts/TeamContext';
import { updateTeamMemberPermissions } from '../../jerichoQL/providers/team.provider';
import { printObject, transformPatePhone } from '../../utils/helpers';

function MemberCard({ member, editFlag, deactivate, updatePermission }) {
    const [response, setResponse] = useState('<>');
    const [permissions, setPermissions] = useState(null);
    const [displayPhone, setDisplayPhone] = useState('');
    const { addAffiliation } = useTeamContext();
    useEffect(() => {
        if (member?.phone) {
            let tmp = transformPatePhone(member.phone);
            setDisplayPhone(tmp);
        }
    }, []);
    useEffect(() => {
        let manage = false;
        let groups = false;
        let meals = false;
        //printObject('MC:28-->member:\n', member);
        member?.roles?.forEach((role) => {
            // printObject('MC:11-->role:', role);
            if ((role?.role === 'manage') & (role?.status === 'active')) {
                manage = true;
            }
            if ((role?.role === 'groups') & (role?.status === 'active')) {
                groups = true;
            }
            if ((role?.role === 'meals') & (role?.status === 'active')) {
                meals = true;
            }
            setPermissions({
                manage: manage,
                groups: groups,
                meals: meals,
            });
        });
    }, []);
    const deactivateUser = () => {
        // printObject('member:\n', member);
        deactivate({
            memberId: member.id,
            roles: member.roles,
        });
    };
    const permissionHandler = async (value) => {
        setResponse(value);
        let response = value.split('.');
        switch (response[0]) {
            case 'manage':
                if (response[1] === 'add') {
                    // printObject('MC:187-->member:', member);
                    const response = {
                        member: member,
                        action: 'addPermission',
                        value: {
                            id: 'AWS-UNIQUE-ID',
                            organizationAffiliationsId: member.organizationId,
                            userAffiliationsId: member.id,
                            role: 'manage',
                            status: 'active',
                        },
                    };
                    updatePermission(response);
                } else if (response[1] === 'remove') {
                    const response = {
                        member: member,
                        action: 'removePermission',
                        value: {
                            role: 'manage',
                        },
                    };
                    updatePermission(response);
                }
                break;
            case 'OLDmanage':
                const manageCheck = member.roles.find(
                    (auth) => auth.role === 'manage'
                );
                printObject('MC:178-->manageCheck\n', manageCheck);
                if (manageCheck === undefined) {
                    if (response[1] === 'add') {
                        let aff = member?.roles.find(
                            (r) => r.role === 'manage'
                        );
                        printObject('MC:41-->AFF:\n', aff);
                        if (aff?.id) {
                            updateAffiliationStatus({
                                id: aff.id,
                                status: 'active',
                            })
                                .then((results) => {
                                    if (results) {
                                        updateTeamMemberPermissions({
                                            id: member.id,
                                            role: {
                                                id: aff.id,
                                                role: 'manage',
                                                status: 'active',
                                            },
                                        })
                                            .then((results) => {
                                                console.warn(
                                                    'Team context updated!!'
                                                );
                                                return;
                                            })
                                            .catch((error) => {
                                                console.warn(
                                                    'ERROR team.provider, see console'
                                                );
                                                printObject(
                                                    'Error updating team permissions:\n',
                                                    error
                                                );
                                            });
                                    } else {
                                        console.warn('GQL update failed');
                                    }
                                })
                                .catch((error) => {
                                    console.warn(
                                        'ERROR trying to update affiliation status'
                                    );
                                });
                        } else {
                            console.log(
                                'NEED TO ADD AUTH TO ',
                                member.firstName
                            );
                            addNewAffiliationForUser({
                                userId: member.id,
                                organizationId: member.organizationId,
                                role: 'manage',
                                status: 'active',
                            })
                                .then((results) => {
                                    printObject(
                                        'MC:97-->addNewAffiliationForUser results:\n',
                                        results
                                    );
                                    console.warn('Team context updated!!');
                                    return;
                                })
                                .catch((error) => {
                                    console.warn(
                                        'ERROR team.provider, see console'
                                    );
                                    printObject(
                                        'Error updating team permissions:\n',
                                        error
                                    );
                                });
                            // console.warn(member.firstName + 'EXCEPTION');
                        }
                    }
                }
                if (response[1] === 'remove') {
                    let aff = member?.roles.find((r) => r.role === 'manage');
                    printObject('MC:95-->AFF:\n', aff);
                    if (aff?.id) {
                        updateAffiliationStatus({
                            id: aff.id,
                            status: 'inactive',
                        })
                            .then((results) => {
                                if (results) {
                                    updateTeamMemberPermissions({
                                        id: member.id,
                                        role: {
                                            id: aff.id,
                                            role: 'manage',
                                            status: 'inactive',
                                        },
                                    })
                                        .then((results) => {
                                            console.warn(
                                                'Team context updated!!'
                                            );
                                            return;
                                        })
                                        .catch((error) => {
                                            console.warn(
                                                'ERROR team.provider, see console'
                                            );
                                            printObject(
                                                'Error updating team permissions:\n',
                                                error
                                            );
                                        });
                                } else {
                                    console.warn('GQL update failed');
                                }
                            })
                            .catch((error) => {
                                console.warn(
                                    'ERROR trying to update affiliation status'
                                );
                            });
                    } else {
                        console.warn(member.firstName + 'EXCEPTION');
                    }
                }
                break;
            case 'meals':
                if (response[1] === 'add') {
                    // printObject('MC:187-->member:', member);
                    const response = {
                        member: member,
                        action: 'addPermission',
                        value: {
                            id: 'AWS-UNIQUE-ID',
                            organizationAffiliationsId: member.organizationId,
                            userAffiliationsId: member.id,
                            role: 'meals',
                            status: 'active',
                        },
                    };
                    updatePermission(response);
                } else if (response[1] === 'remove') {
                    const response = {
                        member: member,
                        action: 'removePermission',
                        value: {
                            role: 'meals',
                        },
                    };
                    updatePermission(response);
                }
                break;
            case 'mealsOLD':
                printObject('MC:173-->member:\n', member);
                printObject('MC:174-->value:', value);
                const mealCheck = member.roles.find(
                    (auth) => auth.role === 'meals'
                );
                printObject('MC:178-->mealCheck\n', mealCheck);
                if (mealCheck === undefined) {
                    if (response[1] === 'add') {
                        /***********************************************************
                         *      addNewAffiliationForUser(newValues)
                         *      {
                         *          userId: "abc123",           // user id
                         *          organizationId: "123abc",   // organization id
                         *          role: "manage",             // role
                         *          status: "active"            // status
                         *      }
                         ***********************************************************/
                        const newValues = {
                            userId: member.id,
                            organizationId: member.organizationId,
                            role: 'meals',
                            status: 'active',
                        };
                        printObject('MC:207-->newValues:\n', newValues);
                        let DANO = false;
                        if (DANO) {
                            return;
                        }
                        addNewAffiliationForUser(newValues).then((response) => {
                            printObject('MC:214-->response:\n', response);
                            if (response?.status === 200) {
                                printObject(
                                    'MC:198-->GQL SUCCESS:\n',
                                    response.results
                                );
                                console.log('Now add affiliation to context');
                                const contextUpdate = {
                                    id: response.results.data.createAffiliation
                                        .id,
                                    ...newValues,
                                };
                                addAffiliation(contextUpdate).then(
                                    (contextResponse) => {
                                        printObject(
                                            'MC:228-->contextResponse:\n',
                                            contextResponse
                                        );
                                    }
                                );
                                printObject(
                                    'MC:223-->contextUpdate:\n',
                                    contextUpdate
                                );
                            } else {
                                printObject(
                                    'MC:200-->FAILURE:\n',
                                    response.results
                                );
                            }
                        });
                    }
                } else {
                    printObject('MC:211-->meals aff already defined', '');
                    if (response[1] === 'remove') {
                        printObject(
                            'MC:213-->aff existing, request to remove',
                            ''
                        );
                        removeAffiliation({ id: mealCheck.id }).then(() => {
                            console.log('affiliation removed');
                        });
                    } else {
                        printObject(
                            'MC:215-->aff exists, request was: ',
                            response[1]
                        );
                    }
                }
                break;
            case 'groups':
                if (response[1] === 'add') {
                    const response = {
                        member: member,
                        action: 'addPermission',
                        value: {
                            id: 'AWS-UNIQUE-ID',
                            organizationAffiliationsId: member.organizationId,
                            userAffiliationsId: member.id,
                            role: 'groups',
                            status: 'active',
                        },
                    };
                    updatePermission(response);
                } else if (response[1] === 'remove') {
                    const response = {
                        member: member,
                        action: 'removePermission',
                        value: {
                            role: 'groups',
                        },
                    };
                    updatePermission(response);
                }
                break;
            default:
                console.warn('missed it:', value);
                break;
        }
    };
    // printObject('MC:34-->member:\n', member);
    // printObject('MC:35-->permissions:\n', permissions);
    return (
        <View
            style={[
                styles.item,
                { backgroundColor: editFlag ? 'yellow' : '#A1C2F1' },
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <View>
                        <Text style={styles.name}>
                            {member?.firstName} {member?.lastName}
                        </Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <View>
                            <Text style={styles.details}>{member?.email}</Text>
                        </View>
                    </View>
                    {displayPhone?.length > 0 && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View>
                                <Text style={styles.details}>
                                    {displayPhone}
                                </Text>
                            </View>
                        </View>
                    )}
                    {member?.location?.city && member?.location?.stateProv && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ paddingVertical: 3 }}>
                                <Text style={styles.details}>
                                    {member?.location?.city},{' '}
                                    {member?.location?.stateProv}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                <View style={{ marginLeft: 'auto' }}>
                    <Permissions
                        permissions={permissions}
                        editFlag={editFlag}
                        togglePermission={permissionHandler}
                    />
                </View>
            </View>
            {editFlag && (
                <View>
                    <Pressable
                        onPress={deactivateUser}
                        style={styles.editButton}
                    >
                        <Text style={styles.editButtonText}>De-Activate</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
export default MemberCard;
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#A1C2F1',
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginVertical: 8,
        marginHorizontal: 5,
        borderRadius: 10,
        marginHorizontal: 5,
        // width: "100%",
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 12,
    },
    title: {
        fontSize: 16,
        flex: 1,
        flexWrap: 'wrap',
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        // flex: 1,
        // flexWrap: 'wrap',
    },
    details: {
        fontSize: 18,
        fontWeight: '400',
    },
    editButton: {
        marginVertical: 5,
        marginRight: 'auto',
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        // marginLeft: 10,
    },
    editButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'black',
        paddingVertical: 1,
        paddingHorizontal: 3,
        textTransform: 'uppercase',
    },
});
