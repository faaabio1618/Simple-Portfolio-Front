import type StrapiInterface from "./Strapi.ts";

export interface Gallery extends StrapiInterface {
    Title: string;
    Date: Date;
    Pictures: Image[];
    Cover: Image;
    Slug: string;
    Style: GalleryStyle;
    see_also: Gallery[];
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
}