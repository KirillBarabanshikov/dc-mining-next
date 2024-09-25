export interface ILink {
    id: number;
    title: string;
    media: string;
    information: {
        id: number;
        title: string;
        description: string;
    }[];
    slug: string;
}
