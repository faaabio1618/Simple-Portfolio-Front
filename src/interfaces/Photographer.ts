import type StrapiInterface from "./Strapi.ts";

export default interface Photographer extends StrapiInterface{
    Name: string;
    Surname: string;
    Instagram?: string;
    Email?: string;
    PhoneNumber?: string;
    AboutMe?: string;
}