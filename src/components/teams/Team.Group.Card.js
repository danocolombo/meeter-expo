/* ------------------------------------------------
 ** this is used to display user details to
 ** manager when viewing "Your Team" and clicking
 ** a user.
 ** ----------------------------------------------*/
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Foundation } from '@expo/vector-icons';
import { useTheme, withTheme, Badge } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Storage } from 'aws-amplify';
import { printObject } from '../../utils/helpers';
import { useSelector } from 'react-redux';
const TeamGroupListCard = (props) => {
    const navigation = useNavigation();
    const { team, listType, active, handleDelete } = props;
    const mtrTheme = useTheme();
    const meeter = useSelector((state) => state.system.meeter);
    const [pictureObject, setPictureObject] = useState(null);
    const [cardStyle, setCardStyle] = useState({
        backgroundColor: 'yellow',
        mainColor: 'black',
        accentColor: 'blue',
    });
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
                switch (listType) {
                    case 'active':
                        setCardStyle((prevCardStyle) => ({
                            ...prevCardStyle,
                            backgroundColor: 'blue',
                            mainColor: 'white',
                            accentColor: 'yellow',
                        }));
                        break;
                    case 'inactive':
                        setCardStyle((prevCardStyle) => ({
                            ...prevCardStyle,
                            backgroundColor: 'black',
                            mainColor: 'yellow',
                        }));
                        break;
                    case 'new':
                        setCardStyle((prevCardStyle) => ({
                            ...prevCardStyle,
                            mainColor: 'white',
                            backgroundColor: 'green',
                        }));
                        break;
                    default:
                        setCardStyle((prevCardStyle) => ({
                            ...prevCardStyle,
                            backgroundColor: 'white',
                        }));
                }
            }
            fetchImage();
        }, [])
    );

    function groupPressHandler() {
        return;
    }
    function handleDeleteClick() {
        return;
    }
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
                    style={({ pressed }) => pressed && styles.pressed}
                >
                    <View
                        style={[
                            styles.teamMemberItem,
                            { backgroundColor: cardStyle.backgroundColor },
                        ]}
                    >
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: 'blue',
                                width: '100%',
                                // minWidth: '100%',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginVertical: 10,
                                    flexWrap: 'wrap',
                                    width: '100%',
                                }}
                            >
                                <View
                                    style={{
                                        flex: 0,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 100,
                                            alignItems: 'center',
                                        }}
                                    >
                                        {pictureObject && (
                                            <>
                                                <View
                                                    style={{
                                                        backgroundColor:
                                                            'white',
                                                        borderRadius: 40,
                                                    }}
                                                >
                                                    <Image
                                                        source={{
                                                            uri: pictureObject,
                                                        }}
                                                        style={{
                                                            height: 50,
                                                            width: 50,
                                                            borderRadius: 25,
                                                        }}
                                                    />
                                                </View>
                                            </>
                                        )}
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.mainText,
                                            {
                                                color: cardStyle.mainColor,
                                            },
                                        ]}
                                    >
                                        {team.firstName} {team.lastName}
                                    </Text>
                                    {/* <Text
                                        style={{
                                            fontFamily: 'Roboto-Regular',
                                            fontSize: 20,
                                        }}
                                    >
                                        {team.activeRoles.length > 0
                                            ? team.activeRoles
                                            : 'READ-ONLY'}
                                    </Text> */}
                                </View>
                                {/* {team.activeRoles &&
                                    team.activeRoles.includes('new') && (
                                        <View
                                            style={{
                                                flex: 0,
                                                justifyContent: 'center',
                                                marginRight: 10,
                                            }}
                                        >
                                            <Foundation
                                                name='burst-new'
                                                size={80}
                                                color='yellow'
                                            />
                                        </View>
                                    )} */}
                            </View>
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
            backgroundColor: mtrTheme.colors.accent,
        },
    });

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    rootContainer: {
        marginHorizontal: 10,
    },
    teamMemberItem: {
        marginVertical: 5,
        // paddingBottom: 5,
        backgroundColor: 'darkgrey',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        borderRadius: 10,
        elevation: 3,
        shadowColor: 'yellow',
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    mainText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        fontWeight: '500',
    },
    accentText: {
        fontSize: 16,
        fontWeight: '400',
    },
});
