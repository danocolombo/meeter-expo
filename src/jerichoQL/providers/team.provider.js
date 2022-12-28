//      team.provider.js
//* ======================================
//      this file gets graphQL data and returns
//      simplified json object
import { printObject } from '../../utils/helpers';
import * as queries from '../queries';
import { API } from 'aws-amplify';
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
    return users;
}
