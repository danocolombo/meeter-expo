import React, { useState, useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Surface } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { TERMS_CONDITIONS } from '../constants/TermsConditions';
import { printObject } from '../utils/helpers';
import { PRIVACY_POLICY } from '../constants/PrivacyPolicy';
import RenderHtml from 'react-native-render-html';
import { useTheme } from 'react-native-paper';
const LegalScreen = (props) => {
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system);
    const [termsCollapsed, setTermsCollapsed] = useState(true); //collapsible
    const [privacyCollapsed, setPrivacyCollapsed] = useState(true); //collapsible
    const { width } = useWindowDimensions();
    const toggleTerms = () => {
        //Toggling the state of single Collapsible
        setTermsCollapsed(!termsCollapsed);
        setPrivacyCollapsed(true);
    };

    const togglePrivacy = () => {
        //Toggling the state of single Collapsible
        setPrivacyCollapsed(!privacyCollapsed);
        setTermsCollapsed(true);
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: meeter.appName || 'Meeter',
            headerBackTitle: 'Back',
        });
    }, [navigation, meeter]);
    return (
        <View style={mtrStyles(mtrTheme).rootContent}>
            <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                <Text style={mtrStyles(mtrTheme).screenTitleText}>
                    Legal Information
                </Text>
            </View>
            <Surface style={mtrStyles(mtrTheme).surface}>
                <ScrollView>
                    <TouchableOpacity onPress={toggleTerms}>
                        <View style={mtrStyles(mtrTheme).collapsibleHeaderRow}>
                            <Text
                                style={
                                    mtrStyles(mtrTheme).collapsibleHeaderText
                                }
                            >
                                Terms & Conditions
                            </Text>
                            <View
                                style={
                                    mtrStyles(mtrTheme).collapsibleHeaderIcon
                                }
                            >
                                {termsCollapsed ? (
                                    <AntDesign
                                        name='caretright'
                                        size={18}
                                        color={mtrTheme.colors.lightGrey}
                                    />
                                ) : (
                                    <AntDesign
                                        name='caretdown'
                                        size={18}
                                        color={mtrTheme.colors.lightGrey}
                                    />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={termsCollapsed} align='center'>
                        <View style={mtrStyles(mtrTheme).detailContainer}>
                            <Surface
                                style={[
                                    mtrStyles(mtrTheme).surface,
                                    { elevation: 5 },
                                ]}
                            >
                                <View>
                                    <RenderHtml
                                        contentWidth={width}
                                        source={TERMS_CONDITIONS}
                                    />
                                </View>
                            </Surface>
                        </View>
                    </Collapsible>
                    <TouchableOpacity onPress={togglePrivacy}>
                        <View style={mtrStyles(mtrTheme).collapsibleHeaderRow}>
                            <Text
                                style={
                                    mtrStyles(mtrTheme).collapsibleHeaderText
                                }
                            >
                                Privacy Policy
                            </Text>
                            <View
                                style={
                                    mtrStyles(mtrTheme).collapsibleHeaderIcon
                                }
                            >
                                {privacyCollapsed ? (
                                    <AntDesign
                                        name='caretright'
                                        size={18}
                                        color={mtrTheme.colors.lightGrey}
                                    />
                                ) : (
                                    <AntDesign
                                        name='caretdown'
                                        size={18}
                                        color={mtrTheme.colors.lightGrey}
                                    />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={privacyCollapsed} align='center'>
                        <View style={mtrStyles(mtrTheme).detailContainer}>
                            <Surface
                                style={[
                                    mtrStyles(mtrTheme).surface,
                                    { elevation: 5 },
                                ]}
                            >
                                <View>
                                    <RenderHtml
                                        contentWidth={width}
                                        source={PRIVACY_POLICY}
                                    />
                                </View>
                            </Surface>
                        </View>
                    </Collapsible>
                </ScrollView>
            </Surface>
        </View>
    );
};

export default LegalScreen;

const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        rootContent: {
            flex: 1,
            backgroundColor: mtrTheme.colors.background,
        },
        screenTitleContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 10,
        },
        screenTitleText: {
            fontSize: 30,
            fontFamily: 'Roboto-Bold',
            color: mtrTheme.colors.lightText,
        },
        surface: {
            backgroundColor: 'white',
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 5,
            paddingBottom: 10,
            flex: 1,
        },
        surfaceContainer: {
            // marginHorizontal: 10,
            width: '90%',
            padding: 20,
        },
        titleText: {
            fontSize: 26,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10,
        },
        text: {
            fontSize: 16,
            paddingVertical: 10,
        },
        collapsibleHeaderRow: {
            flexDirection: 'row',
            marginTop: 30,
            alignItems: 'center',
        },
        collapsibleHeaderText: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '500',
        },
        collapsibleHeaderIcon: {
            paddingLeft: 5,
        },
    });
