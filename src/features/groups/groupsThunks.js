import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
import * as mutations from '../../jerichoQL/mutations';
import { createAWSUniqueID, printObject } from '../../utils/helpers';
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};
export const loadDefaultGroups = createAsyncThunk(
    'groups/loadDefaultGroups',
    async (inputs, thunkAPI) => {
        try {
            const systemInfo = await API.graphql({
                query: queries.getOrganizationDefaultGroups,
                variables: { id: inputs.id },
            });
            const defaultGroups =
                systemInfo.data.getOrganization.defaultGroups.items;
            return defaultGroups;
        } catch (error) {
            printObject('GT:19-->loadDefaultGroups', { status: fail });
        }
        return [];
    }
);
export const deleteDefaultGroup = createAsyncThunk(
    'groups/deleteDefaultGroup',
    async (inputs, thunkAPI) => {
        try {
            const inputRequest = {
                id: inputs.groupId,
            };
            const systemInfo = await API.graphql({
                query: mutations.deleteDefaultGroup,
                variables: { input: inputRequest },
            });
            return inputs.groupId;
        } catch (error) {
            printObject('GT:37-->deleteDefaultGroup inputs:\n', inputs);
            printObject('GT:38-->deleteDefaultGroup ERROR:\n', error);
            return {};
        }
    }
);
export const createDefaultGroup = createAsyncThunk(
    'groups/createDefaultGroup',
    async (inputs, thunkAPI) => {
        try {
            const newId = createAWSUniqueID();
            const newGroup = {
                ...inputs.group,
                id: newId,
            };
            API.graphql({
                query: mutations.createDefaultGroup,
                variables: { input: newGroup },
            })
                .then((results) => {
                    return newGroup;
                })
                .catch((error) => {
                    console.log(error);
                    console.error(error);
                    return {};
                });
        } catch (error) {
            printObject('GT:55-->createDefaultGroup', inputs.group);
            return {};
        }
    }
);
export const updateDefaultGroup = createAsyncThunk(
    'groups/updateDefaultGroup',
    async (inputs, thunkAPI) => {
        try {
            printObject('GT:64-->updateDefaultGroup', inputs.group);

            // API.graphql({
            //     query: mutations.createAffiliation,
            //     variables: { input: insertInfo },
            // })
            //     .then((results) => {
            //         console.log('affiliation inserted');
            //         printObject('AS:135-->results:\n', results);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //         console.error(error);
            //     });
        } catch (error) {
            printObject('GT:30-->createDefaultGroup', inputs.group);
        }
        printObject('GT:81-->inputs:\n', inputs);
        return {};
    }
);
export const saveNewGroup = createAsyncThunk(
    'groups/saveNewGroup',
    async (inputs, thunkAPI) => {
        try {
            const { meetingId } = inputs;
            //* * * * * * * * * * * * * * * * * * *
            //* This function adds the group to the
            //* slice....
            //* * * * * * * * * * * * * * * * * * *
            // printObject('GT:18-->inputs:\n', inputs);
            return inputs;
        } catch (error) {
            console.log(error);
            throw new Error('GT:20-->Failed to get groups');
        }
    }
);
export const getGroups = createAsyncThunk(
    'groups/getGroups',
    async (inputs, thunkAPI) => {
        try {
            const { meetingId } = inputs;
            //* * * * * * * * * * * * * * * * * * *
            //* This function gets all the groups
            //* for the inputs.meetingId passed in
            //* 2. modify member object for slice
            //* * * * * * * * * * * * * * * * * * *
            //      1. get groups from DDB for meeting
            let obj = {
                operation: 'getGroupsByMeetingId',
                payload: {
                    meetingId: meetingId,
                },
            };

            let body = JSON.stringify(obj);
            let api2use = process.env.AWS_API_ENDPOINT + '/groups';
            console.log('@@@@@@@@@@@@@@@++++BEFORE++++++@@@@@@@@@@@@@@@@');
            printObject('GT:30-->api2use:', api2use);
            printObject('GT:31-->body:\n', body);
            printObject('GT:32-->config:\n', config);
            let res = await axios.post(api2use, body, config);

            if (res?.data?.status === '200') {
                const results = res.data.body;

                printObject('GT:39-->results:\n', results);
                console.log('@@@@@@@@@@@@@@@++++AFTER++++++@@@@@@@@@@@@@@@@');
                return results;
            } else {
                printObject('NOTHING');
                console.log('@@@@@@@@@@@@@@@++++AFTER++++++@@@@@@@@@@@@@@@@');
                return [];
            }
        } catch (error) {
            console.log(error);
            throw new Error('GT:20-->Failed to get groups');
        }
    }
);
