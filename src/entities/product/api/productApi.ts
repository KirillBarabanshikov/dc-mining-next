import { instance } from '@/shared/api';

import { mapProduct } from '../lib';
import { IProductDto } from './types';

export const getProducts = async (params: { display?: boolean } = {}) => {
    try {
        const response = await instance.get<IProductDto[]>('/products', { params });
        return response.data.map(mapProduct);
    } catch (e) {
        console.error(e);
        return;
    }
};
