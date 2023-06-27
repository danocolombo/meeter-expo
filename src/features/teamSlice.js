import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { printObject } from '../utils/helpers';

const initialState = {
    activeMembers: [],
    inactiveMembers: [],
    newMembers: [],
    theTeam: [],
    isLoading: false,
};
export const addActiveMember = createAsyncThunk(
    'team/addActiveMember',
    async (_, thunkAPI) => {
        try {
            // we get the data here but will simulate for now
            const teamMember = {
                id: '23323-2323-888',
                firstName: 'John',
                lastName: 'Doe',
                role: 'example',
            };
            return teamMember;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                'TS:25-->>> something went wrong in createAsyncThunk'
            );
        }
    }
);
export const loadTeam = createAsyncThunk(
    'team/loadTeam',
    async (_, thunkAPI) => {
        try {
            // Simulated array data to be loaded into allMembers
            const teamData = [
                {
                    id: '008ab99b-1b87-4c8e-9bc0-6dac7d7d91ef',
                    firstName: 'Meeter',
                    lastName: 'Meals',
                    username: 'mtrmeals',
                    email: 'fortsonguru@gmail.com',
                    phone: '',
                    organizationId: 'c9d00915-fc0c-4f0e-ac23-d75acd1b80e2',
                    location: null,
                    roles: [
                        {
                            id: 'fc4c8322-ad15-4503-98f5-d2adeeb354db',
                            role: 'guest',
                            status: 'active',
                        },
                        {
                            id: '3aad8d4d-c206-4f7c-0a26-8e47b5283440',
                            role: 'meals',
                            status: 'active',
                        },
                    ],
                },
                {
                    id: '2d0d613a-b80a-465b-a0c1-f090b345ad36',
                    firstName: 'David',
                    lastName: 'Hardy',
                    username: 'dhardy',
                    email: 'fortsonguru@gmail.com',
                    phone: '',
                    organizationId: 'c9d00915-fc0c-4f0e-ac23-d75acd1b80e2',
                    location: null,
                    roles: [
                        {
                            id: '92c7a026-c2ca-4fc4-a910-873a48fa3c16',
                            role: 'guest',
                            status: 'active',
                        },
                    ],
                },
                {
                    id: '710d8778-65b5-4ffb-bafa-29454cc5fff5',
                    firstName: 'Dano',
                    lastName: 'Colombo',
                    username: 'dcolombo',
                    email: 'danocolombo@gmail.com',
                    phone: '(706) 604-2494',
                    organizationId: 'c9d00915-fc0c-4f0e-ac23-d75acd1b80e2',
                    location: {
                        street: '2304 Leah Dr.',
                        city: 'Columbus',
                        stateProv: 'GA',
                        postalCode: '31912',
                    },
                    roles: [
                        {
                            id: '8bafef04-8c74-4d1e-9f1a-689f7f4cf01c',
                            role: 'groups',
                            status: 'active',
                        },
                        {
                            id: 'cd0a19b7-15bb-4b46-a945-3db245230e79',
                            role: 'guest',
                            status: 'active',
                        },
                        {
                            id: 'e5859b76-255d-416f-86e9-358a4b16010e',
                            role: 'manage',
                            status: 'active',
                        },
                        {
                            id: '9f7f2b5b-9e32-420f-aaa8-48ae536dda1b',
                            role: 'meals',
                            status: 'active',
                        },
                    ],
                },
                {
                    id: '998643bc-74c9-4b21-923f-c8289469eb86',
                    firstName: 'Meeter',
                    lastName: 'Lead',
                    username: 'mtrlead',
                    email: 'fortsonguru@gmail.com',
                    phone: '(706) 604-2494',
                    organizationId: 'c9d00915-fc0c-4f0e-ac23-d75acd1b80e2',
                    location: {
                        street: '2304 Leah Dr.',
                        city: 'Columbus',
                        stateProv: 'GA',
                        postalCode: '31912',
                    },
                    roles: [
                        {
                            id: '3f466f7a-6327-406e-83d3-39432b285ab6',
                            role: 'manage',
                            status: 'active',
                        },
                        {
                            id: 'c6421b1b-7bde-9da7-d0e9-ba8378751879',
                            role: 'meals',
                            status: 'active',
                        },
                        {
                            id: 'a51dad2a-01d1-4679-bc9c-e78e0f815ab7',
                            role: 'superuser',
                            status: 'active',
                        },
                        {
                            id: 'feedab96-4cb0-45bb-a7a7-aa0b0ac5c9b7',
                            role: 'guest',
                            status: 'active',
                        },
                    ],
                },
                {
                    id: '5f284da3-3c44-4efe-a8b7-6d6849a1e0c7',
                    firstName: 'WBC',
                    lastName: 'Meals',
                    username: 'wbcmeals',
                    email: 'fortsonguru@gmail.com',
                    phone: '',
                    organizationId: 'c9d00915-fc0c-4f0e-ac23-d75acd1b80e2',
                    location: {
                        street: '500 River Knoll Way',
                        city: 'Columbus',
                        stateProv: 'GA',
                        postalCode: '31904',
                    },
                    roles: [
                        {
                            id: 'b893a727-2968-45b7-92a1-e6b8b6c2aeaf',
                            role: 'guest',
                            status: 'active',
                        },
                        {
                            id: '4543844e-17ee-e0b6-8350-bbe8843b0dc5',
                            role: 'meals',
                            status: 'active',
                        },
                    ],
                },
            ];
            return teamData;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                'TS:25-->>> something went wrong in createAsyncThunk'
            );
        }
    }
);
export const teamSlice = createSlice({
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
            .addCase(addActiveMember.rejected, (state) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(loadTeam.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadTeam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.theTeam = action.payload;
            })
            .addCase(loadTeam.rejected, (state) => {
                console.log(action);
                state.isLoading = false;
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    loadActiveTeam,
    loadNewTeam,
    loadInactiveTeam,
    clearAllMembers,
    logout,
} = teamSlice.actions;

export default teamSlice.reducer;
