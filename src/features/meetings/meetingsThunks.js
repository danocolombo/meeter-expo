import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { API } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
import * as gQueries from '../../graphql/queries';
import * as mutations from '../../jerichoQL/mutations';
import { createAWSUniqueID, printObject } from '../../utils/helpers';

export const getSpecificMeeting = createAsyncThunk(
    'meetings/getSpecificMeeting',
    async (id, thunkAPI) => {
        return id;
    }
);
export const getAllMeetingsG = createAsyncThunk(
    'meetings/getAllMeetings',
    async (inputs, thunkAPI) => {
        console.log('MT:22-->inputs:', inputs);
        try {
            const oId = inputs.orgId;
            const meetingList = await API.graphql({
                query: queries.listMeetings,
                variables: {
                    filter: {
                        organizationMeetingsId: {
                            eq: inputs.orgId,
                        },
                    },
                },
            });
            printObject('meetingList:\n', meetingList);
            // console.log('found:', meetingList.data.listMeetings.items.length);
            const returnValue = {
                status: '200',
                meetings: meetingList?.data?.listMeetings?.items || [],
            };
            // printObject(meetingList.data.listMeetings.items[0]);
            return returnValue;
        } catch (error) {
            printObject('MT:29-->getAllMeetingsG', { status: fail });
            throw new Error('MT:30-->Failed to getAllMeetingsG');
        }
        return [];
    }
);
export const getAllMeetings = createAsyncThunk(
    'meetings/getAllMeetings',
    async (inputs, thunkAPI) => {
        // console.log('MT:22-->inputs:', inputs);
        try {
            console.log('MT:55-->getAllMeetings thunk disabled...');
            return [];
            // let obj = {
            //     operation: 'getMeetingsOnAfterDate',
            //     payload: {
            //         clientId: inputs.code,
            //         date: '2023-01-01',
            //         direction: 'DESC',
            //     },
            // };
            // // printObject('MT:30-->obj:\n', obj);
            // let body = JSON.stringify(obj);
            // let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
            // // console.log('about to axios');
            // // const { data } = await axios.post(api2use, body, config);
            // let returnValue = {};
            // await axios
            //     .post(api2use, body, config)
            //     .then((response) => {
            //         printObject('MT:37-->response:\n', response.data);
            //         returnValue = { ...response.data };
            //         return;
            //     })
            //     .catch((error) => {
            //         printObject(
            //             'MT:41-->error getMeetingsOnAfterDate:\n',
            //             error
            //         );
            //         throw new Error('MT:42-->Failed to getMeetingsOnAfterDate');
            //     });
            // return returnValue;
        } catch (error) {
            printObject('MT:45-->getAllMeetings', { status: fail });
            throw new Error('MT:46-->Failed to getAllMeetings');
        }
        return [];
    }
);

