import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Permissions from './Permissions';
import {
    updateAffiliationStatus,
    addNewAffiliationForUser,
} from '../../jerichoQL/providers/affiliations.provider';
import { updateTeamMemberPermissions } from '../../jerichoQL/providers/team.provider';
import { printObject, transformPatePhone } from '../../utils/helpers';

function MemberCard({ member, editFlag, deactivate }) {
    const [response, setResponse] = useState('<>');
    const [permissions, setPermissions] = useState(null);
    const [displayPhone, setDisplayPhone] = useState('');
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
    const deactivateUser = () => {
        printObject('member:\n', member);
        deactivate({
            memberId: member.id,
            roles: member.roles,
        });
    };
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
                        togglePermission={handleToggleValue}
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
