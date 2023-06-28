import { createSlice } from '@reduxjs/toolkit';
import { loadTeam } from './teamThunks';

const initialState = {
    activeMembers: [],
    inactiveMembers: [],
    newMembers: [],
    allMembers: [],
    isLoading: false,
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        loadActiveTeam: (state, action) => {
            state.activeMembers = action.payload;
        },
        loadNewTeam: (state, action) => {
            state.newMembers = action.payload;
        },
        loadInactiveTeam: (state, action) => {
            state.inactiveMembers = action.payload;
        },
        clearAllMembers: (state) => {
            state.activeMembers = [];
            state.inactiveMembers = [];
            state.newMembers = [];
        },
        logout: (state) => {
            state.activeMembers = [];
            state.inactiveMembers = [];
            state.newMembers = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTeam.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadTeam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allMembers = action.payload.team;
                state.activeMembers = action.payload.activeMembers;
                state.inactiveMembers = action.payload.inactiveMembers;
                state.newMembers = action.payload.newMembers;
            })
            .addCase(loadTeam.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

export const {
    loadActiveTeam,
    loadNewTeam,
    loadInactiveTeam,
    clearAllMembers,
    logout,
} = teamSlice.actions;

export default teamSlice.reducer;
