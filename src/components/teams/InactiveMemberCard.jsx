import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import { printObject, transformPatePhone } from '../../utils/helpers';

function InactiveMemberCard({ member, action }) {
    printObject('IMC:7-->member:\n', member);
    const mtrTheme = useTheme();
    const [response, setResponse] = useState('<>');
    const [displayPhone, setDisplayPhone] = useState('');
    useEffect(() => {
        if (member?.phone) {
            let tmp = transformPatePhone(member.phone);
            setDisplayPhone(tmp);
        }
    }, []);

    const grantHandler = (value) => {
        const inactiveRole = member.affiliations.find(
            (r) => r.role === 'guest'
        );
        action({
            action: 'GRANT',
            userId: member.id,
            orgId: inactiveRole.organizationAffiliationsId,
            roleId: inactiveRole.id,
        });
    };
    printObject('MC:34-->member:\n', member);
    // printObject('MC:35-->permissions:\n', permissions);
    // printObject('IMC:18-->member:\n', member);
    return (
        <View style={mtrStyles(mtrTheme).item}>
            <View style={mtrStyles(mtrTheme).columnLeft}>
                <View style={mtrStyles(mtrTheme).rowCenter}>
                    <Text style={mtrStyles(mtrTheme).name}>
                        {member?.firstName} {member?.lastName}
                    </Text>
                </View>
                <View style={mtrStyles(mtrTheme).rowCenter}>
                    <View>
                        <Text>{member?.username}</Text>
                    </View>
                </View>
                <View style={mtrStyles(mtrTheme).rowCenter}>
                    <View>
                        <Text>{member?.email}</Text>
                    </View>
                </View>
                {displayPhone?.length > 0 && (
                    <View style={mtrStyles(mtrTheme).rowCenter}>
                        <View>
                            <Text>{displayPhone}</Text>
                        </View>
                    </View>
                )}
                {member?.location?.city && member?.location?.stateProv && (
                    <View style={mtrStyles(mtrTheme).rowCenter}>
                        <View style={{ paddingVertical: 3 }}>
                            <Text>
                                {member?.location?.city},{' '}
                                {member?.location?.stateProv}
                            </Text>
                        </View>
                    </View>
                )}
            </View>
            <View style={mtrStyles(mtrTheme).columnRight}>
                <Pressable onPress={grantHandler}>
                    <View style={mtrStyles(mtrTheme).acceptButton}>
                        <Text style={mtrStyles(mtrTheme).buttonText}>
                            Grant Guest Access
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}
export default InactiveMemberCard;
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        item: {
            backgroundColor: '#A1C2F1',
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 5,
            borderRadius: 10,
            // width: "100%",
            flex: 1,
            flexDirection: 'row',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 12,
        },
        columnLeft: {},
        columnRight: {
            marginLeft: 'auto',
        },
        rowCenter: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        name: {
            fontSize: 20,
            fontWeight: '600',
            flex: 1,
            flexWrap: 'wrap',
        },
        acceptButton: {
            marginLeft: 'auto',
            width: 75,
            backgroundColor: mtrTheme.colors.mediumGreen,
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
        },
        buttonText: {
            fontSize: 14,
            textAlign: 'center',
            color: 'white',
            textTransform: 'uppercase',
        },
        declineButton: {},
    });
