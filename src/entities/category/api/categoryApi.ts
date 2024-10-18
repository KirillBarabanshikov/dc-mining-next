import { instance } from '@/shared/api';

import { mapCategory } from '../lib';
import { ICategoryDto } from './types';

export const getCategories = async () => {
    try {
        const response = await instance.get<ICategoryDto[]>('product_categories');
        return response.data.map(mapCategory);
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const getCategoryById = async (id: string) => {
    try {
        const response = await instance.get<ICategoryDto>(`product_categories/${id}`);
        return mapCategory(response.data);
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const getCategoryBySlug = async (slug: string) => {
    try {
        const response = await instance.get<ICategoryDto>(`product_categories/slug?slug=${slug}`);
        return mapCategory(response.data);
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const getSubCategoryBySlug = async (slug: string) => {
    try {
        const response = await instance.get<{ id: number; title: string; slug: string }>(
            `/product_sub_categories/slug?slug=${slug}`,
        );
        return response.data;
    } catch (e) {
        console.error(e);
        return null;
    }
};
