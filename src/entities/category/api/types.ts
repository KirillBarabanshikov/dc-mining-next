export interface ICategoryDto {
    id: number;
    title: string;
    image?: string;
    display: boolean;
    subCategory: {
        id: number;
        title: string;
    }[];
    images: { id: number; image: string }[];
}
