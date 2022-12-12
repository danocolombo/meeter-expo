// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Blog, Post, Comment, User, Organization, Location, Affiliation, System } = initSchema(schema);

export {
  Blog,
  Post,
  Comment,
  User,
  Organization,
  Location,
  Affiliation,
  System
};