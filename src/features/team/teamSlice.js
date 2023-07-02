import { createSlice } from '@reduxjs/toolkit';
import {
    loadTeam,
    deactivateMember,
    activateMember,
    updateActiveMember,
} from './teamThunks';
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
            .addCase(updateActiveMember.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateActiveMember.fulfilled, (state, action) => {
                //* * * * * * * * * * * * * * * * * * *
                //* This reducer does the following actions
                //*
                //* 1. update member in activeMembers
                //* 2. update member in allMembers
                //*
                //* * * * * * * * * * * * * * * * * * *
                const index = state.activeMembers.findIndex(
                    (member) => member.id === action.payload.id
                );
                // printObject(
                //     'TS:73-->replace this...\n',
                //     state.activeMembers[index]
                // );
                // printObject('TS:65-->update this:\n', action.payload);
                state.activeMembers[index] = action.payload;
                state.isLoading = false;
            })
            .addCase(updateActiveMember.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(activateMember.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(activateMember.fulfilled, (state, action) => {
                //* * * * * * * * * * * * * * * * * * *
                //* This reducer does the following actions
                //*
                //* 1. add member to activeMembers
                //* 2. remove member from inactiveMembers
                //* 3. update allMembers
                //*
                //* * * * * * * * * * * * * * * * * * *
                //      1. add member to activeMembers
                const newActives = [...state.activeMembers, action.payload];
                state.activeMembers = newActives;
                //      2 remove member from inactiveMembers
                const newInactives = state.inactiveMembers.filter(
                    (member) => member.id !== action.payload.id
                );
                state.inactiveMembers = newInactives;
                //      3. update allMembers
                const updatedMembers = state.allMembers.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload;
                    }
                    return m;
                });
                state.allMembers = updatedMembers;
                state.isLoading = false;
            })
            .addCase(activateMember.rejected, (state, action) => {
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
                //      1 remove member from activeMembers
                const newActives = state.activeMembers.filter(
                    (member) => member.id !== action.payload.id
                );
                state.activeMembers = newActives;

                //      2. add member to inactiveMembers
                const newInactives = [...state.inactiveMembers, action.payload];
                state.inactiveMembers = newInactives;

                //      3. update allMembers
                const updatedMembers = state.allMembers.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload;
                    }
                    return m;
                });
                state.allMembers = updatedMembers;
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
