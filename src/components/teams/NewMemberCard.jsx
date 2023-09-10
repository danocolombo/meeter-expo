import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import {
    printObject,
    displayPhone,
    transformPatePhone,
} from '../../utils/helpers';

function NewMemberCard({ member, action }) {
    const [displayPhone, setDisplayPhone] = useState('');
    useEffect(() => {
        if (member?.phone) {
            let tmp = transformPatePhone(member.phone);
            setDisplayPhone(tmp);
        }
    }, []);

    const acceptHandler = (value) => {
        // printObject('NMC:20-->member:\n', member);
        const guestRole = member.affiliations.find((r) => r.role === 'new');
        printObject('guestRole:\n', guestRole);
        action({
            action: 'ACCEPT',
            userId: member.id,
            orgId: member.organizationId,
            roleId: guestRole.id,
        });
    };
    const declineHandler = (value) => {
        console.log('DECLINE');
        action({
            action: 'DECLINE',
            userId: member.id,
            orgId: member.organizationId,
        });
        return;
    };

    return (
        <View style={styles.item}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <View>
                    <Text style={styles.name}>
                        {member?.firstName} {member?.lastName}
                    </Text>
                    <Text style={styles.details}>{member?.username}</Text>

                    <Text style={styles.details}>{member?.email}</Text>

                    {displayPhone?.length > 0 && (
                        <Text style={styles.details}>{displayPhone}</Text>
                    )}
                    {member?.location?.city && member?.location?.stateProv && (
                        <Text style={styles.details}>
                            {member?.location?.city},{' '}
                            {member?.location?.stateProv}
                        </Text>
                    )}
                </View>
                <View style={{ marginLeft: 'auto' }}>
                    <Pressable onPress={acceptHandler}>
                        <View
                            style={{
                                marginLeft: 'auto',
                                width: 100,
                                backgroundColor: 'green',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 5,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    textAlign: 'center',
                                    color: 'white',
                                    textTransform: 'uppercase',
                                }}
                            >
                                accept new user
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={declineHandler}>
                        <View
                            style={{
                                marginLeft: 'auto',
                                marginVertical: 5,
                                width: 100,
                                backgroundColor: 'red',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',

                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    textAlign: 'center',
                                    color: 'white',
                                    textTransform: 'uppercase',
                                }}
                            >
                                decline request
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
export default NewMemberCard;
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#A1C2F1',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 5,
        borderRadius: 10,
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
});
