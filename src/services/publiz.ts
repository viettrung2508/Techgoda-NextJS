import http from "@/lib/http";
import { Taxonomy } from "@/lib/publiz";

export type BaseResponse<T> = {
    data: T;
    pagination?: {
        startCursor: string;
        endCursor: string;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
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
type GetCollectionPostsQuery = {
    before?: string;
    after?: string;
    pageSize?: number;
    tag?: string;
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
export type User = {
    id: number;
    authId: string;
    displayName: string;
    avatarUrl?: string;
    coverUrl?: string;
    metadata: any;
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
export const getTags = async (): Promise<BaseResponse<Tag[]>> => {
    const response = await http.get<BaseResponse<Tag[]>>("/api/v1/tags", {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
};

export const getCollectionPost = async (collection: string | number): Promise<BaseResponse<Post[]>> => {
    const response = await http.get<BaseResponse<Post[]>>(`api/v1/collections/${collection}/posts`, {
        headers: {
            'Content-Type': 'application/json'
        }

    })
    return response;
};

export const getTaxonomies = async (): Promise<BaseResponse<Taxonomy[]>> => {
    const response = await http.get<BaseResponse<Taxonomy[]>>(`api/v1/taxonomies`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response;
};
export const getTaxonomyTags = async (taxonomy: string | number): Promise<BaseResponse<Tag[]>> => {
    const response = await http.get<BaseResponse<Tag[]>>(`api/v1/taxonomies/${taxonomy}/tags`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response;
};
export const getGetOrganizationPosts = async (organizationId: string | number): Promise<BaseResponse<Post[]>> => {
    const response = await http.get<BaseResponse<Post[]>>(`api/v1/organizations/${organizationId}/posts`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response;
};


export const getOrganizations = async (): Promise<BaseResponse<Organization[]>> => {
    const response = await http.get<BaseResponse<Organization[]>>(`api/v1/organizations`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response;
};