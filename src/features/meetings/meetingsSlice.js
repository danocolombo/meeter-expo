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
    subscriptionUpdateMeeting,
    subscriptionDeleteMeeting,
    subscriptionCreateGroup,
    subscriptionUpdateGroup,
    subscriptionDeleteGroup,
} from './meetingsThunks';
const initialState = {
    meetings: [],
    // activeMeetings: [],
    // historicMeetings: [],
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
        updateAMeeting: (state, action) => {
            //* * * * * * * * * * * * * * * * * * * * *
            //* this should get a meeting that
            //* needs to be replaced in state.meetings
            //* * * * * * * * * * * * * * * * * * * * *
            if (action.payload) {
                try {
                    // printObject('MS:97-->action.payload:\n', action.payload);
                    const updatedMeeting = { ...action.payload };
                    const newMeetingList = state.meetings.map((m) => {
                        if (m.id === updatedMeeting.id) {
                            console.log('meeting updated');
                            return updatedMeeting;
                        } else {
                            return m;
                        }
                    });
                    state.meetings = newMeetingList;
                    state.isLoading = false;
                    return state;
                } catch (error) {
                    printObject('MS:345-->error updating meeting:\n', error);
                }
            }

            state.isLoading = false;
            return state;
        },
        addANewMeeting: (state, action) => {
            // if the meeting does not exist, add it.
            if (!state.meetings.find((m) => m.id === action.payload.id)) {
                const newMeetings = [...state.meetings, action.payload];
                state.meetings = newMeetings;
            }
            return state;
        },
        deleteAMeeting: (state, action) => {
            const existingMeetings = state.meetings;
            const updatedMeetings = existingMeetings.filter((m) => {
                if (m.id !== action.payload.id) {
                    return m;
                }
            });
            state.meetings = updatedMeetings;
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
            // state.activeMeetings = [];
            // state.historicMeetings = [];
            state.specificMeeting = {};
            state.groups = [];
            state.tmpMeeting = {};
        },
        logout: (state) => {
            state.meetings = [];
            // state.activeMeetings = [];
            // state.historicMeetings = [];
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

                return {
                    ...state,
                    meetings: updatedMeetings,
                    // activeMeetings: updatedActiveMeetings,
                    // historicMeetings: updateHistoricMeetings,
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
                            // activeMeetings: newActives,
                            // historicMeetings: newHistorics,
                            isLoading: false,
                        };
                    } else {
                        return {
                            meetings: [],
                            // activeMeetings: [],
                            // historicMeetings: [],
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
            .addCase(updateMeeting.fulfilled, (state, action) => {})
            .addCase(updateMeeting.rejected, (state, action) => {
                printObject(
                    'MS:336-->REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(subscriptionUpdateMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                subscriptionUpdateMeeting.fulfilled,
                async (state, action) => {
                    try {
                        // printObject(
                        //     'MS:593-->state.activeMeetings:\n',
                        //     state.activeMeetings
                        // );
                        printObject('MS:594-->newMeeting:\n', action.payload);
                        const newMeeting = action.payload;

                        // Define the mapping operations as asynchronous functions
                        // const updatedMeetings = state.activeMeetings.map(
                        //     (meeting) => {
                        //         if (meeting.id === newMeeting.id) {
                        //             // If the IDs match, merge the existing meeting with newMeeting
                        //             return {
                        //                 ...meeting,
                        //                 ...newMeeting,
                        //             };
                        //         }
                        //         // If the IDs don't match, return the original meeting
                        //         return meeting;
                        //     }
                        // );

                        // Use Promise.all to await all mapping operations
                        // const updatedMeetings = await Promise.all(
                        //     state.meetings.map(updateMeeting)
                        // );
                        // const activeMeetings = await Promise.all(
                        //     state.activeMeetings.map(updateMeeting)
                        // );
                        // const historicMeetings = await Promise.all(
                        //     state.historicMeetings.map(updateMeeting)
                        // );

                        return {
                            ...state,
                            // activeMeetings: updatedMeetings,
                            isLoading: false,
                        };
                    } catch (error) {
                        // Handle any potential errors here, log them, or perform necessary actions.
                        console.error(
                            'Error in subscriptionUpdateMeeting.fulfilled:',
                            error
                        );
                        // You can choose to re-throw the error if needed, depending on your error handling strategy.
                        // throw error;
                    }
                }
            )

            .addCase(subscriptionUpdateMeeting.rejected, (state, action) => {
                printObject(
                    'MS:595-->subscriptionUpdateMeeting.REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(subscriptionDeleteMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(subscriptionDeleteMeeting.fulfilled, (state, action) => {
                printObject(
                    '<MS:604></MS:604>-->idToDelete:\n',
                    action.payload.id
                );
                const existingMeetings = state.meetings;
                const updatedMeetings = existingMeetings.map((m) => {
                    if (m.id !== action.payload.id) {
                        return m;
                    }
                });
                state.meetings = updatedMeetings;
                state.isLoading = false;
                return state;
            })
            .addCase(subscriptionDeleteMeeting.rejected, (state, action) => {
                printObject(
                    'MS:609-->subscriptionDeleteMeeting.REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(subscriptionCreateGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(subscriptionCreateGroup.fulfilled, (state, action) => {
                const grp = { ...action.payload };
                // Find the meeting in state.meetings that matches the provided meetingGroupsId
                const mtg = state.meetings.find(
                    (m) => m.id === action.payload.meetingGroupsId
                );
                if (mtg) {
                    //* if meeting found, only add if does not exist
                    if (!mtg.groups.items.find((g) => g.id === grp.id)) {
                        // printObject('MS:547-->mtg:\n', mtg);
                        // printObject('MS:548--newGroup:\n', action.payload);
                        const newGroups = [
                            ...mtg?.groups?.items,
                            action.payload,
                        ];
                        //* sort groups by gender, title, location
                        newGroups.sort((a, b) => {
                            // First, compare by gender
                            const genderCompare = a.gender.localeCompare(
                                b.gender
                            );

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
                }
                state.isLoading = false;
                return state;
            })

            .addCase(subscriptionCreateGroup.rejected, (state, action) => {
                printObject(
                    'MS:623-->subscriptionCreateGroup.REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(subscriptionUpdateGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(subscriptionUpdateGroup.fulfilled, (state, action) => {
                const newGroup = action.payload;
                //=====================================
                // find the meeting and update the group
                //=====================================
                const updatedMeetings = state.meetings.map((meeting) => {
                    if (meeting.id === newGroup.meetingGroupsId) {
                        printObject(
                            'MS:610-->subscriptionUpdateGroup action.payload\n',
                            action.payload
                        );
                        // Find and update the group within the meeting's 'groups' array
                        const updatedGroups = meeting.groups.items.map(
                            (group) => {
                                if (group.id === newGroup.id) {
                                    // Update the group information with newGroup values
                                    return {
                                        ...group,
                                        ...newGroup,
                                    };
                                }
                                return group; // Return unchanged groups
                            }
                        );

                        // Update the 'groups' property of the meeting
                        return {
                            ...meeting,
                            groups: {
                                items: updatedGroups,
                            },
                        };
                    }
                    return meeting; // Return unchanged meetings
                });

                return {
                    ...state,
                    meetings: updatedMeetings,
                    isLoading: false,
                };
            })
            .addCase(subscriptionUpdateGroup.rejected, (state, action) => {
                printObject(
                    'MS:642 ->subscriptionUpdateGroup.REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(subscriptionDeleteGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(subscriptionDeleteGroup.fulfilled, (state, action) => {
                //* * * * * * * * * * * * * * * * * * * * *
                //*  remove the group from the meeting
                //* * * * * * * * * * * * * * * * * * * * *
                const existingMeetings = state.meetings;
                const idToDelete = action.payload.groupId;
                //**  NEW CODE */
                const updatedMeetings = existingMeetings.map((meeting) => {
                    if (meeting.groups.items) {
                        // Use Array.prototype.filter() to remove the item with the specified id
                        meeting.groups.items = meeting.groups.items.filter(
                            (item) => item.id !== idToDelete
                        );
                    }
                    return meeting;
                });

                state.meetings = updatedMeetings;
                state.isLoading = false;
                return state;
            })
            .addCase(subscriptionDeleteGroup.rejected, (state, action) => {
                printObject(
                    'MS:651 ->subscriptionDeleteGroup.REJECTED:action.payload:\n',
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
    addANewMeeting,
    deleteAMeeting,
    getGroup,
    updateAMeeting,
    clearMeetingsSlice,
    logout,
} = meetingsSlice.actions;
export default meetingsSlice.reducer;
