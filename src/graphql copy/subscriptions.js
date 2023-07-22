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
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation($filter: ModelSubscriptionLocationFilterInput) {
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
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation($filter: ModelSubscriptionLocationFilterInput) {
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
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation($filter: ModelSubscriptionLocationFilterInput) {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup($filter: ModelSubscriptionGroupFilterInput) {
    onDeleteGroup(filter: $filter) {
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
export const onCreateMeetingTwo = /* GraphQL */ `
  subscription OnCreateMeetingTwo(
    $filter: ModelSubscriptionMeetingTwoFilterInput
  ) {
    onCreateMeetingTwo(filter: $filter) {
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
export const onUpdateMeetingTwo = /* GraphQL */ `
  subscription OnUpdateMeetingTwo(
    $filter: ModelSubscriptionMeetingTwoFilterInput
  ) {
    onUpdateMeetingTwo(filter: $filter) {
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
export const onDeleteMeetingTwo = /* GraphQL */ `
  subscription OnDeleteMeetingTwo(
    $filter: ModelSubscriptionMeetingTwoFilterInput
  ) {
    onDeleteMeetingTwo(filter: $filter) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      title
      actionDate
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      title
      actionDate
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      title
      actionDate
      type
      createdAt
      updatedAt
    }
  }
`;
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
