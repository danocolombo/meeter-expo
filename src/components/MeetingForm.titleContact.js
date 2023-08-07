import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import NumberInput from './ui/NumberInput';
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
    const [ViewOnly, setViewOnly] = useState(!newPerms.includes('manage'));
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
                <View style={{ flexDirection: 'column' }}>
                    {values.meetingType === 'Lesson' && (
                        <>
                            <Input
                                label='Lesson'
                                labelStyle={mtrTheme.meetingEditInputLabel}
                                textInputConfig={{
                                    backgroundColor: 'white',
                                    value: values.title,
                                    paddingHorizontal: 1,
                                    fontSize: 24,
                                    color: 'black',
                                    editable:
                                        userProfile.activeOrg.role === 'manage'
                                            ? true
                                            : false,
                                    marginHorizontal: 10,
                                    placeholder: 'Lesson Title',
                                    // style: { color: 'white' },
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
                                labelStyle={mtrTheme.meetingEditInputLabel}
                                textInputConfig={{
                                    backgroundColor: 'white',
                                    value: values.supportContact,
                                    paddingHorizontal: 1,
                                    fontSize: 24,
                                    color: 'black',
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
                                labelStyle={mtrTheme.meetingEditInputLabel}
                                textInputConfig={{
                                    backgroundColor: 'white',
                                    value: values.title,
                                    paddingHorizontal: 1,
                                    fontSize: 24,
                                    editable:
                                        userProfile.activeOrg.role === 'manage'
                                            ? true
                                            : false,
                                    color: 'black',
                                    marginHorizontal: 10,
                                    autoCapitalize: 'words',
                                    placeholder: 'Guest',
                                    // style: { color: 'white' },
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
                        <View style={styles.container}>
                            <Text style={styles.title}>{values.title}</Text>

                            <Text style={styles.subTitle}>
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
            <View style={{ flexDirection: 'column' }}>
                {values.meetingType === 'Lesson' && (
                    <>
                        <Input
                            label='Lesson'
                            labelStyle={mtrTheme.meetingEditInputLabel}
                            textInputConfig={{
                                backgroundColor: 'white',
                                value: values.title,
                                paddingHorizontal: 1,
                                fontSize: 24,
                                color: 'black',
                                editable:
                                    userProfile.activeOrg.role === 'manage'
                                        ? true
                                        : false,
                                marginHorizontal: 10,
                                placeholder: 'Lesson Title',
                                // style: { color: 'white' },
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
                            labelStyle={mtrTheme.meetingEditInputLabel}
                            textInputConfig={{
                                backgroundColor: 'white',
                                value: values.supportContact,
                                paddingHorizontal: 1,
                                fontSize: 24,
                                color: 'black',
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
                            labelStyle={mtrTheme.meetingEditInputLabel}
                            textInputConfig={{
                                backgroundColor: 'white',
                                value: values.title,
                                paddingHorizontal: 1,
                                fontSize: 24,
                                editable:
                                    userProfile.activeOrg.role === 'manage'
                                        ? true
                                        : false,
                                color: 'black',
                                marginHorizontal: 10,
                                autoCapitalize: 'words',
                                placeholder: 'Guest',
                                // style: { color: 'white' },
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
                            labelStyle={mtrTheme.meetingEditInputLabel}
                            textInputConfig={{
                                backgroundColor: 'white',
                                value: values.title,
                                paddingHorizontal: 1,
                                fontSize: 24,
                                color: 'black',
                                marginHorizontal: 10,
                                placeholder: 'Event Title',
                                // style: { color: 'white' },
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
                            labelStyle={mtrTheme.meetingEditInputLabel}
                            textInputConfig={{
                                backgroundColor: 'white',
                                value: values.supportContact,
                                paddingHorizontal: 1,
                                fontSize: 24,
                                color: 'black',
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
            </View>
        </>
    );
};

export default TitleSection;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
    },
    title: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 3,
    },
    subTitle: {
        color: 'white',
        fontSize: 20,
        paddingVertical: 3,
    },
});
