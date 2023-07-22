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
    getActiveMeetings,
    addMeeting,
} from './meetingsThunks';
import { deleteMeetingFromDDB } from '../../providers/meetings';
import { useUserContext } from '../../contexts/UserContext';
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

        updateMeeting: (state, action) => {
            // this update could be in either the historic or the active.
            // probability is that it is in historic, do that first
            // let historic = false;
            console.log('I-1');
            const newValue = action.payload;
            console.log('I-2');
            //stort with historic
            let newMeetingList = [];
            newMeetingList = state.meetings.map((m) => {
                console.log('I-3');
                if (m.meetingId === newValue.meetingId) {
                    return newValue;
                } else {
                    return m;
                }
            });
            console.log('I-4');
            function asc_sort(a, b) {
                return a.meetingDate - b.meetingDate;
            }
            console.log('I-5');
            let newBigger = newMeetingList.sort(asc_sort);
            console.log('I-6');
            state.meetings = newBigger;
            console.log('I-7');
            return state;
        },
        // addMeeting: (state, action) => {
        //     const newValue = action.payload;
        //     printObject('MS:118-->', newValue);
        //     let meetings = state.meetings;
        //     meetings.push(newValue);
        //     function asc_sort(a, b) {
        //         return (
        //             new Date(a.meetingDate).getTime() -
        //             new Date(b.meetingDate).getTime()
        //         );
        //     }
        //     let newBigger = meetings.sort(asc_sort);
        //     state.meetings = newBigger;
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
            state.groups = newGroupList;
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
    extraReducers: (builder) => {
        builder
            .addCase(getSpecificMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSpecificMeeting.fulfilled, (state, action) => {
                printObject(
                    'MS:199-->FULFILLED:action.payload:\n',
                    action.payload
                );
                const mtg = state.meetings.filter(
                    (m) => m.meetingId === action.payload
                );
                printObject('MS:203==>mtg:\n', mtg);
                state.specificMeeting = { ...mtg };
                state.isLoading = false;
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
                    printObject('MS:245-->error getting all meetings\n', error);
                }
                state.isLoading = false;
            })
            .addCase(getAllMeetings.rejected, (state, action) => {
                printObject(
                    'MS:219-->REJECTED:action.payload:\n',
                    action.payload
                );
                state.isLoading = false;
            })
            .addCase(addMeeting.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addMeeting.fulfilled, (state, action) => {
                printObject(
                    'MS:253-->addMeeting.FULFILLED:action.payload:\n',
                    action.payload
                );
                const updatedMeetings = [...state.meetings, action.payload];
                state.meetings = [...updatedMeetings];

                state.isLoading = false;
            })
            .addCase(addMeeting.rejected, (state, action) => {
                printObject(
                    'MS:269-->REJECTED:action.payload:\n',
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
    //getMeeting,
    // addNewMeeting,
    // addMeeting,
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
    //addHistoricMeeting,
    getGroup,
    logout,
} = meetingsSlice.actions;
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const deleteGroupList = (groups) => (dispatch) => {
    const deleteThisGroup = async (groupId) => {
        printObject('MS:317-->groupId:', groupId);
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

        try {
            let res = await axios.post(api2use, body, config);
            if (res.status === 200) {
                console.log('MS:332-->deleteGroup:', groupId, ' SUCCESS');
                return true;
            } else {
                console.log('MS:335-->deleteGroup:', groupId, ' FAILURE');
                return false;
            }
        } catch (error) {
            printObject('MS:339 --> ERROR DELETING:', error);
            return false;
        }
    };
    //   gitterdone
    let groupDeleteSuccess = true;
    if (groups.length > 0) {
        groupDeleteSuccess = true;
        console.log('MS:346-->deleting groups');
        groups.forEach((g) => {
            console.log('MS:348-->deleting: ', g.groupId);
            deleteThisGroup(g)
                .then((success) => {
                    printObject('MS:351-->success', success);
                    if (!success) {
                        groupDeleteSuccess = false;
                        console.log('MS:354-->failed to delete:', g.groupId);
                    } else {
                        console.log('MS:356--> success deleting ', g.groupId);
                        // groupDeleteSuccess = true;
                    }
                })
                .catch((error) => {
                    printObject('MS:361-->deleteThisGroup FAIL:', error);
                    console.warn('MS:362-->Error deleting group');
                    groupDeleteSuccess = false;
                });
        });

        if (groupDeleteSuccess !== false) {
            console.log('MS:368-->groupDeleteSuccess');
            groupDeleteSuccess = true;
            dispatch(clearGroups());
        } else {
            console.log('MS:372 --> groupDeleteSuccess false');
        }
    }
};
export const deleteMtg = (meetingId) => (dispatch) => {
    console.log('MS:379-->calling deleteMtg: ' + meetingId);
    deleteMeetingFromDDB(meetingId)
        .then((res) => {
            console.log('MS:382-->deleteMeetingFromDDB success');
            return true;
        })
        .catch((error) => {
            console.log('MS:385-->deleteMeetingFromDDB failure');
            return false;
        });
    // async function deleteThisMeeting(meetingId) {
    //     //const deleteThisMeeting = async (meetingId) => {
    //     console.log('MS:380-->deleteThisMeeting:', meetingId);
    //     deleteMeetingFromDDB(meetingId);
    //     try {
    //         let obj = {
    //             operation: 'deleteMeeting',
    //             payload: {
    //                 Key: {
    //                     meetingId: meetingId,
    //                 },
    //             },
    //         };
    //         let body = JSON.stringify(obj);
    //         let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
    //         let res;
    //         res = await axios.post(api2use, body, config);
    //         axios
    //             .post(api2use, body, config)
    //             .then((res) => {
    //                 if (res.status === 200) {
    //                     console.log(
    //                         'MS:400-->deleteMeeting DB call successful'
    //                     );
    //                     return true;
    //                 } else {
    //                     console.log('MS:404-->deleteMeeting DB call failed');
    //                     return false;
    //                 }
    //             })

    //             .catch((error) => {
    //                 printObject('MS:410->error deleting meeting:', error);
    //             });
    //     } catch (error) {
    //         printObject('MS:413-->CATCH FAILURE');
    //     }
    // }
    // deleteThisMeeting(meetingId)
    //     .then((results) => {
    //         printObject('MS:418--> deleteThisMeeting complete');
    //     })
    //     .catch((error) => {
    //         printObject('MS:421 -> Error deleting meeting', error);
    //     });
    // console.log('MS:423-->AFTER deleteThisMeeting');
    // return;
};

export const deleteMeeting = (meetingId, groups) => (dispatch) => {
    // if there are groups, delete them first
    console.log('MS:317 meetingId:' + meetingId + ' groups:' + groups);
    async function deleteThisMeeting(meetingId) {
        //const deleteThisMeeting = async (meetingId) => {
        console.log('MS:320-->deleteThisMeeting:', meetingId);

        try {
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
            let res;
            res = await axios.post(api2use, body, config);
            axios
                .post(api2use, body, config)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(
                            'MS:338-->deleteMeeting DB call successful'
                        );
                        return true;
                    } else {
                        console.log('MS:341-->deleteMeeting DB call failed');
                        return false;
                    }
                })

                .catch((error) => {
                    printObject('MS:347->error deleting meeting:', error);
                });
        } catch (error) {
            printObject('MS:350-->CATCH FAILURE');
        }
    }
    const deleteThisGroup = async (groupId) => {
        printObject('MS:346-->groupId:', groupId);
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

        try {
            let res = await axios.post(api2use, body, config);
            if (res.status === 200) {
                console.log('MS:361-->deleteGroup:', groupId, ' SUCCESS');
                return true;
            } else {
                console.log('MS:364-->deleteGroup:', groupId, ' FAILURE');
                return false;
            }
        } catch (error) {
            printObject('MS:368 --> ERROR DELETING:', error);
        }
    };
    //   gitterdone
    let groupDeleteSuccess = true;
    if (groups.length > 0) {
        groupDeleteSuccess = true;
        console.log('MS:375-->deleting groups');
        groups.forEach((g) => {
            console.log('MS:377-->deleting: ', g.groupId);
            deleteThisGroup(g)
                .then((success) => {
                    printObject('MS:382-->success', success);
                    if (!success) {
                        groupDeleteSuccess = false;
                        console.log('MS:383-->failed to delete:', g.groupId);
                    } else {
                        console.log('MS:385--> success deleting ', g.groupId);
                        // groupDeleteSuccess = true;
                    }
                })
                .catch((error) => {
                    printObject('MS:390-->deleteThisGroup FAIL:', error);
                    console.warn('MS:391-->Error deleting group');
                    groupDeleteSuccess = false;
                });
        });

        if (groupDeleteSuccess !== false) {
            console.log('MS:397-->groupDeleteSuccess');
            groupDeleteSuccess = true;
            dispatch(clearGroups());
        } else {
            console.log('MS:401 --> groupDeleteSuccess false');
        }
    }
    if (groupDeleteSuccess) {
        // delete redux groups
        console.log('MS:407-->calling deleteThisMeeting: ' + meetingId);

        deleteThisMeeting(meetingId)
            .then((results) => {
                printObject('MS:412--> deleteThisMeeting complete');
            })
            .catch((error) => {
                printObject('MS:414 -> Error deleting meeting', error);
            });
        console.log('MS:416-->AFTER deleteThisMeeting');
        return;
    } else {
        console.log('MS:419--> groupDeleteSuccess is false');
        return false;
    }
};

