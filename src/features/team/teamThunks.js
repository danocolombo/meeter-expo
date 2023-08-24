import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
import * as mutations from '../../jerichoQL/mutations';
import { createAWSUniqueID, printObject } from '../../utils/helpers';

export const activateMember = createAsyncThunk(
    'team/activateMember',
    async (member, thunkAPI) => {
        try {
            printObject('TT:11-->member:\n', member);
            //* * * * * * * * * * * * * * * * * * *
            //* This function gets member
            //* 1. update guest affiliation to active
            //* 2. modify member object for slice
            //* * * * * * * * * * * * * * * * * * *
            //      1. update GQL affiliation
            API.graphql({
                query: mutations.updateAffiliation,
                variables: {
                    input: { id: member.roles[0].id, status: 'active' },
                },
            })
                .then(() => {
                    printObject('TT:24-->affiliation updated: ', member.id);
                })
                .catch((err) => {
                    printObject('TT:27-->error updating affiliation\n', err);
                });
            //      modify user to send to slice
            const singleRole = member.roles
                .filter((r) => r.role === 'guest')
                .map((r) => ({ ...r, status: 'active' }));

            //      2. member updated to send to slice
            const newMember = {
                ...member,
                roles: singleRole,
            };
            return newMember;
        } catch (error) {
            console.log(error);
            throw new Error('TT:32-->Failed to activate team member.');
        }
    }
);
export const deactivateMember = createAsyncThunk(
    'team/deactivateMember',
    async (member, thunkAPI) => {
        try {
            //* * * * * * * * * * * * * * * * * * *
            //* This function gets the member from
            //* authContext then update GQL entries
            //* 1. update guest affiliation to inactive
            //* 2. delete non-guest roles
            //* 3. modify member object for slice
            //* * * * * * * * * * * * * * * * * * *
            // loop and delete non guest roles
            member.roles.forEach((r) => {
                if (r.role === 'guest') {
                    //      update guest
                    try {
                        API.graphql({
                            query: mutations.updateAffiliation,
                            variables: {
                                input: { id: r.id, status: 'inactive' },
                            },
                        })
                            .then(() => {
                                printObject(
                                    'TT:34-->affiliation updated: ',
                                    r.id
                                );
                            })
                            .catch((err) => {
                                printObject(
                                    'TT:40-->error updating affiliation\n',
                                    err
                                );
                            });
                    } catch (error) {
                        printObject(
                            'TT:46-->catch failure to update affiliation:',
                            error
                        );
                    }
                } else {
                    //      delete role
                    try {
                        API.graphql({
                            query: mutations.deleteAffiliation,
                            variables: { input: { id: r.id } },
                        })
                            .then(() => {
                                printObject(
                                    'TT:59-->affiliation deleted: ',
                                    r.id
                                );
                            })
                            .catch((err) => {
                                printObject(
                                    'TT:65-->error deleting affiliation\n',
                                    err
                                );
                                console.log('id:', r.id);
                            });
                    } catch (error) {
                        printObject(
                            'TT:71-->catch failure to delete affiliation:',
                            error
                        );
                        console.log('id:', r.id);
                    }
                }
            });
            //      modify user to send to slice
            const singleRole = member.roles
                .filter((r) => r.role === 'guest')
                .map((r) => ({ ...r, status: 'inactive' }));

            //      3. member updated to send to slice
            const newMember = {
                ...member,
                roles: singleRole,
            };
            return newMember;
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
                            m.affiliations = [];
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
                            m.affiliations = [];
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
                            m.affiliations = [];
                            aMembers.push(m);
                        }
                    });
                    resolve(aMembers);
                });
            };
            const organizeAffiliates = (affiliatedUsers) => {
                return new Promise((resolve, reject) => {
                    //* ----------------------------------
                    //* this function takes the array of
                    //* users and puts them in object
                    //* summarized by status
                    //* ----------------------------------

                    const summarizedTeam = {
                        active: [],
                        inactive: [],
                        new: [],
                    };

                    affiliatedUsers.forEach((user) => {
                        if (user.roles.length > 0) {
                            summarizedTeam.active.push(user);
                        } else if (user.affiliations.length > 0) {
                            const allAffiliationsActive =
                                user.affiliations.every(
                                    (affiliation) =>
                                        affiliation.status === 'active'
                                );
                            if (allAffiliationsActive) {
                                summarizedTeam.active.push(user);
                            } else {
                                summarizedTeam.inactive.push(user);
                            }
                        } else {
                            summarizedTeam.new.push(user);
                        }
                    });

                    resolve(summarizedTeam);
                });
            };
            const affiliateUsers = (teamInfo) => {
                return new Promise((resolve, reject) => {
                    //* convert array of affiliations to array of users
                    //* with container array of affiliations

                    const newUserArray = [];

                    // Helper function to find a user's index in newUserArray based on user id
                    function findUserIndexById(userId) {
                        return newUserArray.findIndex(
                            (user) => user.id === userId
                        );
                    }

                    teamInfo.forEach((info) => {
                        const userIndex = findUserIndexById(info.user.id);

                        if (userIndex === -1) {
                            const newUser = {
                                // id: info.user.id,
                                // sub: info.user.sub,
                                // username: info.user.username,
                                ...info.user,
                                affiliations: [],
                                roles: [],
                            };

                            if (info.status === 'active') {
                                newUser.affiliations.push({
                                    id: info.id,
                                    role: info.role,
                                    status: info.status,
                                    organizationAffiliationsId:
                                        info.organizationAffiliationsId,
                                });

                                if (info.role !== 'inactive') {
                                    newUser.roles.push(info.role);
                                }
                            }

                            newUserArray.push(newUser);
                        } else {
                            const existingUser = newUserArray[userIndex];

                            if (info.status === 'active') {
                                existingUser.affiliations.push({
                                    id: info.id,
                                    role: info.role,
                                    status: info.status,
                                    organizationAffiliationsId:
                                        info.organizationAffiliationsId,
                                });

                                if (
                                    info.role !== 'inactive' &&
                                    !existingUser.roles.includes(info.role)
                                ) {
                                    existingUser.roles.push(info.role);
                                }
                            }
                        }
                    });
                    newUserArray.sort((a, b) => {
                        const aLastName = a.lastName || '';
                        const bLastName = b.lastName || '';

                        const aFirstName = a.firstName || '';
                        const bFirstName = b.firstName || '';

                        const aUserName = a.userName || '';
                        const bUserName = b.userName || '';

                        if (aLastName !== bLastName) {
                            return aLastName.localeCompare(bLastName);
                        } else if (aFirstName !== bFirstName) {
                            return aFirstName.localeCompare(bFirstName);
                        } else {
                            return aUserName.localeCompare(bUserName);
                        }
                    });
                    resolve(newUserArray);
                });
            };

            const summarizeTeamInfo = (teamInfo) => {
                return new Promise((resolve, reject) => {
                    let teamMembers = [];
                    let nonMembers = [];
                    teamInfo.forEach((item) => {
                        let guestApproved = item.affiliations.find(
                            (a) => a.role === 'guest' && a.status === 'active'
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
                                affiliations: [
                                    {
                                        id: item.id,
                                        role: item.role,
                                        status: item.status,
                                    },
                                ],
                                roles: [],
                            });
                        }
                    }
                    const theTeam = {
                        all: all,
                    };
                    return theTeam;
                } catch (error) {
                    throw new Error('TT:241-->Failed to convert team info.');
                }
            };
            // const teamInfo = await API.graphql({
            //     query: queries.listAffiliationsForOrg,
            //     filter: { organizationAffiliationsId: { eq: id } },
            // });
            //* -------------------------------
            //* 1. get team profiles for org
            //* -------------------------------
            const teamInfo = await API.graphql(
                graphqlOperation(queries.listAffiliationsForOrg, {
                    filter: { organizationAffiliationsId: { eq: id } },
                })
            );
            // printObject('TT:325-->teamInfo:\n', teamInfo);
            //* -------------------------------
            //* 2. flip affiliations and users
            //* -------------------------------
            const affiliatedUsers = await affiliateUsers(
                teamInfo.data.listAffiliations.items
            );
            // printObject('TT:327-->affiliatedUsers:\n', affiliatedUsers);
            //* -------------------------------
            //* 3. summarize affiliatedUsers
            //* put them in summary object
            //* -------------------------------
            const organizedAffiliatedTeam = await organizeAffiliates(
                affiliatedUsers
            );
            printObject(
                'TT:372-->organizedAffiliatedTeam:\n',
                organizedAffiliatedTeam
            );
            return { ...organizedAffiliatedTeam, all: affiliatedUsers };
            // make sure there are only members for this org
            const validatedTeamInfo = {
                ...teamInfo,
                data: {
                    ...teamInfo.data,
                    listAffiliations: {
                        ...teamInfo.data.listAffiliations,
                        items: teamInfo.data.listAffiliations.items.filter(
                            (item) => item.organizationAffiliationsId === id
                        ),
                    },
                },
            };
            //printObject('TT:270-->validatedTeamInfo:\n', validatedTeamInfo);
            const affiliations =
                validatedTeamInfo?.data?.listAffiliations?.items;
            //      we now have all the affiliations with user info
            // printObject('TT:345:--affiliations:\n', affiliations);
            const convertedTeamInfo = await convertTeamInfo(affiliations);
            // console.log('TT:347-->convertedTeamInfo');
            const TEAM = await summarizeTeamInfo(convertedTeamInfo.all);
            printObject('TT:349-->TEAM:\n', TEAM);
            const activeMembers = await identifyActiveMembers(
                convertedTeamInfo.all
            );
            const newMembers = await identifyNewMembers(convertedTeamInfo.all);
            const inactiveMembers = await identifyInactiveRequests(
                convertedTeamInfo.all
            );

            // return {
            //     actives: activeMembers,
            //     inactives: inactiveMembers,
            //     newMembers: newMembers,
            //     team: TEAM,
            // };
        } catch (error) {
            console.log(error);
            throw new Error('Failed to load team.');
        }
    }
);
export const updateActiveMember = createAsyncThunk(
    'team/updateActiveMember',
    async (input, thunkAPI) => {
        //* * * * * * * * * * * * * * * * * * *
        //* This thunk requires input. Supported
        //* input: {
        //*  member: {id: "abc", firstName:...},
        //*  action: "addPermission",
        //*  value: {affId, role, status}
        //* }

        const { member, action, value } = input;
        try {
            //* * * * * * * * * * * * * * * * * * *
            //* This function gets the member and
            //* action from options passed in.
            //* Take action updating member based
            //* on supported "action".
            //* Supported actions:
            //* 1. addPermission
            //* 2. removePermission
            //* * * * * * * * * * * * * * * * * * *
            switch (action) {
                case 'addPermission':
                    try {
                        const newId = createAWSUniqueID();
                        const newAff = {
                            id: newId,
                            organizationAffiliationsId: member.organizationId,
                            userAffiliationsId: member.id,
                            role: value.role,
                            status: 'active',
                        };
                        printObject('TT:296-->addPermission:\n', newAff);
                        //* create the affiliation
                        const memberInfo = await API.graphql({
                            query: mutations.createAffiliation,
                            variables: { input: newAff },
                        });
                        printObject('TT:309-->memberInfo:\n', memberInfo);
                        let modRoles = [...member.affiliations];
                        modRoles.add(value.role);
                        //reduce aff for redux
                        // delete newAff.organizationAffiliationsId;
                        // delete newAff.userAffiliationsId;
                        // modRoles.push(newAff);
                        const updatedUser = {
                            ...member,
                            roles: modRoles,
                        };
                        return updatedUser;
                    } catch (error) {
                        console.log(error);
                        throw new Error('Failed to addPermission.');
                    }
                    break;
                case 'removePermission':
                    try {
                        // need to get the role id
                        const role = member.roles.find(
                            (r) => r.role === value.role
                        );
                        const results = await API.graphql({
                            query: mutations.deleteAffiliation,
                            variables: { input: { id: role.id } },
                        });
                        let modRoles = member.roles.filter(
                            (r) => r.role !== value.role
                        );
                        const updatedUser = {
                            ...member,
                            roles: modRoles,
                        };
                        return updatedUser;
                    } catch (error) {
                        console.log(error);
                        throw new Error('Failed to deactivate team member.');
                    }
                    printObject('TT:299-->removePermission:\n', value);
                    break;
                default:
                    printObject('TT:302-->unsupported action:', action);
            }
            //      modify user to send to slice
            const singleRole = member.roles
                .filter((r) => r.role === 'guest')
                .map((r) => ({ ...r, status: 'inactive' }));

            //      3. member updated to send to slice
            const memberUpdate = {
                ...member,
                roles: singleRole,
            };
            // return memberUpdate;
            return member;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to deactivate team member.');
        }
    }
);
export const removeRole = createAsyncThunk();

