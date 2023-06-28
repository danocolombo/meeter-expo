import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
import { printObject } from '../../utils/helpers';

export const loadTeam = createAsyncThunk(
    'team/loadTeam',
    async (id, thunkAPI) => {
        try {
            let all = [];

            const identifyInactiveRequests = (members) => {
                return new Promise((resolve, reject) => {
                    let iMembers = [];
                    members.forEach((m) => {
                        let activeConfirmed = m.roles.find(
                            (r) => r.role === 'guest' && r.status === 'active'
                        );
                        if (!activeConfirmed) {
                            iMembers.push(m);
                        }
                    });
                    resolve(iMembers);
                });
            };

            const identifyNewMembers = (members) => {
                return new Promise((resolve, reject) => {
                    let nMembers = [];
                    members.forEach((m) => {
                        let newConfirmed = m.roles.find(
                            (r) => r.role === 'new' && r.status === 'active'
                        );
                        if (newConfirmed) {
                            nMembers.push(m);
                        }
                    });
                    resolve(nMembers);
                });
            };
            const identifyActiveMembers = (members) => {
                return new Promise((resolve, reject) => {
                    let aMembers = [];
                    members.forEach((m) => {
                        let guestConfirmed = m.roles.find(
                            (r) => r.role === 'guest' && r.status === 'active'
                        );
                        if (guestConfirmed) {
                            aMembers.push(m);
                        }
                    });
                    resolve(aMembers);
                });
            };

            const summarizeTeamInfo = (teamInfo) => {
                return new Promise((resolve, reject) => {
                    let teamMembers = [];
                    let nonMembers = [];
                    teamInfo.forEach((item) => {
                        let guestApproved = item.roles.find(
                            (r) => r.role === 'guest' && r.status === 'active'
                        );
                        if (guestApproved) {
                            teamMembers.push(item);
                        }
                    });
                    resolve(teamMembers);
                });
            };

            const convertTeamInfo = async (teamInfo) => {
                try {
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

            const teamInfo = await API.graphql({
                query: queries.listAffiliationsUsersByOrg,
                filter: { organizationAffiliationsId: { eq: id } },
            });

            const affiliations = teamInfo?.data?.listAffiliations?.items;
            const convertedTeamInfo = await convertTeamInfo(affiliations);
            const TEAM = await summarizeTeamInfo(convertedTeamInfo.all);
            let newMembers = [];
            let activeMembers = [];
            let inactiveMembers = [];
            identifyActiveMembers(TEAM)
                .then((actives) => {
                    activeMembers = [...actives];
                    printObject('TT:129-->activeMembers\n:', activeMembers);
                })
                .catch((error) => {
                    console.log('Error in identifyActiveMembers:', error);
                });

            identifyNewMembers(TEAM)
                .then((requests) => {
                    newMembers = [...requests];
                    printObject('TT:129-->newMembers\n:', newMembers);
                })
                .catch((error) => {
                    console.log('Error in identifyNewMembers:', error);
                });

            identifyInactiveRequests(TEAM)
                .then((requests) => {
                    inactiveMembers = [...requests];
                    printObject('TT:129-->inactiveMembers\n:', inactiveMembers);
                })
                .catch((error) => {
                    console.log('Error in identifyInactiveRequests:', error);
                });

            return {
                activeMembers,
                inactiveMembers,
                newMembers,
                team: TEAM,
            };
        } catch (error) {
            console.log(error);
            throw new Error('Failed to load team.');
        }
    }
);
