import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Selectors from './ui/Selectors';
const GenderSelectors = ({ pick, setPick }) => {
    const bUnselected = {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: 'orange',
        alignSelf: 'flex-start',
        marginHorizontal: '1%',
        marginBottom: 6,
        minWidth: '30%',
        textAlign: 'center',
    };
    const tUnselected = {
        fontSize: 12,
        fontWeight: '500',
        color: 'blue',
        textAlign: 'center',
    };
    const bSelected = {
        backgroundColor: 'blue',
        borderWidth: 0,
    };
    const tSelected = {
        color: 'white',
    };
    return (
        <>
            <Selectors
                selectedValue={pick}
                values={['f', 'm', 'x']}
                setSelectedValue={setPick}
            >
                buttonUnselected={bUnselected}
            </Selectors>
        </>
    );
};

export default GenderSelectors;
