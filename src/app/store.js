import { configureStore } from '@reduxjs/toolkit';
import meetingsReducer from '../features/meetings/meetingsSlice';
import usersReducer from '../features/usersSlice';
import teamReducer from '../features/team/teamSlice';
import profilesReducer from '../features/profilesSlice';
import systemReducer from '../features/systemSlice';
import groupsReducer from '../features/groups/groupsSlice';
export const store = configureStore({
    reducer: {
        meetings: meetingsReducer,
        users: usersReducer,
        profiles: profilesReducer,
        system: systemReducer,
        team: teamReducer,
        groups: groupsReducer,
    },
});
