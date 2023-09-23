import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    printObject,
    getToday,
    getPateDate,
    getDateMinusDays,
    isDateDashBeforeToday,
} from '../../utils/helpers';
import {
    getSpecificMeeting,
    getAllMeetings,
    updateMeeting,
    addDefaultGroups,
    deleteGroupFromMeeting,
    addMeeting,
    addGroup,
    updateGroup,
    deleteMeeting,
    subscriptionCreateMeeting,
    subscriptionDeleteMeeting,
} from './meetingsThunks';
const initialState = {
    meetings: [],
    activeMeetings: [],
    historicMeetings: [],
    specificMeeting: {},
    groups: [],
    tmpMeeting: {},
    isLoading: false,
};

export const meetingsSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        createTmp: (state, action) => {
            state.tmpMeeting = {};
            state.tmpMeeting = action.payload[0];
            return state;
        },
        updateTmp: (state, action) => {
            let newTmp = Object.assign(state.tmpMeeting, action.payload);
            state.tmpMeeting = newTmp;
            return state;
        },

        loadMeetings: (state, action) => {
            state.meetings = action.payload;
            return state;
        },
        getMeetings: (state, action) => {
            return state.meetings;
        },
        loadGroups: (state, action) => {
            const wasGroups = action.payload;
            let newGroups = [];
            wasGroups.forEach((item) => {
                newGroups.push(item);
            });
            function asc_sort(b, a) {
                if (a.gender === b.gender) {
                    return a.title - b.title;
                }
                return a.gender > b.gender ? 1 : -1;
            }
            function newDoubleSort(prop1, prop2) {
                return function (a, b) {
                    if (a[prop1] === b[prop1]) {
                        return b[prop2] - a[prop2];
                    }
                    return a[prop1] > b[prop1] ? 1 : -1;
                };
            }
            let doubleResults = newGroups.sort(
                newDoubleSort('gender', 'title')
            );
            // let sortedGroups = theGroups.sort(asc_sort);
            state.groups = doubleResults;
            return state;
        },
        getGroup: (state, action) => {
            const grp = state.groups.filter(
                (g) => g.meetingId === action.payload
            );
            return grp;
        },

        deleteGroup: (state, action) => {
            const smaller = state.groups.filter(
                (m) => m.groupId !== action.payload.groupId
            );
            state.groups = smaller;
            return state;
        },

        clearGroups: (state) => {
            state.groups = [];
            return state;
        },
        clearMeetingsSlice: (state) => {
            state.meetings = [];
            state.activeMeetings = [];
            state.historicMeetings = [];
            state.specificMeeting = {};
            state.groups = [];
            state.tmpMeeting = {};
        },
        logout: (state) => {
            state.meetings = [];
            state.activeMeetings = [];
            state.historicMeetings = [];
            state.specificMeeting = [];
            state.groups = [];
            state.tmpMeeting = {};
            // return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMeeting.fulfilled, (state, action) => {
                const meetingIdToDelete = action.payload.id;

                const updatedMeetings = state.meetings.filter(
                    (mtg) => mtg.id !== meetingIdToDelete
                );
                const updatedActiveMeetings = state.activeMeetings.filter(
                    (mtg) => mtg.id !== meetingIdToDelete
                );
                updatedActiveMeetings.sort((a, b) => {
                    // Extract the date portion of mtgCompKey and convert it to a Date object
                    const dateA = new Date(a.mtgCompKey.split('#')[1]);
                    const dateB = new Date(b.mtgCompKey.split('#')[1]);

                    // Compare the dates
                    return dateA - dateB;
                });
                const updateHistoricMeetings = state.historicMeetings.filter(
                    (m) => m.id != meetingIdToDelete
                );

                return {
                    ...state,
                    meetings: updatedMeetings,
                    activeMeetings: updatedActiveMeetings,
                    historicMeetings: updateHistoricMeetings,
                    isLoading: false,
                };
            })
            .addCase(deleteMeeting.rejected, (state, action) => {
                printObject(
                    'MS:219-->REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(getSpecificMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSpecificMeeting.fulfilled, (state, action) => {
                const mtg = state.meetings.filter(
                    (m) => m.id === action.payload
                );
                state.specificMeeting = { ...mtg };
                state.isLoading = false;
                return state;
            })
            .addCase(getSpecificMeeting.rejected, (state, action) => {
                printObject(
                    'MS:219-->REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(getAllMeetings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllMeetings.fulfilled, (state, action) => {
                try {
                    if (action.payload.status === '200') {
                        const newMeetings = [...action.payload.meetings.all];
                        const newActives = [...action.payload.meetings.active];
                        const newHistorics = [
                            ...action.payload.meetings.historic,
                        ];
                        return {
                            ...state,
                            meetings: newMeetings,
                            activeMeetings: newActives,
                            historicMeetings: newHistorics,
                            isLoading: false,
                        };
                    } else {
                        return {
                            meetings: [],
                            activeMeetings: [],
                            historicMeetings: [],
                            isLoading: false,
                        };
                    }
                } catch (error) {
                    printObject('MS:230-->error getting all meetings\n', error);
                }
                state.isLoading = false;
                return state;
            })
            .addCase(getAllMeetings.rejected, (state, action) => {
                printObject(
                    'MS:219-->REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(addGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addGroup.fulfilled, (state, action) => {
                // printObject('MS:245-->action.payload:\n', action.payload);
                const grp = { ...action.payload };

                // Find the meeting in state.meetings that matches the provided meetingGroupsId
                const mtg = state.meetings.find(
                    (m) => m.id === action.payload.meetingGroupsId
                );
                if (mtg) {
                    // If the meeting is found, create a new array of groups and add the newGroup to it
                    const newGroups = [...mtg?.groups?.items, action.payload];
                    //* sort groups by gender, title, location
                    newGroups.sort((a, b) => {
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

                    const groupItems = { items: newGroups };
                    // Create a new meeting object with updated groups array
                    const updatedMtg = {
                        ...mtg,
                        groups: groupItems,
                    };
                    // Create a new array of meetings with the updated meeting object
                    const newMeetingList = state.meetings.map((m) =>
                        m.id === updatedMtg.id ? updatedMtg : m
                    );

                    // Update the state with the new meetings list
                    state.meetings = newMeetingList;
                }
                state.isLoading = false;
                return state;
            })
            .addCase(addGroup.rejected, (state, action) => {
                printObject(
                    '<MS:267></MS:267>-->REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(addMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addMeeting.fulfilled, (state, action) => {
                const newMeeting = action.payload;

                // Create a new array of meetings by spreading the existing state.meetings
                const updatedMeetings = [...state.meetings, newMeeting];

                // Define today for mtgCompKey...
                const clientCode = newMeeting.mtgCompKey.slice(0, 3);
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(
                    2,
                    '0'
                ); // Adding 1 to month since it's 0-based
                const day = String(currentDate.getDate()).padStart(2, '0');
                const key = `${clientCode}#${year}#${month}#${day}`;
                printObject('MS:296-->key:', key);
                // Filter meetings based on mtgCompKey condition
                const activeMeetings = updatedMeetings.filter(
                    (m) => m.mtgCompKey >= key
                );
                activeMeetings.sort((a, b) => {
                    return a.mtgCompKey.localeCompare(b.mtgCompKey);
                });
                printObject('MS:307-->actives: ', activeMeetings.length);

                const historicMeetings = updatedMeetings.filter(
                    (m) => m.mtgCompKey < key
                );
                historicMeetings.sort((a, b) => {
                    return a.mtgCompKey.localeCompare(b.mtgCompKey);
                });
                printObject('MS:313-->historic: ', historicMeetings.length);
                // Update state with the new arrays
                return {
                    ...state,
                    meetings: updatedMeetings,
                    activeMeetings: activeMeetings,
                    historicMeetings: historicMeetings,
                    isLoading: false,
                };
            })
            .addCase(addMeeting.rejected, (state, action) => {
                printObject(
                    'MS:287-->REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(updateGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateGroup.fulfilled, (state, action) => {
                // printObject(
                //     'MS:314-->updateGroup.FULFILLED:action.payload:\n',
                //     action.payload
                // );
                const existingMeetings = state.meetings;
                const updatedMeetings = existingMeetings.map((mtg) => {
                    if (mtg.id === action.payload.meetingId) {
                        const existingGroups = mtg.groups.items;
                        const newGroups = existingGroups.map((grp) => {
                            if (grp.id === action.payload.group.id) {
                                return action.payload.group;
                            } else {
                                return grp;
                            }
                        });
                        const groupItems = {
                            items: newGroups,
                        };
                        const updatedMeeting = {
                            ...mtg,
                            groups: groupItems,
                        };
                        // printObject(
                        //     'MS:335-->updatedMeeting:\n',
                        //     updatedMeeting
                        // );
                        return updatedMeeting;
                    } else {
                        return mtg;
                    }
                });
                state.meetings = updatedMeetings;
                // const tmpMeetings = [...state.meetings];
                // state.meetings = [...updatedMeetings];

                state.isLoading = false;
                return state;
            })
            .addCase(updateGroup.rejected, (state, action) => {
                printObject(
                    'MS:321-->updateGroup__REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(deleteGroupFromMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGroupFromMeeting.fulfilled, (state, action) => {
                // printObject(
                //     'MS:333-->deleteGroupFromMeeting.FULFILLED:action.payload:\n',
                //     action.payload
                // );
                //* * * * * * * * * * * * * * * * * * * * *
                //*  remove the group from the meeting
                //* * * * * * * * * * * * * * * * * * * * *
                const existingMeetings = state.meetings;
                // printObject('MS:341-->existingMeetings:\n', existingMeetings);
                const updatedMeetings = existingMeetings.map((mtg) => {
                    if (mtg.id === action.payload.meetingId) {
                        const existingGroups = mtg.groups.items;
                        const newGroups = existingGroups.filter(
                            (grp) => grp.id !== action.payload.groupId
                        );

                        const newGroupsItems = {
                            items: [...newGroups],
                        };
                        const newMtg = {
                            ...mtg,
                            groups: newGroupsItems,
                        };
                        return newMtg;
                    } else {
                        return mtg;
                    }
                });
                // printObject('MS:366-->updatedMeetings:\n', updatedMeetings);
                state.meetings = updatedMeetings;

                state.isLoading = false;
                return state;
            })
            .addCase(deleteGroupFromMeeting.rejected, (state, action) => {
                printObject(
                    'MS:336-->REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(addDefaultGroups.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addDefaultGroups.fulfilled, (state, action) => {
                // printObject(
                //     'MS:332-->addDefaultGroups.FULFILLED:action.payload:\n',
                //     action.payload
                // );
                //* * * * * * * * * * * * * * * * * * * * *
                //* this will receive the updated meeting
                //* * * * * * * * * * * * * * * * * * * * *
                const newMeetings = state.meetings.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return m;
                    }
                });
                state.meetings = newMeetings;

                state.isLoading = false;
                return state;
            })
            .addCase(addDefaultGroups.rejected, (state, action) => {
                printObject(
                    'MS:336-->REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(updateMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMeeting.fulfilled, (state, action) => {
                // printObject(
                //     'MS:326-->updateMeeting.FULFILLED:action.payload:\n',
                //     action.payload
                // );
                //* * * * * * * * * * * * * * * * * * * * *
                //* this should get a meeting that
                //* needs to be replaced in state.meetings
                //* * * * * * * * * * * * * * * * * * * * *
                if (action.payload) {
                    try {
                        const updatedMeeting = { ...action.payload };
                        const newMeetingList = state.meetings.map((m) => {
                            if (m.id === updatedMeeting.id) {
                                return updatedMeeting;
                            } else {
                                return m;
                            }
                        });

                        // how update if in active
                        const newActiveList = state.activeMeetings.map((m) => {
                            if (m.id === updatedMeeting.id) {
                                return updatedMeeting;
                            } else {
                                return m;
                            }
                        });
                        // how update if in historic
                        const newHistoricList = state.historicMeetings.map(
                            (m) => {
                                if (m.id === updatedMeeting.id) {
                                    return updatedMeeting;
                                } else {
                                    return m;
                                }
                            }
                        );
                        return {
                            ...state,
                            meetings: newMeetingList,
                            activeMeetings: newActiveList,
                            historicMeetings: newHistoricList,
                            isLoading: false,
                        };
                        state.meetings = [...newMeetingList];
                    } catch (error) {
                        printObject(
                            'MS:345-->error updating meeting:\n',
                            error
                        );
                    }
                }

                state.isLoading = false;
                return state;
            })
            .addCase(updateMeeting.rejected, (state, action) => {
                printObject(
                    'MS:336-->REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(subscriptionCreateMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(subscriptionCreateMeeting.fulfilled, (state, action) => {
                const meetingToInsert = action.payload.meeting;
                const activeOrgId = action.payload.activeOrgId;
                printObject(
                    'MS:537-->SUBSCRIPTION--meetingToInsert:\n',
                    meetingToInsert
                );
                if (!meetingToInsert.id) {
                    console.error('Meeting payload is missing an ID.');
                    return {
                        ...state,
                        isLoading: false,
                        error: 'Meeting payload is missing an ID.',
                    };
                }

                const existingIndex = state.meetings.findIndex(
                    (item) => item.id === meetingToInsert.id
                );

                if (existingIndex === -1) {
                    //check if the meeting.organizationMeetingsId is userProfile.activeOrd.id
                    if (
                        meetingToInsert.organizationMeetingsId === activeOrgId
                    ) {
                        console.log(
                            'MS:546-->meetingToInsert.organizationMeetingsId: ',
                            meetingToInsert.organizationMeetingsId
                        );
                        console.log('MS:547-->activeOrgId: ', activeOrgId);
                        return {
                            ...state,
                            meetings: [...state.meetings, meetingToInsert],
                            isLoading: false,
                            error: null, // Reset the error flag if no error occurred
                        };
                    } else {
                        return {
                            ...state,
                            isLoading: false,
                            message: 'not our meeting',
                        };
                    }
                } else {
                    console.log('MS:561-->skipping insert, SUB already exists');
                    return {
                        ...state,
                        isLoading: false,
                        error: null, // Reset the error flag if no error occurred
                    };
                }
            })
            .addCase(subscriptionCreateMeeting.rejected, (state, action) => {
                printObject(
                    'MS:545-->addSubscriptionMeeting.REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(subscriptionDeleteMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(subscriptionDeleteMeeting.fulfilled, (state, action) => {
                printObject('MS:537-->idToDelete:\n', action.payload.id);
                if (!action?.payload?.id) {
                    console.error(
                        'Delete Meeting Subscription payload is missing an ID.'
                    );
                    return {
                        ...state,
                        isLoading: false,
                        error: 'Delete Meeting Subscription payload is missing an ID.',
                    };
                }
                const updatedMeetings = state.meetings.filter(
                    (m) => m.id !== action.payload.id
                );
                const updatedActiveMeetings = state.activeMeetings.filter(
                    (m) => m.id !== action.payload.id
                );
                const updatedHistoricMeetings = state.historicMeetings.filter(
                    (m) => m.id !== action.payload.id
                );
                return {
                    ...state,
                    meetings: updatedMeetings,
                    activeMeetings: updatedActiveMeetings,
                    historicMeetings: updatedHistoricMeetings,
                    isLoading: false,
                    error: null, // Reset the error flag if no error occurred
                };
            })
            .addCase(subscriptionDeleteMeeting.rejected, (state, action) => {
                printObject(
                    'MS:597-->subscriptionDeleteMeeting.REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    loadHistoricMeetings,
    loadMeetings,
    getMeetings,
    createTmp,
    updateTmp,
    loadGroups,
    deleteGroup,
    clearGroups,
    addNewGroup,
    addActiveMeeting,
    getGroup,
    clearMeetingsSlice,
    logout,
} = meetingsSlice.actions;
export default meetingsSlice.reducer;
