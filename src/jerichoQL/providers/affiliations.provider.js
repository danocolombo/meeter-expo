//      affiliations.provider.js
//* ======================================
//      this file deals with custom work relating
//      to affiliations (permissions/roles)
import { printObject } from '../../utils/helpers';
import * as queries from '../queries';
import * as mutations from '../mutations';
import { API } from 'aws-amplify';
export async function updateAffiliations(changeRequest) {
    printObject('a.p:10', changeRequest);

    const affiliations = await API.graphql({
        query: queries.getOrgUserAffiliations,
        variables: {
            orgId: changeRequest.organizationId,
            userId: changeRequest.userId,
        },
    });
    printObject('a.p:19-->affiliations:\n', affiliations);

    return true;
}
