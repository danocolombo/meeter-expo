import { configureStore } from '@reduxjs/toolkit';
import meetingsReducer from '../features/meetingsSlice';
import usersReducer from '../features/usersSlice';
import profilesReducer from '../features/profilesSlice';
import systemReducer from '../features/systemSlice';
export const store = configureStore({
    reducer: {
        meetings: meetingsReducer,
        users: usersReducer,
        profiles: profilesReducer,
        system: systemReducer,
    },
});
