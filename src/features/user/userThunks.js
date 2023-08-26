import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { API, graphqlOperation } from 'aws-amplify';
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
                // printObject('UT:64-->profile&perms:', results);

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
                printObject('UT:103-->newUser', newUser);
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
                printObject('UT:115-->newUserRecord', newUserRecord);
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
                    'UT:148-->gqlProfileDataObject:\n',
                    gqlProfileDataUpdated
                );
                if (gqlProfileDataUpdated?.data?.usersBySub?.items[0]?.id) {
                    const gqlProfile =
                        gqlProfileDataUpdated.data.usersBySub.items[0];
                    printObject('UT:154-->gqlProfile:\n', gqlProfile);
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
                    printObject('UT:195-->newProfile:\n', newProfile);
                    printObject('UT:196-->perms:\n', perms);
                    return { profile: newProfile, perms: perms };
                } else {
                    throw new Error('Failed to create user profile');
                }
            }
        } catch (error) {
            printObject('UT:202-->saveUserProfile ERROR', inputs);
            printObject('UT:203-->error:\n', error);
            // Rethrow the error to let createAsyncThunk handle it
            throw new Error('UT:205-->Failed to saveUserProfile thunk');
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
                throw new Error('01: userProfile required');
            }
            //      newCode required
            if (!inputs?.newCode) {
                console.log('UT:224-->newCode is required');
                throw new Error('02: code required');
            }

            //      verify user does not have aff code
            const existing = inputs.userProfile.affiliations.items.find(
                (a) =>
                    a.organization.code.toUpperCase() ===
                    inputs?.newCode?.toUpperCase()
            );
            if (existing) {
                printObject(
                    'UT:242-->user already has affiliation for:',
                    inputs.newCode
                );
                throw new Error('03: duplicate');
            }
            //      confirm newCode is a valid code
            // note all codes in graphql organization table is all lowercase
            const targetCode = inputs.newCode.toLowerCase();
            console.log('targetCode:', targetCode);
            const orgResponse = await API.graphql(
                graphqlOperation(queries.listOrganizations, {
                    filter: { code: { eq: targetCode } },
                })
            );
            let requestedOrg = {};
            if (orgResponse.data.listOrganizations.items.length > 0) {
                console.log('UT:254-->newCode is valid');
                requestedOrg = orgResponse.data.listOrganizations.items[0];
            } else {
                printObject('UT:258-->newCode is not valid:', inputs.newCode);
                throw new Error('04: invalid code');
            }
            //      insert new affiliation request for org
            const newAffId = createAWSUniqueID();
            const insertInfo = {
                organizationAffiliationsId: requestedOrg.id,
                role: 'new',
                status: 'pending',
                userAffiliationsId: inputs.userProfile.id,
            };
            printObject('UT:270-->insertInfo:\n', insertInfo);
            const insertResponse = await API.graphql({
                query: mutations.createAffiliation,
                variables: { input: insertInfo },
            });
            printObject('UT:273-->insertResponse:\n', insertResponse);
            if (!insertResponse?.data?.createAffiliation?.id) {
                printObject(
                    'UT:281-->could not add new affiliation:',
                    insertInfo
                );
                printObject('UT:280-->insertInfo:\n', insertInfo);
                printObject('UT:284-->insertResponse:\n', insertResponse);
                throw new Error('05: createAffiliation failed');
            }
            //      now add the new affiliation to the user profile
            const newOrgInfo = {
                id: insertResponse.data.createAffiliation.organization.id,
                name: insertResponse.data.createAffiliation.organization.name,
                code: insertResponse.data.createAffiliation.organization.code,
                heroMessage:
                    insertResponse.data.createAffiliation.organization
                        .heroMessage,
            };
            const addedAff = {
                id: insertResponse.data.createAffiliation.id,
                role: insertResponse.data.createAffiliation.role,
                status: insertResponse.data.createAffiliation.status,
                organization: newOrgInfo,
            };
            printObject('UT:299-->addedAff:\n', addedAff);
            // const updatedUserProfile = { ...inputs.userProfile };
            // updatedUserProfile.affiliations.items.push(addedAff);
            const updatedUserProfile = {
                ...inputs.userProfile,
                affiliations: {
                    ...inputs.userProfile.affiliations,
                    items: [...inputs.userProfile.affiliations.items, addedAff],
                },
            };
            printObject('UT:302-->updatedUserProfile:\n', updatedUserProfile);
            return { userProfile: updatedUserProfile };
        } catch (error) {
            console.log('UT:286:thunk catch hit');
            printObject('UT:297-->error:\n', error);
            if (error.message.startsWith('01:')) {
                throw error; // Re-throw the specific error with code '01'
            } else if (error.message.startsWith('02:')) {
                throw error; // Re-throw the specific error with code '02'
            } else if (error.message.startsWith('03:')) {
                throw error; // Re-throw the specific error with code '03'
            } else if (error.message.startsWith('04:')) {
                throw error; // Re-throw the specific error with code '04'
            } else {
                // For unknown errors, throw a default code '99'
                throw new Error('99: joinOrganization failure');
            }
        }
    }
);
export const errorTest = createAsyncThunk(
    'user/errorTest',
    async (inputs, thunkAPI) => {
        console.log('UT:333-->errorTest start');
        // Simulating that code is duplicate
        const throwError = true;
        if (throwError) {
            const errorCode = 3;
            switch (errorCode) {
                case 1:
                    throw new Error('01: userProfile required');
                    break;
                case 2:
                    throw new Error('02: code required');
                    break;
                case 3:
                    throw new Error('03: duplicate');
                    break;
                default:
                    throw new Error('99: unknown error');
                    break;
            }
        } else {
            return { results: 'PASS' };
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
            printObject('UT:319-->saveUserProfile', inputs);
            // Rethrow the error to let createAsyncThunk handle it
            throw new Error('UT:321-->Failed to saveUserProfile thunk');
        }
    }
);
export const defineAndSaveUserProfile = createAsyncThunk(
    'user/defineAndSaveUserProfile',
    async (inputs, thunkAPI) => {
        printObject('UT:328-->inputs:\n', inputs);
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
                printObject('UT:343-->gqlProfileData:\n', gqlProfileData);
                gqlProfile = gqlProfileData.data.usersBySub.items[0];
                //      set activeOrg based on profile defaultOrg and affiliations
                printObject('UT:346-->gqlProfile:\n', gqlProfile);
                let clientData = {};
                if (gqlProfile?.defaultOrg?.id) {
                    clientData = gqlProfile.affiliations.items.filter(
                        (a) => a.organization.id === gqlProfile.defaultOrg.id
                    );
                }
                printObject('UT:353-->clientData:\n', clientData);
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
                printObject('UT:378-->client:', client);
                printObject('UT:379-->activeOrg:\n', activeOrg);
                // printObject('AC:68-->activeOrg:\n', activeOrg);
                // updatedProfile = { ...gqlProfile };
            } else {
                console.log('UT:383-->ELSE---HELP');
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
                'UT:399-->defineAndSaveUserProfile TryCatch failure:\n',
                error
            );
            return;
        }

        try {
            printObject('UT:406-->updatedProfile\n', updatedProfile);
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
            printObject('UT:419-->defineAndSaveUserProfile', inputs);
            // Rethrow the error to let createAsyncThunk handle it
            throw new Error(
                'UT:422-->Failed to defineAndSaveUserProfile thunk'
            );
        }
    }
);
