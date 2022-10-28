import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
const TypeSelector = ({
    label,
    children,
    values,
    selectedValue,
    setSelectedValue,
    buttonUnselected,
}) => {
    const mtrTheme = useTheme();
    const bUnselected = {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: mtrTheme.colors.unSelected,
        alignSelf: 'flex-start',
        marginHorizontal: '1%',
        marginBottom: 6,
        minWidth: '30%',
        textAlign: 'center',
    };
    const tUnselected = {
        fontSize: 16,
        fontWeight: '500',
        color: mtrTheme.colors.unSelectedText,
        textAlign: 'center',
    };
    const bSelected = {
        backgroundColor: mtrTheme.colors.accent,
        borderWidth: 0,
    };
    const tSelected = {
        color: mtrTheme.colors.darkText,
    };
    return (
        <>
            <View style={{ padding: 10, flex: 1 }}>
                <View style={styles.row}>
                    {values.map((value) => (
                        <TouchableOpacity
                            key={value}
                            onPress={() => setSelectedValue(value)}
                            style={[
                                bUnselected,
                                selectedValue === value && bSelected,
                            ]}
                        >
                            <Text
                                style={[
                                    tUnselected,
                                    selectedValue === value && tSelected,
                                ]}
                            >
                                {value === 'Lesson'
                                    ? 'Lesson'
                                    : value === 'Testimony'
                                    ? 'Testimony'
                                    : 'Special'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        //flexWrap: "wrap",
    },
});

export default TypeSelector;
