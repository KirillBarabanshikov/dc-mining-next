export interface ICategoryDto {
    id: number;
    title: string;
    image?: string;
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
    slug: string;
}
