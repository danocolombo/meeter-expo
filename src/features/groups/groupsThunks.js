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
            printObject('GT:24-->loadDefaultGroups', { status: fail });
            throw new Error('GT:25-->Failed to load default groups');
        }
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
            throw new Error('GT:44-->Failed to delete default group');
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
                    throw new Error('GT:67-->Failed to create default group');
                });
        } catch (error) {
            printObject('GT:70-->createDefaultGroup', inputs.group);
            throw new Error('GT:71-->Failed to create default group');
        }
    }
);
export const updateDefaultGroup = createAsyncThunk(
    'groups/updateDefaultGroup',
    async (inputs, thunkAPI) => {
        try {
            const results = await API.graphql({
                query: mutations.updateDefaultGroup,
                variables: { input: inputs.group },
            });
            if (results?.data?.updateDefaultGroup?.id === inputs.group.id) {
                return inputs.group;
            } else {
                printObject(
                    'GT:90-->updateDefaultGroup GQL call failed:\n',
                    results
                );
                throw new Error('GT:91-->Failed updateDefaultGroup thunk');
            }
        } catch (error) {
            printObject('GT:92-->updateDefaultGroup', updatedGroup);
            throw new Error('GT:93-->Failed updateDefaultGroup thunk');
        }
    }
);
// export const saveNewGroup = createAsyncThunk(
//     'groups/saveNewGroup',
//     async (inputs, thunkAPI) => {
//         try {
//             const newGroupId = createAWSUniqueID();
//             let groupIn = { ...inputs.group };
//             delete groupIn.id;
//             const insertInfo = {
//                 id: inputs.group.id !== '0' ? inputs.group.id : newGroupId,
//                 meetingGroupsId: inputs.meetingId,
//                 organizationGroupsId: inputs.orgId,
//                 ...groupIn,
//             };
//             printObject('GT:111-->insertInfo:\n', insertInfo);
//             //* * * * * * * * * * * * * * * * * *
//             //* save the new group to graphql
//             const results = await API.graphql({
//                 query: mutations.createGroup,
//                 variables: { input: insertInfo },
//             });
//             printObject('GT:118-->createGroup results:\n', results);
//             let returnValue {};
//             if(results.data.createGroup.id){
//                 returnValue = {
//                     status 200,
//                     results: results.data.createGroup
//                 }
//             }
//                     //* * * * * * * * * * * * * * * * * * *
//                     //* This sends group to slice
//                     //* * * * * * * * * * * * * * * * * * *
//                     printObject('GT:122-->createGroup results:\n', results);
//                     return insertInfo;
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                     console.error(error);
//                     throw new Error('GT:122-->Failed to create new group');
//                 });

//             // printObject('GT:18-->inputs:\n', inputs);
//             // return inputs;
//         } catch (error) {
//             console.log(error);
//             throw new Error('GT:20-->Failed to get groups');
//         }
//     }
// );
export const getGroupsForMeeting = createAsyncThunk(
    'groups/getGroupsForMeeting',
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
            // console.log('@@@@@@@@@@@@@@@++++BEFORE++++++@@@@@@@@@@@@@@@@');
            // printObject('GT:30-->api2use:', api2use);
            // printObject('GT:31-->body:\n', body);
            // printObject('GT:32-->config:\n', config);
            let res = await axios.post(api2use, body, config);

            if (res?.data?.status === '200') {
                const results = res.data.body;

                // printObject('GT:39-->results:\n', results);
                // console.log('@@@@@@@@@@@@@@@++++AFTER++++++@@@@@@@@@@@@@@@@');
                return results;
            } else {
                // printObject('NOTHING');
                // console.log('@@@@@@@@@@@@@@@++++AFTER++++++@@@@@@@@@@@@@@@@');
                return [];
            }
        } catch (error) {
            console.log(error);
            throw new Error('GT:20-->Failed to get groups');
        }
    }
);
