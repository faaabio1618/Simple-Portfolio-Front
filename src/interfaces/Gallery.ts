export default interface Gallery {
    id: string;
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

export interface Image {
    id: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    ext: string;
    size: number;
    url: string;
    previewUrl?: string;
}