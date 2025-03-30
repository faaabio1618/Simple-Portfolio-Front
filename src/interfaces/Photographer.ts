import type {Image} from "./Gallery.ts";

export default interface Photographer {
    Name: string;
    Surname: string;
    Email: string;
    Instagram: string;
    PhoneNumber: string;
    Address: string;
    Logo: Image;

}