import type StrapiInterface from "./Strapi.ts";
import type {GalleryStyle} from "./Gallery.ts";

export default interface Site extends StrapiInterface {
    ShowInstagram: boolean;
    DefaultGalleryStyle: GalleryStyle;
    HeaderColor: string;
    Menu: Link[];
}
export interface Link extends StrapiInterface {
    Link: string;
    Label: string;
}
