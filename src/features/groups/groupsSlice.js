import { createSlice } from '@reduxjs/toolkit';
import { getGroups, saveNewGroup } from './groupsThunks';
import { printObject } from '../../utils/helpers';

const initialState = {
    groups: [],
    isLoading: false,
};

const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        clearGroups: (state, action) => {
            state.groups = [];
        },
        logout: (state) => {
            state.groups = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGroups.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGroups.fulfilled, (state, action) => {
                // printObject('TS:43-->action.payload:\n', action.payload);
                state.isLoading = false;
                state.groups = action.payload;
            })
            .addCase(getGroups.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(saveNewGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveNewGroup.fulfilled, (state, action) => {
                // printObject('TS:43-->action.payload:\n', action.payload);
                const updatedGroups = [...state.groups, action.payload];
                updatedGroups.sort((a, b) => {
                    if (a.gender !== b.gender) {
                        return a.gender.localeCompare(b.gender);
                    }

                    if (a.title !== b.title) {
                        return a.title.localeCompare(b.title);
                    }

                    return a.location.localeCompare(b.location);
                });
                state.isLoading = false;
                state.groups = updatedGroups;
            })
            .addCase(saveNewGroup.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

export const { clearGroups, logout } = groupsSlice.actions;

export default groupsSlice.reducer;
