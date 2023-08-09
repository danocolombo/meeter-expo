import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

const Tooltip = ({ children, content }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const toggleTooltip = () => {
        setTooltipVisible(!isTooltipVisible);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleTooltip}>
                {children}
            </TouchableOpacity>
            {isTooltipVisible && (
                <View style={styles.tooltipContainer}>
                    <View style={styles.tooltip}>
                        <Text style={styles.tooltipText}>{content}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Tooltip;

const styles = StyleSheet.create({
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
