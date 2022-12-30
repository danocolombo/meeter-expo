//      affiliations.provider.js
//* ======================================
//      this file deals with custom work relating
//      to affiliations (permissions/roles)
import { printObject } from '../../utils/helpers';
import * as queries from '../queries';
import * as mutations from '../mutations';
import { API } from 'aws-amplify';
export const getAffiliationsForTeam = async (teamId) => {
    //      get all affiliations for org
    //      organize by user
    //      sort new users at top, then old

    //* get all the affiliations for the teamId
    const gqlResponse = await API.graphql({
        query: queries.getAffiliationsForTeam,
        variables: {
            orgId: teamId,
        },
    });

    if (gqlResponse.length < 1) {
        return null;
    }
    const affs = gqlResponse.data.listAffiliations.items;
    printObject('A.P:21-->affs:\n', affs);

    let allUsers = [];
    affs.forEach((a) => {
        allUsers.push(a.userAffiliationsId);
    });
    // allUsers.forEach((au, index) => {
    //     console.log('au:', index, '-->', au);
    // });
    //* simplify allUsers
    const uniqueUsers = allUsers.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
    // uniqueUsers.forEach((uu, index) => {
    //     console.log('uu:', index, '=>', uu);
    // });
    let wholeTeam = [];
    uniqueUsers.forEach((uu, index) => {
        //* add an emply affiliation array
        let user = {};
        user.id = uu;
        user.activeRoles = [];
        user.inactiveRoles = [];
        affs.forEach((aff) => {
            if (aff.userAffiliationsId === uu) {
                user.firstName = aff.user.firstName;
                user.lastName = aff.user.lastName;
                user.email = aff.user.email;
                user.phone = aff.user.phone;
                user.picture = aff.user.picture;
                if (aff.status === 'active') {
                    user.activeRoles.push(aff.role);
                } else {
                    user.inactiveRoles.push(aff.role);
                }
            }
        });
        wholeTeam.push(user);
    });
    //* get the newusers separated out
    let rawNewUsers = [];
    let rawOldUsers = [];
    wholeTeam.forEach((tm) => {
        //* check affiliations for role: "new" and status: "active"
        // console.log('tm:', tm);
        let newFlag = false;
        affs.forEach((a) => {
            // printObject('a:', a);
            if (
                a.role === 'new' &&
                a.status === 'active' &&
                a.userAffiliationsId === tm.id
            ) {
                newFlag = true;
            }
        });
        if (newFlag) {
            rawNewUsers.push(tm);
        } else {
            rawOldUsers.push(tm);
        }
    });
    //* sort both arrays before combining

    if (rawOldUsers.length > 1) {
        //* sort firstName, lastName
        rawOldUsers.sort((a, b) => {
            if (a.firstName < b.firstName) return -1;
            if (a.firstName > b.firstName) return 1;
            if (a.lastName < b.lastName) return -1;
            if (a.lastName > b.lastName) return 1;
            return 0;
        });
    }
    //* combine
    const team = rawNewUsers.concat(rawOldUsers);

    printObject('A.P:98-->team:', team);
    return team;
};
export const updateAffiliations = async (changeRequest) => {
    printObject('a.p:10--changeRequest', changeRequest);

    //* get current affiliations for org/user
    const affiliationResponse = await API.graphql({
        query: queries.getOrgUserAffiliations,
        variables: {
            orgId: changeRequest.organizationId,
            userId: changeRequest.userId,
        },
    });
    const existingAffiliations =
        affiliationResponse.data.listAffiliations.items;
    printObject('a.p:19-->existingAffiliations:\n', existingAffiliations);
    //* identify "add" requests
    const addRequests = changeRequest.add;
    if (addRequests.length > 0) {
        printObject('addRequests:\n', addRequests);
        addRequests.forEach((r) => {
            console.log('add ', r, ' for the user');
            //* check if the role is already defined
            const existing = existingAffiliations.filter(
                (item) => item.role === r
            );
            if (existing.length > 0) {
                console.log('the role (', r, ') exists');

                try {
                    const updateInfo = {
                        id: existing[0].id,
                        status: 'active',
                    };
                    API.graphql({
                        query: mutations.updateAffiliation,
                        variables: { input: updateInfo },
                    })
                        .then((results) => {
                            console.log('affiliation updated');
                        })
                        .catch((error) => {
                            console.log(error);
                            console.error(error);
                        });
                } catch (error) {
                    console.log('a.p:59-->unexpected error:\n', error);
                }
            } else {
                console.log('the role (', r, ') is new');
                const addInfo = {
                    organizationId: changeRequest.organizationId,
                    userId: changeRequest.userId,
                    role: r,
                    status: 'active',
                };
                printObject('addInfo:\n', addInfo);
                //todo: insert new affiliation for the org/user
                try {
                    const insertInfo = {
                        organizationAffiliationsId:
                            changeRequest.organizationId,
                        role: r,
                        status: 'active',
                        userAffiliationsId: changeRequest.userId,
                    };
                    API.graphql({
                        query: mutations.createAffiliation,
                        variables: { input: insertInfo },
                    })
                        .then((results) => {
                            console.log('affiliation inserted');
                            printObject('results:\n', results);
                        })
                        .catch((error) => {
                            console.log(error);
                            console.error(error);
                        });
                } catch (error) {
                    console.log('a.p:91-->unexpected error:\n', error);
                }
            }
        });
    } else {
        console.log('No add requests received');
    }
    //* identify "remove" requests
    const removeRequests = changeRequest.remove;
    if (removeRequests.length > 0) {
        printObject('A.P:102-->removeRequests:\n', removeRequests);

        removeRequests.forEach((r) => {
            console.log('remove ', r, ' from the user');

            //* check if the role is already defined
            const existing = existingAffiliations.filter(
                (item) => item.role === r
            );
            if (existing.length > 0) {
                try {
                    const updateInfo = {
                        id: existing[0].id,
                        status: 'inactive',
                    };
                    API.graphql({
                        query: mutations.updateAffiliation,
                        variables: { input: updateInfo },
                    })
                        .then((results) => {
                            console.log('affiliation updated');
                        })
                        .catch((error) => {
                            console.log(error);
                            console.error(error);
                        });
                } catch (error) {
                    console.log('a.p:130-->unexpected error:\n', error);
                }
                //todo: update existing affiliation status = "inactive"
            } else {
                console.log('the role (', r, ') is not existing');
                //      believe it is okay to ignore action.
            }
        });
    } else {
        console.log('No remove requests received');
    }

    return true;
};
