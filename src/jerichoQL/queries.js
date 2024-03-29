/* eslint-disable */
//      JERICHO FILE
// this is an auto generated file. This will be overwritten

export const getAffiliation = /* GraphQL */ `
    query GetAffiliation($id: ID!) {
        getAffiliation(id: $id) {
            createdAt
            id
            organization {
                affiliations {
                    nextToken
                }
                code
                createdAt
                defaultUsers {
                    nextToken
                }
                heroMessage
                id
                location {
                    city
                    createdAt
                    id
                    postalCode
                    stateProv
                    street
                    updatedAt
                }
                locationOrganizationsId
                name
                updatedAt
            }
            organizationAffiliationsId
            role
            status
            updatedAt
            user {
                affiliations {
                    nextToken
                }
                birthday
                createdAt
                defaultOrg {
                    code
                    createdAt
                    heroMessage
                    id
                    locationOrganizationsId
                    name
                    updatedAt
                }
                email
                firstName
                id
                lastName
                location {
                    city
                    createdAt
                    id
                    postalCode
                    stateProv
                    street
                    updatedAt
                }
                locationUsersId
                organizationDefaultUsersId
                phone
                picture
                shirt
                sub
                updatedAt
                username
            }
            userAffiliationsId
        }
    }
`;
export const getLocation = /* GraphQL */ `
    query GetLocation($id: ID!) {
        getLocation(id: $id) {
            city
            createdAt
            id
            organizations {
                items {
                    code
                    createdAt
                    heroMessage
                    id
                    locationOrganizationsId
                    name
                    updatedAt
                }
                nextToken
            }
            postalCode
            stateProv
            street
            updatedAt
            users {
                items {
                    birthday
                    createdAt
                    email
                    firstName
                    id
                    lastName
                    locationUsersId
                    organizationDefaultUsersId
                    phone
                    picture
                    shirt
                    sub
                    updatedAt
                    username
                }
                nextToken
            }
        }
    }
`;
export const getOrganization = /* GraphQL */ `
    query GetOrganization($id: ID!) {
        getOrganization(id: $id) {
            affiliations {
                items {
                    createdAt
                    id
                    organizationAffiliationsId
                    role
                    status
                    updatedAt
                    userAffiliationsId
                }
                nextToken
            }
            code
            createdAt
            defaultUsers {
                items {
                    birthday
                    createdAt
                    email
                    firstName
                    id
                    lastName
                    locationUsersId
                    organizationDefaultUsersId
                    phone
                    picture
                    shirt
                    sub
                    updatedAt
                    username
                }
                nextToken
            }
            heroMessage
            id
            location {
                city
                createdAt
                id
                organizations {
                    nextToken
                }
                postalCode
                stateProv
                street
                updatedAt
                users {
                    nextToken
                }
            }
            locationOrganizationsId
            name
            updatedAt
        }
    }
`;
export const listMeetings = /* GraphQL */ `
    query ListMeetings(
        $filter: ModelMeetingFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listMeetings(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                meetingDate
                title
                meetingType
                mtgCompKey
                announcementsContact
                attendanceCount
                avContact
                cafeContact
                cafeCount
                childrenContact
                childrenCount
                cleanupContact
                closingContact
                donations
                facilitatorContact
                greeterContact1
                greeterContact2
                meal
                mealContact
                mealCount
                newcomersCount
                notes
                nurseryContact
                nurseryCount
                resourceContact
                securityContact
                setupContact
                supportContact
                transportationContact
                transportationCount
                youthContact
                youthCount
                worship
                organization {
                    id
                    code
                }
                groups {
                    items {
                        id
                        grpCompKey
                        meetingGroupsId
                        organizationGroupsId
                        title
                        location
                        gender
                        facilitator
                        cofacilitator
                        attendance
                        notes
                    }
                }
            }
        }
    }
`;
export const getAffiliationsForTeam = `
    query ListAffiliations($orgId: ID){
        listAffiliations(filter: {organizationAffiliationsId: {eq: $orgId}}) {
            items {
                id
                role
                status
                organizationAffiliationsId
                userAffiliationsId
                user {
                    id
                    firstName
                    lastName
                    email
                    phone
                    picture
                }
            }
        }
    }
`;
export const getOrgUserAffiliations = `
    query OrgUserAffiliationQuery($orgId: ID, $userId: ID){
        listAffiliations(
            filter:{organizationAffiliationsId: {eq: $orgId}, and: {userAffiliationsId: {eq: $userId}}}
        ){
            items {
                id
                role
                status
            }
        }
    }
`;
export const getOrganizationTeam = /* GraphQL */ `
    query GetOrganization($id: ID!) {
        getOrganization(id: $id) {
            id
            code
            name
            defaultUsers {
                items {
                    id
                    username
                    firstName
                    lastName
                    email
                    phone
                    shirt
                    birthday
                    picture
                    location {
                        street
                        city
                        stateProv
                        postalCode
                    }
                    affiliations {
                        items {
                            id
                            role
                            status
                            organization {
                                id
                                code
                            }
                        }
                    }
                }
            }
        }
    }
`;
export const getSystem = /* GraphQL */ `
    query GetSystem($id: ID!) {
        getSystem(id: $id) {
            android_version
            appName
            createdAt
            defaultProfilePicture
            id
            ios_version
            logoPicture
            updatedAt
            version
        }
    }
`;
export const getUser = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            affiliations {
                items {
                    createdAt
                    id
                    organizationAffiliationsId
                    role
                    status
                    updatedAt
                    userAffiliationsId
                }
                nextToken
            }
            birthday
            createdAt
            defaultOrg {
                affiliations {
                    nextToken
                }
                code
                createdAt
                defaultUsers {
                    nextToken
                }
                heroMessage
                id
                location {
                    city
                    createdAt
                    id
                    postalCode
                    stateProv
                    street
                    updatedAt
                }
                locationOrganizationsId
                name
                updatedAt
            }
            email
            firstName
            id
            lastName
            location {
                city
                createdAt
                id
                organizations {
                    nextToken
                }
                postalCode
                stateProv
                street
                updatedAt
                users {
                    nextToken
                }
            }
            locationUsersId
            organizationDefaultUsersId
            phone
            picture
            shirt
            sub
            updatedAt
            username
        }
    }
