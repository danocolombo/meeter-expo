import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    printObject,
    getToday,
    getPateDate,
    getDateMinusDays,
    isDateDashBeforeToday,
} from '../../utils/helpers';
import { saveUserProfile } from './userThunks';

const initialState = {
    profile: {},
    perms: [],
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserProfile: (state) => {
            return state.profile;
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
            });
    },
});

// Action creators are generated for each case reducer function
export const { logout, clearUser, getUserProfile } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export default userSlice.reducer;