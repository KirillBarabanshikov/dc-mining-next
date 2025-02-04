export interface ICategory {
  id: number;
  title: string;
  image: string;
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
  link?: string;
  seoName: string;

  // id: number;
  // title: string;
  // image: string;
  // display: boolean;
  // displayHeader: boolean;
  // subCategory: {
  //   id: number;
  //   title: string;
  //   slug: string;
  //   image?: string;
  // }[];
  // images: {
  //   id: number;
  //   image?: string;
  // }[];
  // name: string;
  // slug: string;
  // link?: string;
}
