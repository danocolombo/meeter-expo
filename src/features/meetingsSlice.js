import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    printObject,
    getToday,
    getPateDate,
    getDateMinusDays,
    isDateDashBeforeToday,
} from '../utils/helpers';
//   this is url for all meetings
const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
};
const initialState = {
    meetings: [],
    activeMeetings: [],
    historicMeetings: [],
    groups: [],
    tmpMeeting: {},
    isLoading: false,
};
export const getAvailableMeetings = createAsyncThunk(
    'meetings/getAvailableMeetings',
    async ({ name, today }, thunkAPI) => {
        try {
            const getFilterDate = async () => {
                return today;
            };

            return getFilterDate()
                .then((d) => d)
                .catch((e) => console.error('oops'));

            // const resp = await axios(url);
            // return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('MS:36-->>> something went wrong');
        }
    }
);
export const meetingsSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        loadActiveMeetings: (state, action) => {
            state.activeMeetings = action.payload;
            return state;
        },
        loadHistoricMeetings: (state, action) => {
            // printObject('SLICE-action.payload:', action.payload);
            state.historicMeetings = action.payload;
            return state;
        },
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
        getMeeting: (state, action) => {
            //could be in historic or active
            console.log(action.payload);
            let returnValue = {};
            let found = state.historicMeetings.filter(
                (m) => m.meetingId === action.payload
            );
            console.log('size:', found.length);
            if (found.length !== 0) {
                printObject('meeting:', found);
                returnValue = found[0];
                printObject('returnValue', returnValue);
                return state;
            }
            // if (found.length === 1) {
            //     return found[0];
            // } else {
            //     let active = state.activeMeetings.filter(
            //         (m) => m.meetingId === action.payload
            //     );
            //     return active[0];
            // }
        },

        updateMeeting: (state, action) => {
            // this update could be in either the historic or the active.
            // probability is that it is in historic, do that first
            // let historic = false;
            const newValue = action.payload;
            //stort with historic
            let newMeetingList = [];
            newMeetingList = state.meetings.map((m) => {
                if (m.meetingId === newValue.meetingId) {
                    return newValue;
                } else {
                    return m;
                }
            });
            function asc_sort(a, b) {
                return a.meetingDate - b.meetingDate;
            }
            let newBigger = newMeetingList.sort(asc_sort);
            state.meetings = newBigger;

            return state;
        },
        addHistoricMeeting: (state, action) => {
            let meetings = state.historicMeetings;
            meetings.push(action.payload);
            function asc_sort(a, b) {
                return (
                    new Date(a.meetingDate).getTime() -
                    new Date(b.meetingDate).getTime()
                );
            }
            let newBigger = meetings.sort(asc_sort);
            state.historicMeetings = newBigger;
            return state;
        },
        addActiveMeeting: (state, action) => {
            let meetings = state.activeMeetings;
            meetings.push(action.payload);
            function asc_sort(a, b) {
                return (
                    new Date(a.meetingDate).getTime() -
                    new Date(b.meetingDate).getTime()
                );
            }
            let newBigger = meetings.sort(asc_sort);
            state.activeMeetings = newBigger;
            return state;
        },
        // addNewMeeting: (state, action) => {
        //     let meetings = state.meetings;
        //     meetings.push(action.payload);
        //     // ascending sort
        //     function asc_sort(a, b) {
        //         return (
        //             new Date(a.meetingDate).getTime() -
        //             new Date(b.meetingDate).getTime()
        //         );
        //     }
        //     let newBigger = meetings.sort(asc_sort);
        //     state.meetings = newBigger;
        //     // return
        //     return state;
        // },
        deleteAMeeting: (state, action) => {
            const smaller = state.meetings.filter(
                (m) => m.mid !== action.payload.mid
            );
            state.meetings = smaller;
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
            return;
        },
        getGroup: (state, action) => {
            const grp = state.groups.filter(
                (g) => g.meetingId === action.payload
            );
            return grp;
        },
        addNewGroup: (state, action) => {
            let grps = state.groups;
            grps.push(action.payload);
            function asc_sort(a, b) {
                return a.gender - b.gender;
            }
            let newBigger = grps.sort(asc_sort);
            state.groups = newBigger;
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
        updateGroup: (state, action) => {
            const newValue = action.payload;

            // printObject('newValue:', newValue);
            const newGroupList = state.groups.map((g) => {
                // console.log('typeof ral:', typeof ral);
                // console.log('typeof action.payload', typeof action.payload);
                //printObject('g', g);
                //console.log('g.groupId', g.groupId);
                //console.log('newValue.groupId', newValue.groupId);
                return g.groupId === newValue.groupId ? newValue : g;
            });
            printObject('newGroupList:', newGroupList);
            state.meetings = newGroupList;
            return state;
        },
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
    extraReducers: {
        [getAvailableMeetings.pending]: (state) => {
            state.isLoading = true;
        },
        [getAvailableMeetings.fulfilled]: (state, action) => {
            // console.log(action);
            state.isLoading = false;
            // printObject('RS:223--> action', action);
        },
        [getAvailableMeetings.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    loadActiveMeetings,
    loadHistoricMeetings,
    loadMeetings,
    getMeetings,
    getMeeting,
    // addNewMeeting,
    updateMeeting,
    deleteAMeeting,
    createTmp,
    updateTmp,
    loadGroups,
    deleteGroup,
    clearGroups,
    addNewGroup,
    updateGroup,
    addActiveMeeting,
    addHistoricMeeting,
    getGroup,
    logout,
} = meetingsSlice.actions;
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const deleteMeeting = (meetingId, groups) => (dispatch) => {
    // if there are groups, delete them first
    console.log('delete-1');
    const deleteThisMeeting = async (meetingId) => {
        console.log('delete-10-A', meetingId);
        let obj = {
            operation: 'deleteMeeting',
            payload: {
                Key: {
                    meetingId: meetingId,
                },
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
        let res = await axios.post(api2use, body, config);
        if (res.status === 200) {
            console.log('delete-11-A');
            return true;
        } else {
            console.log('delete-12-A');
            return false;
        }
    };
    const deleteThisGroup = async (groupId) => {
        console.log('delete-4-A', g);
        let obj = {
            operation: 'deleteGroup',
            payload: {
                Key: {
                    groupId: groupId,
                },
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.AWS_API_ENDPOINT + '/groups';
        let res = await axios.post(api2use, body, config);
        if (res.data.status === '200') {
            console.log('delete-5-A', g);
            return true;
        } else {
            console.log('delete-6-A', g);
            return false;
        }
    };
    //   gitterdone
    let groupDeleteSuccess = true;
    if (groups.length > 0) {
        groupDeleteSuccess = false;
        console.log('delete-2-A');
        groups.forEach((g) => {
            console.log('delete-3-A');
            let success = deleteThisGroup(g);
            if (!success) {
                groupDeleteSuccess = false;
                console.log('delete-7-A');
            }
        });

        if (groupDeleteSuccess !== false) {
            groupDeleteSuccess = true;
            dispatch(clearGroups());
        }
    }
    if (groupDeleteSuccess) {
        // delete redux groups
        console.log('delete-8-A');

        deleteThisMeeting(meetingId)
            .then((results) => {
                printObject('deleteThisMeeeting::results', results);
                dispatch(deleteAMeeting(meetingId));
                console.log('deleteAMeeting complete');
            })
            .catch((error) => {
                printObject('Error deleting meeting', error);
            });

        return;
    } else {
        console.log('delete-9-A');
        return false;
    }
};

export const TOBEgetMeetingGroups = (meetingId) => (dispatch) => {
    // this will get some remove data
    const getData = async (meetingId) => {
        dispatch(clearGroups());
        let obj = {
            operation: 'getGroupsByMeetingId',
            payload: {
                meetingId: meetingId,
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.AWS_API_ENDPOINT + '/groups';
        let res = await axios.post(api2use, body, config);

        if (res?.data?.status === '200') {
            const results = res.data.body;
            let theGroups = [];
            results.forEach((item) => {
                theGroups.push(item);
            });
            function newDoubleSort(prop1, prop2) {
                return function (a, b) {
                    if (a[prop1] === b[prop1]) {
                        return b[prop2] - a[prop2];
                    }
                    return a[prop1] > b[prop1] ? 1 : -1;
                };
            }
            let doubleResults = theGroups.sort(
                newDoubleSort('gender', 'title')
            );
            //printObject('groups:', doubleResults);
            // let sortedGroups = theGroups.sort(asc_sort);
            return doubleResults;
        } else {
            return [];
        }
    };
    getData(meetingId);
};
export const getMeetingGroups = (meetingId) => (dispatch) => {
    // this will get some remove data
    const getData = async (meetingId) => {
        dispatch(clearGroups());
        let obj = {
            operation: 'getGroupsByMeetingId',
            payload: {
                meetingId: meetingId,
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.AWS_API_ENDPOINT + '/groups';
        let res = await axios.post(api2use, body, config);

        if (res?.data?.status === '200') {
            const results = res.data.body;
            dispatch(loadGroups(results));
            return results;
        } else {
            dispatch(clearGroups());
        }

        return;
    };
    getData(meetingId);
};
export const updateMeetingValues = (values) => (dispatch) => {
    // always make sure that the mtgCompKey is equal to the meetingDate
    let mDate = values.meetingDate;
    let mtgCompKey =
        values.clientId.toLowerCase() +
        '#' +
        mDate.substring(0, 4) +
        '#' +
        mDate.substring(5, 7) +
        '#' +
        mDate.substring(8, 10);
    values.mtgCompKey = mtgCompKey;
    const updateData = async (values) => {
        let obj = {
            operation: 'putMeeting',
            payload: {
                Item: values,
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
        let res = await axios.post(api2use, body, config);
        const results = res.data.body;
        //dispatch(updateTmp(values));
        dispatch(updateMeeting(values));
        return results;
    };
    updateData(values);
};
export const getAMeeting = (meetingId) => (dispatch) => {
    const getIt = async (meetingId) => {
        let mtg = dispatch(getMeeting(meetingId));
        printObject('getAMeeting response:', mtg);
        return mtg;
    };
    getIt(meetingId);
};
export const getHistoricMeetings = () => (dispatch) => {
    var d = new Date();
    let yesterday = getDateMinusDays(d, 1);
    let twoMonthsAgo = getDateMinusDays(d, 120);

    const getData = async () => {
        let obj = {
            operation: 'getMeetingsBetweenDates',
            payload: {
                clientId: 'wbc',
                startDate: twoMonthsAgo,
                stopDate: yesterday,
                direction: 'DESC',
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
        let res = await axios.post(api2use, body, config);
        const results = res.data.body.Items;
        dispatch(loadHistoricMeetings(results));
        return;
    };
    getData();
};
export const updateGroupValues = (values) => (dispatch) => {
    const saveGroupToDDB = async () => {
        let obj = {
            operation: 'updateGroup',
            payload: {
                Item: values,
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.AWS_API_ENDPOINT + '/groups';
        let res = await axios.post(api2use, body, config);
        //const results = res.data.body.Items;
        dispatch(updateGroup(values));
        return;
    };
    saveGroupToDDB();
};
export const addGroupValues = (values) => (dispatch) => {
    //   this is NEW group
    const saveGroupToDDB = async () => {
        let obj = {
            operation: 'addGroup',
            payload: {
                Item: values,
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.AWS_API_ENDPOINT + '/groups';
        let res = await axios.post(api2use, body, config);
        // now take the response that has GroupId and save to redux
        printObject('MS:288-->res', res);
        const results = res.data.Item;
        dispatch(addNewGroup(results));
        return;
    };
    saveGroupToDDB();
};
export const deleteGroupEntry = (groupId) => (dispatch) => {
    const deleteGroupFromDDB = async () => {
        let obj = {
            operation: 'deleteGroup',
            payload: {
                Key: {
                    groupId: groupId,
                },
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.AWS_API_ENDPOINT + '/groups';
        let res = await axios.post(api2use, body, config);
        //const results = res.data.body.Items;
        dispatch(deleteGroup(groupId));
        return;
    };
    deleteGroupFromDDB();
};
export const addNewMeeting = (meeting) => (dispatch) => {
    // determine if the meeting is historic or active
    // meeting.meetingDate format is YYYY-MM-DD
    const historic = isDateDashBeforeToday(meeting.meetingDate);
    const addMeetingToDB = async () => {
        let obj = {
            operation: 'putMeeting',
            payload: {
                Item: meeting,
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
        let res = await axios.post(api2use, body, config);
        //const results = res.data.body.Items;
        if (historic) {
            dispatch(addHistoricMeeting(meeting));
        } else {
            dispatch(addActiveMeeting(meeting));
        }

        return;
    };
    addMeetingToDB();
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export default meetingsSlice.reducer;