export const acceptMember = createAsyncThunk(
    'team/acceptNewMember',
    async (input, thunkAPI) => {
        //* * * * * * * * * * * * * * * * * * *
        //* This thunk requires input. Supported
        //* input: {
        //*  member: {id: "abc", firstName:...},
        //*  action: "acceptMember",
        //* }
        const { member } = input;
        try {
            //* * * * * * * * * * * * * * * * * * *
            //* This function gets the member and
            //* action from options passed in.
            //* Take action updating member based
            //* on supported "action" (acceptMember)
            //* Supported actions:
            //* 1. update aff role:"new" to "guest"
            //* 2. remove other roles
            //* * * * * * * * * * * * * * * * * * *

            printObject('TT:398-->member:\n', member);
            member.roles.forEach((r) => {
                if (r.role === 'new') {
                    //      update guest
                    try {
                        API.graphql({
                            query: mutations.updateAffiliation,
                            variables: {
                                input: { id: r.id, role: 'guest' },
                            },
                        })
                            .then(() => {
                                printObject(
                                    'TT:410-->affiliation updated: ',
                                    r.id
                                );
                            })
                            .catch((err) => {
                                printObject(
                                    'TT:416-->error updating affiliation\n',
                                    err
                                );
                            });
                    } catch (error) {
                        printObject(
                            'TT:46-->catch failure to update affiliation:',
                            error
                        );
                    }
                } else {
                    //      delete role
                    try {
                        API.graphql({
                            query: mutations.deleteAffiliation,
                            variables: { input: { id: r.id } },
                        })
                            .then(() => {
                                printObject(
                                    'TT:59-->affiliation deleted: ',
                                    r.id
                                );
                            })
                            .catch((err) => {
                                printObject(
                                    'TT:65-->error deleting affiliation\n',
                                    err
                                );
                                console.log('id:', r.id);
                            });
                    } catch (error) {
                        printObject(
                            'TT:71-->catch failure to delete affiliation:',
                            error
                        );
                        console.log('id:', r.id);
                    }
                }
            });
            //      modify user to send to slice

            const newRole = member.roles.find((r) => r.role === 'new');
            const singleRole = {
                id: newRole.id,
                role: 'guest',
                status: 'active',
            };
            printObject('TT:460-->singleRole:\n', singleRole);
            //      3. member updated to send to slice
            const newMember = {
                ...member,
                roles: [singleRole],
            };
            printObject('TT:470-->sliceInput:\n', newMember);
            return newMember;

            // const keepRole = member.roles
            //     .filter((r) => r.role === 'new')
            //     .map((r) => ({ ...r, status: 'active' }));
            // const modRoles = [
            //     {
            //         id: keepRole.id,
            //         role: 'guest',
            //         status: 'active',
            //     },
            // ];
            // async function deleteAff(id) {
            //     console.log('DELETE ID: ', id);
            //     const deletedResults = await API.graphql({
            //         query: mutations.deleteAffiliation,
            //         variables: { input: { id: id } },
            //     });
            // }
            // if (member.roles.length > 1) {
            //     const deleteRoles = member.roles.filter(
            //         (r) => r.role !== 'new'
            //     );
            //     deleteRoles.forEach((r) => {
            //         printObject('DELETE THIS ROLE:\n', r);
            //         deleteAff(r.id).then(() => console.log(r.id + 'deleted'));
            //     });
            //     return true;
            // } else {
            //     console.log('only 1 role');
            // }
            // //* --------------------------------------
            // //* update guest aff
            // //* --------------------------------------
            // const updateResults = await API.graphql({
            //     query: mutations.updateAffiliation,
            //     variables: {
            //         input: { id: keepRole.id, status: 'active' },
            //     },
            // });
            // const sliceInput = {
            //     ...member,
            //     roles: modRoles,
            // };
            // return sliceInput;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to acceptMember.');
        }
    }
);
export const declineMember = createAsyncThunk(
    'team/declineNewMember',
    async (input, thunkAPI) => {
        //* * * * * * * * * * * * * * * * * * *
        //* This thunk requires input. Supported
        //* input: {
        //*  member: {id: "abc", firstName:...},
        //*  action: "declineMember",
        //* }
        console.log('declineMember THUNK');
        printObject('TT:395-->input:\n', input);
        try {
            //* * * * * * * * * * * * * * * * * * *
            //* This function gets the member and
            //* action from options passed in.
            //* Take action updating member based
            //* on supported "action" (acceptMember)
            //* Supported actions:
            //* 1. update aff role:"new" status to "rejected"
            //* 2. pass member to slice
            //* * * * * * * * * * * * * * * * * * *
            console.log('TRYING to decline');
            const { member } = input;
            member.roles.forEach((r) => {
                if (r.role === 'new') {
                    //      update guest
                    try {
                        API.graphql({
                            query: mutations.updateAffiliation,
                            variables: {
                                input: { id: r.id, status: 'rejected' },
                            },
                        })
                            .then(() => {
                                printObject(
                                    'TT:410-->affiliation updated: ',
                                    r.id
                                );
                            })
                            .catch((err) => {
                                printObject(
                                    'TT:416-->error updating affiliation\n',
                                    err
                                );
                            });
                    } catch (error) {
                        printObject(
                            'TT:46-->catch failure to update affiliation:',
                            error
                        );
                    }
                } else {
                    //      delete role
                    try {
                        API.graphql({
                            query: mutations.deleteAffiliation,
                            variables: { input: { id: r.id } },
                        })
                            .then(() => {
                                printObject(
                                    'TT:59-->affiliation deleted: ',
                                    r.id
                                );
                            })
                            .catch((err) => {
                                printObject(
                                    'TT:65-->error deleting affiliation\n',
                                    err
                                );
                                console.log('id:', r.id);
                            });
                    } catch (error) {
                        printObject(
                            'TT:71-->catch failure to delete affiliation:',
                            error
                        );
                        console.log('id:', r.id);
                    }
                }
            });
            //      pass member on to slice
            return member;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to declineMember.');
        }
    }
);
export const loadOrgUsers = createAsyncThunk(
    'team/loadOrgUsers',
    async (input, thunkAPI) => {
        //* * * * * * * * * * * * * * * * * * *
        //* This thunk requires input. Supported
        //*     input: {
        //*         orgId: "id"
        //*     }
        console.log('TT:639-->loadOrgUsers THUNK');
        printObject('TT:640-->input:\n', input);
        try {
            //* * * * * * * * * * * * * * * * * * *
            //* This function gets all members of
            //* organization and organizes them
            //*
            //* * * * * * * * * * * * * * * * * * *
            const teamInfo = await API.graphql(
                graphqlOperation(queries.listAffiliationsForOrg, {
                    filter: { organizationAffiliationsId: { eq: input.orgId } },
                })
            );
            const userAffiliations = {};
            teamInfo.data.listAffiliations.items.forEach((item) => {
                if (item.status === 'active' && item.status !== 'denied') {
                    if (!userAffiliations[item.user.id]) {
                        userAffiliations[item.user.id] = {
                            id: item.user.id,
                            organizationId: input.orgId,
                            username: item.user.username,
                            firstName: item.user.firstName,
                            lastName: item.user.lastName,
                            status: item.status,
                            affiliations: [],
                        };
                    }
                    userAffiliations[item.user.id].affiliations.push(item.role);
                } else if (item.status === 'denied') {
                    userAffiliations[item.user.id] = {
                        id: item.user.id,
                        username: item.user.username,
                        status: item.status,
                        affiliations: [],
                    };
                }
            });
            // Convert the userAffiliations object to an array
            const processedArray = Object.values(userAffiliations);
            // printObject('TT:675-->processedArray:\n', processedArray);
            const orgUsers = {
                active: [],
                inactive: [],
                requests: [],
            };

            processedArray.forEach((user) => {
                if (user.status === 'active') {
                    orgUsers.active.push(user);
                } else if (user.status === 'pending') {
                    orgUsers.requests.push(user);
                } else {
                    orgUsers.inactive.push(user);
                }
            });
            // printObject('TT:691-->orgUsers:\n', orgUsers);
            // send organization users to slice
            return orgUsers;
        } catch (error) {
            console.log(error);
            throw new Error('99: TeamThunk_loadOrgUsers catch error.');
        }
    }
);
