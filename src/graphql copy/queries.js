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
        meetings {
          nextToken
        }
        groups {
          nextToken
        }
        defaultGroups {
          nextToken
        }
        managers {
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
        meetings {
          nextToken
        }
        groups {
          nextToken
        }
        defaultGroups {
          nextToken
        }
        managers {
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
      manages {
        items {
          id
          userId
          organizationId
          createdAt
          updatedAt
        }
        nextToken
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
        manages {
          nextToken
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
        manages {
          nextToken
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
        meetings {
          nextToken
        }
        groups {
          nextToken
        }
        defaultGroups {
          nextToken
        }
        managers {
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
        }
        nextToken
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
        }
        nextToken
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
        }
        nextToken
      }
      managers {
        items {
          id
          userId
          organizationId
          createdAt
          updatedAt
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
        meetings {
          nextToken
        }
        groups {
          nextToken
        }
        defaultGroups {
          nextToken
        }
        managers {
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
        }
        affiliations {
          nextToken
        }
        defaultUsers {
          nextToken
        }
        heroMessage
        meetings {
          nextToken
        }
        groups {
          nextToken
        }
        defaultGroups {
          nextToken
        }
        managers {
          nextToken
        }
        createdAt
        updatedAt
        locationOrganizationsId
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
        }
        nextToken
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
        }
        groups {
          nextToken
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
      }
      nextToken
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
        }
        groups {
          nextToken
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
        meetings {
          nextToken
        }
        groups {
          nextToken
        }
        defaultGroups {
          nextToken
        }
        managers {
          nextToken
        }
        createdAt
        updatedAt
        locationOrganizationsId
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
      }
      nextToken
    }
  }
`;
export const getMeetingTwo = /* GraphQL */ `
  query GetMeetingTwo($id: ID!) {
    getMeetingTwo(id: $id) {
      id
      meetingDate
      title
      meetingType
      mtgCompKey
      createdAt
      updatedAt
    }
  }
`;
export const listMeetingTwos = /* GraphQL */ `
  query ListMeetingTwos(
    $filter: ModelMeetingTwoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetingTwos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        meetingDate
        title
        meetingType
        mtgCompKey
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      title
      actionDate
      type
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        actionDate
        type
        createdAt
        updatedAt
      }
      nextToken
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
        manages {
          nextToken
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
        meetings {
          nextToken
        }
        groups {
          nextToken
        }
        defaultGroups {
          nextToken
        }
        managers {
          nextToken
        }
        createdAt
        updatedAt
        locationOrganizationsId
      }
      createdAt
      updatedAt
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
        manages {
          nextToken
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
        }
        groups {
          nextToken
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
      }
      nextToken
    }
  }
`;
export const meetingTwosByMeetingDateAndMeetingTypeAndTitle = /* GraphQL */ `
  query MeetingTwosByMeetingDateAndMeetingTypeAndTitle(
    $meetingDate: String!
    $meetingTypeTitle: ModelMeetingTwoByMeetingDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMeetingTwoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    meetingTwosByMeetingDateAndMeetingTypeAndTitle(
      meetingDate: $meetingDate
      meetingTypeTitle: $meetingTypeTitle
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const todosByDate = /* GraphQL */ `
  query TodosByDate(
    $type: String!
    $actionDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    todosByDate(
      type: $type
      actionDate: $actionDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        actionDate
        type
        createdAt
        updatedAt
      }
      nextToken
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
      }
      nextToken
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
      }
      nextToken
    }
  }
`;
