/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDefaultGroup = /* GraphQL */ `
    mutation CreateDefaultGroup(
        $input: CreateDefaultGroupInput!
        $condition: ModelDefaultGroupConditionInput
    ) {
        createDefaultGroup(input: $input, condition: $condition) {
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
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                heroMessage
                defaultGroups {
                    nextToken
                }
                createdAt
                updatedAt
                locationOrganizationsId
            }
            createdAt
            updatedAt
            organizationDefaultGroupsId
        }
    }
`;
export const updateDefaultGroup = /* GraphQL */ `
    mutation UpdateDefaultGroup(
        $input: UpdateDefaultGroupInput!
        $condition: ModelDefaultGroupConditionInput
    ) {
        updateDefaultGroup(input: $input, condition: $condition) {
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
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                heroMessage
                defaultGroups {
                    nextToken
                }
                createdAt
                updatedAt
                locationOrganizationsId
            }
            createdAt
            updatedAt
            organizationDefaultGroupsId
        }
    }
`;
export const deleteDefaultGroup = /* GraphQL */ `
    mutation DeleteDefaultGroup(
        $input: DeleteDefaultGroupInput!
        $condition: ModelDefaultGroupConditionInput
    ) {
        deleteDefaultGroup(input: $input, condition: $condition) {
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
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                heroMessage
                defaultGroups {
                    nextToken
                }
                createdAt
                updatedAt
                locationOrganizationsId
            }
            createdAt
            updatedAt
            organizationDefaultGroupsId
        }
    }
`;
export const createUser = /* GraphQL */ `
    mutation CreateUser(
        $input: CreateUserInput!
        $condition: ModelUserConditionInput
    ) {
        createUser(input: $input, condition: $condition) {
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
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                heroMessage
                defaultGroups {
                    nextToken
                }
                createdAt
                updatedAt
                locationOrganizationsId
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
                }
                nextToken
            }
            location {
                id
                street
                city
                stateProv
                postalCode
                organizations {
                    nextToken
                }
                users {
                    nextToken
                }
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
            organizationDefaultUsersId
            locationUsersId
        }
    }
`;
export const updateUser = /* GraphQL */ `
    mutation UpdateUser(
        $input: UpdateUserInput!
        $condition: ModelUserConditionInput
    ) {
        updateUser(input: $input, condition: $condition) {
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
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                heroMessage
                defaultGroups {
                    nextToken
                }
                createdAt
                updatedAt
                locationOrganizationsId
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
                }
                nextToken
            }
            location {
                id
                street
                city
                stateProv
                postalCode
                organizations {
                    nextToken
                }
                users {
                    nextToken
                }
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
            organizationDefaultUsersId
            locationUsersId
        }
    }
`;
export const deleteUser = /* GraphQL */ `
    mutation DeleteUser(
        $input: DeleteUserInput!
        $condition: ModelUserConditionInput
    ) {
        deleteUser(input: $input, condition: $condition) {
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
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                heroMessage
                defaultGroups {
                    nextToken
                }
                createdAt
                updatedAt
                locationOrganizationsId
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
                }
                nextToken
            }
            location {
                id
                street
                city
                stateProv
                postalCode
                organizations {
                    nextToken
                }
                users {
                    nextToken
                }
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
            organizationDefaultUsersId
            locationUsersId
        }
    }
`;
export const createAffiliation = /* GraphQL */ `
    mutation CreateAffiliation(
        $input: CreateAffiliationInput!
        $condition: ModelAffiliationConditionInput
    ) {
        createAffiliation(input: $input, condition: $condition) {
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
                }
                picture
                affiliations {
                    nextToken
                }
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                }
                createdAt
                updatedAt
                organizationDefaultUsersId
                locationUsersId
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
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                heroMessage
                defaultGroups {
                    nextToken
                }
                createdAt
                updatedAt
                locationOrganizationsId
            }
            createdAt
            updatedAt
            userAffiliationsId
            organizationAffiliationsId
        }
    }
`;
export const updateAffiliation = /* GraphQL */ `
    mutation UpdateAffiliation(
        $input: UpdateAffiliationInput!
        $condition: ModelAffiliationConditionInput
    ) {
        updateAffiliation(input: $input, condition: $condition) {
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
                }
                picture
                affiliations {
                    nextToken
                }
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                }
                createdAt
                updatedAt
                organizationDefaultUsersId
                locationUsersId
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
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                heroMessage
                defaultGroups {
                    nextToken
                }
                createdAt
                updatedAt
                locationOrganizationsId
            }
            createdAt
            updatedAt
            userAffiliationsId
            organizationAffiliationsId
        }
    }
`;
export const deleteAffiliation = /* GraphQL */ `
    mutation DeleteAffiliation(
        $input: DeleteAffiliationInput!
        $condition: ModelAffiliationConditionInput
    ) {
        deleteAffiliation(input: $input, condition: $condition) {
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
                }
                picture
                affiliations {
                    nextToken
                }
                location {
                    id
                    street
                    city
                    stateProv
                    postalCode
                    createdAt
                    updatedAt
                }
                createdAt
                updatedAt
                organizationDefaultUsersId
                locationUsersId
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
                }
                affiliations {
                    nextToken
                }
                defaultUsers {
                    nextToken
                }
                heroMessage
                defaultGroups {
                    nextToken
                }
                createdAt
                updatedAt
                locationOrganizationsId
            }
            createdAt
            updatedAt
            userAffiliationsId
            organizationAffiliationsId
        }
    }
`;
export const createOrganization = /* GraphQL */ `
    mutation CreateOrganization(
        $input: CreateOrganizationInput!
        $condition: ModelOrganizationConditionInput
    ) {
        createOrganization(input: $input, condition: $condition) {
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
                }
                users {
                    nextToken
                }
                createdAt
                updatedAt
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
                }
                nextToken
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
                }
                nextToken
            }
            heroMessage
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
            locationOrganizationsId
        }
    }
`;
export const updateOrganization = /* GraphQL */ `
    mutation UpdateOrganization(
        $input: UpdateOrganizationInput!
        $condition: ModelOrganizationConditionInput
    ) {
        updateOrganization(input: $input, condition: $condition) {
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
                }
                users {
                    nextToken
                }
                createdAt
                updatedAt
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
                }
                nextToken
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
                }
                nextToken
            }
            heroMessage
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
            locationOrganizationsId
        }
    }
`;
export const deleteOrganization = /* GraphQL */ `
    mutation DeleteOrganization(
        $input: DeleteOrganizationInput!
        $condition: ModelOrganizationConditionInput
    ) {
        deleteOrganization(input: $input, condition: $condition) {
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
                }
                users {
                    nextToken
                }
                createdAt
                updatedAt
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
                }
                nextToken
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
                }
                nextToken
            }
            heroMessage
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
            locationOrganizationsId
        }
    }
`;
export const createLocation = /* GraphQL */ `
    mutation CreateLocation(
        $input: CreateLocationInput!
        $condition: ModelLocationConditionInput
    ) {
        createLocation(input: $input, condition: $condition) {
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
                }
                nextToken
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
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const updateLocation = /* GraphQL */ `
    mutation UpdateLocation(
        $input: UpdateLocationInput!
        $condition: ModelLocationConditionInput
    ) {
        updateLocation(input: $input, condition: $condition) {
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
                }
                nextToken
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
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const deleteLocation = /* GraphQL */ `
    mutation DeleteLocation(
        $input: DeleteLocationInput!
        $condition: ModelLocationConditionInput
    ) {
        deleteLocation(input: $input, condition: $condition) {
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
                }
                nextToken
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
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`;
export const createSystem = /* GraphQL */ `
    mutation CreateSystem(
        $input: CreateSystemInput!
        $condition: ModelSystemConditionInput
    ) {
        createSystem(input: $input, condition: $condition) {
            id
            appName
            android_version
            ios_version
            version
            defaultProfilePicture
            logoPicture
            createdAt
            updatedAt
        }
    }
`;
export const updateSystem = /* GraphQL */ `
    mutation UpdateSystem(
        $input: UpdateSystemInput!
        $condition: ModelSystemConditionInput
    ) {
        updateSystem(input: $input, condition: $condition) {
            id
            appName
            android_version
            ios_version
            version
            defaultProfilePicture
            logoPicture
            createdAt
            updatedAt
        }
    }
`;
export const deleteSystem = /* GraphQL */ `
    mutation DeleteSystem(
        $input: DeleteSystemInput!
        $condition: ModelSystemConditionInput
    ) {
        deleteSystem(input: $input, condition: $condition) {
            id
            appName
            android_version
            ios_version
            version
            defaultProfilePicture
            logoPicture
            createdAt
            updatedAt
        }
    }
`;
