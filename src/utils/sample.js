const gqlData = {
    data: {
        getOrganization: {
            id: '692b90d7-76f5-4668-8626-5cf9394d162d',
            code: 'wbc',
            name: 'Wynnbrook Baptist Church',
            defaultUsers: {
                items: [
                    {
                        id: '5f284da3-3c44-4efe-a8b7-6d6849a1e0c7',
                        username: 'wbcmeals',
                        firstName: 'WBC',
                        lastName: 'Meals',
                        email: 'fortsonguru@gmail.com',
                        phone: null,
                        shirt: null,
                        birthday: null,
                        picture: null,
                        location: null,
                        affiliations: {
                            items: [
                                {
                                    id: '83359f0f-982e-434c-8d3f-f82f77f7f05b',
                                    role: 'meals',
                                    status: 'active',
                                    organization: {
                                        id: '692b90d7-76f5-4668-8626-5cf9394d162d',
                                        code: 'wbc',
                                    },
                                },
                            ],
                        },
                    },
                    {
                        id: '710d8778-65b5-4ffb-bafa-29454cc5fff5',
                        username: 'dcolombo',
                        firstName: 'Dano',
                        lastName: 'Colombo',
                        email: 'danocolombo@gmail.com',
                        phone: '7066042494',
                        shirt: 'XXL',
                        birthday: '1963-09-10',
                        picture: 'D26E5792-C3A1-4240-91E2-B3B015C30630.jpg',
                        location: {
                            street: '2304 Leah Dr.',
                            city: 'Columbus',
                            stateProv: 'GA',
                            postalCode: '31912',
                        },
                        affiliations: {
                            items: [
                                {
                                    id: '8bafef04-8c74-4d1e-9f1a-689f7f4cf01c',
                                    role: 'guest',
                                    status: 'active',
                                    organization: {
                                        id: 'c9d00915-fc0c-4f0e-ac23-d75acd1b80e2',
                                        code: 'mtr',
                                    },
                                },
                                {
                                    id: 'e5859b76-255d-416f-86e9-358a4b16010e',
                                    role: 'manage',
                                    status: 'active',
                                    organization: {
                                        id: '692b90d7-76f5-4668-8626-5cf9394d162d',
                                        code: 'wbc',
                                    },
                                },
                            ],
                        },
                    },
                    {
                        id: 'd7ff31a1-8de5-47b2-97bc-14e70fe8bb33',
                        username: 'wbcteam',
                        firstName: 'WBC',
                        lastName: 'Team',
                        email: 'fortsonguru@gmail.com',
                        phone: '7066042494',
                        shirt: 'XXL',
                        birthday: '1963-09-10',
                        picture: null,
                        location: {
                            street: '500 River Knoll Way',
                            city: 'Columbus',
                            stateProv: 'GA',
                            postalCode: '31904',
                        },
                        affiliations: {
                            items: [
                                {
                                    id: 'a6885ff1-2ae1-40b0-95c0-663e312e178f',
                                    role: 'groups',
                                    status: 'active',
                                    organization: {
                                        id: '692b90d7-76f5-4668-8626-5cf9394d162d',
                                        code: 'wbc',
                                    },
                                },
                            ],
                        },
                    },
                    {
                        id: '90h331a1-8de5-47b2-97bc-14e70fe8fh37',
                        username: 'multiguy',
                        firstName: 'Multi',
                        lastName: 'Guy',
                        email: 'fortsonguru@gmail.com',
                        phone: '7066042494',
                        shirt: 'XXL',
                        birthday: '1963-09-10',
                        picture: null,
                        location: {
                            street: '500 River Knoll Way',
                            city: 'Columbus',
                            stateProv: 'GA',
                            postalCode: '31904',
                        },
                        affiliations: {
                            items: [
                                {
                                    id: 'a6885ff1-2ae1-40b0-95c0-663e312e178f',
                                    role: 'groups',
                                    status: 'active',
                                    organization: {
                                        id: '692b90d7-76f5-4668-8626-5cf9394d162d',
                                        code: 'wbc',
                                    },
                                },
                                {
                                    id: '78se4ff1-2ae1-40b0-95c0-663e3120jk87',
                                    role: 'meals',
                                    status: 'active',
                                    organization: {
                                        id: '692b90d7-76f5-4668-8626-5cf9394d162d',
                                        code: 'wbc',
                                    },
                                },
                                {
                                    id: 'ky274ff1-2ae1-40b0-95c0-663e31267xq3',
                                    role: 'manager',
                                    status: 'suspended',
                                    organization: {
                                        id: '692b90d7-76f5-4668-8626-5cf9394d162d',
                                        code: 'wbc',
                                    },
                                },
                                {
                                    id: 'ky274ff1-2ae1-40b0-95c0-663e31267xq3',
                                    role: 'manager',
                                    status: 'suspended',
                                    organization: {
                                        id: 'kl6590d7-76f5-4668-8626-5cf9394hj43x',
                                        code: 'wbc',
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    },
};
teamId = '692b90d7-76f5-4668-8626-5cf9394d162d';
const theEntry = gqlData.data.getOrganization;
//console.log(theEntry.id)
const defaultUsers = theEntry.defaultUsers.items;
let users = [];
defaultUsers.forEach((du) => {
    let user = {};
    let cnt = 0;
    for (const key in du) {
        // LOCATION
        if (key === 'location') {
            //create location
            user.location = du[key];
        } else if (key === 'affiliations') {
            // AFFILIATIONS
            let affiliations = [];
            const tmp = du.affiliations.items;
            if (tmp.length > 0) {
                let activeRoles = [];
                let nonActiveRoles = [];
                tmp.forEach((t) => {
                    if (t.organization.id === teamId) {
                        if (t.status === 'active') {
                            activeRoles.push(t.role);
                        } else {
                            nonActiveRoles.push(t.role);
                        }
                    }
                });
                // console.log('roles:', roles);
                user = { ...user, activeRoles };
                user = { ...user, nonActiveRoles };
            }
        } else {
            let tmp = {};

            console.log('>> ', key, ':', du[key]);
            tmp[key] = du[key];
            user = { ...user, [key]: du[key] };
        }
        cnt++;
    }
    console.log('attribute count:', cnt);
    // console.log('user:', user)
    users.push(user);
});
users.forEach((u) => {
    console.log(u);
});
