import type StrapiInterface from "./Strapi.ts";

export default interface Gallery extends StrapiInterface {
    Title: string;
    Description: string;
    Date: Date;
    Pictures: Image[];
    Cover: Image;
    Slug: string;
    see_also: {
        url: string;
        title: string;
        cover: Image;
    }[];
}

export interface Image extends StrapiInterface {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    mime: string;
    height: number;
    ext: string;
    size: number;
    url: string;
    previewUrl?: string;
}