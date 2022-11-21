// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, MeeterSystem } = initSchema(schema);

export {
  User,
  MeeterSystem
};