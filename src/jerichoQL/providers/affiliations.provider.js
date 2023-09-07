//      affiliations.provider.js
//* ======================================
//      this file deals with custom work relating
//      to affiliations (permissions/roles)
import { createAWSUniqueID, printObject } from '../../utils/helpers';
import * as queries from '../queries';
import * as mutations from '../mutations';
import { API } from 'aws-amplify';
import { printLocation } from 'graphql';
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
export const addNewAffiliationForUser = async (newValues) => {
    try {
        const newAffId = createAWSUniqueID();
        const insertInfo = {
            organizationAffiliationsId: newValues.organizationId,
            id: newAffId,
            role: newValues.role,
            status: newValues.status,
            userAffiliationsId: newValues.userId,
        };
        printObject('AP:131-->insertInfo:\n', insertInfo);
        const results = await API.graphql({
            query: mutations.createAffiliation,
            variables: { input: insertInfo },
        });
        console.log('AP:122-->affiliation inserted');
        printObject('AP:123-->results:\n', results);
        const returnValue = {
            status: 200,
            results: results,
        };
        return returnValue;
    } catch (error) {
        console.log('AP:143-->unexpected error:\n', error);
        let returnValue = {
            status: 404,
            details: 'unexpected error inserting new affiliation',
            request: newValues,
            error: error,
        };
        return returnValue;
    }
};

