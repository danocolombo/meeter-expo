import { createSlice } from '@reduxjs/toolkit';
import {
    getGroups,
    saveNewGroup,
    loadDefaultGroups,
    createDefaultGroup,
    updateDefaultGroup,
    deleteDefaultGroup,
} from './groupsThunks';
import { printObject } from '../../utils/helpers';

const initialState = {
    groups: [],
    defaultGroups: [],
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
                // printObject('GS:43-->action.payload:\n', action.payload);
                state.isLoading = false;
                state.groups = action.payload;
            })
            .addCase(getGroups.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(deleteDefaultGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteDefaultGroup.fulfilled, (state, action) => {
                // printObject('GS:43-->action.payload:\n', action.payload);
                try {
                    const updatedDefaultGroups = state.defaultGroups.filter(
                        (group) => {
                            if (group.id !== action.payload) {
                                return group;
                            }
                        }
                    );
                    state.defaultGroups = [...updatedDefaultGroups];
                } catch (error) {
                    printObject(
                        'GS:58-->error defining reduced array of default groups.\n',
                        error
                    );
                }
                state.isLoading = false;
            })
            .addCase(deleteDefaultGroup.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(updateDefaultGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateDefaultGroup.fulfilled, (state, action) => {
                printObject('GS:46-->action.payload:\n', action.payload);
                state.isLoading = false;
                // state.groups = action.payload;
            })
            .addCase(updateDefaultGroup.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(loadDefaultGroups.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadDefaultGroups.fulfilled, (state, action) => {
                state.defaultGroups = action.payload;
                state.isLoading = false;
            })
            .addCase(loadDefaultGroups.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(createDefaultGroup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createDefaultGroup.fulfilled, (state, action) => {
                // printObject('TS:43-->action.payload:\n', action.payload);
                const updatedDefaultGroups = state.defaultGroups.push(
                    action.payload
                );
                state.defaultGroups = updatedDefaultGroups;
                state.isLoading = false;
                // state.defaultGroups = action.payload;
            })
            .addCase(createDefaultGroup.rejected, (state, action) => {
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
