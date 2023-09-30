import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
const Tooltip = ({ children, content }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const mtrTheme = useTheme();
    const toggleTooltip = () => {
        setTooltipVisible(!isTooltipVisible);
    };

    return (
        <View style={mtrStyles(mtrTheme).container}>
            <TouchableOpacity onPress={toggleTooltip}>
                {children}
            </TouchableOpacity>
            {/* {isTooltipVisible && (
                <View style={mtrStyles(mtrTheme).tooltipContainer}>
                    <View style={mtrStyles(mtrTheme).tooltip}>
                        <Text style={mtrStyles(mtrTheme).tooltipText}>
                            {content}
                        </Text>
                    </View>
                </View>
            )} */}
        </View>
    );
};

export default Tooltip;

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        container: {
            position: 'relative',
        },
        tooltipContainer: {
            position: 'absolute',
            top: '100%',
            right: '50%',
            // alignItems: 'center',
            transform: [{ translateX: -10 }],
            zIndex: 1,
        },
        tooltip: {
            // backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backgroundColor: mtrTheme.colors.critical,
            padding: 8,
            borderRadius: 4,
            // borderSize: 2,
            // borderColor: 'blue',
            minWidth: 120,
            // maxWidth: Dimensions.get('window').width - 40,
            alignItems: 'center', // Center horizontally
            justifyContent: 'center', // Center vertically
        },
        tooltipText: {
            // borderColor: 'blue',
            textAlign: 'center',
            // borderWidth: 2,
            color: 'white',
        },
    });
