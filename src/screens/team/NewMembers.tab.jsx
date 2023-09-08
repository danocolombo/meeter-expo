import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import NewMemberCard from '../../components/teams/NewMemberCard';
import { useSelector, useDispatch } from 'react-redux';
import { acceptMember, declineMember } from '../../features/team/teamThunks';
import { printObject } from '../../utils/helpers';
import { acc } from 'react-native-reanimated';
import { useTheme, Surface } from 'react-native-paper';
const NewMembers = () => {
    const mtrTheme = useTheme();
    const dispatch = useDispatch();
    // need orgId
    const newMembers = useSelector((state) => state.team.newMembers);
    function actionHandler({ action, userId, orgId, roleId }) {
        // console.log('action:', action);
        // console.log('userId:', userId);
        // console.log('orgId:', orgId);
        // console.log('roleId:', roleId);

        if (action === 'ACCEPT') {
            let acceptedMember = newMembers.find((m) => m.id === userId);
            // acceptedMember.action = 'acceptMember';
            // printObject('NMT:22-->acceptedMember:\n', acceptedMember);
            let input = { member: { ...acceptedMember } };
            dispatch(acceptMember(input));
        } else if (action === 'DECLINE') {
            const declinedMember = newMembers.find((m) => m.id === userId);
            printObject('NMT:40-->declinedMember:\n', declinedMember);
            let input = { member: { ...declinedMember } };
            dispatch(declineMember(input));
        }
    }
    if (newMembers?.length < 1) {
        return (
            <View style={mtrStyles(mtrTheme).rootContent}>
                <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                    <Text style={mtrStyles(mtrTheme).screenTitleText}>
                        New User Requests
                    </Text>
                </View>
                <View style={mtrStyles(mtrTheme).surface}>
                    <View style={mtrStyles(mtrTheme).introTextContainer}>
                        <Text style={mtrStyles(mtrTheme).introText}>
                            None Pending
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
    // printObject('NMT:51-->newMembers:\n', newMembers);
    return (
        <View style={mtrStyles(mtrTheme).rootContent}>
            <View style={mtrStyles(mtrTheme).screenTitleContainer}>
                <Text style={mtrStyles(mtrTheme).screenTitleText}>
                    New User Requests
                </Text>
            </View>
            <View style={mtrStyles(mtrTheme).surface}>
                <View style={mtrStyles(mtrTheme).introTextContainer}>
                    <Text style={mtrStyles(mtrTheme).introText}>
                        These are new membership requests. Pressing ACCEPT will
                        allow the user to be a guest in this project. If DECLINE
                        is selected the user will be placed in the Inactive
                        list.
                    </Text>
                </View>
                <View style={mtrStyles(mtrTheme).listContainer}>
                    <FlatList
                        data={newMembers}
                        renderItem={({ item }) => (
                            <NewMemberCard
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

export default NewMembers;

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
    });
