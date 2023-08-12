//* ==========================================
//* this is the list cards of users on the
//* TeamScreen. It is to display user pic
//* and name, then ability to touch and go
//* to the TeamMemberScreen for user details
//* ==========================================
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useTheme } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Storage } from 'aws-amplify';
import { printObject } from '../../utils/helpers';
import { useSelector } from 'react-redux';
const TeamGroupListCard = (props) => {
    const navigation = useNavigation();
    const { team } = props;
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system.meeter);
    const [pictureObject, setPictureObject] = useState(null);

    useFocusEffect(
        useCallback(() => {
            async function fetchImage() {
                try {
                    let theFile = '';
                    if (team.picture === null) {
                        theFile = meeter.defaultProfilePicture;
                    } else {
                        theFile = team.picture;
                    }
                    const url = await Storage.get(theFile, {
                        level: 'public',
                    });
                    setPictureObject(url);
                } catch (error) {
                    console.error(error);
                }
            }
            fetchImage();
        }, [])
    );

    function handleDetailsPress() {
        navigation.navigate('TeamMember', {
            teamMember: team,
            pictureUri: pictureObject,
        });
    }
    // printObject('team:\n', team);
    return (
        <>
            <View style={mtrStyles(mtrTheme).container}>
                <Pressable
                    onPress={handleDetailsPress}
                    style={({ pressed }) =>
                        pressed && mtrStyles(mtrTheme).pressed
                    }
                >
                    <View style={mtrStyles(mtrTheme).teamMemberContainer}>
                        <View style={mtrStyles(mtrTheme).pictureContainer}>
                            {pictureObject && (
                                <>
                                    <View
                                        style={
                                            mtrStyles(mtrTheme)
                                                .pictureBackground
                                        }
                                    >
                                        <Image
                                            source={{
                                                uri: pictureObject,
                                            }}
                                            style={
                                                mtrStyles(mtrTheme).pictureStyle
                                            }
                                        />
                                    </View>
                                </>
                            )}
                        </View>
                        <View style={mtrStyles(mtrTheme).teamDetailsContainer}>
                            <Text style={mtrStyles(mtrTheme).teamDetailsText}>
                                {team.firstName} {team.lastName}
                            </Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        </>
    );
};

export default TeamGroupListCard;
const mtrStyles = (mtrTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: mtrTheme.colors.background,
        },
        pressed: {
            opacity: 0.75,
        },
        teamMemberContainer: {
            marginVertical: 5,
            marginHorizontal: 10,
            backgroundColor: mtrTheme.colors.mediumGraphic,
            paddingVertical: 5,
            flexDirection: 'row',
            borderRadius: 10,
            elevation: 3,
            shadowColor: mtrTheme.colors.darkShadow,
            shadowRadius: 4,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
        },
        pictureContainer: {
            width: 100,
            alignItems: 'center',
        },
        pictureBackground: {
            backgroundColor: mtrTheme.colors.lightGraphic,
            borderRadius: 40,
        },
        pictureStyle: {
            height: 50,
            width: 50,
            borderRadius: 25,
        },
        teamDetailsContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        teamDetailsText: {
            fontSize: 20,
            fontFamily: 'Roboto-Regular',
        },
    });
