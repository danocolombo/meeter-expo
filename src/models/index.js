// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { System, Affiliations, Organization, DefaultGroups, Residence, Profile, User, MeeterSystem } = initSchema(schema);

export {
  System,
  Affiliations,
  Organization,
  DefaultGroups,
  Residence,
  Profile,
  User,
  MeeterSystem
};