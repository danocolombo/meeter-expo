import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { printObject } from '../utils/helpers';

const initialState = {
    activeMembers: [],
    inactiveMembers: [],
    newMembers: [],
    isLoading: false,
};
export const addActiveMember = createAsyncThunk(
    'team/addActiveMember',
    async (_, thunkAPI) => {
        try {
            // we get the data here but will simulate for now
            const teamMember = {
                id: '23323-2323-888',
                firstName: 'John',
                lastName: 'Doe',
                role: 'example',
            };
            return teamMember;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                'TS:25-->>> something went wrong in createAsyncThunk'
            );
        }
    }
);
export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        loadActiveTeam: (state, action) => {
            state.activeMembers = action.payload;
            return state;
        },
        loadNewTeam: (state, action) => {
            state.newMembers = action.payload;
            return state;
        },
        loadInactiveTeam: (state, action) => {
            state.inactiveMembers = action.payload;
            return state;
        },
        clearAllMembers: (state) => {
            state.activeMembers = [];
            state.inactiveMembers = [];
            state.newMembers = [];
            return state;
        },
        logout: (state) => {
            state.activeMembers = [];
            state.inactiveMembers = [];
            state.newMembers = [];
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addActiveMember.pending, (state) => {
            state.isLoading = true;
        }),
            builder.addCase(addActiveMember.fulfilled, (state) => {
                state.isLoading = false;
                const addition = [...state.activeMembers, state.payload];
                state.activeMembers = addition;
            }),
            builder.addCase(addActiveMember.rejected, (state) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    loadActiveTeam,
    loadNewTeam,
    loadInactiveTeam,
    clearAllMembers,
    logout,
} = teamSlice.actions;

export default teamSlice.reducer;
