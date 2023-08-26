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
        addNewGroup: (state, action) => {
            let grps = state.groups;
            printObject('MS:216-->grps(before)', grps);
            printObject('MS:217-->payload:', action.payload);
            grps.push(action.payload);
            function GetASCSortOrder(prop) {
                return function (a, b) {
                    if (a[prop] > b[prop]) {
                        return 1;
                    } else if (a[prop] < b[prop]) {
                        return -1;
                    }
                    return 0;
                };
            }
            let newSortResults = grps.sort(GetASCSortOrder('gender'));
            state.groups = newSortResults;
            // return
            return state;
        },
        deleteGroup: (state, action) => {
            const smaller = state.groups.filter(
                (m) => m.groupId !== action.payload.groupId
            );
            state.groups = smaller;
            return state;
        },
        // updateGroup: (state, action) => {
        //     const newValue = action.payload;

        //     // printObject('newValue:', newValue);
        //     const newGroupList = state.groups.map((g) => {
        //         // console.log('typeof ral:', typeof ral);
        //         // console.log('typeof action.payload', typeof action.payload);
        //         //printObject('g', g);
        //         //console.log('g.groupId', g.groupId);
        //         //console.log('newValue.groupId', newValue.groupId);
        //         return g.groupId === newValue.groupId ? newValue : g;
        //     });
        //     printObject('newGroupList:', newGroupList);
        //     state.groups = newGroupList;
        //     return state;
        // },
        clearGroups: (state) => {
            state.groups = [];
            return state;
        },

        logout: (state) => {
            state.meetings = [];
            state.activeMeetings = [];
            state.historicMeetings = [];
            state.groups = [];
            state.tmpMeeting = {};
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMeeting.fulfilled, (state, action) => {
                printObject(
                    'MS:199-->FULFILLED:action.payload:\n',
                    action.payload
                );
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
                printObject(
                    'MS:199-->FULFILLED:action.payload:\n',
                    action.payload
                );
                const mtg = state.meetings.filter(
                    (m) => m.id === action.payload
                );
                printObject('MS:203==>mtg:\n', mtg);
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
                        state.meetings = [...action.payload.meetings];
                        // action.payload.body.Items.map((m) => {
                        //     console.log('date:', m.meetingDate);
                        // });
                    } else {
                        state.meetings = [];
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
    //loadActiveMeetings,
    loadHistoricMeetings,
    loadMeetings,
    getMeetings,
    createTmp,
    updateTmp,
    loadGroups,
    deleteGroup,
    clearGroups,
    addNewGroup,
    // updateGroup,
    addActiveMeeting,
    //addHistoricMeeting,
    getGroup,
    logout,
} = meetingsSlice.actions;
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const deleteGroupList = (groups) => (dispatch) => {
//     const deleteThisGroup = async (groupId) => {
//         printObject('MS:317-->groupId:', groupId);
//         let obj = {
//             operation: 'deleteGroup',
//             payload: {
//                 Key: {
//                     groupId: groupId,
//                 },
//             },
//         };
//         let body = JSON.stringify(obj);
//         let api2use = process.env.AWS_API_ENDPOINT + '/groups';

//         try {
//             let res = await axios.post(api2use, body, config);
//             if (res.status === 200) {
//                 return true;
//             } else {
//                 console.log('MS:335-->deleteGroupList:', groupId, ' FAILURE');
//                 return false;
//             }
//         } catch (error) {
//             printObject('MS:339 --> ERROR deleteGroupList:', error);
//             return false;
//         }
//     };
//     //   gitterdone
//     let groupDeleteSuccess = true;
//     if (groups.length > 0) {
//         groupDeleteSuccess = true;
//         console.log('MS:346-->deleting groups');
//         groups.forEach((g) => {
//             console.log('MS:348-->deleting: ', g.groupId);
//             deleteThisGroup(g)
//                 .then((success) => {
//                     if (!success) {
//                         groupDeleteSuccess = false;
//                         console.log('MS:354-->failed to delete:', g.groupId);
//                     } else {
//                         console.log('MS:356--> success deleting ', g.groupId);
//                         // groupDeleteSuccess = true;
//                     }
//                 })
//                 .catch((error) => {
//                     printObject('MS:361-->deleteThisGroup FAIL:', error);
//                     console.warn('MS:362-->Error deleting group');
//                     groupDeleteSuccess = false;
//                 });
//         });

//         if (groupDeleteSuccess !== false) {
//             console.log('MS:368-->groupDeleteSuccess');
//             groupDeleteSuccess = true;
//             dispatch(clearGroups());
//         } else {
//             console.log('MS:372 --> groupDeleteSuccess false');
//         }
//     }
// };

// export const getMeetingGroups = (meetingId) => (dispatch) => {
//     console.log('MS:506--> SLICE');
//     // this will get some remove data
//     const getData = async (meetingId) => {
//         dispatch(clearGroups());
//         let obj = {
//             operation: 'getGroupsByMeetingId',
//             payload: {
//                 meetingId: meetingId,
//             },
//         };
//         let body = JSON.stringify(obj);
//         let api2use = process.env.AWS_API_ENDPOINT + '/groups';
//         let res = await axios.post(api2use, body, config);

//         if (res?.data?.status === '200') {
//             const results = res.data.body;

//             function GetASCSortOrder(prop) {
//                 return function (a, b) {
//                     if (a[prop] > b[prop]) {
//                         return 1;
//                     } else if (a[prop] < b[prop]) {
//                         return -1;
//                     }
//                     return 0;
//                 };
//             }
//             let newSortResults = results.sort(GetASCSortOrder('gender'));
//             dispatch(loadGroups(newSortResults));
//             return results;
//         } else {
//             dispatch(clearGroups());
//         }

//         // return;
//     };
//     getData(meetingId);
// };
// export const updateMeetingValues = (values) => (dispatch) => {
//     const userProfile = useSelector((state) => state.user.profile);
//     // always make sure that the mtgCompKey is equal to the meetingDate
//     console.log('A');
//     let mDate = values.meetingDate;
//     let mtgCompKey =
//         userProfile?.activeOrg.code.toLowerCase() +
//         '#' +
//         mDate.substring(0, 4) +
//         '#' +
//         mDate.substring(5, 7) +
//         '#' +
//         mDate.substring(8, 10);
//     values.mtgCompKey = mtgCompKey;
//     console.log('B');
//     const updateData = async (values) => {
//         console.log('D');
//         let obj = {
//             operation: 'putMeeting',
//             payload: {
//                 Item: values,
//             },
//         };
//         console.log('E');
//         let body = JSON.stringify(obj);
//         console.log('F');
//         let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
//         console.log('G');

//         await axios
//             .post(api2use, body, config)
//             .then((res) => {
//                 console.log('H');
//                 // printObject('MS:617-->res:', res);
//                 const results = res.data;
//                 console.log('I');
//                 //dispatch(updateTmp(values));
//                 dispatch(updateMeeting(results));
//                 console.log('J');
//                 return results;
//             })
//             .catch((error) => {
//                 printObject('MS:641', error);
//             });
//     };
//     console.log('C');
//     updateData(values);
// };
// // export const getAMeeting = (meetingId) => (dispatch) => {
// //     const getIt = async (meetingId) => {
// //         let mtg = dispatch(getMeeting(meetingId));
// //         printObject('getAMeeting response:', mtg);
// //         return mtg;
// //     };
// //     getIt(meetingId);
// // };
// // export const getHistoricMeetings = () => (dispatch) => {
// //     var d = new Date();
// //     let yesterday = getDateMinusDays(d, 1);
// //     let twoMonthsAgo = getDateMinusDays(d, 120);

// //     const getData = async () => {
// //         let obj = {
// //             operation: 'getMeetingsBetweenDates',
// //             payload: {
// //                 clientId: 'wbc',
// //                 startDate: twoMonthsAgo,
// //                 stopDate: yesterday,
// //                 direction: 'DESC',
// //             },
// //         };
// //         let body = JSON.stringify(obj);
// //         let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
// //         let res = await axios.post(api2use, body, config);
// //         const results = res.data.body.Items;
// //         dispatch(loadHistoricMeetings(results));
// //         return;
// //     };
// //     getData();
// // };
// // export const updateGroupValues = (values) => (dispatch) => {
// //     const saveGroupToDDB = async () => {
// //         let obj = {
// //             operation: 'updateGroup',
// //             payload: {
// //                 Item: values,
// //             },
// //         };
// //         let body = JSON.stringify(obj);
// //         let api2use = process.env.AWS_API_ENDPOINT + '/groups';
// //         let res = await axios.post(api2use, body, config);
// //         //const results = res.data.body.Items;
// //         dispatch(updateGroup(values));
// //         return;
// //     };
// //     saveGroupToDDB();
// // };
// export const addGroupValues = (values) => (dispatch) => {
//     //   this is NEW group
//     const saveGroupToDDB = async () => {
//         let obj = {
//             operation: 'addGroup',
//             payload: {
//                 Item: values,
//             },
//         };
//         let body = JSON.stringify(obj);
//         let api2use = process.env.AWS_API_ENDPOINT + '/groups';
//         let res = await axios.post(api2use, body, config);
//         // now take the response that has GroupId and save to redux

//         const results = res.data.Item;
//         dispatch(addNewGroup(results));
//         return;
//     };
//     saveGroupToDDB();
// };
// export const deleteIndividualGroup = (groupId) => (dispatch) => {
//     const deleteGroupFromDDB = async () => {
//         let obj = {
//             operation: 'deleteGroup',
//             payload: {
//                 Key: {
//                     groupId: groupId,
//                 },
//             },
//         };
//         let body = JSON.stringify(obj);
//         let api2use = process.env.AWS_API_ENDPOINT + '/groups';
//         let res = await axios.post(api2use, body, config);
//         //const results = res.data.body.Items;
//         dispatch(deleteGroup(groupId));
//         return;
//     };
//     deleteGroupFromDDB();
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export default meetingsSlice.reducer;
