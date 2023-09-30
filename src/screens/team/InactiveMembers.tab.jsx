import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { changeAffiliation } from '../../jerichoQL/providers/affiliations.provider';
import { useSelector, useDispatch } from 'react-redux';
import { activateMember } from '../../features/team/teamThunks';
import InactiveMemberCard from '../../components/teams/InactiveMemberCard';
import { printObject } from '../../utils/helpers';
import { useTheme, Surface } from 'react-native-paper';
const InactiveMembers = () => {
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    // need orgId
    const inactiveMembers = useSelector((state) => state.team.inactiveMembers);
    function actionHandler({ action, userId, orgId, roleId }) {
        // printObject('IMT:13-->actionHandler:action:', action);
        // printObject('IMT:13-->actionHandler:userId:', userId);
        // printObject('IMT:13-->actionHandler:orgId:', orgId);
        // printObject('IMT:13-->actionHandler:roleId:', roleId);

        if (action === 'GRANT') {
            const grantedMember = inactiveMembers.find((m) => m.id === userId);
            // printObject('IMT:23-->grantedMember:\n', grantedMember);
            dispatch(activateMember(grantedMember));
        }
    }
    if (inactiveMembers?.length < 1) {
        return (
            <View style={mtrStyles(mtrTheme).rootContent}>
                <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                    <Text style={mtrStyles(mtrTheme).screenTitleText}>
                        Inactive Users
                    </Text>
                </View>
                <View style={mtrStyles(mtrTheme).surface}>
                    <View style={mtrStyles(mtrTheme).introTextContainer}>
                        <Text style={mtrStyles(mtrTheme).introText}>
                            No Inactive Users
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <View style={mtrStyles(mtrTheme).rootContent}>
            <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                <Text style={mtrStyles(mtrTheme).screenTitleText}>
                    Inactive Members
                </Text>
            </View>
            <View style={mtrStyles(mtrTheme).surface}>
                <View style={mtrStyles(mtrTheme).introTextContainer}>
                    <Text
                        style={{
                            fontSize: 18,
                            padding: 10,
                            marginHorizontal: 10,
                        }}
                    >
                        These users do not have access at this time. You can
                        grant access as guest (view only) and adjust permissions
                        on the ACTIVE tab.
                    </Text>
                </View>
                <View style={mtrStyles(mtrTheme).listContainer}>
                    <FlatList
                        key={Math.random()} // Add a random key to force re-render
                        data={inactiveMembers}
                        renderItem={({ item }) => (
                            <InactiveMemberCard
                                member={item}
                                action={actionHandler}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </View>
    );
};

export default InactiveMembers;

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
        },
        introTextContainer: {
            paddingVertical: 10,
            paddingHorizontal: 15,
        },
        introText: {
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
            textAlign: 'center',
            letterSpacing: 0.3,
        },
        listContainer: {
            paddingHorizontal: 5,
        },
        pageTitleContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 10,
        },
        pageTitle: {
            fontSize: 24,
            fontWeight: '700',
        },
        editContainer: {
            flexDirection: 'row',
        },
        editButton: {
            marginLeft: 'auto',
            marginRight: 10,
        },
        editButtonText: {
            fontSize: 14,
            fontWeight: 'bold',
            color: 'white',
            padding: 5,
        },
    });
