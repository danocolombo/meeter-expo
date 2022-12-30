//      affiliations.provider.js
//* ======================================
//      this file deals with custom work relating
//      to affiliations (permissions/roles)
import { printObject } from '../../utils/helpers';
import * as queries from '../queries';
import * as mutations from '../mutations';
import { API } from 'aws-amplify';
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
