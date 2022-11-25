import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

type SystemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AffiliationsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrganizationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DefaultGroupsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ResidenceMetaData = {
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

type EagerSystem = {
  readonly id: string;
  readonly version?: string | null;
  readonly ios_version?: string | null;
  readonly android_version?: string | null;
  readonly defaultProfilePicture?: string | null;
  readonly appName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySystem = {
  readonly id: string;
  readonly version?: string | null;
  readonly ios_version?: string | null;
  readonly android_version?: string | null;
  readonly defaultProfilePicture?: string | null;
  readonly appName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type System = LazyLoading extends LazyLoadingDisabled ? EagerSystem : LazySystem

export declare const System: (new (init: ModelInit<System, SystemMetaData>) => System) & {
  copyOf(source: System, mutator: (draft: MutableModel<System, SystemMetaData>) => MutableModel<System, SystemMetaData> | void): System;
}

type EagerAffiliations = {
  readonly id: string;
  readonly role?: string | null;
  readonly status?: string | null;
  readonly userID: string;
  readonly Organization?: Organization | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly affiliationsOrganizationId?: string | null;
}

type LazyAffiliations = {
  readonly id: string;
  readonly role?: string | null;
  readonly status?: string | null;
  readonly userID: string;
  readonly Organization: AsyncItem<Organization | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly affiliationsOrganizationId?: string | null;
}

export declare type Affiliations = LazyLoading extends LazyLoadingDisabled ? EagerAffiliations : LazyAffiliations

export declare const Affiliations: (new (init: ModelInit<Affiliations, AffiliationsMetaData>) => Affiliations) & {
  copyOf(source: Affiliations, mutator: (draft: MutableModel<Affiliations, AffiliationsMetaData>) => MutableModel<Affiliations, AffiliationsMetaData> | void): Affiliations;
}

type EagerOrganization = {
  readonly id: string;
  readonly name?: string | null;
  readonly code?: string | null;
  readonly heroMessage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrganization = {
  readonly id: string;
  readonly name?: string | null;
  readonly code?: string | null;
  readonly heroMessage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Organization = LazyLoading extends LazyLoadingDisabled ? EagerOrganization : LazyOrganization

export declare const Organization: (new (init: ModelInit<Organization, OrganizationMetaData>) => Organization) & {
  copyOf(source: Organization, mutator: (draft: MutableModel<Organization, OrganizationMetaData>) => MutableModel<Organization, OrganizationMetaData> | void): Organization;
}

type EagerDefaultGroups = {
  readonly id: string;
  readonly gender?: string | null;
  readonly title?: string | null;
  readonly location?: string | null;
  readonly facilitator?: string | null;
  readonly coFacilitator?: string | null;
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
  readonly profilePic?: string | null;
  readonly activeClientCode?: string | null;
  readonly activeClientRole?: string | null;
  readonly activeClientName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
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
  readonly profilePic?: string | null;
  readonly activeClientCode?: string | null;
  readonly activeClientRole?: string | null;
  readonly activeClientName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Profile = LazyLoading extends LazyLoadingDisabled ? EagerProfile : LazyProfile

export declare const Profile: (new (init: ModelInit<Profile, ProfileMetaData>) => Profile) & {
  copyOf(source: Profile, mutator: (draft: MutableModel<Profile, ProfileMetaData>) => MutableModel<Profile, ProfileMetaData> | void): Profile;
}

type EagerUser = {
  readonly id: string;
  readonly sub?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly username?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
  readonly birthday?: string | null;
  readonly shirt?: string | null;
  readonly picture?: string | null;
  readonly DefaultOrg?: Organization | null;
  readonly ActiveOrg?: Organization | null;
  readonly Affiliations?: (Affiliations | null)[] | null;
  readonly Residence?: Residence | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userDefaultOrgId?: string | null;
  readonly userActiveOrgId?: string | null;
  readonly userResidenceId?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly sub?: string | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly username?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
  readonly birthday?: string | null;
  readonly shirt?: string | null;
  readonly picture?: string | null;
  readonly DefaultOrg: AsyncItem<Organization | undefined>;
  readonly ActiveOrg: AsyncItem<Organization | undefined>;
  readonly Affiliations: AsyncCollection<Affiliations>;
  readonly Residence: AsyncItem<Residence | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userDefaultOrgId?: string | null;
  readonly userActiveOrgId?: string | null;
  readonly userResidenceId?: string | null;
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