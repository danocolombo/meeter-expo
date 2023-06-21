import { createContext, useEffect, useState, useContext } from 'react';
import * as queries from '../jerichoQL/queries';
import { API } from 'aws-amplify';
import {
    dateDashMadePretty,
    isDateDashBeforeToday,
    createAWSUniqueID,
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
            const identifyActiveMembers = async (members) => {
                // just return the members that have a role of
                // guest === active
                let aMembers = [];
                members.forEach((m) => {
                    let guestConfirmed = m.roles.find(
                        (r) => r.role === 'guest' && r.status === 'active'
                    );
                    if (guestConfirmed) {
                        aMembers.push(m);
                    }
                });
                return aMembers;
            };
            const identifyNewRequests = async (members) => {
                // just return the members that have a role of
                // guest === active
                // printObject('TC:49-->members:\n', members);
                let nMembers = [];
                members.forEach((m) => {
                    let newConfirmed = m.roles.find(
                        (r) => r.role === 'new' && r.status === 'active'
                    );
                    if (newConfirmed) {
                        nMembers.push(m);
                    }
                });
                return nMembers;
            };
            const identifyInactiveRequests = async (members) => {
                // just return the members that have a role of
                // guest === active
                // printObject('TC:63-->members:\n', members);
                let iMembers = [];
                members.forEach((m) => {
                    let activeConfirmed = m.roles.find(
                        (r) => r.role === 'guest' && r.status === 'active'
                    );
                    if (!activeConfirmed) {
                        iMembers.push(m);
                    }
                });
                return iMembers;
            };
            const summarizeTeamInfo = async (teamInfo) => {
                // printObject('TC:75-->teamInfo:\n', teamInfo);
                try {
                    let teamMembers = [];
                    let nonMembers = [];
                    teamInfo.forEach((item) => {
                        let guestApproved = item.roles.find(
                            (r) => r.role === 'guest' && r.status === 'active'
                        );
                        if (guestApproved) {
                            // console.log(item.username + ' guest');
                            teamMembers.push(item);
                        }
                    });
                    return teamMembers;
                } catch (error) {
                    throw new Error('Failed to summerize team info.');
                }
            };

            const convertTeamInfo = async (teamInfo) => {
                // printObject('TC:48-->teamInfo:\n', teamInfo);
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
                            // printObject(
                            //     'TC:109-->existingItem:\n',
                            //     existingItem
                            // );
                            // printObject('TC:47-->item:\n', item);
                            existingItem.roles.push({
                                id: item.id,
                                role: item.role,
                                status: item.status,
                            });
                            // printObject(
                            //     'TC:119-->existingItem:\n',
                            //     existingItem
                            // );
                        } else {
                            all.push({
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                username: user.username,
                                email: user?.email || '',
                                phone: user?.phone || '',
                                organizationId: id,
                                location: user?.location || null,
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
                    // printObject('TC:150-->teamInfo:\n', teamInfo);
                    let tInfo = [];
                    convertTeamInfo(teamInfo.data.listAffiliations.items)
                        .then((results) => {
                            // printObject('TC:158-->results:\n', results);
                            tInfo = results.all;
                            // printObject('TC:163-->tInfo:\n', tInfo);
                            summarizeTeamInfo(results.all).then((r) => {
                                // printObject(
                                //     'TC:161--> summarizeTeamInfo results:\n',
                                //     r
                                // );
                                identifyActiveMembers(r)
                                    .then((actives) => {
                                        // printObject(
                                        //     'TC:167-->actives:\n',
                                        //     actives
                                        // );
                                        setActiveMembers(actives);
                                    })
                                    .catch((error) => {
                                        console.log(
                                            'TC:190--> error identifyNewRequests\nError:\n',
                                            error
                                        );
                                    });

                                identifyNewRequests(tInfo)
                                    .then((requests) => {
                                        // printObject(
                                        //     'TC:175-->requests:\n',
                                        //     requests
                                        // );
                                        setNewMembers(requests);
                                    })
                                    .catch((error) => {
                                        console.log(
                                            'TC:190--> error identifyNewRequests\nError:\n',
                                            error
                                        );
                                    });

                                identifyInactiveRequests(tInfo)
                                    .then((requests) => {
                                        // console.log('tInfo:\n', tInfo);
                                        // printObject(
                                        //     'TC175-->requests:\n',
                                        //     requests
                                        // );
                                        setInactiveMembers(requests);
                                        // console.log(
                                        //     'inactives:',
                                        //     requests.length
                                        // );
                                    })
                                    .catch((error) => {
                                        console.log(
                                            'TC:206--> error identifyInactiveRequests\nError:\n',
                                            error
                                        );
                                    });
                            });

                            // return convertTeamInfo(affiliations);
                        })
                        .catch((err) => {
                            printObject(
                                'TC:214-->error getting teamInfo:\n',
                                err
                            );
                        });
                })
                .catch((error) => {
                    printObject('TC:221 Error:\n', error);
                });
        } catch (error) {
            printObject('TC:223-->teamInfo TryCatch failure:\n', error);
            printObject('TC:224 -> id:', id);
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
