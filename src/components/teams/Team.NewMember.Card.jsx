import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { printObject } from '../../utils/helpers';

const NewMemberCard = ({ member }) => {
    printObject('N-MEMBER:', member);
    return (
        <View>
            <Text>NEW</Text>
        </View>
    );
};

export default NewMemberCard;

const styles = StyleSheet.create({});
