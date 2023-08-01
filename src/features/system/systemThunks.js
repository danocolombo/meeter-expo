import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { API } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
import * as gQueries from '../../graphql/queries';
import * as mutations from '../../jerichoQL/mutations';
import { createAWSUniqueID, printObject } from '../../utils/helpers';

export const loadActiveOrg = createAsyncThunk(
    'system/loadActiveOrg',
    async (inputs, thunkAPI) => {
        try {
            printObject('ST:13-->inputs\n', inputs);
            const systemInfo = await API.graphql({
                query: queries.getActiveOrganization,
                variables: { orgId: inputs },
            });
            if (systemInfo?.data?.getOrganization?.id) {
                return systemInfo.data.getOrganization;
            } else {
                // If data.createGroup.id is missing, handle the error
                throw new Error('ST:29-->Failed to loadActiveOrg');
            }
        } catch (error) {
            printObject('ST:32-->loadActiveOrg', inputs);
            printObject('ST:33-->error:\n', error);
            // Rethrow the error to let createAsyncThunk handle it
            throw new Error('ST:35-->Failed to loadActiveOrg thunk');
        }
    }
);
