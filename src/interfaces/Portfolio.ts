import type Gallery from "./Gallery.ts";
import type StrapiInterface from "./Strapi.ts";

export default interface Portfolio extends StrapiInterface {
    Title: string;
    Galleries: Gallery[];
}