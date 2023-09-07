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
    getActiveMeetings,
    addDefaultGroups,
    deleteGroupFromMeeting,
    addMeeting,
    addGroup,
    updateGroup,
    deleteMeeting,
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
        addSubscribeMeeting: (state, action) => {
            const newMeeting = action.payload;
            const updatedMeetings = [...state.meetings, ...newMeeting];
            printObject('MS:89-->updatedMeetings:\n', updatedMeetings);
            state.meetings = updatedMeetings;
            return state;
        },
        addSubscriptionMeeting: (state, action) => {
            state.meetings.push(action.payload);
            state.isLoading = false;
            return state;
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
                state.meetings = state.meetings.filter(
                    (mtg) => mtg.id !== meetingIdToDelete
                );
                state.isLoading = false;
                return state;
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
                // printObject(
                //     'MS:227-->getAllMeetings.FULFILLED:action.payload:\n',
                //     action.payload
                // );
                try {
                    if (action.payload.status === '200') {
                        state.meetings = [...action.payload.meetings.all];
                        state.activeMeetings = [
                            ...action.payload.meetings.active,
                        ];
                        state.historicMeetings = [
                            ...action.payload.meetings.historic,
                        ];
                    } else {
                        state.meetings = [];
                        state.activeMeetings = [];
                        state.historicMeetings = [];
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
                printObject(
                    'MS:277-->addMeeting.FULFILLED:action.payload:\n',
                    action.payload
                );
                state.meetings.push(action.payload);
                // const updatedMeetings = [...state.meetings, action.payload];
                // state.meetings = [...updatedMeetings];
                // printObject('MS:287-->state.meetings:\n', state.meetings);
                state.isLoading = false;
                return state;
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
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    addSubscribeMeeting,
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
