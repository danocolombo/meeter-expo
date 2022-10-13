import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

const CustomButton = ({
    onPress,
    text,
    type = 'PRIMARY',
    enabled = true,
    bgColor,
    fgColor,
}) => {
    let cStyle;
    let tStyle;
    switch (type) {
        case 'PRIMARY':
            cStyle = 'container_PRIMARY';
            tStyle = 'text_PRIMARY';
            break;
        case 'SECONDARY':
            cStyle = 'container_SECONDARY';
            tStyle = 'text_SECONDARY';
            break;
        case 'TERTIARY':
            cStyle = 'container_TERTIARY';
            tStyle = 'text_TERTIARY';
            break;
        case 'DELETE':
            cStyle = 'container_DELETE';
            tStyle = 'text_DELETE';
            break;
        case 'CANCEL':
            cStyle = 'container_CANCEL';
            tStyle = 'text_CANCEL';
            break;
        default:
            break;
    }
    return (
        <>
            {enabled && (
                <Pressable
                    onPress={onPress}
                    style={[
                        styles.container,
                        styles[cStyle],
                        bgColor ? { backgroundColor: bgColor } : {},
                    ]}
                >
                    <Text
                        style={[
                            styles.text,
                            styles[tStyle],
                            fgColor ? { color: fgColor } : {},
                        ]}
                    >
                        {text}
                    </Text>
                </Pressable>
            )}
        </>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    container_PRIMARY: {
        backgroundColor: '#3b71f3',
    },
    container_SECONDARY: {
        borderColor: '#3b71f3',
        borderWidth: 2,
    },
    container_CANCEL: {
        background: 'lightgrey',
    },
    container_DELETE: {},
    container_TERTIARY: {},
    text: {
        color: 'white',
        fontWeight: '700',
    },
    text_TERTIARY: {
        color: 'gray',
    },
    text_SECONDARY: {
        color: '#3b71f3',
    },
    text_DELETE: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    text_CANCEL: {
        color: 'black',
        fontWeight: '600',
        fontSize: 20,
    },
});
