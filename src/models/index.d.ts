import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MeeterSystemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerUser = {
  readonly id: string;
  readonly sub?: string | null;
  readonly pictureURI?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly sub?: string | null;
  readonly pictureURI?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

type EagerMeeterSystem = {
  readonly id: string;
  readonly version?: string | null;
  readonly ios_version?: string | null;
  readonly android_version?: string | null;
  readonly defaultProfileUri?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMeeterSystem = {
  readonly id: string;
  readonly version?: string | null;
  readonly ios_version?: string | null;
  readonly android_version?: string | null;
  readonly defaultProfileUri?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MeeterSystem = LazyLoading extends LazyLoadingDisabled ? EagerMeeterSystem : LazyMeeterSystem

export declare const MeeterSystem: (new (init: ModelInit<MeeterSystem, MeeterSystemMetaData>) => MeeterSystem) & {
  copyOf(source: MeeterSystem, mutator: (draft: MutableModel<MeeterSystem, MeeterSystemMetaData>) => MutableModel<MeeterSystem, MeeterSystemMetaData> | void): MeeterSystem;
}