import { configureStore } from '@reduxjs/toolkit';
import meetingsReducer from '../features/meetings/meetingsSlice';
import usersReducer from '../features/usersSlice';
import teamReducer from '../features/team/teamSlice';
import userReducer from '../features/user/userSlice';
import profilesReducer from '../features/profilesSlice';
import systemReducer from '../features/system/systemSlice';
import groupsReducer from '../features/groups/groupsSlice';
export const store = configureStore({
    reducer: {
        meetings: meetingsReducer,
        users: usersReducer,
        profiles: profilesReducer,
        system: systemReducer,
        team: teamReducer,
        user: userReducer,
        groups: groupsReducer,
    },
});
