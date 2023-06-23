import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { printObject, transformPatePhone } from '../../utils/helpers';

function InactiveMemberCard({ member, editFlag }) {
    const [response, setResponse] = useState('<>');
    const [displayPhone, setDisplayPhone] = useState('');
    useEffect(() => {
        if (member?.phone) {
            let tmp = transformPatePhone(member.phone);
            setDisplayPhone(tmp);
        }
    }, []);

    const grantHandler = (value) => {
        console.log('UPDATE');
    };
    // printObject('MC:34-->member:\n', member);
    // printObject('MC:35-->permissions:\n', permissions);
    // printObject('IMC:18-->member:\n', member);
    return (
        <View style={styles.item}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Text style={styles.name}>
                    {member?.firstName} {member?.lastName}
                </Text>
                <Pressable onPress={grantHandler}>
                    <View
                        style={{
                            marginLeft: 'auto',
                            width: 75,
                            backgroundColor: '#0A6EBD',
                            borderRadius: 15,
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
                                fontSize: 14,
                                textAlign: 'center',
                                color: 'white',
                                textTransform: 'uppercase',
                            }}
                        >
                            Grant Guest Access
                        </Text>
                    </View>
                </Pressable>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <Text>{member?.username}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <Text>{member?.email}</Text>
                </View>
            </View>
            {displayPhone?.length > 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text>{displayPhone}</Text>
                    </View>
                </View>
            )}
            {member?.location?.city && member?.location?.stateProv && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ paddingVertical: 3 }}>
                        <Text>
                            {member?.location?.city},{' '}
                            {member?.location?.stateProv}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}
export default InactiveMemberCard;
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
        flex: 1,
        flexWrap: 'wrap',
    },
});
