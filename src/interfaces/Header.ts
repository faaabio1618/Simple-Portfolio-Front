import type StrapiInterface from "./Strapi.ts";

export default interface HeaderType extends StrapiInterface {
    Links: Link[];
}

export interface Link extends StrapiInterface {
    Url: string;
    Label: string;
}