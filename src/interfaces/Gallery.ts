import type StrapiInterface from "./Strapi.ts";

export default interface Gallery extends StrapiInterface {
    Title: string;
    Description: string;
    Date: Date;
    Pictures: Image[];
    Cover: Image;
    Slug: string;
    Style: GalleryStyle;
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

export interface GalleryStyle extends StrapiInterface {
    Name: string;
    MainStyle: "Tiles" | "Slider";
    ShowTitles: boolean;
    NrColumns: number;
    ShowNextGallery: boolean;
    Default: boolean;
}