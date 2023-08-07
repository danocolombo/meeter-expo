import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { API } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
import * as gQueries from '../../graphql/queries';
import * as mutations from '../../jerichoQL/mutations';
import * as gMutations from '../../graphql/mutations';
import { createAWSUniqueID, printObject } from '../../utils/helpers';

export const getSpecificMeeting = createAsyncThunk(
    'meetings/getSpecificMeeting',
    async (id, thunkAPI) => {
        return id;
    }
);
export const getAllMeetings = createAsyncThunk(
    'meetings/getAllMeetings',
    async (inputs, thunkAPI) => {
        try {
            console.log('MT:20-->getAllMeetings called');
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

            // Sort meetings by multiple criteria
            const sortedMeetings = meetingList?.data?.listMeetings?.items
                ? meetingList.data.listMeetings.items.sort((a, b) => {
                      // First, compare by meetingDate in descending order
                      const dateComparison = b.meetingDate.localeCompare(
                          a.meetingDate
                      );
                      if (dateComparison !== 0) {
                          return dateComparison;
                      }

                      // Then, compare by meetingType in ascending order
                      const typeComparison = a.meetingType.localeCompare(
                          b.meetingType
                      );
                      if (typeComparison !== 0) {
                          return typeComparison;
                      }

                      // Finally, compare by title in ascending order
                      return a.title.localeCompare(b.title);
                  })
                : [];

            const returnValue = {
                status: '200',
                meetings: sortedMeetings,
            };

            return returnValue;
        } catch (error) {
            printObject('MT:29-->getAllMeetingsG', { status: 'fail' });
            throw new Error('MT:30-->Failed to getAllMeetingsG');
        }
    }
);
export const getAllMeetingsOLD = createAsyncThunk(
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
            // console.log('MT:100-->getMeetingById...input:', input);
            const state = getState();

            const mtg = state.meetings.meetings.filter((m) => m.id === input);
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
export const addDefaultGroups = createAsyncThunk(
    'meetings/addDefaultGroups',
    async (inputs, thunkAPI) => {
        try {
            printObject('MT:174-->inputs:\n', inputs);

            //* add meetings in graphql

            //* define existing meeting groups + defaults
            let newGroupList = [];
            if (inputs?.meeting?.groups?.items) {
                newGroupList = [...inputs?.meeting?.groups?.items];
            }

            inputs?.defaultGroups?.forEach((dg) => {
                const newId = createAWSUniqueID();
                let inputInfo = {
                    ...dg,
                    id: newId,
                    attendance: 0,
                    meetingGroupsId: inputs.meeting.id,
                    organizationGroupsId: inputs.orgId,
                };
                // printObject('MT:217-->inputInfo:\n', inputInfo);
                const results = API.graphql({
                    query: mutations.createGroup,
                    variables: { input: inputInfo },
                });

                newGroupList.push(inputInfo);
            });
            printObject('MT:199-->newGroupList:\n', newGroupList);
            const data = {
                items: [...newGroupList],
            };

            data.items.sort((a, b) => {
                // First, compare by gender
                const genderCompare = a.gender.localeCompare(b.gender);

                // If genders are different, return the gender comparison result
                if (genderCompare !== 0) {
                    return genderCompare;
                }

                // If genders are the same, compare by title
                const titleCompare = a.title.localeCompare(b.title);

                // If titles are different, return the title comparison result
                if (titleCompare !== 0) {
                    return titleCompare;
                }

                // If titles are the same, compare by location
                return a.location.localeCompare(b.location);
            });

            // console.log(data.items);

            const sortedGroupList = [...data.items];

            const newGroupsItems = { items: sortedGroupList };
            //* put groups back in meeting object
            let meetingUpdate = {
                ...inputs.meeting,
                groups: newGroupsItems,
            };

            return meetingUpdate;
        } catch (error) {
            printObject(
                'MT:250-->::addDefaultGroups thunk try failure.\n',
                error
            );
            throw new Error('MT:251-->addDefaultGroups Failed');
        }
    }
);
export const addMeeting = createAsyncThunk(
    'meetings/addMeeting',
    async (inputs, thunkAPI) => {
        try {
            // printObject('MT:176-->inputs:\n', inputs);
            let mtg = {
                ...inputs.meeting,
                organizationMeetingsId: inputs.orgId,
            };
            // printObject('MT:178-->mtg:\n', mtg);
            // delete mtg.meetingId;
            // delete mtg.clientId;

            // Use await with the GraphQL call to get the results
            const results = await API.graphql({
                query: mutations.createMeeting,
                variables: { input: mtg },
            });
            // printObject('MT:184-->results:\n', results);
            // Check if the result contains the expected data and return it
            if (results.data.createMeeting.id) {
                return mtg;
            } else {
                // If data.createGroup.id is missing, handle the error
                throw new Error('MT:264-->Failed to create meeting');
            }
        } catch (error) {
            printObject('MT:267-->addMeeting thunk try failure.\n', error);
            throw new Error('MT:268-->Failed to create meeting');
        }
    }
);
export const deleteGroupFromMeeting = createAsyncThunk(
    'meetings/deleteGroupFromMeeting',
    async (inputs, thunkAPI) => {
        try {
            //* -----------------------
            //* delete group from gql
            //* -----------------------
            const inputRequest = {
                id: inputs.groupId,
            };
            const deleteGroupResponse = await API.graphql({
                query: mutations.deleteGroup,
                variables: { input: inputRequest },
            });
            if (deleteGroupResponse?.data?.deleteGroup?.id) {
                return inputs;
            }
            printObject(
                'MT:275-->deleteGroupFromMeeting thunk graphql error\n',
                deleteGroupResponse
            );
            throw new Error('MT:278-->Failed to deleteGroupFromMeeting');
        } catch (error) {
            printObject(
                'MT:281-->deleteGroupFromMeeting thunk try failure.\n',
                error
            );
            throw new Error('MT:284-->Failed to deleteGroupFromMeeting');
        }
    }
);
export const updateMeeting = createAsyncThunk(
    'meetings/updateMeeting',
    async (inputs, thunkAPI) => {
        try {
            // printObject('MT:196-->updateMeeting__inputs:\n', inputs);
            //* * * * * * * * * * * * * * * * * * * *
            //* update the meeting in graphql
            //* * * * * * * * * * * * * * * * * * * *
            // strip non-meeting values
            let mtg = { ...inputs };
            delete mtg.organization;
            delete mtg.groups;

            const results = await API.graphql({
                query: mutations.updateMeeting,
                variables: { input: mtg },
            });
            if (results.data.updateMeeting.id) {
                printObject(
                    'MT:336-->results.data.updateMeeting:\n',
                    results.data.updateMeeting
                );
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
            // printObject('MT:196-->addGroup__inputs:\n', inputs);
            let inputInfo = {
                ...inputs.group,
                meetingGroupsId: inputs.meetingId,
                organizationGroupsId: inputs.orgId,
            };
            delete inputInfo.meetingId;
            if (inputInfo.id === '0') {
                inputInfo.id = newId;
            }

            // Use await with the GraphQL call to get the results
            const results = await API.graphql({
                query: mutations.createGroup,
                variables: { input: inputInfo },
            });

            // Check if the result contains the expected data and return it
            if (results.data.createGroup.id) {
                return inputInfo;
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
export const updateGroup = createAsyncThunk(
    'meetings/updateGroup',
    async (inputs, thunkAPI) => {
        try {
            printObject('MT:393-->updateGroup__inputs:\n', inputs);

            //* * * * * * * * * * * * * * * * * * * *
            //* update the meeting in graphql
            //* * * * * * * * * * * * * * * * * * * *
            let inputInfo = {
                ...inputs.group,
                id: inputs.group.groupId,
                meetingGroupsId: inputs.group.meetingId,
                organizationGroupsId: inputs.orgId,
            };
            //* remove unsupported values
            delete inputInfo.meetingId;
            delete inputInfo.groupId;
            const results = await API.graphql({
                query: mutations.updateGroup,
                variables: { input: inputInfo },
            });
            printObject('MT:402-->results:\n', results);
            if (results.data.updateGroup.id) {
                const resultDef = {
                    group: inputInfo,
                    meetingId: inputs.group.meetingId,
                };
                return resultDef;
            } else {
                throw new Error('MT:208-->Failed to update meeting');
            }
        } catch (error) {
            printObject('MT:409-->updateGroup FAILURE', inputs);
            // Rethrow the error to let createAsyncThunk handle it
            throw new Error('MT:411-->Failed to update group');
        }
    }
);
export const deleteMeeting = createAsyncThunk(
    'meetings/deleteMeeting',
    async (inputs, thunkAPI) => {
        try {
            //* -----------------------
            //* this will get an object
            //* with id (meeting) and an
            //* array with groupIds if
            //* there are groups
            //* -----------------------
            printObject('MT:426-->inputs:\n', inputs);
            if (inputs.groups?.length > 0) {
                console.log(`MT:428-->DELETING ${inputs.groups.length} groups`);
                for (const g of inputs.groups) {
                    try {
                        console.log(`id: ${g}`);
                        const inputRequest = {
                            id: g,
                        };
                        printObject('MT:459-->inputRequest:\n', inputRequest);
                        const deleteGroupResponse = await API.graphql({
                            query: mutations.deleteGroup,
                            variables: { input: inputRequest },
                        });
                        printObject(
                            'MT:464-->deleteGroupResposne:\n',
                            deleteGroupResponse
                        );
                        if (!deleteGroupResponse?.data?.deleteGroup?.id) {
                            console.log(
                                `MT:442-->Failed to delete group with id: ${g.id}`
                            );
                            // If a group deletion fails, you can choose to handle it here (e.g., show an error message) or throw an error to stop the process.
                            throw new Error(
                                'MT:445-->Failed to delete a group'
                            );
                        }
                    } catch (error) {
                        console.error(
                            'MT:446-->Error while deleting a group:',
                            error
                        );
                        // If a group deletion fails, you can choose to handle it here (e.g., show an error message) or throw an error to stop the process.
                        throw error;
                    }
                }
            } else {
                console.log(
                    'MT:454-->no groups to delete, while deleting meeting'
                );
            }

            console.log(`MT:457-->DELETING MEETING: ${inputs.id}`);
            const inputDeleteRequest = {
                id: inputs.id,
            };
            const deleteMeetingResponse = await API.graphql({
                query: mutations.deleteMeeting,
                variables: { input: inputDeleteRequest },
            });
            if (!deleteMeetingResponse?.data?.deleteMeeting?.id) {
                console.log(
                    `MT:468 --> Failed to delete meeting with id: ${inputs.id}`
                );
                // If meeting deletion fails, you can choose to handle it here (e.g., show an error message) or throw an error.
                throw new Error('MT:472-->Failed to delete the meeting');
            }

            // Return the inputs object after successful deletion.
            return inputs;
        } catch (error) {
            printObject('MT:477-->deleteMeeting thunk try failure.\n', error);
            throw new Error('MT:478-->Failed to deleteMeeting');
        }
    }
);
