import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { API } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
import * as gQueries from '../../graphql/queries';
import * as mutations from '../../jerichoQL/mutations';
import { MEETER_DEFAULTS } from '../../constants/meeter';
import { createAWSUniqueID, printObject } from '../../utils/helpers';

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
                console.log('ELSE---HELP');
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
