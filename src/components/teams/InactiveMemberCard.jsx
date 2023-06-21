import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { printObject } from '../../utils/helpers';

function InactiveMemberCard({ member, editFlag }) {
    const [response, setResponse] = useState('<>');

    // useEffect(() => {

    // }, []);

    const handleToggleValue = (value) => {
        console.log('UPDATE');
    };
    // printObject('MC:34-->member:\n', member);
    // printObject('MC:35-->permissions:\n', permissions);
    console.log('member.id: ', member.id);
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
                    <Text>CHANGE ME</Text>
                </View>
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
            {member?.location?.city && member?.location?.stateprov && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
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
