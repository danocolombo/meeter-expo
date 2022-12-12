// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Organization, Location, Affiliation, System } = initSchema(schema);

export {
  User,
  Organization,
  Location,
  Affiliation,
  System
};