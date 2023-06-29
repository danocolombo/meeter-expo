import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
import { printObject } from '../../utils/helpers';

export const deactivateMember = createAsyncThunk(
    'team/deactivateMember',
    async (id, thunkAPI) => {
        try {
            //* * * * * * * * * * * * * * * * * * *
            //* This function gets the member from
            //* authContext then update GQL entries
            //* 1. get member affiliations
            //* 2. update affiliation for "guest" role to "inactive"
            //* 3. delete affiliation not "guest"
            //* * * * * * * * * * * * * * * * * * *
            console.log('TT:17-->id:', id);
            return { memberId: id };
        } catch (error) {
            console.log(error);
            throw new Error('Failed to deactivate team member.');
        }
    }
);

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
                            (r) =>
                                (r.role === 'guest' && r.status === 'active') ||
                                (r.role === 'new' && r.status === 'active')
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

            const activeMembers = await identifyActiveMembers(
                convertedTeamInfo.all
            );
            const newMembers = await identifyNewMembers(convertedTeamInfo.all);
            const inactiveMembers = await identifyInactiveRequests(
                convertedTeamInfo.all
            );

            return {
                actives: activeMembers,
                inactives: inactiveMembers,
                newMembers: newMembers,
                team: TEAM,
            };
        } catch (error) {
            console.log(error);
            throw new Error('Failed to load team.');
        }
    }
);
