import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import * as queries from '../../jerichoQL/queries';
const url = 'https://course-api.com/react-useReducer-cart-project';
import { printObject } from '../../utils/helpers';
export const loadTeamOne = createAsyncThunk('team/loadTeam', () => {
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
            id: '008ab99b-1b87-4c8e-9bc0-6dac7d7d91ww',
            firstName: 'Wally',
            lastName: 'Wally',
            username: 'wally',
            email: 'wally@gmail.com',
            phone: '',
            organizationId: 'c9d00915-fc0c-4f0e-ac23-d75acd1b80ww',
            location: null,
            roles: [
                {
                    id: 'fc4c8322-ad15-4503-98f5-d2adeeb354ww',
                    role: 'guest',
                    status: 'active',
                },
                {
                    id: '3aad8d4d-c206-4f7c-0a26-8e47b52834ww',
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
});
export const loadTeam = createAsyncThunk(
    'team/loadTeam',
    async (id, thunkAPI) => {
        const teamData = [
            {
                id: '008ab99b-1b87-4c8e-9bc0-6dac7d7d91ww',
                firstName: 'Wally',
                lastName: 'Wally',
                username: 'wally',
                email: 'wally@gmail.com',
                phone: '',
                organizationId: 'c9d00915-fc0c-4f0e-ac23-d75acd1b80ww',
                location: null,
                roles: [
                    {
                        id: 'fc4c8322-ad15-4503-98f5-d2adeeb354ww',
                        role: 'guest',
                        status: 'active',
                    },
                    {
                        id: '3aad8d4d-c206-4f7c-0a26-8e47b52834ww',
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
        ];

        try {
            let all = [];
            let newMembers = [];
            let activeMembers = [];
            let inactiveMembers = [];
            /* * * * * * * * * * * * * * * * * * * * * *
             *  4. IDENTIFY INACTIVE MEMBERS
             * * * * * * * * * * * * * * * * * * * * * */
            const identifyInactiveRequests = async (members) => {
                // just return the members that have a role of
                // guest === active
                // printObject('TC:63-->members:\n', members);
                let iMembers = [];
                members.forEach((m) => {
                    let activeConfirmed = m.roles.find(
                        (r) => r.role === 'guest' && r.status === 'active'
                    );
                    if (!activeConfirmed) {
                        iMembers.push(m);
                    }
                });
                return iMembers;
            };
            /* * * * * * * * * * * * * * * * * * * * * *
             *  4. IDENTIFY NEW MEMBERS
             * * * * * * * * * * * * * * * * * * * * * */
            const identifyNewRequests = async (members) => {
                // just return the members that have a role of
                // guest === active
                // printObject('TC:49-->members:\n', members);
                let nMembers = [];
                members.forEach((m) => {
                    let newConfirmed = m.roles.find(
                        (r) => r.role === 'new' && r.status === 'active'
                    );
                    if (newConfirmed) {
                        nMembers.push(m);
                    }
                });
                return nMembers;
            };

            /* * * * * * * * * * * * * * * * * * * * * *
             *  3. IDENTIFY ACTIVE MEMBERS
             * * * * * * * * * * * * * * * * * * * * * */
            const identifyActiveMembers = async (members) => {
                // just return the members that have a role of
                // guest === active
                let aMembers = [];
                members.forEach((m) => {
                    let guestConfirmed = m.roles.find(
                        (r) => r.role === 'guest' && r.status === 'active'
                    );
                    if (guestConfirmed) {
                        aMembers.push(m);
                    }
                });
                return aMembers;
            };

            /* * * * * * * * * * * * * * * * * * * * * *
             *  2. SUMMARIZE TEAM INFO
             * * * * * * * * * * * * * * * * * * * * * */
            const summarizeTeamInfo = async (teamInfo) => {
                // printObject('TC:75-->teamInfo:\n', teamInfo);
                try {
                    let teamMembers = [];
                    let nonMembers = [];
                    teamInfo.forEach((item) => {
                        let guestApproved = item.roles.find(
                            (r) => r.role === 'guest' && r.status === 'active'
                        );
                        if (guestApproved) {
                            // console.log(item.username + ' guest');
                            teamMembers.push(item);
                        }
                    });
                    return teamMembers;
                } catch (error) {
                    throw new Error('Failed to summerize team info.');
                }
            };
            /* * * * * * * * * * * * * * * * * * * * * *
             *  1. CONVERT TEAM INFO
             * * * * * * * * * * * * * * * * * * * * * */
            const convertTeamInfo = async (teamInfo) => {
                printObject('TT:303-->teamInfo:\n', teamInfo);
                try {
                    for (const item of teamInfo) {
                        const user = item.user;
                        const existingItem = all.find(
                            (outputItem) => outputItem.id === user.id
                        );

                        if (existingItem) {
                            // printObject(
                            //     'TC:109-->existingItem:\n',
                            //     existingItem
                            // );
                            // printObject('TC:47-->item:\n', item);
                            existingItem.roles.push({
                                id: item.id,
                                role: item.role,
                                status: item.status,
                            });
                            // printObject(
                            //     'TC:119-->existingItem:\n',
                            //     existingItem
                            // );
                        } else {
                            all.push({
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                username: user.username,
                                email: user?.email || '',
                                phone: user?.phone || '',
                                organizationId: id,
                                location: user?.location || null,
                                roles: [
                                    {
                                        id: item.id,
                                        role: item.role,
                                        status: item.status,
                                    },
                                ],
                            });
                        }
                    }
                    const theTeam = {
                        all: all,
                    };
                    return theTeam;
                } catch (error) {
                    throw new Error('Failed to convert team info.');
                }
            };
            /* * * * * * * * * * * * * * * * * * * * * *
             *  START THE RETRIEVE PROCESS
             * * * * * * * * * * * * * * * * * * * * * */
            printObject('TT:357-->id:', id);
            await API.graphql({
                query: queries.listAffiliationsUsersByOrg,
                filter: { organizationAffiliationsId: { eq: id } },
            })
                .then((teamInfo) => {
                    printObject('TT:363-->teamInfo:\n', teamInfo);
                    const affiliations =
                        teamInfo?.data?.listAffiliations?.items;

                    let tInfo = [];
                    convertTeamInfo(teamInfo.data.listAffiliations.items)
                        .then((results) => {
                            printObject('TT:370-->results:\n', results);
                            tInfo = results.all;
                            printObject('TT:372-->tInfo:\n', tInfo);
                            summarizeTeamInfo(results.all).then((r) => {
                                printObject(
                                    'TT:375--> summarizeTeamInfo results:\n',
                                    r
                                );
                                identifyActiveMembers(r)
                                    .then((actives) => {
                                        printObject(
                                            'TT:381-->actives:\n',
                                            actives
                                        );
                                        console.log('TT:384 setActiveMembers');
                                        activeMembers = [...actives];
                                    })
                                    .catch((error) => {
                                        console.log(
                                            'TT:389--> error identifyNewRequests\nError:\n',
                                            error
                                        );
                                    });

                                identifyNewRequests(tInfo)
                                    .then((requests) => {
                                        printObject(
                                            'TT:397->requests:\n',
                                            requests
                                        );
                                        newMembers = [...requests];
                                    })
                                    .catch((error) => {
                                        console.log(
                                            'TT:404--> error identifyNewRequests\nError:\n',
                                            error
                                        );
                                    });

                                identifyInactiveRequests(tInfo)
                                    .then((requests) => {
                                        inactiveMembers = [...requests];
                                        console.log(
                                            'TT:413-->inactives:',
                                            requests.length
                                        );
                                    })
                                    .catch((error) => {
                                        console.log(
                                            'TT:419--> error identifyInactiveRequests\nError:\n',
                                            error
                                        );
                                    });
                            });

                            // return convertTeamInfo(affiliations);
                        })
                        .catch((err) => {
                            printObject(
                                'TT:429-->error getting teamInfo:\n',
                                err
                            );
                        });
                })
                .catch((error) => {
                    printObject('TT:435--> Error:\n', error);
                });
        } catch (error) {
            printObject('TT:438-->teamInfo TryCatch failure:\n', error);
            printObject('TT:439 -> id:', id);
        }
        return teamData;
    }
);

export const addActiveMember = createAsyncThunk('team/addActiveMember', () => {
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
});
