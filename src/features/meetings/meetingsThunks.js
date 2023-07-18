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
export const getSpecificMeeting = createAsyncThunk(
    'meetings/getSpecificMeeting',
    async (meetingId, thunkAPI) => {
        return meetingId;
    }
);
export const getAllMeetings = createAsyncThunk(
    'meetings/getAllMeetings',
    async (inputs, thunkAPI) => {
        // console.log('MT:22-->inputs:', inputs);
        try {
            let obj = {
                operation: 'getMeetingsOnAfterDate',
                payload: {
                    clientId: inputs.code,
                    date: '2023-01-01',
                    direction: 'DESC',
                },
            };
            // printObject('MT:30-->obj:\n', obj);
            let body = JSON.stringify(obj);
            let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
            // console.log('about to axios');
            // const { data } = await axios.post(api2use, body, config);
            let returnValue = {};
            await axios
                .post(api2use, body, config)
                .then((response) => {
                    printObject('MT:37-->response:\n', response.data);
                    returnValue = { ...response.data };
                    return;
                })
                .catch((error) => {
                    printObject(
                        'MT:41-->error getMeetingsOnAfterDate:\n',
                        error
                    );
                    throw new Error('MT:42-->Failed to getMeetingsOnAfterDate');
                });
            return returnValue;
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
            console.log('MT:100-->input:', input);
            const state = getState();

            const mtg = state.meetings.meetings.filter(
                (m) => m.meetingId === input
            );
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
        const newId = createAWSUniqueID();
        const mtg = { ...inputs, meetingId: newId };
        let obj = {
            operation: 'putMeeting',
            payload: {
                Item: mtg,
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
        let res = await axios.post(api2use, body, config);
        printObject('MT:131-->addMeeting_GQL_res:\n', res);
        return mtg;
    }
);
