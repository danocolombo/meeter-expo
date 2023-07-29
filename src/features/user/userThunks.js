import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { API } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
import * as gQueries from '../../graphql/queries';
import * as mutations from '../../jerichoQL/mutations';
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
