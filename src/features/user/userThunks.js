import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { API } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
import * as gQueries from '../../graphql/queries';
import * as mutations from '../../jerichoQL/mutations';
import { MEETER_DEFAULTS } from '../../constants/meeter';
import { createAWSUniqueID, printObject } from '../../utils/helpers';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (inputs, thunkAPI) => {
        let userProfile = { error: 'No Auth' };

        try {
            //* get gql user profile
            let updatedProfile = null;
            const sub = inputs?.signInUserSession?.idToken?.payload?.sub;
            const gqlProfileData = await API.graphql({
                query: queries.usersBySub,
                variables: { sub: sub },
            });

            if (gqlProfileData?.data?.usersBySub?.items[0]?.id) {
                // console.log('IF---- where we belong');
                const gqlProfile = gqlProfileData.data.usersBySub.items[0];
                //      set activeOrg based on profile defaultOrg and affiliations
                let clientData = {};
                if (gqlProfile?.defaultOrg?.id) {
                    clientData = gqlProfile.affiliations.items.filter(
                        (a) => a.organization.id === gqlProfile.defaultOrg.id
                    );
                }
                let perms = [];
                clientData.forEach((cd) => {
                    perms.push(cd.role);
                });
                let client = {};
                let activeOrg = {};
                if (clientData.length > 0) {
                    //* affiliation found...
                    client = clientData[0];
                    activeOrg = {
                        id: client.organization.id,
                        code: client.organization.code,
                        name: client.organization.name,
                        heroMessage: client.organization.heroMessage,
                        role: client.role,
                        status: client.status,
                    };
                } else {
                    //* this is default, no affiliations
                    activeOrg = {
                        id: MEETER_DEFAULTS.ORGANIZATION_ID,
                        code: MEETER_DEFAULTS.CODE,
                        name: MEETER_DEFAULTS.NAME,
                        heroMessage: MEETER_DEFAULTS.HERO_MESSAGE,
                        role: MEETER_DEFAULTS.ROLE,
                        status: 'active',
                    };
                }
                const newProfile = { ...gqlProfile, activeOrg: activeOrg };
                const results = { profile: newProfile, perms: perms };
                printObject('UT:64-->results:', results);
                return results;
            } else {
                //*===========================================
                //      user does not have a GQL login, Let's
                //       make a default profile.
                //*===========================================
                printObject(
                    'UT:71-->signInUserSession',
                    inputs?.signInUserSession
                );
                //*----------------------------------
                //todo -- createUser, get id
                //*----------------------------------
                const newUserId = createAWSUniqueID();
                const defaultActiveOrg = {
                    id: MEETER_DEFAULTS.ORGANIZATION_ID,
                    code: MEETER_DEFAULTS.CODE,
                    name: MEETER_DEFAULTS.NAME,
                    heroMessage: MEETER_DEFAULTS.HERO_MESSAGE,
                    role: 'guest',
                    status: 'active',
                };
                let newUser = {
                    id: newUserId,
                    sub: inputs?.signInUserSession?.idToken?.payload?.sub,
                    username:
                        inputs?.signInUserSession?.idToken?.payload
                            ?.preferred_username,
                    firstName:
                        inputs?.signInUserSession?.idToken?.payload?.given_name,
                    lastName:
                        inputs?.signInUserSession?.idToken?.payload
                            ?.family_name,
                    email: inputs?.signInUserSession?.idToken?.payload?.email,
                    organizationDefaultUsersId: MEETER_DEFAULTS.ORGANIZATION_ID,
                    // activeOrg: defaultOrg,
                };
                printObject('UT:95-->newUser', newUser);
                let newUserRecord = {};
                try {
                    const createUserResult = await API.graphql({
                        query: mutations.createUser,
                        variables: { input: newUser },
                    });
                    newUserRecord = createUserResult.data.createUser;
                } catch (error) {
                    console.error(error);
                    throw new Error('Failed to create new user');
                }
                printObject('UT:106-->newUserRecord', newUserRecord);
                //*----------------------------------
                //todo -- createAff
                //*----------------------------------
                const newId = createAWSUniqueID();
                const newAff = {
                    id: newId,
                    organizationAffiliationsId: MEETER_DEFAULTS.ORGANIZATION_ID,
                    userAffiliationsId: newUserRecord.id,
                    role: 'guest',
                    status: 'active',
                };
                try {
                    await API.graphql({
                        query: mutations.createAffiliation,
                        variables: { input: newAff },
                    });
                } catch (error) {
                    printObject(
                        'UT:135-->failed to create affilitation error:\n',
                        error
                    );
                    throw new Error('Failed to create affiliation');
                }

                //*-=================================
                //todo -- getUserBySub
                //*----------------------------------
                const gqlProfileDataUpdated = await API.graphql({
                    query: queries.usersBySub,
                    variables: { sub: newUserRecord.sub },
                });
                printObject(
                    'UT:138-->gqlProfileDataObject:\n',
                    gqlProfileDataUpdated
                );
                if (gqlProfileDataUpdated?.data?.usersBySub?.items[0]?.id) {
                    const gqlProfile =
                        gqlProfileDataUpdated.data.usersBySub.items[0];
                    printObject('UT:142-->gqlProfile:\n', gqlProfile);
                    let clientData = {};
                    if (gqlProfile?.defaultOrg?.id) {
                        clientData = gqlProfile.affiliations.items.filter(
                            (a) =>
                                a.organization.id === gqlProfile.defaultOrg.id
                        );
                    }
                    let perms = [];
                    clientData.forEach((cd) => {
                        perms.push(cd.role);
                    });
                    let client = {};
                    activeOrg = {};
                    if (clientData.length > 0) {
                        //* affiliation found...
                        client = clientData[0];
                        activeOrg = {
                            id: client.organization.id,
                            code: client.organization.code,
                            name: client.organization.name,
                            heroMessage: client.organization.heroMessage,
                            role: client.role,
                            status: client.status,
                        };
                    } else {
                        //* this is default, no affiliations
                        activeOrg = {
                            id: MEETER_DEFAULTS.ORGANIZATION_ID,
                            code: MEETER_DEFAULTS.CODE,
                            name: MEETER_DEFAULTS.NAME,
                            heroMessage: MEETER_DEFAULTS.HERO_MESSAGE,
                            role: MEETER_DEFAULTS.ROLE,
                            status: 'active',
                        };
                    }
                    const newProfile = { ...gqlProfile, activeOrg: activeOrg };
                    perms = gqlProfile.affiliations.items.map(
                        (aff) => aff.role
                    );
                    printObject('UT:185-->newProfile:\n', newProfile);
                    printObject('UT:186-->perms:\n', perms);
                    return { profile: newProfile, perms: perms };
                } else {
                    throw new Error('Failed to create user profile');
                }
            }
        } catch (error) {
            printObject('UT:82-->saveUserProfile ERROR', inputs);
            printObject('UT:83-->error:\n', error);
            // Rethrow the error to let createAsyncThunk handle it
            throw new Error('UT:17-->Failed to saveUserProfile thunk');
        }
    }
);
export const joinOrganization = createAsyncThunk(
    'user/joinOrganization',
    async (inputs, thunkAPI) => {
        //*-------------------------------------
        // user wants to request access to new
        // organization.
        //*-------------------------------------
        // should have inputs.userProfile and
        // inputs.newCode
        //*-------------------------------------
        try {
            //      userProfile required
            if (!inputs?.userProfile?.id) {
                console.log('UT:220-->userProfile is required');
                throw new Error(
                    'UT:221-->Failed to joinOrganization: userProfile missing'
                );
            }
            //      newCode required
            if (!inputs?.newCode) {
                console.log('UT:224-->newCode is required');
                throw new Error(
                    'UT:225-->Failed to joinOrganization: newCode missing'
                );
            }
            //      verify user does not have aff code
            const existing = inputs.userProfile.affiliations.items.find(
                (a) =>
                    a.organization.code.toUppercase() ===
                    inputs?.newCode?.toUpperCase()
            );
            if (existing.length > 0) {
                printObject(
                    'UT:232-->user already has affiliation for:',
                    inputs.newCode
                );
                throw new Error(
                    'UT:233-->Failed to joinOrganization: newCode duplicate'
                );
            }
            //      confirm newCode is a valid code
            // note all codes in graphql organization table is all lowercase

            const orgResponse = await API.graphql(
                graphqlOperation(queries.listOrganizations, {
                    filter: { code: { eq: inputs.newCode.toLowerCase() } },
                })
            );
            let requestedOrg = {};
            if (orgResponse.data.listOrganizations.items.length > 0) {
                requestedOrg = orgResponse.data.listOrganizations.items[0];
            } else {
                printObject('UT:249-->newCode is not valid:', inputs.newCode);
                throw new Error(
                    'UT:250-->Failed to joinOrganization: newCode invalid'
                );
            }
            //      insert new affiliation request for org
            const newAffId = createAWSUniqueID();
            const insertInfo = {
                id: newAffId,
                organizationAffiliationsId: requestedOrg.id,
                role: 'new',
                status: 'active',
                userAffiliationsId: inputs.userProfile.id,
            };
            const insertResponse = await API.graphql({
                query: mutations.createAffiliation,
                variables: { input: insertInfo },
            });
            if (!insertResponse?.data?.createAffiliation?.id) {
                printObject(
                    'UT:264-->could not add new affiliation:',
                    insertInfo
                );
                printObject('UT:265-->insertResponse:\n', insertResponse);
                throw new Error(
                    'UT:266-->Failed to joinOrganization: insert failed'
                );
            }
            //      now add the new affiliation to the user profile
            const updatedUserProfile = { ...inputs.userProfile };
            updatedUserProfile.affiliations.items.push(insertInfo);
            return updatedUserProfile;
        } catch (error) {
            printObject('UT:82-->saveUserProfile ERROR', inputs);
            printObject('UT:83-->error:\n', error);
            // Rethrow the error to let createAsyncThunk handle it
            throw new Error('UT:17-->Failed to saveUserProfile thunk');
        }
    }
);

