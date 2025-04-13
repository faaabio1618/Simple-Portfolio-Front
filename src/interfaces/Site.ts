import type StrapiInterface from "./Strapi.ts";
import type {GalleryStyle, Image} from "./Gallery.ts";
import type Portfolio from "./Portfolio.ts";

export default interface Site extends StrapiInterface {
    Name: string;
    PhotographerName: string;
    Home: {
        Cover: Image[];
        ShowInstagram: boolean;
        ShowAboutMe: boolean;
    }
    DefaultGalleryStyle: GalleryStyle;
    HeaderColor: string;
    Menu: {
        Entry: Link[];
        MainPortfolio: Portfolio;
        BackgroundColor: string;
        TextColor: string;
    }
    Footer: {
        LeftSide: string;
        ShowEmail: boolean;
        ShowPhoneNumber: boolean;
        ShowInstagram: boolean;
    }
}

export interface Link extends StrapiInterface {
    Page: string;
    Label: string;
}