`;
export const listAffiliations = /* GraphQL */ `
    query ListAffiliations(
        $filter: ModelAffiliationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listAffiliations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                createdAt
                id
                organization {
                    code
                    createdAt
                    heroMessage
                    id
                    locationOrganizationsId
                    name
                    updatedAt
                }
                organizationAffiliationsId
                role
                status
                updatedAt
                user {
                    birthday
                    createdAt
                    email
                    firstName
                    id
                    lastName
                    locationUsersId
                    organizationDefaultUsersId
                    phone
                    picture
                    shirt
                    sub
                    updatedAt
                    username
                }
                userAffiliationsId
            }
            nextToken
        }
    }
`;
export const listLocations = /* GraphQL */ `
    query ListLocations(
        $filter: ModelLocationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                city
                createdAt
                id
                organizations {
                    nextToken
                }
                postalCode
                stateProv
                street
                updatedAt
                users {
                    nextToken
                }
            }
            nextToken
        }
    }
`;
export const listOrganizations = /* GraphQL */ `
    query ListOrganizations(
        $filter: ModelOrganizationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listOrganizations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                affiliations {
                    nextToken
                }
                code
                createdAt
                defaultUsers {
                    nextToken
                }
                heroMessage
                id
                location {
                    city
                    createdAt
                    id
                    postalCode
                    stateProv
                    street
                    updatedAt
                }
                locationOrganizationsId
                name
                updatedAt
            }
            nextToken
        }
    }
`;
export const listSystems = /* GraphQL */ `
    query ListSystems(
        $filter: ModelSystemFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listSystems(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                android_version
                appName
                createdAt
                defaultProfilePicture
                id
                ios_version
                logoPicture
                updatedAt
                version
            }
            nextToken
        }
    }