export const addNewAffiliationForUser1 = async (newValues) => {
    /***********************************************************
     *      {
     *          userId: "abc123",           // user id
     *          organizationId: "123abc",   // organization id
     *          role: "manage",             // role
     *          status: "active"            // status
     *      }
     ***********************************************************/
    printObject('AP:115-->newValues:', newValues);
    // let tmpReturnValue = {
    //     status: 200,
    //     results: newValues,
    // };
    // return tmpReturnValue;
    try {
        const newAffId = createAWSUniqueID();
        const insertInfo = {
            organizationAffiliationsId: newValues.organizationId,
            id: newAffId,
            role: newValues.role,
            status: newValues.status,
            userAffiliationsId: newValues.userId,
        };
        printObject('AP:131-->insertInfo:\n', insertInfo);
        API.graphql({
            query: mutations.createAffiliation,
            variables: { input: insertInfo },
        })
            .then((results) => {
                console.log('AP:122-->affiliation inserted');
                printObject('AP:123-->results:\n', results);
                const returnValue = {
                    status: 200,
                    results: results,
                };
                return returnValue;
            })
            .catch((error) => {
                console.log('AP:132-->', error);
                console.error(error);
                let returnValue = {
                    status: 404,
                    details: 'error inserting new affiliation',
                    request: newValues,
                    error: error,
                };
                return returnValue;
            });
    } catch (error) {
        console.log('AP:143-->unexpected error:\n', error);
        let returnValue = {
            status: 404,
            details: 'unexpected error inserting new affiliation',
            request: newValues,
            error: error,
        };
        return returnValue;
    }
};
export const updateAffiliationStatus = async (changeRequest) => {
    // set changeRequest.id, status = changeRequest.status
    return true;
    try {
        const updateInfo = {
            id: changeRequest.id,
            status: changeRequest.status,
        };
        API.graphql({
            query: mutations.updateAffiliation,
            variables: { input: updateInfo },
        })
            .then((results) => {
                console.log('AP:118-->affiliation updated');
            })
            .catch((error) => {
                console.log(error);
                console.error(error);
            });
    } catch (error) {
        console.log('AP:125-->unexpected error:\n', error);
        return false;
    }
    return true;
};
export const changeAffiliation = async (affiliationValues) => {
    //this updates an existing affiliation
    // id is required, as well as role and status
    const { affiliationId, newRoleValue, newStatusValue } = affiliationValues;
    printObject('affiliation:\n', affiliationValues);
    console.log('affiliationId: ', affiliationId);
    console.log('newRoleValue: ', newRoleValue);
    console.log('newStatusValue: ', newStatusValue);
    if (
        affiliationId === undefined ||
        newRoleValue === undefined ||
        newStatusValue === undefined
    ) {
        let returnValue = {
            statusCode: 404,
            details: 'required fields not provided',
            error: 'required fields not provided',
        };
        return returnValue;
    } else {
        // ---------------------------------------
        // update the affiliation values
        try {
            const updateInfo = {
                id: affiliationId,
                role: newRoleValue,
                status: newStatusValue,
            };
            API.graphql({
                query: mutations.updateAffiliation,
                variables: { input: updateInfo },
            })
                .then((results) => {
                    console.log('AP:222=>affiliation updated');
                })
                .catch((error) => {
                    console.log(error);
                    console.error(error);
                });
        } catch (error) {
            console.log('AP:229-->unexpected error:\n', error);
        }
        let returnValue = {
            statusCode: 200,
            details: 'good to go',
            id: affiliationId,
            role: newRoleValue,
            status: newStatusValue,
        };
        return returnValue;
    }
    /* 
        {
            id: affiliationId,
            role: newRoleValue,
            status: newStateValue
        }
    */
};
export const updateAffiliations = async (changeRequest) => {
    printObject('AP:131--changeRequest', changeRequest);

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
    printObject('AP:143-->existingAffiliations:\n', existingAffiliations);
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
                console.log('AP:155-->the role (', r, ') exists');

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
                            console.log('AP:167-->affiliation updated');
                        })
                        .catch((error) => {
                            console.log(error);
                            console.error(error);
                        });
                } catch (error) {
                    console.log('AP:174-->unexpected error:\n', error);
                }
            } else {
                console.log('AP:177-->the role (', r, ') is new');
                const addInfo = {
                    organizationId: changeRequest.organizationId,
                    userId: changeRequest.userId,
                    role: r,
                    status: 'active',
                };
                printObject('AP: 184-->addInfo:\n', addInfo);
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
                            console.log('AP:199-->affiliation inserted');
                            printObject('AP:200-->results:\n', results);
                        })
                        .catch((error) => {
                            console.log('AP:203-->', error);
                            console.error(error);
                        });
                } catch (error) {
                    console.log('AP:207-->unexpected error:\n', error);
                }
            }
        });
    } else {
        console.log('AP:212-->No add requests received');
    }
    //* identify "remove" requests
    const removeRequests = changeRequest.remove;
    if (removeRequests.length > 0) {
        printObject('AP:217-->removeRequests:\n', removeRequests);

        removeRequests.forEach((r) => {
            console.log('AP:220-->remove ', r, ' from the user');

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
                            console.log('AP:237-->affiliation updated');
                        })
                        .catch((error) => {
                            console.log(error);
                            console.error(error);
                        });
                } catch (error) {
                    console.log('AP:244-->unexpected error:\n', error);
                }
                //todo: update existing affiliation status = "inactive"
            } else {
                console.log('AP:248-->the role (', r, ') is not existing');
                //      believe it is okay to ignore action.
            }
        });
    } else {
        console.log('AP:253-->No remove requests received');
    }

    return true;
};
export const deactivateUser = async (memberInfo) => {
    //* * * * * * * * * * * * * * * * * * *
    //* This function gets the member from
    //* authContext then update GQL entries
    //* 1. set guest role to inactive
    //* 2. delete any other roles defined.
    //*
    //* * * * * * * * * * * * * * * * * * *
    const { memberId, roles } = memberInfo;
    printObject('AP:383-->member:\n', memberInfo);
    // get guest affiliationId
    const guest = roles.find((r) => r.role === 'guest');
    printObject('AP:387-->guest:', guest);
    changeAffiliation({
        affiliationId: guest.id,
        newRoleValue: 'guest',
        newStatusValue: 'inactive',
    }).then((guestChangeResponse) => {
        // for each affiliation != guest, delete
        if (guestChangeResponse.statusCode === 200) {
            roles.forEach((r) => {
                if (r.role !== 'guest') {
                    printObject('AP:395-->delete aff: ', r.id);
                    try {
                        API.graphql({
                            query: mutations.deleteAffiliation,
                            variables: { input: { id: r.id } },
                        })
                            .then(() => {
                                printObject(
                                    'AP:400-->affiliation deleted: ',
                                    r.id
                                );
                            })
                            .catch((err) => {
                                printObject(
                                    'AP:403-->error deleting affiliation\n',
                                    err
                                );
                            });
                    } catch (error) {
                        printObject(
                            'AP:406-->catch failure to delete affilation:',
                            error
                        );
                    }
                }
            });
        } else {
            printObject(
                'AP:413-->changeAffiliation FAILURE:\n',
                guestChangeResponse
            );
        }
    });
};
export const removeAffiliation = async (removeRequest) => {
    // this is a request to delete a specific
    console.log('DELETE AFFILIATION: ', removeRequest.id);
    try {
        API.graphql({
            query: mutations.deleteAffiliation,
            variables: { input: { id: removeRequest.id } },
        })
            .then(() => {
                printObject('AP:442-->affiliation deleted: ', removeRequest.id);
            })
            .catch((err) => {
                printObject('AP:445-->error deleting affiliation\n', err);
            });
        printObject('removeRequest:', removeRequest);
    } catch (error) {
        printObject('AP:448-->catch failure to delete affiliation:', error);
    }
};
