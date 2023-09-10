import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import NumberInput from './ui/NumberInput';
import Input from './ui/Input';
import { useTheme } from 'react-native-paper';
const MealSection = ({ values, setValues }) => {
    const { width } = useWindowDimensions();
    const mtrTheme = useTheme();
    const DANO = false;

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
    return (
        <>
            <View style={mtrStyles(mtrTheme).container}>
                <View
                    style={{
                        alignItems: 'center',
                        marginTop: 0,
                    }}
                >
                    <Text style={mtrStyles(mtrTheme).sectionTitleText}>
                        Meal Information
                    </Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <View>
                        <Input
                            label='Menu'
                            labelStyle={mtrStyles(mtrTheme).inputLabel}
                            textInputConfig={{
                                backgroundColor: mtrTheme.colors.lightGrey,
                                value: values.meal,
                                paddingHorizontal: 1,
                                borderColor: mtrTheme.colors.mediumObject,
                                borderWidth: StyleSheet.hairlineWidth,
                                fontSize: 24,
                                color: 'black',
                                marginHorizontal: 10,
                                //placeholder: 'Meal',
                                fontWeight: '300',
                                minWidth: width * 0.5,
                                letterSpacing: 0,
                                onChangeText: inputChangedHandler.bind(
                                    this,
                                    'meal'
                                ),
                            }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View>
                        <Input
                            label='Contact'
                            labelStyle={mtrStyles(mtrTheme).inputLabel}
                            textInputConfig={{
                                backgroundColor: mtrTheme.colors.lightGrey,
                                value: values.mealContact,
                                borderColor: mtrTheme.colors.mediumObject,
                                borderWidth: StyleSheet.hairlineWidth,
                                paddingHorizontal: 1,
                                fontSize: 24,
                                color: 'black',
                                marginHorizontal: 10,
                                //placeholder: 'Meal',
                                fontWeight: '300',
                                minWidth: width * 0.37,
                                letterSpacing: 0,
                                onChangeText: inputChangedHandler.bind(
                                    this,
                                    'mealContact'
                                ),
                            }}
                        />
                    </View>
                </View>
                <View style={mtrStyles(mtrTheme).row}>
                    <View style={mtrStyles(mtrTheme).countLabelContainer}>
                        <Text style={mtrStyles(mtrTheme).countLabelText}>
                            People Served:
                        </Text>
                    </View>
                    <View style={mtrStyles(mtrTheme).numberContainer}>
                        <NumberInput
                            numberStyle={{
                                color: mtrTheme.colors.textDark,
                                borderColor: mtrTheme.colors.mediumObject,
                                // borderWidth: StyleSheet.hairlineWidth,
                            }}
                            graphicStyle={{
                                color: mtrTheme.colors.textDark,
                                borderColor: mtrTheme.colors.mediumObject,
                            }}
                            value={values.mealCount}
                            onAction={inputChangedHandler.bind(
                                this,
                                'mealCount'
                            )}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};

export default MealSection;

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        row: {
            //something
        },
        container: {
            borderWidth: 1,
            borderColor: mtrTheme.colors.background,
            borderRadius: 10,
            padding: 5,
            marginHorizontal: 10,
            marginVertical: 5,
        },
        sectionTitleText: {
            fontFamily: 'Roboto-Regular',
            color: mtrTheme.colors.textDark,
            fontSize: 20,
        },
        inputLabel: {
            fontFamily: 'Roboto-Regular',
            color: mtrTheme.colors.textDark,
            fontSize: 18,
            marginLeft: 10,
        },
        meetingEditNumberLabelContainer: {
            //what ever
        },
        numberContainer: {
            //whatever
        },
        countLabelContainer: {
            // flexDirection: 'column',
            // justifyContent: 'center',
            paddingTop: 5,
            alignItems: 'center',
        },
        countLabelText: {
            fontFamily: 'Roboto-Regular',
            color: mtrTheme.colors.textDark,
            fontSize: 18,
            textAlign: 'center',
        },
    });
