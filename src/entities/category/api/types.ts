export interface ICategoryDto {
  id: number;
  title: string;
  image?: string;
  display: boolean;
  subCategory: {
    id: number;
    title: string;
    slug: string;
    image?: string;
  }[];
  images: {
    id: number;
    image?: string;
  }[];
  displayHeader: boolean;
  slug: string;
  displaySidebar: boolean;
}
