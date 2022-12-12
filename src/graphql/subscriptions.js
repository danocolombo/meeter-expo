/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAffiliation = /* GraphQL */ `
  subscription OnCreateAffiliation(
    $filter: ModelSubscriptionAffiliationFilterInput
  ) {
    onCreateAffiliation(filter: $filter) {
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
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation($filter: ModelSubscriptionLocationFilterInput) {
    onCreateLocation(filter: $filter) {
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
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onCreateOrganization(filter: $filter) {
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
export const onCreateSystem = /* GraphQL */ `
  subscription OnCreateSystem($filter: ModelSubscriptionSystemFilterInput) {
    onCreateSystem(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onDeleteAffiliation = /* GraphQL */ `
  subscription OnDeleteAffiliation(
    $filter: ModelSubscriptionAffiliationFilterInput
  ) {
    onDeleteAffiliation(filter: $filter) {
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
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation($filter: ModelSubscriptionLocationFilterInput) {
    onDeleteLocation(filter: $filter) {
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
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onDeleteOrganization(filter: $filter) {
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
export const onDeleteSystem = /* GraphQL */ `
  subscription OnDeleteSystem($filter: ModelSubscriptionSystemFilterInput) {
    onDeleteSystem(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onUpdateAffiliation = /* GraphQL */ `
  subscription OnUpdateAffiliation(
    $filter: ModelSubscriptionAffiliationFilterInput
  ) {
    onUpdateAffiliation(filter: $filter) {
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
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation($filter: ModelSubscriptionLocationFilterInput) {
    onUpdateLocation(filter: $filter) {
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
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onUpdateOrganization(filter: $filter) {
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
export const onUpdateSystem = /* GraphQL */ `
  subscription OnUpdateSystem($filter: ModelSubscriptionSystemFilterInput) {
    onUpdateSystem(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onCreateMeeting = /* GraphQL */ `
  subscription OnCreateMeeting(
    $meetingId: String
    $clientId: String
    $meetingDate: String
    $mtgCompIndex: String
    $mtgCompKey: String
  ) {
    onCreateMeeting(
      meetingId: $meetingId
      clientId: $clientId
      meetingDate: $meetingDate
      mtgCompIndex: $mtgCompIndex
      mtgCompKey: $mtgCompKey
    ) {
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
export const onUpdateMeeting = /* GraphQL */ `
  subscription OnUpdateMeeting(
    $meetingId: String
    $clientId: String
    $meetingDate: String
    $mtgCompIndex: String
    $mtgCompKey: String
  ) {
    onUpdateMeeting(
      meetingId: $meetingId
      clientId: $clientId
      meetingDate: $meetingDate
      mtgCompIndex: $mtgCompIndex
      mtgCompKey: $mtgCompKey
    ) {
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
export const onDeleteMeeting = /* GraphQL */ `
  subscription OnDeleteMeeting(
    $meetingId: String
    $clientId: String
    $meetingDate: String
    $mtgCompIndex: String
    $mtgCompKey: String
  ) {
    onDeleteMeeting(
      meetingId: $meetingId
      clientId: $clientId
      meetingDate: $meetingDate
      mtgCompIndex: $mtgCompIndex
      mtgCompKey: $mtgCompKey
    ) {
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
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup(
    $groupId: String
    $clientId: String
    $grpCompKey: String
    $meetingId: String
    $attendance: Int
  ) {
    onCreateGroup(
      groupId: $groupId
      clientId: $clientId
      grpCompKey: $grpCompKey
      meetingId: $meetingId
      attendance: $attendance
    ) {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup(
    $groupId: String
    $clientId: String
    $grpCompKey: String
    $meetingId: String
    $attendance: Int
  ) {
    onUpdateGroup(
      groupId: $groupId
      clientId: $clientId
      grpCompKey: $grpCompKey
      meetingId: $meetingId
      attendance: $attendance
    ) {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup(
    $groupId: String
    $clientId: String
    $grpCompKey: String
    $meetingId: String
    $attendance: Int
  ) {
    onDeleteGroup(
      groupId: $groupId
      clientId: $clientId
      grpCompKey: $grpCompKey
      meetingId: $meetingId
      attendance: $attendance
    ) {
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
