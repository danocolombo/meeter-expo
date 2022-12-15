/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDefaultGroup = /* GraphQL */ `
  query GetDefaultGroup($id: ID!) {
    getDefaultGroup(id: $id) {
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
export const listDefaultGroups = /* GraphQL */ `
  query ListDefaultGroups(
    $filter: ModelDefaultGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDefaultGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        gender
        location
        facilitator
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
        organizationDefaultGroupsId
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getAffiliation = /* GraphQL */ `
  query GetAffiliation($id: ID!) {
    getAffiliation(id: $id) {
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
export const listAffiliations = /* GraphQL */ `
  query ListAffiliations(
    $filter: ModelAffiliationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAffiliations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          picture
          createdAt
          updatedAt
          organizationDefaultUsersId
          locationUsersId
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
        organizationAffiliationsId
      }
      nextToken
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
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
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
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
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSystem = /* GraphQL */ `
  query GetSystem($id: ID!) {
    getSystem(id: $id) {
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
export const listSystems = /* GraphQL */ `
  query ListSystems(
    $filter: ModelSystemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSystems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const usersBySub = /* GraphQL */ `
  query UsersBySub(
    $sub: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersBySub(
      sub: $sub
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
    }
  }
`;
