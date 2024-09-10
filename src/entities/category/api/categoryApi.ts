import { BASE_URL } from '@/shared/consts';

import { mapCategory } from '../lib';
import { ICategory } from '../model';
import { ICategoryDto } from './types';

export const getCategories = async (): Promise<ICategory[]> => {
    try {
        const response = await fetch(`${BASE_URL}/api/product_categories`);
        const data = (await response.json()) as ICategoryDto[];
        return data.map(mapCategory);
    } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
        return [];
    }
};

export const getCategoryById = async (id: string): Promise<ICategory | undefined> => {
    try {
        const response = await fetch(`${BASE_URL}/api/product_categories/${id}`);
        const data = (await response.json()) as ICategoryDto;
        return mapCategory(data);
    } catch (error) {
        console.error('Ошибка при запросе категории:', error);
    }
};
