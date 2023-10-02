import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useTheme } from 'react-native-paper';
const CustomInput = ({
    control,
    name,
    rules = {},
    autoCorrect = false,
    autoCapitalize = 'none',
    autoComplete = 'off',
    placeholder,
    keyboardType = 'default',
    secureTextEntry,
}) => {
    const mtrTheme = useTheme();
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
            }) => (
                <>
                    <View
                        style={[
                            styles.container,
                            { borderColor: error ? 'red' : '#e8e8e8' },
                        ]}
                    >
                        <TextInput
                            value={value}
                            placeholder={placeholder}
                            placeholderTextColor={mtrTheme.colors.textLight} // Set placeholderTextColor here
                            onChangeText={onChange}
                            autoCapitalize={autoCapitalize}
                            autoCorrect={autoCorrect}
                            autoComplete={autoComplete}
                            keyboardType={keyboardType}
                            onBlur={onBlur}
                            style={styles.input}
                            padding={5}
                            secureTextEntry={secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style={{ color: 'red', alignSelf: 'stretch' }}>
                            {error.message || 'Error'}
                        </Text>
                    )}
                </>
            )}
        />
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        background: 'lightgrey',
        width: '100%',
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    input: {
        fontSize: 18,
        backgroundColor: 'lightgrey',
        color: 'black',
    },
});
