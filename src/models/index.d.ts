import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

type DefaultGroupsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ResidenceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AffiliationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProfileMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MeeterSystemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerDefaultGroups = {
  readonly id: string;
  readonly gender?: string | null;
  readonly title?: string | null;
  readonly location?: string | null;
  readonly facilitator?: string | null;
  readonly coFacilitator?: string | null;
  readonly affiliationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDefaultGroups = {
  readonly id: string;
  readonly gender?: string | null;
  readonly title?: string | null;
  readonly location?: string | null;
  readonly facilitator?: string | null;
  readonly coFacilitator?: string | null;
  readonly affiliationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DefaultGroups = LazyLoading extends LazyLoadingDisabled ? EagerDefaultGroups : LazyDefaultGroups

export declare const DefaultGroups: (new (init: ModelInit<DefaultGroups, DefaultGroupsMetaData>) => DefaultGroups) & {
  copyOf(source: DefaultGroups, mutator: (draft: MutableModel<DefaultGroups, DefaultGroupsMetaData>) => MutableModel<DefaultGroups, DefaultGroupsMetaData> | void): DefaultGroups;
}

type EagerResidence = {
  readonly id: string;
  readonly street?: string | null;
  readonly city?: string | null;
  readonly stateProv?: string | null;
  readonly postalCode?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyResidence = {
  readonly id: string;
  readonly street?: string | null;
  readonly city?: string | null;
  readonly stateProv?: string | null;
  readonly postalCode?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Residence = LazyLoading extends LazyLoadingDisabled ? EagerResidence : LazyResidence

export declare const Residence: (new (init: ModelInit<Residence, ResidenceMetaData>) => Residence) & {
  copyOf(source: Residence, mutator: (draft: MutableModel<Residence, ResidenceMetaData>) => MutableModel<Residence, ResidenceMetaData> | void): Residence;
}

type EagerAffiliation = {
  readonly id: string;
  readonly label?: string | null;
  readonly role?: string | null;
  readonly value?: string | null;
  readonly DefaultGroups?: (DefaultGroups | null)[] | null;
  readonly profileID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAffiliation = {
  readonly id: string;
  readonly label?: string | null;
  readonly role?: string | null;
  readonly value?: string | null;
  readonly DefaultGroups: AsyncCollection<DefaultGroups>;
  readonly profileID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Affiliation = LazyLoading extends LazyLoadingDisabled ? EagerAffiliation : LazyAffiliation

export declare const Affiliation: (new (init: ModelInit<Affiliation, AffiliationMetaData>) => Affiliation) & {
  copyOf(source: Affiliation, mutator: (draft: MutableModel<Affiliation, AffiliationMetaData>) => MutableModel<Affiliation, AffiliationMetaData> | void): Affiliation;
}

type EagerProfile = {
  readonly id: string;
  readonly sub?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly username?: string | null;
  readonly birthday?: string | null;
  readonly shirt?: string | null;
  readonly defaultClient?: string | null;
  readonly defaultClientId?: string | null;
  readonly activeAffiliate?: string | null;
  readonly Residence?: Residence | null;
  readonly profilePic?: string | null;
  readonly Affiliations?: (Affiliation | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly profileResidenceId?: string | null;
}

type LazyProfile = {
  readonly id: string;
  readonly sub?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly username?: string | null;
  readonly birthday?: string | null;
  readonly shirt?: string | null;
  readonly defaultClient?: string | null;
  readonly defaultClientId?: string | null;
  readonly activeAffiliate?: string | null;
  readonly Residence: AsyncItem<Residence | undefined>;
  readonly profilePic?: string | null;
  readonly Affiliations: AsyncCollection<Affiliation>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly profileResidenceId?: string | null;
}

export declare type Profile = LazyLoading extends LazyLoadingDisabled ? EagerProfile : LazyProfile

export declare const Profile: (new (init: ModelInit<Profile, ProfileMetaData>) => Profile) & {
  copyOf(source: Profile, mutator: (draft: MutableModel<Profile, ProfileMetaData>) => MutableModel<Profile, ProfileMetaData> | void): Profile;
}

type EagerUser = {
  readonly id: string;
  readonly sub?: string | null;
  readonly profilePic?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly sub?: string | null;
  readonly profilePic?: string | null;
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
  readonly defaultProfilePic?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMeeterSystem = {
  readonly id: string;
  readonly version?: string | null;
  readonly ios_version?: string | null;
  readonly android_version?: string | null;
  readonly defaultProfilePic?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MeeterSystem = LazyLoading extends LazyLoadingDisabled ? EagerMeeterSystem : LazyMeeterSystem

export declare const MeeterSystem: (new (init: ModelInit<MeeterSystem, MeeterSystemMetaData>) => MeeterSystem) & {
  copyOf(source: MeeterSystem, mutator: (draft: MutableModel<MeeterSystem, MeeterSystemMetaData>) => MutableModel<MeeterSystem, MeeterSystemMetaData> | void): MeeterSystem;
}