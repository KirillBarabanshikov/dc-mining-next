import { ICategory } from '@/entities/category';

export interface IProduct {
  count?: number;
  id: number;
  title: string;
  shortDescription: string;
  oldPrice?: number;
  price?: number;
  category?: ICategory;
  value: IProductValue[];
  images: IProductImage[];
  tags: IProductTag[];
  display: boolean;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  seoHOne: string;
  productSubCategory: {
    id: number;
    title: string;
    slug: string;
    image?: string;
  };
  watt?: number;
  hashrate?: number;
  algorithm?: string;
  coins?: string;
  profit?: number;
  paybackPerMonth?: number;
  profitDayAll?: number;
  firstCoinsTime?: Date;
}

interface IProductValue {
  id: number;
  title: string;
  display: boolean;
  difference?: boolean;
  unit?: string;
  valueInKey?: string;
}

interface IProductImage {
  id: number;
  image?: string;
}

interface IProductTag {
  id: number;
  title: string;
  color: string;
}
