import { createSlice } from '@reduxjs/toolkit';
import { printObject } from '../utils/helpers';

const initialState = {
    value: 0,
    currentUser: {},
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getCurrentUser: (state, action) => {
            return state.currentUser;
        },
        updateCurrentUser: (state, action) => {
            const newValues = action.payload;
            const updates = { ...state.currentUser, ...newValues };
            state.currentUser = updates;
            return state;
        },
        updateAffiliateActiveAndReference: (state, action) => {
            //todo - update active references
            const newActive = {
                active: {
                    label: action.payload.label,
                    role: action.payload.role,
                    region: action.payload.region,
                    value: action.payload.value,
                },
            };
            let newAff = { ...state.currentUser.affiliations, ...newActive };
            let newUpdate = { affiliations: newAff };
            // printObject('slice newAff', newAff);
            const updates = { ...state.currentUser, ...newUpdate };
            // printObject('slice updates', updates);
            state.currentUser = updates;
            return state;
        },
        saveCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            return state;
        },

        updateAffiliationActive: (state, action) => {
            //first get the selected
            const optionsList = state.currentUser.affiliations.options;
            const newAffiliateObject = optionsList.filter(
                (o) => o.value === action.payload
            );
            const newActiveValues = newAffiliateObject[0];
            const newActive = {
                label: newActiveValues.label,
                region: newActiveValues.region,
                role: newActiveValues.role,
                value: newActiveValues.value,
            };
            const affiliations = {
                options: optionsList,
                active: newActive,
            };

            const currentSettings = state.currentUser;
            const newSettings = { ...currentSettings, affiliations };
            state.currentUser = newSettings;
            return state;
        },
        logout: (state) => {
            state.currentUser = {};

            return state;
        },
        terminate: (state) => {
            // state.currentUser = {};
            state.currentUser.jwtToken = '';
            // state.registrations = [];
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getCurrentUser,
    updateCurrentUser,
    saveCurrentUser,
    updateAffiliationActive,
    updateAffiliateActiveAndReference,
    terminate,
    logout,
} = usersSlice.actions;

export default usersSlice.reducer;
