import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
import * as gQueries from '../../graphql/queries';
import * as mutations from '../../jerichoQL/mutations';
import * as gMutations from '../../graphql/mutations';
import { createAWSUniqueID, printObject } from '../../utils/helpers';
import groupsSlice from '../groups/groupsSlice';
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
            const oId = inputs.orgId;
            const code = inputs.code;
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
            const allTheMeetingsSorted = sortedMeetings;

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight
            const year = today.getFullYear(); // Get the year (e.g., 2023)
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (e.g., 09) and pad with 0 if needed
            const day = String(today.getDate()).padStart(2, '0'); // Get the day (e.g., 24) and pad with 0 if needed
            const target = `${code}#${year}#${month}#${day}`;
            const summary = {
                all: [],
                active: [],
                historic: [],
            };
            allTheMeetingsSorted.forEach((meeting) => {
                if (meeting.mtgCompKey >= target) {
                    summary.active.push(meeting);
                } else {
                    summary.historic.push(meeting);
                }
                summary.all.push(meeting);
            });
            summary.active.sort((a, b) =>
                a.mtgCompKey < b.mtgCompKey ? -1 : 1
            );

            // printObject('MT:109-->summary:\n', summary);
            const returnValue = {
                status: '200',
                meetings: summary,
            };
            return returnValue;
        } catch (error) {
            printObject('MT:29-->getAllMeetingsG', { status: 'fail' });
            throw new Error('MT:30-->Failed to getAllMeetingsG');
        }
    }
);
export const getActiveMeetings = createAsyncThunk(
    'meetings/getActiveMeetings',
    async (input, { getState, rejectWithValue }) => {
        try {
            var d = new Date();
            const today = d?.toISOString().slice(0, 10);
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
            const today = d?.toISOString().slice(0, 10);
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
export const getDefaultGroupsFromDB = createAsyncThunk(
    'meetings/getDefaultGroupsFromDB',
    async (input, { getState, rejectWithValue }) => {
        try {
            console.log('getDefaultGroupsFromDB hit');
            return {
                status: 200,
                payload: {
                    message: 'GOOD',
                },
            };
        } catch (error) {
            // Handle errors and optionally return a rejected promise with an error message
            return rejectWithValue('Failed to fetch default meetings');
        }
    }
);
export const addDefaultGroups = createAsyncThunk(
    'meetings/addDefaultGroups',
    async (inputs, thunkAPI) => {
        try {
            const newGroupList = inputs?.meeting?.groups?.items
                ? [...inputs.meeting.groups.items]
                : [];

            const createGroupPromises = inputs.defaultGroups.map(async (dg) => {
                const newId = createAWSUniqueID();
                const derivedGrpCompKey = `${inputs.meeting.mtgCompKey}#${inputs.meeting.id}`;
                const inputInfo = {
                    ...dg,
                    id: newId,
                    attendance: 0,
                    grpCompKey: derivedGrpCompKey,
                    meetingGroupsId: inputs.meeting.id,
                    organizationGroupsId: inputs.orgId,
                };
                delete inputInfo.createdAt;
                delete inputInfo.updatedAt;
                delete inputInfo.organizationDefaultGroupsId;
                const results = await API.graphql({
                    query: mutations.createGroup,
                    variables: { input: inputInfo },
                });

                return inputInfo;
            });

            const createdGroups = await Promise.all(createGroupPromises);

            const data = {
                items: [...newGroupList, ...createdGroups],
            };

            data.items.sort((a, b) => {
                // Sorting logic remains the same
            });

            const newGroupsItems = { items: data.items };

            const meetingUpdate = {
                ...inputs.meeting,
                groups: newGroupsItems,
            };

            return meetingUpdate;
        } catch (error) {
            printObject(
                'MT:242-->::addDefaultGroups thunk try failure.\n',
                error
            );
            throw new Error('MT:245-->addDefaultGroups Failed');
        }
    }
);
export const addMeeting = createAsyncThunk(
    'meetings/addMeeting',
    async (inputs, thunkAPI) => {
        try {
            // printObject('MT:251-->adding meeting inputs:\n', inputs);
            let mtg = {
                ...inputs.meeting,
                organizationMeetingsId: inputs.orgId,
            };
            // printObject('MT:256-->mtg:\n', mtg);
            // delete mtg.meetingId;
            // delete mtg.clientId;

            // Use await with the GraphQL call to get the results
            // printObject('MT:263-->graphql inputs:\n', inputs);
            const results = await API.graphql({
                query: mutations.createMeeting,
                variables: { input: mtg },
            });
            printObject('MT:268-->createMeeting results:\n', results);
            // Check if the result contains the expected data and return it
            if (results.data.createMeeting.id) {
                return mtg;
            } else {
                // If data.createGroup.id is missing, handle the error
                throw new Error('MT:271-->Failed to create meeting');
            }
        } catch (error) {
            printObject('MT:274-->addMeeting thunk try failure.\n', error);
            throw new Error('MT:275-->Failed to create meeting');
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
                // printObject(
                //     'MT:336-->results.data.updateMeeting:\n',
                //     results.data.updateMeeting
                // );
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
            // printObject('MT:351-->inputs:\n', inputs);
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
            // printObject('MT:393-->updateGroup__inputs:\n', inputs);

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
            if (inputs.groups?.length > 0) {
                console.log(`MT:428-->DELETING ${inputs.groups.length} groups`);
                for (const g of inputs.groups) {
                    try {
                        const inputRequest = {
                            id: g,
                        };
                        const deleteGroupResponse = await API.graphql({
                            query: mutations.deleteGroup,
                            variables: { input: inputRequest },
                        });

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
                    'MT:454-->no groups to delete, while deleting meeting, all good to go.'
                );
            }

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
export const subscriptionCreateMeeting = createAsyncThunk(
    'meetings/subscriptionCreateMeeting',
    async (input, thunkAPI) => {
        try {
            //*===========================================
            //* subscription input will be json object
            //* required field is "__typename": "Meeting"
            //*===========================================
            const meeting = input.meeting;
            const activeOrgId = input.activeOrgId;
            if (meeting?.__typename === 'Meeting') {
                const mtg = meeting;
                delete mtg.__typename;
                delete mtg.groups;
                delete mtg.updatedAt;
                delete mtg.createdAt;
                // printObject('MT:530-->newSubscription', mtg);
                return {
                    meeting: mtg,
                    activeOrgId: activeOrgId,
                };
            } else {
                throw new Error('MT:515-->Failed to create meeting');
            }
        } catch (error) {
            printObject(
                'MT:519-->subscriptionCreateMeeting thunk try failure.\n',
                error
            );
            throw new Error('MT:522-->Failed to createMeeting');
        }
    }
);
export const subscriptionDeleteMeeting = createAsyncThunk(
    'meetings/subscriptionDeleteMeeting',
    async (input, thunkAPI) => {
        try {
            //*===========================================
            //* subscription input will be json object
            //* required field is "__typename": "Meeting"
            //*===========================================
            printObject('MT:533-->input:\n', input);
            return { id: input.id };
            // const meeting = input.meeting;
            // const activeOrgId = input.activeOrgId;
            // if (meeting?.__typename === 'Meeting') {
            //     const mtg = meeting;
            //     delete mtg.__typename;
            //     delete mtg.groups;
            //     delete mtg.updatedAt;
            //     delete mtg.createdAt;
            //     // printObject('MT:530-->newSubscription', mtg);
            //     return {
            //         meeting: mtg,
            //         activeOrgId: activeOrgId,
            //     };
            // } else {
            //     throw new Error('MT:515-->Failed to delete meeting');
            // }
        } catch (error) {
            printObject(
                'MT:553-->subscriptionDeleteMeeting thunk try failure.\n',
                error
            );
            throw new Error('MT:556-->Failed to deleteMeeting');
        }
    }
);
export const subscriptionUpdateMeeting = createAsyncThunk(
    'meetings/subscriptionUpdateMeeting',
    async (input, thunkAPI) => {
        try {
            //*===========================================
            //* subscription input will be json object
            //* required field is "__typename": "Meeting"
            //*===========================================
            const theMeeting = input;
            delete theMeeting.organization.name;
            return theMeeting;
        } catch (error) {
            printObject(
                'MT:574-->subscriptionUpdateMeeting thunk try failure.\n',
                error
            );
            throw new Error('MT:577-->Failed to subscriptionUpdateMeeting');
        }
    }
);
export const subscriptionCreateGroup = createAsyncThunk(
    'meetings/subscriptionCreateGroup',
    async (input, thunkAPI) => {
        try {
            //*===========================================
            //* NOTE: only add group if id does not exist
            //* in meeting.groups.index array
            //*===========================================
            const theGroup = input;
            //* remove the meeting and organization items
            const theGroupWithoutMeetingAndOrganization = {
                ...theGroup,
                meeting: undefined,
                organization: undefined,
            };
            return theGroupWithoutMeetingAndOrganization;
        } catch (error) {
            printObject(
                'MT:594-->subscriptionCreateGroup thunk try failure.\n',
                error
            );
            throw new Error('MT:597-->Failed to subscriptionCreateGroup');
        }
    }
);
export const subscriptionUpdateGroup = createAsyncThunk(
    'meetings/subscriptionUpdateGroup',
    async (input, thunkAPI) => {
        try {
            //*===========================================
            //* NOTE: subscriptions do not update GQL
            //* only update the REDUX state
            //*===========================================
            const theGroup = input;
            //* clean up group object
            delete theGroup?.meeting;
            delete theGroup?.organization;
            delete theGroup?.createdAt;
            delete theGroup?.updatedAt;
            delete theGroup?.__typename;

            const updatedGroup = {
                ...theGroup,
            };

            return updatedGroup;
        } catch (error) {
            printObject(
                'MT:614-->subscriptionUpdateGroup thunk try failure.\n',
                error
            );
            throw new Error('MT:617-->Failed to subscriptionUpdateGroup');
        }
    }
);
export const subscriptionDeleteGroup1 = createAsyncThunk(
    'meetings/subscriptionDeleteGroup',
    async (input, thunkAPI) => {
        try {
            //*===========================================
            //* NOTE: subscriptions do not update GQL
            //* only update the REDUX state.
            //* GRAPHQL delete subscriptions only provide
            //* the id. So will need to check if the id
            //* is even used in this affiliation.
            //*===========================================
            const state = thunkAPI.getState();
            //get all the current meetings
            const meetings = state.meetings.meetings;
            let meetingIdFound = null;
            console.log('input.groupId:', input.groupId);
            const doesExist = meetings.some((meeting) => {
                if (meeting.groups.items) {
                    // Use Array.prototype.some() to check if an item with the specified id exists
                    return meeting.groups.items.some(
                        (item) => item.id === input.groupId
                    );
                }
                return false;
            });
            console.log('group exists: ', doesExist);
            if (doesExist) {
                console.log('true if');
                return { groupId: input.groupId };
            } else {
                console.log('false if');
                throw new Error('MT:661-->subscriptionDeleteGroup ignored');
            }
        } catch (error) {
            printObject(
                'MT:682-->subscriptionDeleteGroup thunk try failure.\n',
                error
            );
            throw new Error('MT:670-->Failed to subscriptionDeleteGroup');
        }
    }
);
export const subscriptionDeleteGroup = createAsyncThunk(
    'meetings/subscriptionDeleteGroup',
    async (input, thunkAPI) => {
        const state = thunkAPI.getState();
        const meetings = state.meetings.meetings;

        const doesExist = meetings.some((meeting) => {
            if (meeting.groups.items) {
                return meeting.groups.items.some(
                    (item) => item.id === input.groupId
                );
            }
            return false;
        });

        if (doesExist) {
            return { groupId: input.groupId };
        } else {
            throw new Error('MT:661-->subscriptionDeleteGroup ignored');
        }
    }
);
