import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { printObject } from '../../utils/helpers';

const ActiveMemberCard = ({ member }) => {
    // printObject('A-MEMBER:', member);
    console.log(member);
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: 'lightgrey',
                    padding: 5,
                    marginVertical: 5,
                    marginHorizontal: 10,
                    flex: 1, // Take up remaining vertical space
                }}
            >
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>
                        {member.firstName} {member.lastName}
                    </Text>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>ONE</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ActiveMemberCard;

const styles = StyleSheet.create({});
