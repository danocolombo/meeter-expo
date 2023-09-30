import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from './ui/Input';
import { useTheme } from 'react-native-paper';
const TitleSection = ({ values, setValues }) => {
    const { width } = useWindowDimensions();
    const mtrTheme = useTheme();
    const userProfile = useSelector((state) => state.user.profile);
    const newPerms = useSelector((state) => state.user.perms);
    const [isTitleValid, setIsTitleValid] = useState(
        values?.title?.length > 2 ? true : false
    );
    const ViewOnly = !newPerms.includes('manage');
    function inputChangedHandler(inputIdentifier, enteredValue) {
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
                <View style={mtrStyles(mtrTheme).column}>
                    {values.meetingType === 'Lesson' && (
                        <>
                            <Input
                                label='LessonX'
                                labelStyle={
                                    mtrStyles(mtrTheme).meetingEditInputLabel
                                }
                                textInputConfig={{
                                    backgroundColor:
                                        mtrTheme.colors.lightGraphic,
                                    value: values.title,
                                    paddingHorizontal: 1,
                                    fontSize: 24,
                                    color: mtrTheme.colors.darkText,
                                    editable: newPerms.includes('manage')
                                        ? true
                                        : false,
                                    marginHorizontal: 10,
                                    placeholder: 'Lesson Title',
                                    fontWeight: '300',
                                    minWidth: '70%',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'title'
                                    ),
                                }}
                            />
                            <Input
                                label='Contact'
                                labelStyle={
                                    mtrStyles(mtrTheme).meetingEditInputLabel
                                }
                                textInputConfig={{
                                    backgroundColor:
                                        mtrTheme.colors.lightGraphic,
                                    value: values.supportContact,
                                    paddingHorizontal: 1,
                                    fontSize: 24,
                                    color: mtrTheme.colors.darkText,
                                    marginHorizontal: 10,
                                    placeholder: 'Contact',
                                    fontWeight: '300',
                                    minWidth: width * 0.6,
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'supportContact'
                                    ),
                                }}
                            />
                        </>
                    )}
                    {values.meetingType === 'Testimony' && (
                        <>
                            <Input
                                label='Guest'
                                labelStyle={
                                    mtrStyles(mtrTheme).meetingEditInputLabel
                                }
                                textInputConfig={{
                                    backgroundColor:
                                        mtrTheme.colors.lightGraphic,
                                    value: values.title,
                                    paddingHorizontal: 1,
                                    fontSize: 24,
                                    editable: newPerms.includes('manage')
                                        ? true
                                        : false,
                                    color: mtrTheme.colors.darkText,
                                    marginHorizontal: 10,
                                    autoCapitalize: 'words',
                                    placeholder: 'Guest',
                                    fontWeight: '300',
                                    minWidth: '70%',
                                    letterSpacing: 0,
                                    onChangeText: inputChangedHandler.bind(
                                        this,
                                        'title'
                                    ),
                                }}
                            />
                        </>
                    )}
                    {values.meetingType === 'Special' && (
                        <View style={mtrStyles(mtrTheme).container}>
                            <Text style={mtrStyles(mtrTheme).title}>
                                {values.title}
                            </Text>

                            <Text style={mtrStyles(mtrTheme).subTitle}>
                                {values.supportContact}
                            </Text>
                        </View>
                    )}
                </View>
            </>
        );
    }
    return (
        <>
            <View style={mtrStyles(mtrTheme).column}>
                {values.meetingType === 'Lesson' && (
                    <>
                        <Input
                            label='Lesson'
                            labelStyle={
                                mtrStyles(mtrTheme).meetingEditInputLabel
                            }
                            textInputConfig={{
                                backgroundColor: mtrTheme.colors.lightGrey,
                                value: values.title,
                                paddingHorizontal: 1,
                                borderColor: mtrTheme.colors.mediumObject,
                                borderWidth: StyleSheet.hairlineWidth,
                                fontSize: 24,
                                color: mtrTheme.colors.darkText,
                                editable: newPerms.includes('manage')
                                    ? true
                                    : false,
                                marginHorizontal: 10,
                                placeholder: 'Lesson Title',
                                fontWeight: '300',
                                minWidth: '70%',
                                letterSpacing: 0,
                                onChangeText: inputChangedHandler.bind(
                                    this,
                                    'title'
                                ),
                            }}
                        />
                        <Input
                            label='Contact'
                            labelStyle={
                                mtrStyles(mtrTheme).meetingEditInputLabel
                            }
                            textInputConfig={{
                                backgroundColor: mtrTheme.colors.lightGrey,
                                value: values.supportContact,
                                borderColor: mtrTheme.colors.mediumObject,
                                borderWidth: StyleSheet.hairlineWidth,
                                paddingHorizontal: 1,
                                fontSize: 24,
                                color: mtrTheme.colors.darkText,
                                marginHorizontal: 10,
                                placeholder: 'Contact',
                                fontWeight: '300',
                                minWidth: width * 0.6,
                                letterSpacing: 0,
                                onChangeText: inputChangedHandler.bind(
                                    this,
                                    'supportContact'
                                ),
                            }}
                        />
                    </>
                )}
                {values.meetingType === 'Testimony' && (
                    <>
                        <Input
                            label='Guest'
                            labelStyle={
                                mtrStyles(mtrTheme).meetingEditInputLabel
                            }
                            textInputConfig={{
                                backgroundColor: mtrTheme.colors.lightGrey,
                                value: values.title,
                                paddingHorizontal: 1,
                                borderColor: mtrTheme.colors.mediumObject,
                                borderWidth: StyleSheet.hairlineWidth,
                                fontSize: 24,
                                editable: newPerms.includes('manage')
                                    ? true
                                    : false,
                                color: mtrTheme.colors.darkText,
                                marginHorizontal: 10,
                                autoCapitalize: 'words',
                                placeholder: 'Guest',
                                fontWeight: '300',
                                minWidth: '70%',
                                letterSpacing: 0,
                                onChangeText: inputChangedHandler.bind(
                                    this,
                                    'title'
                                ),
                            }}
                        />
                    </>
                )}
                {values.meetingType === 'Special' && (
                    <>
                        <Input
                            label='Event Title'
                            labelStyle={
                                mtrStyles(mtrTheme).meetingEditInputLabel
                            }
                            textInputConfig={{
                                backgroundColor: mtrTheme.colors.lightGrey,
                                value: values.title,
                                borderColor: mtrTheme.colors.mediumObject,
                                borderWidth: StyleSheet.hairlineWidth,
                                paddingHorizontal: 1,
                                fontSize: 24,
                                color: mtrTheme.colors.darkText,
                                marginHorizontal: 10,
                                placeholder: 'Event Title',
                                fontWeight: '300',
                                minWidth: width * 0.6,
                                letterSpacing: 0,
                                onChangeText: inputChangedHandler.bind(
                                    this,
                                    'title'
                                ),
                            }}
                        />
                        <Input
                            label='Contact'
                            labelStyle={
                                mtrStyles(mtrTheme).meetingEditInputLabel
                            }
                            textInputConfig={{
                                backgroundColor: mtrTheme.colors.lightGrey,
                                value: values.supportContact,
                                borderColor: mtrTheme.colors.mediumObject,
                                borderWidth: StyleSheet.hairlineWidth,
                                paddingHorizontal: 1,
                                fontSize: 24,
                                color: mtrTheme.colors.darkText,
                                marginHorizontal: 10,
                                placeholder: 'Contact',
                                fontWeight: '300',
                                minWidth: width * 0.6,
                                letterSpacing: 0,
                                onChangeText: inputChangedHandler.bind(
                                    this,
                                    'supportContact'
                                ),
                            }}
                        />
                    </>
                )}
                <Input
                    label='Music/Worship'
                    labelStyle={mtrStyles(mtrTheme).meetingEditInputLabel}
                    textInputConfig={{
                        backgroundColor: mtrTheme.colors.lightGrey,
                        value: values.worship,
                        borderColor: mtrTheme.colors.mediumObject,
                        borderWidth: StyleSheet.hairlineWidth,
                        paddingHorizontal: 1,
                        fontSize: 24,
                        color: mtrTheme.colors.darkText,
                        marginHorizontal: 10,
                        placeholder: 'Music/Worship',
                        fontWeight: '300',
                        minWidth: width * 0.6,
                        letterSpacing: 0,
                        onChangeText: inputChangedHandler.bind(this, 'worship'),
                    }}
                />
            </View>
        </>
    );
};

export default TitleSection;
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        meetingEditInputLabel: {
            color: mtrTheme.colors.darkText,
            fontFamily: 'Roboto-Regular',
            paddingLeft: 10,
            fontSize: 20,
        },
        column: {
            flexDirection: 'column',
        },
        container: {
            paddingLeft: 5,
        },
        title: {
            color: mtrTheme.colors.lightGrey,
            fontSize: 24,
            paddingVertical: 3,
        },
        subTitle: {
            color: mtrTheme.colors.lightGrey,
            fontSize: 20,
            paddingVertical: 3,
        },
    });
