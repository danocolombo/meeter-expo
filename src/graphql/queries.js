/* eslint-disable */
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
    listAffiliations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getMeeting = /* GraphQL */ `
  query GetMeeting($meetingId: String!) {
    getMeeting(meetingId: $meetingId) {
      meetingId
      clientId
      meetingDate
      mtgCompIndex
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
      meetingType
      newcomersCount
      notes
      nurseryContact
      nurseryCount
      resourceContact
      securityContact
      setupContact
      supportContact
      title
      transportationContact
      transportationCount
      worship
      youthContact
      youthCount
    }
  }
`;
export const listMeetings = /* GraphQL */ `
  query ListMeetings(
    $filter: TableMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        meetingId
        clientId
        meetingDate
        mtgCompIndex
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
        meetingType
        newcomersCount
        notes
        nurseryContact
        nurseryCount
        resourceContact
        securityContact
        setupContact
        supportContact
        title
        transportationContact
        transportationCount
        worship
        youthContact
        youthCount
      }
      nextToken
    }
  }
`;
export const queryMeetingsByClientIdMtgCompIndexIndex = /* GraphQL */ `
  query QueryMeetingsByClientIdMtgCompIndexIndex(
    $clientId: String!
    $first: Int
    $after: String
  ) {
    queryMeetingsByClientIdMtgCompIndexIndex(
      clientId: $clientId
      first: $first
      after: $after
    ) {
      items {
        meetingId
        clientId
        meetingDate
        mtgCompIndex
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
        meetingType
        newcomersCount
        notes
        nurseryContact
        nurseryCount
        resourceContact
        securityContact
        setupContact
        supportContact
        title
        transportationContact
        transportationCount
        worship
        youthContact
        youthCount
      }
      nextToken
    }
  }
`;
export const queryMeetingsByClientIdMtgCompKeyIndex = /* GraphQL */ `
  query QueryMeetingsByClientIdMtgCompKeyIndex(
    $clientId: String!
    $first: Int
    $after: String
  ) {
    queryMeetingsByClientIdMtgCompKeyIndex(
      clientId: $clientId
      first: $first
      after: $after
    ) {
      items {
        meetingId
        clientId
        meetingDate
        mtgCompIndex
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
        meetingType
        newcomersCount
        notes
        nurseryContact
        nurseryCount
        resourceContact
        securityContact
        setupContact
        supportContact
        title
        transportationContact
        transportationCount
        worship
        youthContact
        youthCount
      }
      nextToken
    }
  }
`;
export const queryMeetingsByClientIdIndex = /* GraphQL */ `
  query QueryMeetingsByClientIdIndex(
    $clientId: String!
    $first: Int
    $after: String
  ) {
    queryMeetingsByClientIdIndex(
      clientId: $clientId
      first: $first
      after: $after
    ) {
      items {
        meetingId
        clientId
        meetingDate
        mtgCompIndex
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
        meetingType
        newcomersCount
        notes
        nurseryContact
        nurseryCount
        resourceContact
        securityContact
        setupContact
        supportContact
        title
        transportationContact
        transportationCount
        worship
        youthContact
        youthCount
      }
      nextToken
    }
  }
`;
export const queryMeetingsByClientIdMeetingDateIndex = /* GraphQL */ `
  query QueryMeetingsByClientIdMeetingDateIndex(
    $clientId: String!
    $first: Int
    $after: String
  ) {
    queryMeetingsByClientIdMeetingDateIndex(
      clientId: $clientId
      first: $first
      after: $after
    ) {
      items {
        meetingId
        clientId
        meetingDate
        mtgCompIndex
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
        meetingType
        newcomersCount
        notes
        nurseryContact
        nurseryCount
        resourceContact
        securityContact
        setupContact
        supportContact
        title
        transportationContact
        transportationCount
        worship
        youthContact
        youthCount
      }
      nextToken
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($groupId: String!) {
    getGroup(groupId: $groupId) {
      groupId
      clientId
      grpCompKey
      meetingId
      attendance
      cofacilitator
      facilitator
      gender
      location
      notes
      title
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: TableGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        groupId
        clientId
        grpCompKey
        meetingId
        attendance
        cofacilitator
        facilitator
        gender
        location
        notes
        title
      }
      nextToken
    }
  }
`;
export const queryGroupsByClientIdIndex = /* GraphQL */ `
  query QueryGroupsByClientIdIndex(
    $clientId: String!
    $first: Int
    $after: String
  ) {
    queryGroupsByClientIdIndex(
      clientId: $clientId
      first: $first
      after: $after
    ) {
      items {
        groupId
        clientId
        grpCompKey
        meetingId
        attendance
        cofacilitator
        facilitator
        gender
        location
        notes
        title
      }
      nextToken
    }
  }
`;
export const queryGroupsByMeetingIdIndex = /* GraphQL */ `
  query QueryGroupsByMeetingIdIndex(
    $meetingId: String!
    $first: Int
    $after: String
  ) {
    queryGroupsByMeetingIdIndex(
      meetingId: $meetingId
      first: $first
      after: $after
    ) {
      items {
        groupId
        clientId
        grpCompKey
        meetingId
        attendance
        cofacilitator
        facilitator
        gender
        location
        notes
        title
      }
      nextToken
    }
  }
`;
export const queryGroupsByClientIdGrpCompKeyIndex = /* GraphQL */ `
  query QueryGroupsByClientIdGrpCompKeyIndex(
    $clientId: String!
    $first: Int
    $after: String
  ) {
    queryGroupsByClientIdGrpCompKeyIndex(
      clientId: $clientId
      first: $first
      after: $after
    ) {
      items {
        groupId
        clientId
        grpCompKey
        meetingId
        attendance
        cofacilitator
        facilitator
        gender
        location
        notes
        title
      }
      nextToken
    }
  }
`;
