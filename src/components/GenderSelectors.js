import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Selectors from './ui/Selectors';
const GenderSelectors = ({ pick, setPick }) => {
    return (
        <>
            <Selectors
                selectedValue={pick}
                values={['f', 'm', 'x']}
                setSelectedValue={setPick}
            ></Selectors>
        </>
    );
};

export default GenderSelectors;
