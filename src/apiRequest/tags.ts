import http from "@/lib/http";
import { create } from "domain";


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


const tagsApiRequest = {
    getList: () => http.get<Tag>('api/v1/tags')
}
export default tagsApiRequest