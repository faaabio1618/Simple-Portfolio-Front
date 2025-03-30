export default interface HeaderType {
    Links: Link[];
}

export interface Link {
    id: number;
    Url: string;
    Label: string;
}