import { ICategoryDto } from '@/entities/category';

export interface IProductDto {
  id: number;
  title: string;
  shortDescription: string;
  oldPrice?: number;
  price?: number;
  category?: ICategoryDto;
  value: {
    id: number;
    title: string;
    display: boolean;
    difference?: boolean;
    unit?: string;
    valueInKey?: string;
  }[];
  images: {
    id: number;
    image?: string;
  }[];
  tags: {
    id: number;
    title: string;
    color: string;
  }[];
  display: boolean;
  productSubCategory: {
    id: number;
    title: string;
    slug: string;
    image?: string;
  };
  count?: number;
  profitable?: number;
  powerful?: number;
  seoTitle: string;
  seoDescription: string;
  seoHOne: string;
  slug: string;
  watt?: number;
  hashrate?: number;
  algorithm?: string;
  coins?: string;
  profit?: number;
  paybackPerMonth?: number;
  profitDayAll?: number;
  firstCoinsTime?: Date;
}

export interface IOrderProductBody {
  name: string;
  phone: string;
  productId: number;
  price: number;
  count: number;
  entryPoint: string;
}
