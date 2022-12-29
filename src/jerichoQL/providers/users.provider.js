//      affiliations.provider.js
//* ======================================
//      this file deals with custom work relating
//      to affiliations (permissions/roles)
import { printObject } from '../../utils/helpers';
import * as queries from '../queries';
import * as mutations from '../mutations';
import { API } from 'aws-amplify';
export const checkUserProfile = async (user) => {
    printObject('U.P:10-->user', user);
    try {
        const userData = await API.graphql({
            query: queries.usersBySub,
            variables: {
                sub: user?.attributes?.sub,
            },
        });
        //* get the response for the user
        const theUser = userData?.data?.usersBySub?.items;
        if (theUser.length < 1) {
            //* no user record for the sub, create
            const newUser = {
                sub: user?.attributes?.sub,
                username: user?.attributes?.preferred_username,
                firstName: user?.attributes?.given_name,
                lastName: user?.attributes?.family_name,
                email: user?.attributes?.email,
            };
            try {
                API.graphql({
                    query: mutations.createUser,
                    variables: { input: newUser },
                })
                    .then((results) => {
                        console.log('jericho user created');
                        printObject('U.P:36-->results:\n', results);
                    })
                    .catch((error) => {
                        console.log(error);
                        console.error(error);
                    });
            } catch (error) {
                console.log('a.p:91-->unexpected error:\n', error);
            }
        }
    } catch (error) {
        console.log('U.P:19-->error:', error);
    }
};

export const registerUser = async (user) => {
    // printObject('a.p:10', changeRequest);
    printObject('u.p:11-->user:\n', user);
    return true;
    //* createUser from cognito registration
    try {
        const updateInfo = {
            id: item.id,
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

    return true;
};
