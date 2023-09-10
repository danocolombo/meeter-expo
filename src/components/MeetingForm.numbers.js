import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import NumberInput from './ui/NumberInput';
import { useSelector } from 'react-redux';
import Input from './ui/Input';
import { useTheme } from 'react-native-paper';
const NumbersSection = ({ values, setValues }) => {
    const { width } = useWindowDimensions();
    const mtrTheme = useTheme();
    const perms = useSelector((state) => state.user.perms);
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
    if (ViewOnly) {
        return (
            <>
                <View style={[mtrStyles(mtrTheme).row, { marginVertical: 4 }]}>
                    <View
                        style={[
                            mtrTheme.meetingEditNumberLabelContainer2,
                            {
                                minWidth: '50%',
                            },
                        ]}
                    >
                        <Text
                            style={
                                mtrStyles(mtrTheme).meetingEditMealNumberText
                            }
                        >
                            Attendance:
                        </Text>
                    </View>
                    <View
                        style={[
                            mtrStyles(mtrTheme).meetingEditMealNumberContainer,
                            {
                                minWidth: '50%',
                            },
                        ]}
                    >
                        <Text style={mtrStyles(mtrTheme).numberText}>
                            {values.attendanceCount}
                        </Text>
                    </View>
                </View>
                <View style={[mtrStyles(mtrTheme).row, { marginVertical: 0 }]}>
                    <View
                        style={[
                            mtrStyles(mtrTheme).meetingEditNumberLabelContainer,
                            { minWidth: '50%' },
                        ]}
                    >
                        <Text
                            style={
                                mtrStyles(mtrTheme).meetingEditMealNumberText
                            }
                        >
                            Newcomers:
                        </Text>
                    </View>
                    <View
                        style={[
                            mtrStyles(mtrTheme).meetingEditMealNumberContainer,
                            { minWidth: '50%' },
                        ]}
                    >
                        <Text style={mtrStyles(mtrTheme).numberText}>
                            {values.newcomersCount}
                        </Text>
                    </View>
                </View>
            </>
        );
    }
    return (
        <>
            <View style={[mtrStyles(mtrTheme).row, { marginVertical: 5 }]}>
                <View style={mtrStyles(mtrTheme).labelContainer}>
                    <Text style={mtrStyles(mtrTheme).labelText}>
                        Attendance:
                    </Text>
                </View>
                <View style={mtrStyles(mtrTheme).numberContainer}>
                    <NumberInput
                        numberStyle={{
                            color: mtrTheme.colors.textDark,
                            borderColor: mtrTheme.colors.mediumObject,
                        }}
                        graphicStyle={{
                            color: mtrTheme.colors.textDark,
                            borderColor: mtrTheme.colors.mediumObject,
                        }}
                        value={values.attendanceCount}
                        onAction={inputChangedHandler.bind(
                            this,
                            'attendanceCount'
                        )}
                    />
                </View>
            </View>
            <View style={mtrStyles(mtrTheme).row}>
                <View style={mtrStyles(mtrTheme).labelContainer}>
                    <Text style={mtrStyles(mtrTheme).labelText}>
                        Newcomers:
                    </Text>
                </View>
                <View style={mtrStyles(mtrTheme).numberContainer}>
                    <NumberInput
                        numberStyle={{
                            color: mtrTheme.colors.textDark,
                            borderColor: mtrTheme.colors.mediumObject,
                        }}
                        graphicStyle={{
                            color: mtrTheme.colors.textDark,
                            borderColor: mtrTheme.colors.mediumObject,
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

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        row: {
            flexDirection: 'row',
            marginHorizontal: 50,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
        },
        numberText: {
            color: mtrTheme.colors.darkText,
            fontSize: 18,
            paddingLeft: 20,
        },
        meetingEditMealNumberText: {
            fontFamily: 'Roboto-Regular',
            color: mtrTheme.colors.textDark,
            fontSize: 20,
            textAlign: 'right',
        },
        meetingEditMealNumberContainer: {
            // width: '55%',
            // marginRight: 10,
            paddingRight: 'auto',
        },
        meetingEditNumberLabelContainer: {
            width: '45%',
            paddingLeft: 'auto',
        },
        labelContainer: {
            //whatever
        },
        labelText: {
            //whatever
            color: mtrTheme.colors.darkText,
            fontSize: 18,
        },
        numberContainer: {
            //whatever
        },
    });
