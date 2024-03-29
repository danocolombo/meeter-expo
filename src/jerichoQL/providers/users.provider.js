//      affiliations.provider.js
//* ======================================
//      this file deals with custom work relating
//      to affiliations (permissions/roles)
import { createAWSUniqueID, printObject } from '../../utils/helpers';
import * as queries from '../queries';
import * as mutations from '../mutations';
import { API } from 'aws-amplify';
import { MEETER_DEFAULTS } from '../../constants/meeter';
import { printIntrospectionSchema } from 'graphql';
export const checkUserProfile = async (user) => {
    printObject('U.P:10-->user', user);
    try {
        const userData = await API.graphql({
            query: queries.usersBySub,
            variables: {
                sub: user?.attributes?.sub,
            },
        });
        //* get GQL user for user sub
        let theUser = userData?.data?.usersBySub?.items;
        //printObject('UP:22-->theUser:\n', theUser);
        if (theUser.length < 1) {
            //* no user record for the sub, create
            const newUser = {
                sub: user?.attributes?.sub,
                username: user?.attributes?.preferred_username,
                firstName: user?.attributes?.given_name,
                lastName: user?.attributes?.family_name,
                email: user?.attributes?.email,
                organizationDefaultUsersId: MEETER_DEFAULTS.ORGANIZATION_ID,
            };
            try {
                const createdUser = await API.graphql({
                    query: mutations.createUser,
                    variables: { input: newUser },
                });

                // console.log('jericho user created');
                // printObject('U.P:36-->results:\n', createdUser);

                theUser = createdUser?.data?.createUser; // Assuming the field name is "createUser"
            } catch (error) {
                console.log(error);
                console.error(error);
            }
        }
        return theUser;
    } catch (error) {
        console.log('U.P:19-->error:', error);
    }
};

export const updateProfile = async (userProfile) => {
    let newProfile = { ...userProfile };
    // printObject('UP:55-->newProfile:\n', newProfile);
    //need to check if location is defined, or if it is
    //needed to be created.
    if (
        newProfile?.location &&
        Object.values(newProfile.location).some(
            (value) => value !== null && value !== undefined
        )
    ) {
        // console.log('UP:63--> location data provided');
        const newId = createAWSUniqueID();
        //* address provided, need to check if new or update

        const locationValues = {
            id: newProfile?.locationUsersId
                ? newProfile.locationUsersId
                : newId,
            street: newProfile?.location?.street || '',
            city: newProfile?.location?.city || '',
            stateProv: newProfile?.location?.stateProv || '',
            postalCode: newProfile?.location?.postalCode || '',
        };

        if (newProfile?.locationUsersId === null) {
            try {
                const creationResponse = await API.graphql({
                    query: mutations.createLocation,
                    variables: { input: locationValues },
                });
                if (creationResponse?.data?.createLocation?.id?.length > 0) {
                    console.log(
                        'UP:108-->location create successful:',
                        creationResponse?.data?.createLocation?.id
                    );
                    newProfile = {
                        ...newProfile,
                        locationUsersId: locationValues.id,
                    };
                }
            } catch (error) {
                printObject('UP:117-->error creating location\n', error);
            }
        } else {
            const results = await API.graphql({
                query: mutations.updateLocation,
                variables: { input: locationValues },
            });
            if (results) {
                printObject('UP:131-->updateLocation results:\n', results);
                //  userProfile.locationUsersId = locationValues.id;
            }
        }
    } else {
        if (newProfile?.locationUsersId !== null) {
            //need to blank out location values
            const locationValues = {
                id: newProfile?.locationUsersId,
                street: null,
                city: null,
                stateProv: null,
                postalCode: null,
            };
            API.graphql({
                query: mutations.updateLocation,
                variables: { input: locationValues },
            }).then((results) => {
                printObject('UP:152-->clear location results:\n', results);
                userProfile.locationUsersId = locationValues.id;
            });
        } else {
            API.graphql({
                query: mutations.updateLocation,
                variables: { input: locationValues },
            }).then((results) => {
                printObject('UP:160-->updateLocation results:\n', results);
                //  userProfile.locationUsersId = locationValues.id;
            });
        }
    }
    let contextProfile = newProfile;
    delete newProfile?.location;
    delete newProfile?.affiliations;
    delete newProfile?.defaultOrg;
    delete newProfile?.manages;
    delete newProfile?.activeOrg;
    delete newProfile?.updatedAt;
    delete newProfile?.createdAt;
    try {
        const userUpdateResults = await API.graphql({
            query: mutations.updateUser,
            variables: { input: newProfile },
        });
    } catch (error) {
        printObject('UP:176-->userUpdateResults failure...', error);
    }
    // console.warn('Profile Updated');
    return contextProfile;
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
