import { Text, View, Image } from 'react-native';
import { Storage } from 'aws-amplify';
import { useTheme } from 'react-native-paper';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useUserContext } from '../contexts/UserContext';
import { useSysContext } from '../contexts/SysContext';
import { printObject } from '../utils/helpers';
import TeamGroupCard from '../components/teams/Team.Group.Card';
import { getTeam } from '../jerichoQL/providers/team';

const TeamMemberScreen = (props) => {
    const teamMember = props.route.params.teamMember;
    const mtrTheme = useTheme();
    const { meeter } = useSysContext();
    const [pictureObject, setPictureObject] = useState(
        props.route.params.pictureUri
    );

    return (
        <>
            <View
                style={{
                    backgroundColor: mtrTheme.colors.background,
                    flex: 1,
                }}
            >
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                    {pictureObject && (
                        <>
                            <Image
                                source={{
                                    uri: pictureObject,
                                }}
                                style={{
                                    height: 160,
                                    aspectRatio: 1,
                                    borderRadius: 80,
                                }}
                            />
                        </>
                    )}
                </View>
                <View>
                    <Text style={mtrTheme.screenTitle}>
                        {teamMember.firstName} {teamMember.lastName}
                    </Text>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: 'white' }}>{teamMember.phone}</Text>
                    <Text style={{ color: 'white' }}>{teamMember.email}</Text>
                </View>
            </View>
        </>
    );
};

export default TeamMemberScreen;
