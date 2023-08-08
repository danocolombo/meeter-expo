import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
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
                query: queries.listAffiliationsForOrg,
                filter: { organizationAffiliationsId: { eq: id } },
            });
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

            const affiliations =
                validatedTeamInfo?.data?.listAffiliations?.items;
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
                        const memberInfo = await API.graphql({
                            query: mutations.createAffiliation,
                            variables: { input: newAff },
                        });
                        printObject('TT:309-->memberInfo:\n', memberInfo);
                        let modRoles = [...member.roles];
                        //reduce aff for redux
                        delete newAff.organizationAffiliationsId;
                        delete newAff.userAffiliationsId;
                        modRoles.push(newAff);
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
