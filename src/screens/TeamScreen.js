import { StyleSheet, Text, View, FlatList } from 'react-native';
import {
    Button,
    Menu,
    Title,
    Paragraph,
    Divider,
    Provider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState, useEffect } from 'react';
import { TEAM_MEMBERS } from '../../data/team-members';
import { printObject } from '../utils/helpers';
import TeamGroupCard from '../components/teams/Team.Group.Card';
const TeamScreen = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [visible, setVisible] = useState(true);
    const openMenu1 = () => setVisible(true);
    const closeMenu1 = () => setVisible(false);
    const [showMenu, setShowMenu] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

    const openMenu = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);
    const onIconPress = (event) => {
        const { nativeEvent } = event;
        const anchor = {
            x: nativeEvent.pageX,
            y: nativeEvent.pageY,
        };

        setMenuAnchor(anchor);
        openMenu();
    };
    useEffect(() => {
        setTeamMembers(TEAM_MEMBERS.affiliations.items);
    }, []);

    printObject('TEAM_MEMBERS:\n', TEAM_MEMBERS);
    return (
        <>
            <View>
                <Text>TeamScreen</Text>
            </View>
            {teamMembers && (
                <>
                    <FlatList
                        data={teamMembers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TeamGroupCard
                                team={item}
                                active={true}
                                handleDelete={() => {}}
                            />
                        )}
                    />
                </>
            )}
            <Provider>
                <View
                    style={{
                        paddingTop: 0,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu1}
                        style={{ marginTop: 5 }}
                        anchor={
                            <Button
                                labelStyle={{ fontSize: 30 }}
                                onPress={openMenu1}
                            >
                                ...
                            </Button>
                        }
                    >
                        <Menu.Item onPress={() => {}} title='Item 1' />
                        <Menu.Item onPress={() => {}} title='Item 2' />
                        <Divider />
                        <Menu.Item onPress={() => {}} title='Item 3' />
                    </Menu>
                </View>
            </Provider>
            <View>
                <Text>HERE</Text>
            </View>
        </>
    );
};

export default TeamScreen;

const styles = StyleSheet.create({
    icon: {
        backgroundColor: 'red',
        color: '#fff',
        width: 45,
        padding: 10,
        borderRadius: 50,
        textAlign: 'center',
    },

    menuIcon: {
        marginLeft: 290,
        marginTop: 26,
    },

    card: {
        height: 80,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },

        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 0.5,
    },

    cardContent: {
        position: 'absolute',
        left: 85,
        bottom: 13,
    },

    cardIcon: {
        position: 'absolute',
        top: 16,
        left: 20,
    },
});
