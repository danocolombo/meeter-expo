import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { printObject } from '../../utils/helpers';

const InactiveMemberCard = ({ member }) => {
    printObject('I-MEMBER:', member);
    return (
        <View>
            <Text>INACTIVE{member.firstName}</Text>
        </View>
    );
};

export default InactiveMemberCard;

const styles = StyleSheet.create({});