export const getMeetingGroups = (meetingId) => (dispatch) => {
    console.log('MS:506--> SLICE');
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
            let newSortResults = results.sort(GetASCSortOrder('gender'));
            dispatch(loadGroups(newSortResults));
            return results;
        } else {
            dispatch(clearGroups());
        }

        return;
    };
    getData(meetingId);
};
export const updateMeetingValues = (values) => (dispatch) => {
    const { userProfile } = useUserContext();
    // always make sure that the mtgCompKey is equal to the meetingDate
    console.log('A');
    let mDate = values.meetingDate;
    let mtgCompKey =
        userProfile?.activeOrg.code.toLowerCase() +
        '#' +
        mDate.substring(0, 4) +
        '#' +
        mDate.substring(5, 7) +
        '#' +
        mDate.substring(8, 10);
    values.mtgCompKey = mtgCompKey;
    console.log('B');
    const updateData = async (values) => {
        console.log('D');
        let obj = {
            operation: 'putMeeting',
            payload: {
                Item: values,
            },
        };
        console.log('E');
        let body = JSON.stringify(obj);
        console.log('F');
        let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
        console.log('G');

        await axios
            .post(api2use, body, config)
            .then((res) => {
                console.log('H');
                // printObject('MS:617-->res:', res);
                const results = res.data;
                console.log('I');
                //dispatch(updateTmp(values));
                dispatch(updateMeeting(results));
                console.log('J');
                return results;
            })
            .catch((error) => {
                printObject('MS:641', error);
            });
    };
    console.log('C');
    updateData(values);
};
// export const getAMeeting = (meetingId) => (dispatch) => {
//     const getIt = async (meetingId) => {
//         let mtg = dispatch(getMeeting(meetingId));
//         printObject('getAMeeting response:', mtg);
//         return mtg;
//     };
//     getIt(meetingId);
// };
// export const getHistoricMeetings = () => (dispatch) => {
//     var d = new Date();
//     let yesterday = getDateMinusDays(d, 1);
//     let twoMonthsAgo = getDateMinusDays(d, 120);

//     const getData = async () => {
//         let obj = {
//             operation: 'getMeetingsBetweenDates',
//             payload: {
//                 clientId: 'wbc',
//                 startDate: twoMonthsAgo,
//                 stopDate: yesterday,
//                 direction: 'DESC',
//             },
//         };
//         let body = JSON.stringify(obj);
//         let api2use = process.env.AWS_API_ENDPOINT + '/meetings';
//         let res = await axios.post(api2use, body, config);
//         const results = res.data.body.Items;
//         dispatch(loadHistoricMeetings(results));
//         return;
//     };
//     getData();
// };
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

        const results = res.data.Item;
        dispatch(addNewGroup(results));
        return;
    };
    saveGroupToDDB();
};
export const deleteIndividualGroup = (groupId) => (dispatch) => {
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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export default meetingsSlice.reducer;
