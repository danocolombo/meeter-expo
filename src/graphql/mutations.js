/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAffiliation = /* GraphQL */ `
  mutation CreateAffiliation(
    $condition: ModelAffiliationConditionInput
    $input: CreateAffiliationInput!
  ) {
    createAffiliation(condition: $condition, input: $input) {
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
export const createLocation = /* GraphQL */ `
  mutation CreateLocation(
    $condition: ModelLocationConditionInput
    $input: CreateLocationInput!
  ) {
    createLocation(condition: $condition, input: $input) {
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
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $condition: ModelOrganizationConditionInput
    $input: CreateOrganizationInput!
  ) {
    createOrganization(condition: $condition, input: $input) {
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
export const createSystem = /* GraphQL */ `
  mutation CreateSystem(
    $condition: ModelSystemConditionInput
    $input: CreateSystemInput!
  ) {
    createSystem(condition: $condition, input: $input) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $condition: ModelUserConditionInput
    $input: CreateUserInput!
  ) {
    createUser(condition: $condition, input: $input) {
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
export const deleteAffiliation = /* GraphQL */ `
  mutation DeleteAffiliation(
    $condition: ModelAffiliationConditionInput
    $input: DeleteAffiliationInput!
  ) {
    deleteAffiliation(condition: $condition, input: $input) {
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
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation(
    $condition: ModelLocationConditionInput
    $input: DeleteLocationInput!
  ) {
    deleteLocation(condition: $condition, input: $input) {
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
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $condition: ModelOrganizationConditionInput
    $input: DeleteOrganizationInput!
  ) {
    deleteOrganization(condition: $condition, input: $input) {
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
export const deleteSystem = /* GraphQL */ `
  mutation DeleteSystem(
    $condition: ModelSystemConditionInput
    $input: DeleteSystemInput!
  ) {
    deleteSystem(condition: $condition, input: $input) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $condition: ModelUserConditionInput
    $input: DeleteUserInput!
  ) {
    deleteUser(condition: $condition, input: $input) {
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
export const updateAffiliation = /* GraphQL */ `
  mutation UpdateAffiliation(
    $condition: ModelAffiliationConditionInput
    $input: UpdateAffiliationInput!
  ) {
    updateAffiliation(condition: $condition, input: $input) {
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
export const updateLocation = /* GraphQL */ `
  mutation UpdateLocation(
    $condition: ModelLocationConditionInput
    $input: UpdateLocationInput!
  ) {
    updateLocation(condition: $condition, input: $input) {
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
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $condition: ModelOrganizationConditionInput
    $input: UpdateOrganizationInput!
  ) {
    updateOrganization(condition: $condition, input: $input) {
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
export const updateSystem = /* GraphQL */ `
  mutation UpdateSystem(
    $condition: ModelSystemConditionInput
    $input: UpdateSystemInput!
  ) {
    updateSystem(condition: $condition, input: $input) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $condition: ModelUserConditionInput
    $input: UpdateUserInput!
  ) {
    updateUser(condition: $condition, input: $input) {
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
export const createMeeting = /* GraphQL */ `
  mutation CreateMeeting($input: CreateMeetingInput!) {
    createMeeting(input: $input) {
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
export const updateMeeting = /* GraphQL */ `
  mutation UpdateMeeting($input: UpdateMeetingInput!) {
    updateMeeting(input: $input) {
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
export const deleteMeeting = /* GraphQL */ `
  mutation DeleteMeeting($input: DeleteMeetingInput!) {
    deleteMeeting(input: $input) {
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
export const createGroup = /* GraphQL */ `
  mutation CreateGroup($input: CreateGroupInput!) {
    createGroup(input: $input) {
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
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup($input: UpdateGroupInput!) {
    updateGroup(input: $input) {
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
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup($input: DeleteGroupInput!) {
    deleteGroup(input: $input) {
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
