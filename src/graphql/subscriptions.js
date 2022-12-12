/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
