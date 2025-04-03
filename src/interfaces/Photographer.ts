import type {Image} from "./Gallery.ts";
import type Portfolio from "./Portfolio.ts";
import type StrapiInterface from "./Strapi.ts";

export interface InstagramPost {
    Url: string;
}

export default interface Photographer extends StrapiInterface {
    Name: string;
    Surname: string;
    Email: string;
    Instagram: string;
    PhoneNumber: string;
    InstagramPosts: InstagramPost[];
    Address: string;
    Logo: Image;
    Cover: Image[];
    MainPortfolio: Portfolio;
    OtherPortfolios: Portfolio[];
}