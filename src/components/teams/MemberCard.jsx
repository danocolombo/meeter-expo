import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Permissions from './Permissions';
import { printObject } from '../../utils/helpers';

function MemberCard({ member, editFlag }) {
    const [response, setResponse] = useState('<>');
    const [permissions, setPermissions] = useState(null);

    useEffect(() => {
        let manage = false;
        let groups = false;
        let meals = false;
        member?.roles.forEach((role) => {
            printObject('MC:11-->role:', role);
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
