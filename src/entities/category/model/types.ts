export interface ICategory {
    id: number;
    title: string;
    image: string;
    display: boolean;
    displayHeader: boolean;
    subCategory: {
        id: number;
        title: string;
        slug: string;
    }[];
    images: {
        id: number;
        image?: string;
    }[];
    name: string;
    slug: string;
    link?: string;
    seoName: string;
}
