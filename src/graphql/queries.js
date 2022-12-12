/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
          organizations {
            items {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        affiliations {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userAffiliationsId
            organizationAffiliationsId
          }
          nextToken
          startedAt
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
            defaultOrg {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            picture
            affiliations {
              nextToken
              startedAt
            }
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            organizationDefaultUsersId
            locationUsersId
          }
          nextToken
          startedAt
        }
        heroMessage
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        locationOrganizationsId
      }
      picture
      affiliations {
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
            defaultOrg {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            picture
            affiliations {
              nextToken
              startedAt
            }
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            affiliations {
              nextToken
              startedAt
            }
            defaultUsers {
              nextToken
              startedAt
            }
            heroMessage
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            locationOrganizationsId
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userAffiliationsId
          organizationAffiliationsId
        }
        nextToken
        startedAt
      }
      location {
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
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            affiliations {
              nextToken
              startedAt
            }
            defaultUsers {
              nextToken
              startedAt
            }
            heroMessage
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            locationOrganizationsId
          }
          nextToken
          startedAt
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
            defaultOrg {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            picture
            affiliations {
              nextToken
              startedAt
            }
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            organizationDefaultUsersId
            locationUsersId
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          location {
            id
            street
            city
            stateProv
            postalCode
            organizations {
              nextToken
              startedAt
            }
            users {
              nextToken
              startedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          affiliations {
            items {
              id
              role
              status
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              userAffiliationsId
              organizationAffiliationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          heroMessage
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          locationOrganizationsId
        }
        picture
        affiliations {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userAffiliationsId
            organizationAffiliationsId
          }
          nextToken
          startedAt
        }
        location {
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organizationDefaultUsersId
        locationUsersId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
          location {
            id
            street
            city
            stateProv
            postalCode
            organizations {
              nextToken
              startedAt
            }
            users {
              nextToken
              startedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          affiliations {
            items {
              id
              role
              status
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              userAffiliationsId
              organizationAffiliationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          heroMessage
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          locationOrganizationsId
        }
        picture
        affiliations {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userAffiliationsId
            organizationAffiliationsId
          }
          nextToken
          startedAt
        }
        location {
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organizationDefaultUsersId
        locationUsersId
      }
      nextToken
      startedAt
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
          location {
            id
            street
            city
            stateProv
            postalCode
            organizations {
              nextToken
              startedAt
            }
            users {
              nextToken
              startedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          affiliations {
            items {
              id
              role
              status
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              userAffiliationsId
              organizationAffiliationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          heroMessage
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          locationOrganizationsId
        }
        picture
        affiliations {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userAffiliationsId
            organizationAffiliationsId
          }
          nextToken
          startedAt
        }
        location {
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
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
          organizations {
            items {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        affiliations {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userAffiliationsId
            organizationAffiliationsId
          }
          nextToken
          startedAt
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
            defaultOrg {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            picture
            affiliations {
              nextToken
              startedAt
            }
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            organizationDefaultUsersId
            locationUsersId
          }
          nextToken
          startedAt
        }
        heroMessage
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        locationOrganizationsId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            affiliations {
              nextToken
              startedAt
            }
            defaultUsers {
              nextToken
              startedAt
            }
            heroMessage
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              userAffiliationsId
              organizationAffiliationsId
            }
            nextToken
            startedAt
          }
          location {
            id
            street
            city
            stateProv
            postalCode
            organizations {
              nextToken
              startedAt
            }
            users {
              nextToken
              startedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
            organizations {
              nextToken
              startedAt
            }
            users {
              nextToken
              startedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          affiliations {
            items {
              id
              role
              status
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              userAffiliationsId
              organizationAffiliationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          heroMessage
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          locationOrganizationsId
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userAffiliationsId
        organizationAffiliationsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAffiliations = /* GraphQL */ `
  query SyncAffiliations(
    $filter: ModelAffiliationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAffiliations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
              _version
              _deleted
              _lastChangedAt
            }
            affiliations {
              nextToken
              startedAt
            }
            defaultUsers {
              nextToken
              startedAt
            }
            heroMessage
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              userAffiliationsId
              organizationAffiliationsId
            }
            nextToken
            startedAt
          }
          location {
            id
            street
            city
            stateProv
            postalCode
            organizations {
              nextToken
              startedAt
            }
            users {
              nextToken
              startedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
            organizations {
              nextToken
              startedAt
            }
            users {
              nextToken
              startedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          affiliations {
            items {
              id
              role
              status
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              userAffiliationsId
              organizationAffiliationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          heroMessage
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          locationOrganizationsId
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        userAffiliationsId
        organizationAffiliationsId
      }
      nextToken
      startedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            affiliations {
              nextToken
              startedAt
            }
            defaultUsers {
              nextToken
              startedAt
            }
            heroMessage
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            locationOrganizationsId
          }
          nextToken
          startedAt
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
            defaultOrg {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            picture
            affiliations {
              nextToken
              startedAt
            }
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            organizationDefaultUsersId
            locationUsersId
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      affiliations {
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
            defaultOrg {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            picture
            affiliations {
              nextToken
              startedAt
            }
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            affiliations {
              nextToken
              startedAt
            }
            defaultUsers {
              nextToken
              startedAt
            }
            heroMessage
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            locationOrganizationsId
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          userAffiliationsId
          organizationAffiliationsId
        }
        nextToken
        startedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            affiliations {
              nextToken
              startedAt
            }
            defaultUsers {
              nextToken
              startedAt
            }
            heroMessage
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              userAffiliationsId
              organizationAffiliationsId
            }
            nextToken
            startedAt
          }
          location {
            id
            street
            city
            stateProv
            postalCode
            organizations {
              nextToken
              startedAt
            }
            users {
              nextToken
              startedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          organizationDefaultUsersId
          locationUsersId
        }
        nextToken
        startedAt
      }
      heroMessage
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
          organizations {
            items {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        affiliations {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userAffiliationsId
            organizationAffiliationsId
          }
          nextToken
          startedAt
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
            defaultOrg {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            picture
            affiliations {
              nextToken
              startedAt
            }
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            organizationDefaultUsersId
            locationUsersId
          }
          nextToken
          startedAt
        }
        heroMessage
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        locationOrganizationsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncOrganizations = /* GraphQL */ `
  query SyncOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrganizations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
          organizations {
            items {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        affiliations {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userAffiliationsId
            organizationAffiliationsId
          }
          nextToken
          startedAt
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
            defaultOrg {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            picture
            affiliations {
              nextToken
              startedAt
            }
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            organizationDefaultUsersId
            locationUsersId
          }
          nextToken
          startedAt
        }
        heroMessage
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        locationOrganizationsId
      }
      nextToken
      startedAt
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
          location {
            id
            street
            city
            stateProv
            postalCode
            organizations {
              nextToken
              startedAt
            }
            users {
              nextToken
              startedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          affiliations {
            items {
              id
              role
              status
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              userAffiliationsId
              organizationAffiliationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          heroMessage
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          locationOrganizationsId
        }
        nextToken
        startedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            affiliations {
              nextToken
              startedAt
            }
            defaultUsers {
              nextToken
              startedAt
            }
            heroMessage
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              userAffiliationsId
              organizationAffiliationsId
            }
            nextToken
            startedAt
          }
          location {
            id
            street
            city
            stateProv
            postalCode
            organizations {
              nextToken
              startedAt
            }
            users {
              nextToken
              startedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          organizationDefaultUsersId
          locationUsersId
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
            }
            affiliations {
              nextToken
              startedAt
            }
            defaultUsers {
              nextToken
              startedAt
            }
            heroMessage
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            locationOrganizationsId
          }
          nextToken
          startedAt
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
            defaultOrg {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            picture
            affiliations {
              nextToken
              startedAt
            }
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            organizationDefaultUsersId
            locationUsersId
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLocations = /* GraphQL */ `
  query SyncLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLocations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            affiliations {
              nextToken
              startedAt
            }
            defaultUsers {
              nextToken
              startedAt
            }
            heroMessage
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            locationOrganizationsId
          }
          nextToken
          startedAt
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
            defaultOrg {
              id
              name
              code
              heroMessage
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            picture
            affiliations {
              nextToken
              startedAt
            }
            location {
              id
              street
              city
              stateProv
              postalCode
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            organizationDefaultUsersId
            locationUsersId
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSystems = /* GraphQL */ `
  query SyncSystems(
    $filter: ModelSystemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSystems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
          location {
            id
            street
            city
            stateProv
            postalCode
            organizations {
              nextToken
              startedAt
            }
            users {
              nextToken
              startedAt
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          affiliations {
            items {
              id
              role
              status
              createdAt
              updatedAt
              _version
              _deleted
              _lastChangedAt
              userAffiliationsId
              organizationAffiliationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          heroMessage
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          locationOrganizationsId
        }
        picture
        affiliations {
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
              _version
              _deleted
              _lastChangedAt
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
            userAffiliationsId
            organizationAffiliationsId
          }
          nextToken
          startedAt
        }
        location {
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
              _version
              _deleted
              _lastChangedAt
              locationOrganizationsId
            }
            nextToken
            startedAt
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
              _version
              _deleted
              _lastChangedAt
              organizationDefaultUsersId
              locationUsersId
            }
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        organizationDefaultUsersId
        locationUsersId
      }
      nextToken
      startedAt
    }
  }
`;
