import { StyleSheet, Text, View, FlatList } from 'react-native';
import {
    Button,
    Menu,
    Title,
    Paragraph,
    Divider,
    Provider,
    useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState, useEffect } from 'react';
import { useSysContext } from '../contexts/SysContext';
import { useUserContext } from '../contexts/UserContext';
import { printObject } from '../utils/helpers';
import TeamGroupCard from '../components/teams/Team.Group.Card';
import { getTeam } from '../jerichoQL/providers/team';
import { ScrollView } from 'react-native-gesture-handler';

// const TEAM_MEMBERS = {
//     affiliations: {
//         items: [
//             {
//                 id: 'a6885ff1-2ae1-40b0-95c0-663e312e178f',
//                 role: 'guest',
//                 status: 'active',
//                 user: {
//                     id: 'd7ff31a1-8de5-47b2-97bc-14e70fe8bb33',
//                     firstName: 'WBC',
//                     lastName: 'Team',
//                     email: 'fortsonguru@gmail.com',
//                     phone: '7066042494',
//                     picture: null,
//                 },
//             },
//             {
//                 id: 'a51dad2a-01d1-4679-bc9c-e78e0f815ab7',
//                 role: 'manage',
//                 status: 'active',
//                 user: {
//                     id: '998643bc-74c9-4b21-923f-c8289469eb86',
//                     firstName: 'Meeter',
//                     lastName: 'Lead',
//                     email: 'fortsonguru@gmail.com',
//                     phone: '7066042494',
//                     picture:
//                         'IMG_0003_6729bc2b-9dd2-4396-840f-993866eba2ef.JPG',
//                 },
//             },
//             {
//                 id: 'e5859b76-255d-416f-86e9-358a4b16010e',
//                 role: 'manage',
//                 status: 'active',
//                 user: {
//                     id: '710d8778-65b5-4ffb-bafa-29454cc5fff5',
//                     firstName: 'Dano',
//                     lastName: 'Colombo',
//                     email: 'danocolombo@gmail.com',
//                     phone: '7066042494',
//                     picture:
//                         'IMG_0003_f5ad2370-53af-4a2e-b9f3-7fd85be8a324.JPG',
//                 },
//             },
//         ],
//     },
//     code: 'wbc',
// };
const TeamScreen = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const mtrTheme = useTheme();
    const { userProfile } = useUserContext();
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
        getTeam(userProfile.activeOrg.id)
            .then((theTeam) => {
                printObject('TS:93-->theTeam:\n', theTeam);
                setTeamMembers(theTeam);
                console.log('getTeam SUCCESSFUL');
            })
            .catch((error) => {
                printObject('getTeam error:\n', error);
            });
        // setTeamMembers(TEAM_MEMBERS.affiliations.items);
    }, []);

    // printObject('TEAM_MEMBERS:\n', TEAM_MEMBERS);
    return (
        <>
            <ScrollView
                style={{
                    backgroundColor: mtrTheme.colors.background,

                    flex: 1,
                }}
            >
                <View>
                    <Text style={mtrTheme.screenTitle}>TEAM MEMBERS</Text>
                </View>

                <View
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 30,
                        marginBottom: 10,
                        marginHorizontal: 30,
                    }}
                >
                    <Text style={mtrTheme.subTitleSmall}>
                        These are the current users that have access to this
                        affiliation. Click each one for more details.
                    </Text>
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
            </ScrollView>
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
