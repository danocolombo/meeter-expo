import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import NumberInput from './ui/NumberInput';
import { useUserContext } from '../contexts/UserContext';
import Input from './ui/Input';
import { useTheme } from 'react-native-paper';
const NumbersSection = ({ values, setValues }) => {
    const { width } = useWindowDimensions();
    const mtrTheme = useTheme();
    const { perms } = useUserContext();
    const [ViewOnly, setViewOnly] = useState(!perms.includes('manage'));
    function inputChangedHandler(inputIdentifier, enteredValue) {
        // console.log('INPUT CHANGE HANDLER CLICKED');
        // console.log('inputIdentifier:', inputIdentifier);
        // console.log('enteredValue:', enteredValue);
        setValues((curInputValues) => {
            if (inputIdentifier === 'title') {
                if (enteredValue.length < 3) {
                    setIsTitleValid(false);
                } else {
                    setIsTitleValid(true);
                }
            }

            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }
    console.log('MFN:31-->perms:\n', perms);
    if (ViewOnly) {
        return (
            <>
                <View style={[styles.row, { marginVertical: 4 }]}>
                    <View
                        style={[
                            mtrTheme.meetingEditNumberLabelContainer2,
                            {
                                minWidth: '50%',
                            },
                        ]}
                    >
                        <Text style={mtrTheme.meetingEditMealNumberText}>
                            Attendance:
                        </Text>
                    </View>
                    <View
                        style={[
                            mtrTheme.meetingEditMealNumberContainer,
                            {
                                minWidth: '50%',
                            },
                        ]}
                    >
                        <Text style={styles.numberText}>
                            {values.attendanceCount}
                        </Text>
                    </View>
                </View>
                <View style={[styles.row, { marginVertical: 0 }]}>
                    <View
                        style={[
                            mtrTheme.meetingEditNumberLabelContainer,
                            { minWidth: '50%' },
                        ]}
                    >
                        <Text style={mtrTheme.meetingEditMealNumberText}>
                            Newcomers:
                        </Text>
                    </View>
                    <View
                        style={[
                            mtrTheme.meetingEditMealNumberContainer,
                            { minWidth: '50%' },
                        ]}
                    >
                        <Text style={styles.numberText}>
                            {values.newcomersCount}
                        </Text>
                    </View>
                </View>
            </>
        );
    }
    return (
        <>
            <View style={[styles.row, { marginVertical: 4 }]}>
                <View
                    style={[
                        mtrTheme.meetingEditNumberLabelContainer2,
                        {
                            minWidth: '50%',
                        },
                    ]}
                >
                    <Text style={mtrTheme.meetingEditMealNumberText}>
                        Attendance:
                    </Text>
                </View>
                <View
                    style={[
                        mtrTheme.meetingEditMealNumberContainer,
                        {
                            minWidth: '50%',
                        },
                    ]}
                >
                    <NumberInput
                        numberStyle={{
                            color: 'white',
                            borderColor: 'white',
                        }}
                        graphicStyle={{
                            color: 'white',
                            borderColor: 'white',
                        }}
                        value={values.attendanceCount}
                        onAction={inputChangedHandler.bind(
                            this,
                            'attendanceCount'
                        )}
                    />
                </View>
            </View>
            <View style={[styles.row, { marginVertical: 0 }]}>
                <View
                    style={[
                        mtrTheme.meetingEditNumberLabelContainer,
                        { minWidth: '50%' },
                    ]}
                >
                    <Text style={mtrTheme.meetingEditMealNumberText}>
                        Newcomers:
                    </Text>
                </View>
                <View
                    style={[
                        mtrTheme.meetingEditMealNumberContainer,
                        { minWidth: '50%' },
                    ]}
                >
                    <NumberInput
                        numberStyle={{
                            color: 'white',
                            borderColor: 'white',
                        }}
                        graphicStyle={{
                            color: 'white',
                            borderColor: 'white',
                        }}
                        value={values.newcomersCount}
                        onAction={inputChangedHandler.bind(
                            this,
                            'newcomersCount'
                        )}
                    />
                </View>
            </View>
        </>
    );
};

export default NumbersSection;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',

        marginHorizontal: 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    numberText: {
        color: 'white',
        fontSize: 18,
        paddingLeft: 20,
    },
});
