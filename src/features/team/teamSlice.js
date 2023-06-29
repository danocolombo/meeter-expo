import { createSlice } from '@reduxjs/toolkit';
import { loadTeam, deactivateMember } from './teamThunks';
import { printObject } from '../../utils/helpers';

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
                printObject('TS:43-->action.payload:\n', action.payload);
                state.isLoading = false;
                state.allMembers = action.payload.team;
                state.activeMembers = action.payload.actives;
                state.inactiveMembers = action.payload.inactives;
                state.newMembers = action.payload.newMembers;
            })
            .addCase(loadTeam.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(deactivateMember.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deactivateMember.fulfilled, (state, action) => {
                //* * * * * * * * * * * * * * * * * * *
                //* This reducer does the following actions
                //*
                //* 1. remove member from activeMembers
                //* 2. add member to inactiveMembers
                //* 3. update allMembers
                //*
                //* * * * * * * * * * * * * * * * * * *
                printObject('TS:66-->action.payload:\n', action.payload);
                printObject('TS:67-->memberId:', action?.payload?.memberId);
                state.isLoading = false;
            })
            .addCase(deactivateMember.rejected, (state, action) => {
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
