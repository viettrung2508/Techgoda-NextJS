import { defu } from "defu";
import { slugify } from "./slugify";
import { encodeId } from "./id";
import { get } from "./http";
export type BaseResponse<T> = {
  data: T;
  pagination?: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};
export type User = {
  id: number;
  authId: string;
  displayName: string;
  avatarUrl?: string;
  coverUrl?: string;
  metadata: any;
};

export type Organization = {
  id: number;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  coverUrl?: string;
  verified: boolean;
  ownerId: number;
  metadata: any;
};

export type Taxonomy = {
  id: number;
  name: string;
  slug: string;
};

export type TagType = "SYSTEM" | "DEFAULT";
export type Tag = {
  id: number;
  name: string;
  slug: string;
  type: TagType;
  organizationId?: number;
  userId: number;
  parentId?: number;
  taxonomyId?: number;
};

export type MetaSchema = {
  id: number;
  name: string;
  version: number;
  target: string;
  isDefault: boolean;
  schema: any;
  organizationId?: number;
  createdAt: string;
  updatedAt: string;
};

export type MetadataSchema = {
  type: string;
  required: string[];
  properties: Record<
    string,
    {
      type: string;
      [key: string]: string;
    }
  >;
};

export type CreatePostInput = {
  title: string;
  content: string;
  contentJson?: unknown;
  status: "DRAFT" | "PUBLISHED";
  metadata?: unknown;
  metaSchemaId?: number;
  tagIds?: number[];
};

export type PublizFile = {
  id: number;
  contentType: string;
  fileName: string;
  filePath: string;
  metadata?: Partial<{
    size: string;
    userId: number;
    modelId: string;
    blurHash: string;
    fileName: string;
    modelName: string;
    gcsImageServingUrl: string;
  }>;
  title?: string;
  description?: string;
  userId: number;
  fileUrl: string;
};

export type UpdatePostInput = CreatePostInput;
export type UpdateUserInput = {
  displayName: string;
};

export type MyOrganization = Organization & {
  organizationRoleIds: number[];
};

export type OrganizationUser = User & {
  organizationRoleIds: number[];
};

export type Post = {
  id: number;
  title: string;
  content: string;
  parentId?: number;
  type: "POST" | "REVISION";
  status: "PUBLISHED" | "DRAFT";
  metadata: any;
  createdAt: string;
  contentJson: any;
  tags?: Tag[];
  authorId: number;
  author?: Omit<User, "authId">;
  organization?: Organization;
};

type GetTaxonomiesPostsQuery = {
  before?: string;
  after?: string;
  pageSize?: number;
  tag?: string;
  context?: string;
};

type GetCollectionPostsQuery = {
  before?: string;
  after?: string;
  pageSize?: number;
  tag?: string;
};

export async function useGetPost(id: number): Promise<Post> {
  const url = `api/v1/posts/${id}`;
  const resp = await get<{ data: Post }>(url);

  return resp.data;
}