export const saveUserProfile = createAsyncThunk(
    'user/saveUserProfile',
    async (inputs, thunkAPI) => {
        try {
            // printObject('UT:13-->inputs\n', inputs);
            // rip perms out of affiliations
            let perms = [];
            inputs.affiliations.items.forEach((aff) => {
                if (aff.organization.id === inputs.defaultOrg.id) {
                    if (aff.status === 'active') {
                        perms.push(aff.role);
                    }
                }
            });
            const inputValues = { userProfile: inputs, perms: perms };
            return inputValues;
        } catch (error) {
            printObject('UT:15-->saveUserProfile', inputs);
            // Rethrow the error to let createAsyncThunk handle it
            throw new Error('UT:17-->Failed to saveUserProfile thunk');
        }
    }
);
export const defineAndSaveUserProfile = createAsyncThunk(
    'user/defineAndSaveUserProfile',
    async (inputs, thunkAPI) => {
        printObject('UT:35-->inputs:\n', inputs);
        let gqlProfile = {};
        let updatedProfile = {};
        let activeOrg = {};
        try {
            let activeOrg = {};
            //      get graphQL user
            const gqlProfileData = await API.graphql({
                query: queries.usersBySub,
                variables: { sub: inputs.attributes.sub },
            });
            //*****************************************
            //* check if user has profile
            //*****************************************
            if (gqlProfileData?.data?.usersBySub?.items[0]?.id) {
                printObject('UT:47-->gqlProfileData:\n', gqlProfileData);
                gqlProfile = gqlProfileData.data.usersBySub.items[0];
                //      set activeOrg based on profile defaultOrg and affiliations
                printObject('UT:51-->gqlProfile:\n', gqlProfile);
                let clientData = {};
                if (gqlProfile?.defaultOrg?.id) {
                    clientData = gqlProfile.affiliations.items.filter(
                        (a) => a.organization.id === gqlProfile.defaultOrg.id
                    );
                }
                printObject('UT:57-->clientData:\n', clientData);
                let client = {};

                if (clientData.length > 0) {
                    //* affiliation found...
                    client = clientData[0];
                    activeOrg = {
                        id: client.organization.id,
                        code: client.organization.code,
                        name: client.organization.name,
                        heroMessage: client.organization.heroMessage,
                        role: client.role,
                        status: client.status,
                    };
                } else {
                    //* this is default, no affiliations
                    activeOrg = {
                        id: MEETER_DEFAULTS.ORGANIZATION_ID,
                        code: MEETER_DEFAULTS.CODE,
                        name: MEETER_DEFAULTS.NAME,
                        heroMessage: MEETER_DEFAULTS.HERO_MESSAGE,
                        role: MEETER_DEFAULTS.ROLE,
                        status: 'active',
                    };
                }
                printObject('UT:82-->client:', client);
                printObject('UT:83-->activeOrg:\n', activeOrg);
                // printObject('AC:68-->activeOrg:\n', activeOrg);
                // updatedProfile = { ...gqlProfile };
            } else {
                console.log('UT:172-->ELSE---HELP');
                //todo: what does it look like when new user and no profile?
                //todo------------------------------------------------------
                activeOrg = {
                    id: MEETER_DEFAULTS.ORGANIZATION_ID,
                    code: MEETER_DEFAULTS.CODE,
                    name: MEETER_DEFAULTS.NAME,
                    heroMessage: MEETER_DEFAULTS.HERO_MESSAGE,
                    role: 'guest',
                    status: 'active',
                };
                // updatedProfile = { ...activeOrg };
            }
            updatedProfile = { ...gqlProfile, activeOrg: activeOrg };
        } catch (error) {
            printObject(
                'UT:96-->defineAndSaveUserProfile TryCatch failure:\n',
                error
            );
            return;
        }

        try {
            printObject('UT:105-->updatedProfile\n', updatedProfile);
            // rip perms out of affiliations
            let perms = [];
            updatedProfile?.affiliations?.items?.forEach((aff) => {
                if (aff.organization.id === updatedProfile.defaultOrg.id) {
                    if (aff.status === 'active') {
                        perms.push(aff.role);
                    }
                }
            });
            const inputValues = { userProfile: updatedProfile, perms: perms };
            return inputValues;
        } catch (error) {
            printObject('UT:114-->defineAndSaveUserProfile', inputs);
            // Rethrow the error to let createAsyncThunk handle it
            throw new Error(
                'UT:116-->Failed to defineAndSaveUserProfile thunk'
            );
        }
    }
);
