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
            <View
                style={{
                    borderWidth: 1,
                    borderColor: 'yellow',
                    borderRadius: 10,
                    padding: 5,
                    marginHorizontal: 10,
                    marginVertical: 5,
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        marginTop: 0,
                    }}
                >
                    <Text style={mtrTheme.meetingEditInputLabel}>
                        Meal Information
                    </Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <View>
                        <Input
                            label='Menu'
                            labelStyle={mtrTheme.meetingEditInputLabel}
                            textInputConfig={{
                                backgroundColor: 'white',
                                value: values.meal,
                                paddingHorizontal: 1,
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
                            labelStyle={mtrTheme.meetingEditInputLabel}
                            textInputConfig={{
                                backgroundColor: 'white',
                                value: values.mealContact,
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
                <View style={[styles.row, { paddingTop: 5 }]}>
                    <View
                        style={[
                            mtrTheme.meetingEditNumberLabelContainer,
                            { minWidth: '50%' },
                        ]}
                    >
                        <Text style={mtrTheme.meetingEditMealNumberText}>
                            Served:
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

const styles = StyleSheet.create({});
