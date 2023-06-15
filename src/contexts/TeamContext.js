import { createContext, useEffect, useState, useContext } from 'react';
import * as queries from '../jerichoQL/queries';
import { API } from 'aws-amplify';
import {
    dateDashMadePretty,
    isDateDashBeforeToday,
    printObject,
} from '../utils/helpers';
const TeamContext = createContext({});

const TeamContextProvider = ({ children }) => {
    const [members, setMembers] = useState(null);
    const [activeMembers, setActiveMembers] = useState(null);
    const [inactiveMembers, setInactiveMembers] = useState(null);
    const [newMembers, setNewMembers] = useState(null);
    const status = 'YES';
    const clearMembers = async () => {
        setMembers(null);
        setActiveMembers(null);
        setInactiveMembers(null);
        setNewMembers(null);
    };
    const loadMembers = async () => {
        const sampleMembers = [
            { id: 1243, firstName: 'John', lastName: 'Doe' },
            { id: 33, firstName: 'Jane', lastName: 'Doe' },
        ];
        setMembers(sampleMembers);
    };
    const loadTeam = async (id) => {
        try {
            // const teamInfo = await API.graphql(
            //     graphqlOperation(queries.listAffiliationsUsersByOrg, {
            //         filter: {
            //             organizationAffiliationsId: {
            //                 eq: id,
            //             },
            //         },
            //     })
            // );
            // const teamInfo = await API.graphql({
            //     query: queries.listAffiliationsUsersByOrg,
            //     filter: {
            //         organizationAffiliationsId: { eq: id },
            //     },
            // });
            const convertTeamInfo = async (teamInfo) => {
                try {
                    let all = [];
                    let newMembers = [];
                    let activeMembers = [];
                    let inactiveMembers = [];
                    for (const item of teamInfo) {
                        const user = item.user;
                        const existingItem = all.find(
                            (outputItem) => outputItem.id === user.id
                        );

                        if (existingItem) {
                            existingItem.roles.push({
                                id: item.id,
                                role: item.role,
                                status: item.status,
                            });
                        } else {
                            if (
                                item.status === 'active' &&
                                item.role !== 'new'
                            ) {
                                activeMembers.push({
                                    id: user.id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    username: user.username,
                                    roles: [
                                        {
                                            id: item.id,
                                            role: item.role,
                                            status: item.status,
                                        },
                                    ],
                                });
                            }
                            if (
                                item.status === 'active' &&
                                item.role === 'new'
                            ) {
                                newMembers.push({
                                    id: user.id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    username: user.username,
                                    roles: [
                                        {
                                            id: item.id,
                                            role: item.role,
                                            status: item.status,
                                        },
                                    ],
                                });
                            }
                            if (item.status !== 'active') {
                                inactiveMembers.push({
                                    id: user.id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    username: user.username,
                                    roles: [
                                        {
                                            id: item.id,
                                            role: item.role,
                                            status: item.status,
                                        },
                                    ],
                                });
                            }
                            all.push({
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                username: user.username,
                                roles: [
                                    {
                                        id: item.id,
                                        role: item.role,
                                        status: item.status,
                                    },
                                ],
                            });
                        }
                    }
                    const theTeam = {
                        all: all,
                        newMembers: newMembers,
                        activeMembers: activeMembers,
                        inactiveMembers: inactiveMembers,
                    };
                    return theTeam;
                } catch (error) {
                    throw new Error('Failed to convert team info.');
                }
            };

            await API.graphql({
                query: queries.listAffiliationsUsersByOrg,
                filter: { organizationAffiliationsId: { eq: id } },
            })
                .then((teamInfo) => {
                    const affiliations =
                        teamInfo?.data?.listAffiliations?.items;
                    // printObject('TC:51-->affiliations:\n', affiliations);
                    return convertTeamInfo(affiliations);
                })
                .then((members) => {
                    // console.log(members);
                    setMembers(members.all);
                    setActiveMembers(members.activeMembers);
                    setInactiveMembers(members.inactiveMembers);
                    setNewMembers(members.newMembers);
                    printObject('TC:63-->members:\n', members);
                })
                .catch((err) => {
                    printObject('TC:53-->error getting teamInfo:\n', err);
                });
        } catch (error) {
            printObject('TC:38-->teamInfo TryCatch failure:\n', error);
            printObject('TC:39 -> id:', id);
            return;
        }
    };

    return (
        <TeamContext.Provider
            value={{
                status,
                members,
                activeMembers,
                inactiveMembers,
                newMembers,
                loadMembers,
                clearMembers,
                loadTeam,
            }}
        >
            {children}
        </TeamContext.Provider>
    );
};

export default TeamContextProvider;

export const useTeamContext = () => useContext(TeamContext);
