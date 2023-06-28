import { createSlice } from '@reduxjs/toolkit';
import { loadTeam, addActiveMember } from './teamThunks';
const initialState = {
    activeMembers: [],
    inactiveMembers: [],
    newMembers: [],
    theTeam: [],
    isLoading: false,
};
const teamSlice = createSlice({
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
        builder
            .addCase(addActiveMember.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addActiveMember.fulfilled, (state) => {
                state.isLoading = false;
                const addition = [...state.activeMembers, state.payload];
                state.activeMembers = addition;
            })
            .addCase(addActiveMember.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(loadTeam.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadTeam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allMembers = action.payload;
            })
            .addCase(loadTeam.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

//console.log(cartSlice);
export const {
    loadActiveTeam,
    loadNewTeam,
    loadInactiveTeam,
    clearAllMembers,
    logout,
} = teamSlice.actions;

export default teamSlice.reducer;
