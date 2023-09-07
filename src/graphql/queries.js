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
          __typename
        }
        createdAt
        updatedAt
        organizationDefaultGroupsId
        __typename
      }
      nextToken
      __typename
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
      nextToken
      __typename
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
          __typename
        }
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
        createdAt
        updatedAt
        userAffiliationsId
        organizationAffiliationsId
        __typename
      }
      nextToken
      __typename
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
      nextToken
      __typename
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
      nextToken
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMeeting = /* GraphQL */ `
  query GetMeeting($id: ID!) {
    getMeeting(id: $id) {
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
      nextToken
      __typename
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
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
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        meeting {
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
  }
`;
export const getManageOrganization = /* GraphQL */ `
  query GetManageOrganization($id: ID!) {
    getManageOrganization(id: $id) {
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
export const listManageOrganizations = /* GraphQL */ `
  query ListManageOrganizations(
    $filter: ModelManageOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listManageOrganizations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          picture
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
          heroMessage
          createdAt
          updatedAt
          locationOrganizationsId
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
      nextToken
      __typename
    }
  }
`;
export const meetingsByIdAndMeetingDate = /* GraphQL */ `
  query MeetingsByIdAndMeetingDate(
    $id: ID!
    $meetingDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    meetingsByIdAndMeetingDate(
      id: $id
      meetingDate: $meetingDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const manageOrganizationsByUserId = /* GraphQL */ `
  query ManageOrganizationsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelManageOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    manageOrganizationsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          picture
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
          heroMessage
          createdAt
          updatedAt
          locationOrganizationsId
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const manageOrganizationsByOrganizationId = /* GraphQL */ `
  query ManageOrganizationsByOrganizationId(
    $organizationId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelManageOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    manageOrganizationsByOrganizationId(
      organizationId: $organizationId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          picture
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
          heroMessage
          createdAt
          updatedAt
          locationOrganizationsId
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
