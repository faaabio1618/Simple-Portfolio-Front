import type Gallery from "./Gallery.ts";

export default interface Portfolio {
    id: string;
    Title: string;
    Galleries: Gallery[];
}