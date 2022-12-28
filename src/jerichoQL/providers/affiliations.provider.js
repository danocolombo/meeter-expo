//      affiliations.provider.js
//* ======================================
//      this file deals with custom work relating
//      to affiliations (permissions/roles)
import { printObject } from '../../utils/helpers';
import * as queries from '../queries';
import * as mutations from '../mutations';
import { API } from 'aws-amplify';
export async function updateAffiliations(changeRequest) {
    // printObject('a.p:10', changeRequest);

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
                console.log(
                    'affilationsId:',
                    item.id,
                    '\nrole:',
                    r,
                    '\nstatus: "active"'
                );
                //todo: update existing affiliation status = "active"
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
            }
        });
    } else {
        console.log('No add requests received');
    }
    //* identify "remove" requests
    const removeRequests = changeRequest.remove;
    if (removeRequests.length > 0) {
        printObject('removeRequests:\n', removeRequests);
        removeRequests.forEach((r) => {
            console.log('remove ', r, ' from the user');
            //* check if the role is already defined
            const existing = existingAffiliations.filter(
                (item) => item.role === r
            );
            if (existing.length > 0) {
                console.log(
                    'affiliationsID:',
                    existing[0].id,
                    '\nrole:',
                    r,
                    '\nstatus: "inactive"'
                );
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
}
