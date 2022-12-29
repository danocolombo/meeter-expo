import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme, withTheme, Badge } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Storage } from 'aws-amplify';
import { useSysContext } from '../../contexts/SysContext';
import { printObject } from '../../utils/helpers';
const TeamGroupListCard = ({ team, active, handleDelete }) => {
    const navigation = useNavigation();
    const mtrTheme = useTheme();
    const { meeter } = useSysContext();
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
            <View style={styles.rootContainer}>
                <Pressable
                    onPress={handleDetailsPress}
                    style={({ pressed }) => pressed && styles.pressed}
                >
                    <View style={[styles.teamMemberItem]}>
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
                                                            height: 80,
                                                            width: 80,
                                                            borderRadius: 40,
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
                                        style={{
                                            fontFamily: 'Roboto-Bold',
                                            fontSize: 20,
                                        }}
                                    >
                                        {team.firstName} {team.lastName}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Roboto-Regular',
                                            fontSize: 20,
                                        }}
                                    >
                                        {team.activeRoles}
                                    </Text>
                                </View>
                                {!team.activeRoles && (
                                    <View
                                        style={{
                                            flex: 0,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <View
                                            style={{
                                                paddingBottom: 5,
                                                marginRight: 10,
                                            }}
                                        >
                                            <TouchableOpacity>
                                                <View
                                                    style={{
                                                        backgroundColor:
                                                            'green',
                                                        width: 75,
                                                        borderRadius: 5,
                                                        padding: 3,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            textAlign: 'center',
                                                            fontFamily:
                                                                'Roboto-Bold',
                                                            fontSize: 18,
                                                            color: 'white',
                                                        }}
                                                    >
                                                        Approve
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                paddingBottom: 5,
                                                marginRight: 10,
                                            }}
                                        >
                                            <TouchableOpacity>
                                                <View
                                                    style={{
                                                        backgroundColor: 'red',
                                                        width: 75,
                                                        borderRadius: 5,
                                                        padding: 3,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            textAlign: 'center',
                                                            fontFamily:
                                                                'Roboto-Bold',
                                                            fontSize: 18,
                                                            color: 'white',
                                                        }}
                                                    >
                                                        Reject
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </Pressable>
            </View>
        </>
    );
};

export default withTheme(TeamGroupListCard);

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
});
