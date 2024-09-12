import { ICategory } from '@/entities/category';

export interface IOrderProduct {
    name: string;
    phone: string;
    productId: number;
    price: number;
    count: number;
}

export interface IProduct {
    id: number;
    title: string;
    shortDescription: string;
    oldPrice?: number;
    price?: number;
    description: string;
    category?: ICategory;
    value: IProductValue[];
    images: IProductImage[];
    tags: IProductTag[];
    display: boolean;
    slug: string;
    seoTitle: string;
    seoDescription: string;
    seoHOne: string;
}

export interface IProductValue {
    id: number;
    title: string;
    display: boolean;
    valueInKey: string;
    unitInKey?: string;
    difference?: boolean;
}

export interface IProductImage {
    id: number;
    image: string;
}

interface IProductTag {
    id: number;
    title: string;
    color: string;
}

export interface IProductsByCategory {
    countProducts: number;
    products: IProduct[];
}
