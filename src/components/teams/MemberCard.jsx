import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Permissions from './Permissions';
import {
    updateAffiliationStatus,
    addNewAffiliationForUser,
} from '../../jerichoQL/providers/affiliations.provider';
import { updateTeamMemberPermissions } from '../../jerichoQL/providers/team.provider';
import { printObject } from '../../utils/helpers';

function MemberCard({ member, editFlag }) {
    const [response, setResponse] = useState('<>');
    const [permissions, setPermissions] = useState(null);

    useEffect(() => {
        let manage = false;
        let groups = false;
        let meals = false;
        member?.roles.forEach((role) => {
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

    const handleToggleValue = (value) => {
        setResponse(value);
        let response = value.split('.');
        switch (response[0]) {
            case 'manage':
                if (response[1] === 'add') {
                    let aff = member?.roles.find((r) => r.role === 'manage');
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
                        console.log('NEED TO ADD AUTH TO ', member.firstName);
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
                console.warn(member.firstName, ' MEALS ', !permissions.meals);
                break;
            case 'groups':
                console.warn(member.firstName, ' GROUPS ', !permissions.groups);
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
                { backgroundColor: editFlag ? 'yellow' : '#f9c2ff' },
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.title}>
                    {member?.firstName} {member?.lastName}
                </Text>
                <View style={{ marginLeft: 'auto' }}>
                    <Permissions
                        permissions={permissions}
                        editFlag={editFlag}
                        togglePermission={handleToggleValue}
                    />
                </View>
            </View>
            <View>
                <Text>RESPONSE: {response}</Text>
            </View>
        </View>
    );
}
export default MemberCard;
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 2,
        marginVertical: 8,
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
});
