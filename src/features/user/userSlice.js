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
    saveUserProfile,
    loginUser,
    joinOrganization,
    changeDefaultOrg,
    updatePermissions,
    changeOrg,
    errorTest,
} from './userThunks';

const initialState = {
    profile: {},
    perms: [],
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addNewAffiliation: (state, action) => {
            const theProfile = state.profile;
            // printObject('US:32->theProfile:\n', theProfile);
            return state;
        },
        clearUser: (state) => {
            state.profile = {};
            state.perms = [];
            return state;
        },
        logout: (state) => {
            state.profile = {};
            state.perms = [];
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveUserProfile.fulfilled, (state, action) => {
                // Set a default state update for testing
                state.profile = action.payload.userProfile;
                state.perms = action.payload.perms;
                state.isLoading = false;

                // Log the payload data received
                // console.log('Payload Data:', action.payload);
            })
            .addCase(saveUserProfile.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // Set a default state update for testing

                if (action?.payload?.profile?.id) {
                    return {
                        ...state,
                        profile: action.payload.profile,
                        perms: action.payload.perms,
                        isLoading: false,
                    };
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(joinOrganization.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(joinOrganization.fulfilled, (state, action) => {
                state.profile = action.payload.userProfile;
                // printObject('US:82-->action.payload:\n', action.payload);
                state.isLoading = false;
                return state;
            })
            .addCase(joinOrganization.rejected, (state, action) => {
                console.log('US:86 joinOrganization.rejected');
                state.isLoading = false;
                state.error = action.error.message; // Access the error message
            })
            .addCase(errorTest.pending, (state) => {
                console.log('US:89 errorTest.pending');
                state.isLoading = true;
                return state;
            })
            .addCase(errorTest.fulfilled, (state, action) => {
                console.log('US:99-->fulfilled.');
                console.log(action);
                state.isLoading = false;
                return state;
            })
            .addCase(errorTest.rejected, (state, action) => {
                console.log('US:99 errorTest.rejected');
                state.isLoading = false;
                state.error = action.error.message; // Access the error message
            })
            .addCase(changeOrg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeOrg.fulfilled, (state, action) => {
                state.profile = action.payload.profile;
                state.perms = action.payload.perms;
                state.isLoading = false;
                return state;
            })
            .addCase(changeOrg.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updatePermissions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePermissions.fulfilled, (state, action) => {
                state.perms = action.payload;
                // printObject('US:126-->state:\n', state);
                state.isLoading = false;
                return state;
            })
            .addCase(updatePermissions.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(changeDefaultOrg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeDefaultOrg.fulfilled, (state, action) => {
                printObject('US:136-->action.payload:\n', action.payload);
                const profile = action.payload.userProfile;
                const perms = action.payload.perms;
                // return {
                //     ...state,
                //     isLoading: false,
                // };
                return {
                    ...state,
                    profile: profile,
                    perms: perms,
                    isLoading: false,
                };
            })
            .addCase(changeDefaultOrg.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const { addNewAffiliation, logout, clearUser } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export default userSlice.reducer;