export const getActiveMeetings = createAsyncThunk(
    'meetings/getActiveMeetings',
    async (input, { getState, rejectWithValue }) => {
        try {
            var d = new Date();
            const today = d.toISOString().slice(0, 10);
            const state = getState();
            const filteredMeetings = state.meetings.meetings.filter(
                (m) => m.meetingDate >= today
            );
            function compareMeetingDates(a, b) {
                const dateA = new Date(a.meetingDate);
                const dateB = new Date(b.meetingDate);

                if (dateA < dateB) return -1; // dateA comes before dateB
                if (dateA > dateB) return 1; // dateA comes after dateB
                return 0; // dates are equal
            }

            filteredMeetings.sort(compareMeetingDates);

            // printObject('MT:54-->filteredMeetings:\n', filteredMeetings);
            // Return the filtered meetings
            return filteredMeetings;
        } catch (error) {
            // Handle errors and optionally return a rejected promise with an error message
            return rejectWithValue('Failed to fetch active meetings');
        }
    }
);
export const getHistoricMeetings = createAsyncThunk(
    'meetings/getHistoricMeetings',
    async (input, { getState, rejectWithValue }) => {
        try {
            var d = new Date();
            const today = d.toISOString().slice(0, 10);
            const state = getState();
            // printObject('MT:51-->sample:\n', state.allMeetings[0]);
            const filteredMeetings = state.meetings.meetings.filter(
                (m) => new Date(m.meetingDate) < new Date(today)
            );
            filteredMeetings.sort((a, b) => {
                // Compare meetingDates (in descending order)
                if (a.meetingDate > b.meetingDate) return -1;
                if (a.meetingDate < b.meetingDate) return 1;

                // If meetingDates are equal, compare titles (in alphabetical order)
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;

                // If titles are also equal, no need to change the order
                return 0;
            });
            // printObject('MT:54-->filteredMeetings:\n', filteredMeetings);
            // Return the filtered meetings
            return filteredMeetings;
        } catch (error) {
            // Handle errors and optionally return a rejected promise with an error message
            return rejectWithValue('Failed to fetch active meetings');
        }
    }
);
export const getMeetingById = createAsyncThunk(
    'meetings/getMeetingById',
    async (input, { getState, rejectWithValue }) => {
        try {
            console.log('MT:100-->getMeetingById...input:', input);
            const state = getState();

            const mtg = state.meetings.meetings.filter((m) => m.id === input);
            printObject('MT:105-->mtg:\n', mtg);
            // Return the filtered meetings
            if (mtg.length === 1) {
                return mtg[0];
            } else {
                return [];
            }
        } catch (error) {
            // Handle errors and optionally return a rejected promise with an error message
            return rejectWithValue('Failed to fetch active meetings');
        }
    }
);
export const addMeeting = createAsyncThunk(
    'meetings/addMeeting',
    async (inputs, thunkAPI) => {
        let mtg = { ...inputs.meeting, organizationMeetingsId: inputs.orgId };
        printObject('MT:176-->mtg:\n', mtg);
        // Use await with the GraphQL call to get the results
        const results = await API.graphql({
            query: mutations.createMeeting,
            variables: { input: inputInfo },
        });

        // Check if the result contains the expected data and return it
        if (results.data.createMeeting.id) {
            return inputInfo;
        } else {
            // If data.createGroup.id is missing, handle the error
            throw new Error('MT:189-->Failed to create meeting');
        }
    }
);
export const updateMeeting = createAsyncThunk(
    'meetings/updateMeeting',
    async (inputs, thunkAPI) => {
        try {
            printObject('MT:196-->updateMeeting__inputs:\n', inputs);
            //* * * * * * * * * * * * * * * * * * * *
            //* update the meeting in graphql
            //* * * * * * * * * * * * * * * * * * * *
            // strip non-meeting values
            let mtg = { ...inputs };
            delete mtg.organization;
            delete mtg.groups;
            printObject('MT:205-->mtg:\n', mtg);
            const results = await API.graphql({
                query: mutations.updateMeeting,
                variables: { input: mtg },
            });
            if (results.data.updateMeeting.id) {
                return inputs;
            } else {
                throw new Error('MT:208-->Failed to update meeting');
            }
            return inputs;
        } catch (error) {
            printObject('MT:216-->updateMeeting FAILURE', inputs);
            // Rethrow the error to let createAsyncThunk handle it
            throw new Error('MT:215-->Failed to update meeting');
        }
    }
);
export const addGroup = createAsyncThunk(
    'meetings/addGroup',
    async (inputs, thunkAPI) => {
        try {
            const newId = createAWSUniqueID();
            printObject('MT:196-->addGroup__inputs:\n', inputs);
            let inputInfo = {
                ...inputs.group,
                meetingGroupsId: inputs.meetingId,
                organizationGroupsId: inputs.orgId,
            };
            delete inputInfo.meetingId;
            if (inputInfo.id === '0') {
                inputInfo.id = newId;
            }
            printObject('MT:208-->inputInfo:\n', inputInfo);

            // Use await with the GraphQL call to get the results
            const results = await API.graphql({
                query: mutations.createGroup,
                variables: { input: inputInfo },
            });

            // Check if the result contains the expected data and return it
            if (results.data.createGroup.id) {
                return results.data.createGroup;
            } else {
                // If data.createGroup.id is missing, handle the error
                throw new Error('MT:216-->Failed to create group');
            }
        } catch (error) {
            printObject('MT:235-->addGroup', inputs.group);
            // Rethrow the error to let createAsyncThunk handle it
            throw new Error('MT:236-->Failed to add group');
        }
    }
);
