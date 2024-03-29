import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import Permissions from './Permissions';

import { updateTeamMemberPermissions } from '../../jerichoQL/providers/team.provider';
import { printObject, transformPatePhone } from '../../utils/helpers';

function MemberCard({
    member,
    editFlag,
    deactivate,
    updatePermission,
    onDetailRequest,
}) {
    // printObject('MC:9-->member:\n', member);
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
        if (member.roles.includes('manage')) {
            manage = true;
        }
        if (member.roles.includes('groups')) {
            groups = true;
        }
        if (member.roles.includes('meals')) {
            meals = true;
        }
        setPermissions({
            manage: manage,
            groups: groups,
            meals: meals,
        });
    }, []);
    const deactivateUser = () => {
        // printObject('member:\n', member);
        deactivate({
            memberId: member.id,
            roles: member.affiliations,
        });
    };
    const permissionHandler = async (value) => {
        setResponse(value);
        let response = value.split('.');
        switch (response[0]) {
            case 'manage':
                if (response[1] === 'add') {
                    printObject('MC:187-->member:', member);
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

            case 'meals':
                if (response[1] === 'add') {
                    printObject('MC:187-->member:', member);
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
    const handleMemberPress = () => {
        printObject('MC:159-->member:\n', member);
        onDetailRequest(member.id);
    };
    // printObject('MC:34-->member:\n', member);
    // printObject('MC:35-->permissions:\n', permissions);

    return (
        <TouchableOpacity onPress={handleMemberPress}>
            <View
                style={[
                    styles.item,
                    {
                        backgroundColor: editFlag
                            ? styles.item.backgroundColor
                            : '#A1C2F1',
                    },
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
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View>
                                <Text style={styles.details}>
                                    {member?.email}
                                </Text>
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
                        {member?.location?.city &&
                            member?.location?.stateProv && (
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
                        <Pressable
                            onPress={deactivateUser}
                            style={styles.editButton}
                        >
                            <Text style={styles.editButtonText}>X</Text>
                        </Pressable>
                    </View>
                </View>
                {editFlag && (
                    <View style={{ alignItems: 'center' }}>
                        <View
                            style={{
                                marginTop: 10,
                                maxWidth: '90%',
                                minWidth: '80%',
                                alignItems: 'center',
                                borderTopWidth: 1,
                                borderTopColor: 'grey',
                            }}
                        >
                            <Permissions
                                permissions={permissions}
                                editFlag={editFlag}
                                togglePermission={permissionHandler}
                            />
                        </View>
                    </View>
                )}
            </View>
        </TouchableOpacity>
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
