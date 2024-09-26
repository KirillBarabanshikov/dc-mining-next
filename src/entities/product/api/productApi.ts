import { instance } from '@/shared/api';

import { mapProduct } from '../lib';
import { IProductDto } from './types';

export const getProducts = async (params: { display?: boolean; title?: string } = {}) => {
    try {
        const response = await instance.get<IProductDto[]>('/products', { params });
        return response.data.map(mapProduct);
    } catch (e) {
        console.error(e);
        return;
    }
};

export const compareProducts = async (productId: number[]) => {
    try {
        const response = await instance.post<IProductDto[]>('/product/compare', { productId });
        return response.data.map(mapProduct);
    } catch (e) {
        console.error(e);
        return;
    }
};
