// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DefaultGroups, Residence, Affiliation, Profile, User, MeeterSystem } = initSchema(schema);

export {
  DefaultGroups,
  Residence,
  Affiliation,
  Profile,
  User,
  MeeterSystem
};