/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDefaultGroup = /* GraphQL */ `
    subscription OnCreateDefaultGroup(
        $filter: ModelSubscriptionDefaultGroupFilterInput
    ) {
        onCreateDefaultGroup(filter: $filter) {
            id
            title
            gender
            location
            facilitator
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            createdAt
            updatedAt
            organizationDefaultGroupsId
            __typename
        }
    }
`;
export const onUpdateDefaultGroup = /* GraphQL */ `
    subscription OnUpdateDefaultGroup(
        $filter: ModelSubscriptionDefaultGroupFilterInput
    ) {
        onUpdateDefaultGroup(filter: $filter) {
            id
            title
            gender
            location
            facilitator
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            createdAt
            updatedAt
            organizationDefaultGroupsId
            __typename
        }
    }
`;
export const onDeleteDefaultGroup = /* GraphQL */ `
    subscription OnDeleteDefaultGroup(
        $filter: ModelSubscriptionDefaultGroupFilterInput
    ) {
        onDeleteDefaultGroup(filter: $filter) {
            id
            title
            gender
            location
            facilitator
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            createdAt
            updatedAt
            organizationDefaultGroupsId
            __typename
        }
    }
`;
export const onCreateUser = /* GraphQL */ `
    subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
        onCreateUser(filter: $filter) {
            id
            sub
            username
            firstName
            lastName
            email
            phone
            shirt
            birthday
            defaultOrg {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            picture
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    userAffiliationsId
                    organizationAffiliationsId
                    __typename
                }
                nextToken
                __typename
            }
            location {
                id
                street
                city
                stateProv
                postalCode
                organizations {
                    nextToken
                    __typename
                }
                users {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                __typename
            }
            manages {
                items {
                    id
                    userId
                    organizationId
                    createdAt
                    updatedAt
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            organizationDefaultUsersId
            locationUsersId
            __typename
        }
    }
`;
export const onUpdateUser = /* GraphQL */ `
    subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
        onUpdateUser(filter: $filter) {
            id
            sub
            username
            firstName
            lastName
            email
            phone
            shirt
            birthday
            defaultOrg {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            picture
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    userAffiliationsId
                    organizationAffiliationsId
                    __typename
                }
                nextToken
                __typename
            }
            location {
                id
                street
                city
                stateProv
                postalCode
                organizations {
                    nextToken
                    __typename
                }
                users {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                __typename
            }
            manages {
                items {
                    id
                    userId
                    organizationId
                    createdAt
                    updatedAt
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            organizationDefaultUsersId
            locationUsersId
            __typename
        }
    }
`;
export const onDeleteUser = /* GraphQL */ `
    subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
        onDeleteUser(filter: $filter) {
            id
            sub
            username
            firstName
            lastName
            email
            phone
            shirt
            birthday
            defaultOrg {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            picture
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    userAffiliationsId
                    organizationAffiliationsId
                    __typename
                }
                nextToken
                __typename
            }
            location {
                id
                street
                city
                stateProv
                postalCode
                organizations {
                    nextToken
                    __typename
                }
                users {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                __typename
            }
            manages {
                items {
                    id
                    userId
                    organizationId
                    createdAt
                    updatedAt
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            organizationDefaultUsersId
            locationUsersId
            __typename
        }
    }
`;
export const onCreateAffiliation = /* GraphQL */ `
    subscription OnCreateAffiliation(
        $filter: ModelSubscriptionAffiliationFilterInput
    ) {
        onCreateAffiliation(filter: $filter) {
            id
            role
            status
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
                defaultOrg {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                    __typename
                }
                picture
                affiliations {
                    nextToken
                    __typename
                }
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                manages {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                organizationDefaultUsersId
                locationUsersId
                __typename
            }
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            createdAt
            updatedAt
            userAffiliationsId
            organizationAffiliationsId
            __typename
        }
    }
`;
export const onUpdateAffiliation = /* GraphQL */ `
    subscription OnUpdateAffiliation(
        $filter: ModelSubscriptionAffiliationFilterInput
    ) {
        onUpdateAffiliation(filter: $filter) {
            id
            role
            status
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
                defaultOrg {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                    __typename
                }
                picture
                affiliations {
                    nextToken
                    __typename
                }
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                manages {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                organizationDefaultUsersId
                locationUsersId
                __typename
            }
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            createdAt
            updatedAt
            userAffiliationsId
            organizationAffiliationsId
            __typename
        }
    }
`;
export const onDeleteAffiliation = /* GraphQL */ `
    subscription OnDeleteAffiliation(
        $filter: ModelSubscriptionAffiliationFilterInput
    ) {
        onDeleteAffiliation(filter: $filter) {
            id
            role
            status
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
                defaultOrg {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                    __typename
                }
                picture
                affiliations {
                    nextToken
                    __typename
                }
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                manages {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                organizationDefaultUsersId
                locationUsersId
                __typename
            }
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            createdAt
            updatedAt
            userAffiliationsId
            organizationAffiliationsId
            __typename
        }
    }
`;
export const onCreateOrganization = /* GraphQL */ `
    subscription OnCreateOrganization(
        $filter: ModelSubscriptionOrganizationFilterInput
    ) {
        onCreateOrganization(filter: $filter) {
            id
            name
            code
            location {
                id
                street
                city
                stateProv
                postalCode
                organizations {
                    nextToken
                    __typename
                }
                users {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                __typename
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    userAffiliationsId
                    organizationAffiliationsId
                    __typename
                }
                nextToken
                __typename
            }
            defaultUsers {
                items {
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
                    __typename
                }
                nextToken
                __typename
            }
            heroMessage
            meetings {
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
                    worship
                    youthContact
                    youthCount
                    createdAt
                    updatedAt
                    organizationMeetingsId
                    __typename
                }
                nextToken
                __typename
            }
            groups {
                items {
                    id
                    grpCompKey
                    title
                    location
                    gender
                    attendance
                    facilitator
                    cofacilitator
                    notes
                    createdAt
                    updatedAt
                    organizationGroupsId
                    meetingGroupsId
                    __typename
                }
                nextToken
                __typename
            }
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
                    __typename
                }
                nextToken
                __typename
            }
            managers {
                items {
                    id
                    userId
                    organizationId
                    createdAt
                    updatedAt
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            locationOrganizationsId
            __typename
        }
    }
`;
export const onUpdateOrganization = /* GraphQL */ `
    subscription OnUpdateOrganization(
        $filter: ModelSubscriptionOrganizationFilterInput
    ) {
        onUpdateOrganization(filter: $filter) {
            id
            name
            code
            location {
                id
                street
                city
                stateProv
                postalCode
                organizations {
                    nextToken
                    __typename
                }
                users {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                __typename
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    userAffiliationsId
                    organizationAffiliationsId
                    __typename
                }
                nextToken
                __typename
            }
            defaultUsers {
                items {
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
                    __typename
                }
                nextToken
                __typename
            }
            heroMessage
            meetings {
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
                    worship
                    youthContact
                    youthCount
                    createdAt
                    updatedAt
                    organizationMeetingsId
                    __typename
                }
                nextToken
                __typename
            }
            groups {
                items {
                    id
                    grpCompKey
                    title
                    location
                    gender
                    attendance
                    facilitator
                    cofacilitator
                    notes
                    createdAt
                    updatedAt
                    organizationGroupsId
                    meetingGroupsId
                    __typename
                }
                nextToken
                __typename
            }
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
                    __typename
                }
                nextToken
                __typename
            }
            managers {
                items {
                    id
                    userId
                    organizationId
                    createdAt
                    updatedAt
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            locationOrganizationsId
            __typename
        }
    }
`;
export const onDeleteOrganization = /* GraphQL */ `
    subscription OnDeleteOrganization(
        $filter: ModelSubscriptionOrganizationFilterInput
    ) {
        onDeleteOrganization(filter: $filter) {
            id
            name
            code
            location {
                id
                street
                city
                stateProv
                postalCode
                organizations {
                    nextToken
                    __typename
                }
                users {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                __typename
            }
            affiliations {
                items {
                    id
                    role
                    status
                    createdAt
                    updatedAt
                    userAffiliationsId
                    organizationAffiliationsId
                    __typename
                }
                nextToken
                __typename
            }
            defaultUsers {
                items {
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
                    __typename
                }
                nextToken
                __typename
            }
            heroMessage
            meetings {
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
                    worship
                    youthContact
                    youthCount
                    createdAt
                    updatedAt
                    organizationMeetingsId
                    __typename
                }
                nextToken
                __typename
            }
            groups {
                items {
                    id
                    grpCompKey
                    title
                    location
                    gender
                    attendance
                    facilitator
                    cofacilitator
                    notes
                    createdAt
                    updatedAt
                    organizationGroupsId
                    meetingGroupsId
                    __typename
                }
                nextToken
                __typename
            }
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
                    __typename
                }
                nextToken
                __typename
            }
            managers {
                items {
                    id
                    userId
                    organizationId
                    createdAt
                    updatedAt
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            locationOrganizationsId
            __typename
        }
    }
`;
export const onCreateLocation = /* GraphQL */ `
    subscription OnCreateLocation(
        $filter: ModelSubscriptionLocationFilterInput
    ) {
        onCreateLocation(filter: $filter) {
            id
            street
            city
            stateProv
            postalCode
            organizations {
                items {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                    __typename
                }
                nextToken
                __typename
            }
            users {
                items {
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
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            __typename
        }
    }
`;
export const onUpdateLocation = /* GraphQL */ `
    subscription OnUpdateLocation(
        $filter: ModelSubscriptionLocationFilterInput
    ) {
        onUpdateLocation(filter: $filter) {
            id
            street
            city
            stateProv
            postalCode
            organizations {
                items {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                    __typename
                }
                nextToken
                __typename
            }
            users {
                items {
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
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            __typename
        }
    }
`;
export const onDeleteLocation = /* GraphQL */ `
    subscription OnDeleteLocation(
        $filter: ModelSubscriptionLocationFilterInput
    ) {
        onDeleteLocation(filter: $filter) {
            id
            street
            city
            stateProv
            postalCode
            organizations {
                items {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                    __typename
                }
                nextToken
                __typename
            }
            users {
                items {
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
                    __typename
                }
                nextToken
                __typename
            }
            createdAt
            updatedAt
            __typename
        }
    }
`;
export const onCreateSystem = /* GraphQL */ `
    subscription OnCreateSystem($filter: ModelSubscriptionSystemFilterInput) {
        onCreateSystem(filter: $filter) {
            id
            appName
            android_version
            ios_version
            version
            defaultProfilePicture
            logoPicture
            createdAt
            updatedAt
            __typename
        }
    }
`;
export const onUpdateSystem = /* GraphQL */ `
    subscription OnUpdateSystem($filter: ModelSubscriptionSystemFilterInput) {
        onUpdateSystem(filter: $filter) {
            id
            appName
            android_version
            ios_version
            version
            defaultProfilePicture
            logoPicture
            createdAt
            updatedAt
            __typename
        }
    }
`;
export const onDeleteSystem = /* GraphQL */ `
    subscription OnDeleteSystem($filter: ModelSubscriptionSystemFilterInput) {
        onDeleteSystem(filter: $filter) {
            id
            appName
            android_version
            ios_version
            version
            defaultProfilePicture
            logoPicture
            createdAt
            updatedAt
            __typename
        }
    }
`;
export const onCreateMeeting = /* GraphQL */ `
    subscription OnCreateMeeting($filter: ModelSubscriptionMeetingFilterInput) {
        onCreateMeeting(filter: $filter) {
            id
            meetingDate
            title
            meetingType
            mtgCompKey
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            groups {
                items {
                    id
                    grpCompKey
                    title
                    location
                    gender
                    attendance
                    facilitator
                    cofacilitator
                    notes
                    createdAt
                    updatedAt
                    organizationGroupsId
                    meetingGroupsId
                    __typename
                }
                nextToken
                __typename
            }
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
            worship
            youthContact
            youthCount
            createdAt
            updatedAt
            organizationMeetingsId
            __typename
        }
    }
`;
export const onCreateMeetingForOrg = /* GraphQL */ `
    subscription OnCreateMeetingForOrg(
        $filter: ModelSubscriptionMeetingOrgFilterInput
    ) {
        onCreateMeetingForOrg(filter: $filter) {
            id
            meetingDate
            title
            meetingType
            mtgCompKey
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            groups {
                items {
                    id
                    grpCompKey
                    title
                    location
                    gender
                    attendance
                    facilitator
                    cofacilitator
                    notes
                    createdAt
                    updatedAt
                    organizationGroupsId
                    meetingGroupsId
                    __typename
                }
                nextToken
                __typename
            }
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
            worship
            youthContact
            youthCount
            createdAt
            updatedAt
            organizationMeetingsId
            __typename
        }
    }
`;
export const onUpdateMeeting = /* GraphQL */ `
    subscription OnUpdateMeeting($filter: ModelSubscriptionMeetingFilterInput) {
        onUpdateMeeting(filter: $filter) {
            id
            meetingDate
            title
            meetingType
            mtgCompKey
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            groups {
                items {
                    id
                    grpCompKey
                    title
                    location
                    gender
                    attendance
                    facilitator
                    cofacilitator
                    notes
                    createdAt
                    updatedAt
                    organizationGroupsId
                    meetingGroupsId
                    __typename
                }
                nextToken
                __typename
            }
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
            worship
            youthContact
            youthCount
            createdAt
            updatedAt
            organizationMeetingsId
            __typename
        }
    }
`;
export const onDeleteMeeting = /* GraphQL */ `
    subscription OnDeleteMeeting($filter: ModelSubscriptionMeetingFilterInput) {
        onDeleteMeeting(filter: $filter) {
            id
            meetingDate
            title
            meetingType
            mtgCompKey
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            groups {
                items {
                    id
                    grpCompKey
                    title
                    location
                    gender
                    attendance
                    facilitator
                    cofacilitator
                    notes
                    createdAt
                    updatedAt
                    organizationGroupsId
                    meetingGroupsId
                    __typename
                }
                nextToken
                __typename
            }
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
            worship
            youthContact
            youthCount
            createdAt
            updatedAt
            organizationMeetingsId
            __typename
        }
    }
`;
export const onCreateGroup = /* GraphQL */ `
    subscription OnCreateGroup($filter: ModelSubscriptionGroupFilterInput) {
        onCreateGroup(filter: $filter) {
            id
            meeting {
                id
                meetingDate
                title
                meetingType
                mtgCompKey
                organization {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
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
                worship
                youthContact
                youthCount
                createdAt
                updatedAt
                organizationMeetingsId
                __typename
            }
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            grpCompKey
            title
            location
            gender
            attendance
            facilitator
            cofacilitator
            notes
            createdAt
            updatedAt
            organizationGroupsId
            meetingGroupsId
            __typename
        }
    }
`;
export const onUpdateGroup = /* GraphQL */ `
    subscription OnUpdateGroup($filter: ModelSubscriptionGroupFilterInput) {
        onUpdateGroup(filter: $filter) {
            id
            meeting {
                id
                meetingDate
                title
                meetingType
                mtgCompKey
                organization {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
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
                worship
                youthContact
                youthCount
                createdAt
                updatedAt
                organizationMeetingsId
                __typename
            }
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            grpCompKey
            title
            location
            gender
            attendance
            facilitator
            cofacilitator
            notes
            createdAt
            updatedAt
            organizationGroupsId
            meetingGroupsId
            __typename
        }
    }
`;
export const onDeleteGroup = /* GraphQL */ `
    subscription OnDeleteGroup($filter: ModelSubscriptionGroupFilterInput) {
        onDeleteGroup(filter: $filter) {
            id
            grpCompKey
            title
            location
            gender
            attendance
            facilitator
            cofacilitator
            notes
            organizationGroupsId
            meetingGroupsId
            __typename
        }
    }
`;
// export const onDeleteGroup = /* GraphQL */ `
//   subscription OnDeleteGroup($filter: ModelSubscriptionGroupFilterInput) {
//     onDeleteGroup(filter: $filter) {
//       id
//       meeting {
//         id
//         meetingDate
//         title
//         meetingType
//         mtgCompKey
//         organization {
//           id
//           name
//           code
//           heroMessage
//           createdAt
//           updatedAt
//           locationOrganizationsId
//           __typename
//         }
//         groups {
//           nextToken
//           __typename
//         }
//         announcementsContact
//         attendanceCount
//         avContact
//         cafeContact
//         cafeCount
//         childrenContact
//         childrenCount
//         cleanupContact
//         closingContact
//         donations
//         facilitatorContact
//         greeterContact1
//         greeterContact2
//         meal
//         mealContact
//         mealCount
//         newcomersCount
//         notes
//         nurseryContact
//         nurseryCount
//         resourceContact
//         securityContact
//         setupContact
//         supportContact
//         transportationContact
//         transportationCount
//         worship
//         youthContact
//         youthCount
//         createdAt
//         updatedAt
//         organizationMeetingsId
//         __typename
//       }
//       organization {
//         id
//         name
//         code
//         location {
//           id
//           street
//           city
//           stateProv
//           postalCode
//           createdAt
//           updatedAt
//           __typename
//         }
//         affiliations {
//           nextToken
//           __typename
//         }
//         defaultUsers {
//           nextToken
//           __typename
//         }
//         heroMessage
//         meetings {
//           nextToken
//           __typename
//         }
//         groups {
//           nextToken
//           __typename
//         }
//         defaultGroups {
//           nextToken
//           __typename
//         }
//         managers {
//           nextToken
//           __typename
//         }
//         createdAt
//         updatedAt
//         locationOrganizationsId
//         __typename
//       }
//       grpCompKey
//       title
//       location
//       gender
//       attendance
//       facilitator
//       cofacilitator
//       notes
//       createdAt
//       updatedAt
//       organizationGroupsId
//       meetingGroupsId
//       __typename
//     }
//   }
// `;
export const onCreateManageOrganization = /* GraphQL */ `
    subscription OnCreateManageOrganization(
        $filter: ModelSubscriptionManageOrganizationFilterInput
    ) {
        onCreateManageOrganization(filter: $filter) {
            id
            userId
            organizationId
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
                defaultOrg {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                    __typename
                }
                picture
                affiliations {
                    nextToken
                    __typename
                }
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                manages {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                organizationDefaultUsersId
                locationUsersId
                __typename
            }
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            createdAt
            updatedAt
            __typename
        }
    }
`;
export const onUpdateManageOrganization = /* GraphQL */ `
    subscription OnUpdateManageOrganization(
        $filter: ModelSubscriptionManageOrganizationFilterInput
    ) {
        onUpdateManageOrganization(filter: $filter) {
            id
            userId
            organizationId
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
                defaultOrg {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                    __typename
                }
                picture
                affiliations {
                    nextToken
                    __typename
                }
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                manages {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                organizationDefaultUsersId
                locationUsersId
                __typename
            }
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            createdAt
            updatedAt
            __typename
        }
    }
`;
export const onDeleteManageOrganization = /* GraphQL */ `
    subscription OnDeleteManageOrganization(
        $filter: ModelSubscriptionManageOrganizationFilterInput
    ) {
        onDeleteManageOrganization(filter: $filter) {
            id
            userId
            organizationId
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
                defaultOrg {
                    id
                    name
                    code
                    heroMessage
                    createdAt
                    updatedAt
                    locationOrganizationsId
                    __typename
                }
                picture
                affiliations {
                    nextToken
                    __typename
                }
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                manages {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                organizationDefaultUsersId
                locationUsersId
                __typename
            }
            organization {
                id
                name
                code
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                    __typename
                }
                affiliations {
                    nextToken
                    __typename
                }
                defaultUsers {
                    nextToken
                    __typename
                }
                heroMessage
                meetings {
                    nextToken
                    __typename
                }
                groups {
                    nextToken
                    __typename
                }
                defaultGroups {
                    nextToken
                    __typename
                }
                managers {
                    nextToken
                    __typename
                }
                createdAt
                updatedAt
                locationOrganizationsId
                __typename
            }
            createdAt
            updatedAt
            __typename
        }
    }
`;
