//      team.provider.js
//* ======================================
//      this file gets graphQL data and returns
//      simplified json object
import { printObject } from '../../utils/helpers';
import * as queries from '../queries';
import { API } from 'aws-amplify';

export async function getAffiliationsUsersByOrgId(orgId) {
    const gqlAffOrgUserData = await API.graphql({
        query: queries.listAffiliationsUsersByOrg,
        variables: { id: orgId },
    });
    const items = gqlAffOrgUserData.data.listAffiliations.items;
    const returnValue = [];
    items.forEach((item) => {
        const user = item.user;
        const existingItem = returnValue.find(
            (outputItem) => outputItem.id === user.id
        );

        if (existingItem) {
            existingItem.roles.push({
                id: item.id,
                role: item.role,
                status: item.status,
            });
        } else {
            returnValue.push({
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
    });
    printObject('USERS:\n', returnValue);
    return returnValue;
}

export async function getTeam(teamId) {
    //* get team members and their details for an organization
    //*  NOTE: teamId = organization.id
    const gqlTeamData = await API.graphql({
        query: queries.getOrganizationTeam,
        variables: { id: teamId },
    });
    printObject('gqlTeamData:\n', gqlTeamData);
    const theEntry = gqlTeamData.data.getOrganization;
    const defaultUsers = theEntry.defaultUsers.items;
    let users = [];
    defaultUsers.forEach((du) => {
        let user = {};
        let cnt = 0;
        for (const key in du) {
            //* LOCATION
            if (key === 'location') {
                //*create location
                user.location = du[key];
            } else if (key === 'affiliations') {
                //*AFFILIATIONS
                let affiliations = [];
                const tmp = du.affiliations.items;
                if (tmp.length > 0) {
                    let activeRoles = [];
                    let nonActiveRoles = [];
                    tmp.forEach((t) => {
                        if (t.organization.id === teamId) {
                            if (t.status === 'active') {
                                activeRoles.push(t.role);
                            } else {
                                nonActiveRoles.push(t.role);
                            }
                        }
                    });
                    user = { ...user, activeRoles };
                    user = { ...user, nonActiveRoles };
                }
            } else {
                //* add the remainder of attributes to user
                let tmp = {};
                tmp[key] = du[key];
                user = { ...user, [key]: du[key] };
            }
            cnt++;
        }
        //console.log('attribute count:', cnt);
        // console.log('user:', user)
        users.push(user);
    });
    console.log('################ team.js ######################');
    printObject('T:59-->users:\n', users);
    //* get the new users first.
    let newUsers = users.filter((item) => {
        return item.activeRoles === undefined;
    });
    if (newUsers.length > 1) {
        //* sort firstName, lastName
        newUsers.sort((a, b) => {
            if (a.firstName < b.firstName) return -1;
            if (a.firstName > b.firstName) return 1;
            if (a.lastName < b.lastName) return -1;
            if (a.lastName > b.lastName) return 1;
            return 0;
        });
    }

    //* get the old users
    let oldUsers = users.filter((item) => {
        return item.activeRoles !== undefined;
    });
    if (oldUsers.length > 1) {
        //* sort firstName, lastName
        oldUsers.sort((a, b) => {
            if (a.firstName < b.firstName) return -1;
            if (a.firstName > b.firstName) return 1;
            if (a.lastName < b.lastName) return -1;
            if (a.lastName > b.lastName) return 1;
            return 0;
        });
    }
    const polishedUsers = newUsers.concat(oldUsers);
    return polishedUsers;
}
