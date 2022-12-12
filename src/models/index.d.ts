import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerBlog = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Blog, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly posts?: (Post | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBlog = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Blog, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly posts: AsyncCollection<Post>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Blog = LazyLoading extends LazyLoadingDisabled ? EagerBlog : LazyBlog

export declare const Blog: (new (init: ModelInit<Blog>) => Blog) & {
  copyOf(source: Blog, mutator: (draft: MutableModel<Blog>) => MutableModel<Blog> | void): Blog;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly blog?: Blog | null;
  readonly comments?: (Comment | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly blogPostsId?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly blog: AsyncItem<Blog | undefined>;
  readonly comments: AsyncCollection<Comment>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly blogPostsId?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

type EagerComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly post?: Post | null;
  readonly content: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly postCommentsId?: string | null;
}

type LazyComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly post: AsyncItem<Post | undefined>;
  readonly content: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly postCommentsId?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sub: string;
  readonly username: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly shirt?: string | null;
  readonly birthday?: string | null;
  readonly defaultOrg?: Organization | null;
  readonly picture?: string | null;
  readonly affiliations?: (Affiliation | null)[] | null;
  readonly location?: Location | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly organizationDefaultUsersId?: string | null;
  readonly locationUsersId?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sub: string;
  readonly username: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly shirt?: string | null;
  readonly birthday?: string | null;
  readonly defaultOrg: AsyncItem<Organization | undefined>;
  readonly picture?: string | null;
  readonly affiliations: AsyncCollection<Affiliation>;
  readonly location: AsyncItem<Location | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly organizationDefaultUsersId?: string | null;
  readonly locationUsersId?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerOrganization = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Organization, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly location?: Location | null;
  readonly affiliations?: (Affiliation | null)[] | null;
  readonly defaultUsers?: (User | null)[] | null;
  readonly heroMessage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly locationOrganizationsId?: string | null;
}

type LazyOrganization = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Organization, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly location: AsyncItem<Location | undefined>;
  readonly affiliations: AsyncCollection<Affiliation>;
  readonly defaultUsers: AsyncCollection<User>;
  readonly heroMessage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly locationOrganizationsId?: string | null;
}

export declare type Organization = LazyLoading extends LazyLoadingDisabled ? EagerOrganization : LazyOrganization

export declare const Organization: (new (init: ModelInit<Organization>) => Organization) & {
  copyOf(source: Organization, mutator: (draft: MutableModel<Organization>) => MutableModel<Organization> | void): Organization;
}

type EagerLocation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Location, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly street?: string | null;
  readonly city?: string | null;
  readonly stateProv?: string | null;
  readonly postalCode?: string | null;
  readonly organizations?: (Organization | null)[] | null;
  readonly users?: (User | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLocation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Location, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly street?: string | null;
  readonly city?: string | null;
  readonly stateProv?: string | null;
  readonly postalCode?: string | null;
  readonly organizations: AsyncCollection<Organization>;
  readonly users: AsyncCollection<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Location = LazyLoading extends LazyLoadingDisabled ? EagerLocation : LazyLocation

export declare const Location: (new (init: ModelInit<Location>) => Location) & {
  copyOf(source: Location, mutator: (draft: MutableModel<Location>) => MutableModel<Location> | void): Location;
}

type EagerAffiliation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Affiliation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly role: string;
  readonly status: string;
  readonly user?: User | null;
  readonly organization?: Organization | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userAffiliationsId?: string | null;
  readonly organizationAffiliationsId?: string | null;
}

type LazyAffiliation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Affiliation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly role: string;
  readonly status: string;
  readonly user: AsyncItem<User | undefined>;
  readonly organization: AsyncItem<Organization | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userAffiliationsId?: string | null;
  readonly organizationAffiliationsId?: string | null;
}

export declare type Affiliation = LazyLoading extends LazyLoadingDisabled ? EagerAffiliation : LazyAffiliation

export declare const Affiliation: (new (init: ModelInit<Affiliation>) => Affiliation) & {
  copyOf(source: Affiliation, mutator: (draft: MutableModel<Affiliation>) => MutableModel<Affiliation> | void): Affiliation;
}

type EagerSystem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<System, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly appName: string;
  readonly android_version?: string | null;
  readonly ios_version?: string | null;
  readonly version?: string | null;
  readonly defaultProfilePicture?: string | null;
  readonly logoPicture?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySystem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<System, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly appName: string;
  readonly android_version?: string | null;
  readonly ios_version?: string | null;
  readonly version?: string | null;
  readonly defaultProfilePicture?: string | null;
  readonly logoPicture?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type System = LazyLoading extends LazyLoadingDisabled ? EagerSystem : LazySystem

export declare const System: (new (init: ModelInit<System>) => System) & {
  copyOf(source: System, mutator: (draft: MutableModel<System>) => MutableModel<System> | void): System;
}