`;
export const listAllMeetings = `
    query listAllMeetings {
        listMeetings
        {
            items {
                id
                meetingDate
                title
                announcementsContact
                attendanceCount
                avContact
                cafeContact
                cafeCount
                childrenContact
                childrenCount
                cleanupContact
                closingContact
                donations
                facilitatorContact
                greeterContact1
                greeterContact2
                meal
                mealContact
                mealCount
                newcomersCount
                notes
                nurseryContact
                nurseryCount
                resourceContact
                securityContact
                setupContact
                supportContact
                transportationContact
                transportationCount
                youthContact
                youthCount
                worship
                organization {
                    id
                    code
                }
                groups {
                    items {
                        id
                        grpCompKey
                        meetingGroupsId
                        organizationGroupsId
                        title
                        location
                        gender
                        facilitator
                        cofacilitator
                        attendance
                        notes
                    }
                }
            }
        }
    }
`;
export const listAffiliationsForOrg = /* GraphQL */ `
    query ListAffiliations(
        $filter: ModelAffiliationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listAffiliations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                role
                status
                organizationAffiliationsId
                user {
                    id
                    sub
                    username
                    firstName
                    lastName
                    email
                    phone
                    shirt
                    birthday
                    picture
                    createdAt
                    updatedAt
                    organizationDefaultUsersId
                    locationUsersId
                    location {
                        street
                        city
                        stateProv
                        postalCode
                    }
                }
                organization {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                }
                createdAt
                updatedAt
                userAffiliationsId
            }
            nextToken
        }
    }
`;
export const listAffiliationsUsersByOrg = /* GraphQL */ `
    query ListAffUsers(
        $filter: ModelAffiliationFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listAffiliations(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                id
                role
                status
                organizationAffiliationsId
                user {
                    id
                    firstName
                    lastName
                    username
                    email
                    phone
                    picture
                    birthday
                    location {
                        street
                        city
                        stateProv
                        postalCode
                    }
                }
            }
            nextToken
        }
    }
`;
/* filter: {organizationAffiliationsId: {eq: "c9d00915-fc0c-4f0e-ac23-d75acd1b80e2"}} */

export const listUsers = /* GraphQL */ `
    query ListUsers(
        $filter: ModelUserFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                affiliations {
                    nextToken
                }
                birthday
                createdAt
                defaultOrg {
                    code
                    createdAt
                    heroMessage
                    id
                    locationOrganizationsId
                    name
                    updatedAt
                }
                email
                firstName
                id
                lastName
                location {
                    city
                    createdAt
                    id
                    postalCode
                    stateProv
                    street
                    updatedAt
                }
                locationUsersId
                organizationDefaultUsersId
                phone
                picture
                shirt
                sub
                updatedAt
                username
            }
            nextToken
        }
    }
`;
export const usersBySub = /* GraphQL */ `
    query UsersBySub(
        $filter: ModelUserFilterInput
        $limit: Int
        $nextToken: String
        $sortDirection: ModelSortDirection
        $sub: String!
    ) {
        usersBySub(
            filter: $filter
            limit: $limit
            nextToken: $nextToken
            sortDirection: $sortDirection
            sub: $sub
        ) {
            items {
                affiliations {
                    items {
                        id
                        role
                        status
                        organization {
                            id
                            name
                            code
                            heroMessage
                        }
                    }
                }
                birthday
                createdAt
                defaultOrg {
                    code
                    createdAt
                    heroMessage
                    id
                    locationOrganizationsId
                    name
                    updatedAt
                }
                email
                firstName
                id
                lastName
                location {
                    city
                    createdAt
                    id
                    postalCode
                    stateProv
                    street
                    updatedAt
                }
                locationUsersId
                organizationDefaultUsersId
                phone
                picture
                shirt
                sub
                updatedAt
                username
            }
            nextToken
        }
    }
`;
export const getOrganizationDefaultGroups = /* GraphQL */ `
    query GetOrganization($id: ID!) {
        getOrganization(id: $id) {
            id
            name
            code
            defaultGroups {
                items {
                    id
                    title
                    gender
                    location
                    facilitator
                    createdAt
                    updatedAt
                    organizationDefaultGroupsId
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const getActiveOrganization = /* GraphQL */ `
    query GetActiveOrganization($orgId: ID!) {
        getOrganization(id: $orgId) {
            id
            code
            name
            location {
                id
                street
                city
                stateProv
                postalCode
            }
            heroMessage
            defaultGroups {
                items {
                    id
                    title
                    gender
                    location
                    facilitator
                }
            }
        }
    }
`;
