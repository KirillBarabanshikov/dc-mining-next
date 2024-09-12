import { BASE_URL } from '@/shared/consts';

import { mapProduct } from '../lib';
import { IProduct } from '../model';
import { IProductDto } from './types';

export const getProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await fetch(`${BASE_URL}/api/products?display=true`);
        const data = (await response.json()) as IProductDto[];
        return data.map(mapProduct);
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
        return [];
    }
};
