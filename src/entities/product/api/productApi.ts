import { instance } from '@/shared/api';

import { mapProduct } from '../lib';
import { IOrderProductBody, IProductDto } from './types';

export const getProducts = async (params: { display?: boolean; title?: string } = {}) => {
    try {
        const response = await instance.get<IProductDto[]>('/products', { params });
        return response.data.map(mapProduct);
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const getProductById = async (id: string | number) => {
    try {
        const response = await instance.get<IProductDto>(`/products/${id}`);
        return mapProduct(response.data);
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const compareProducts = async (productId: number[]) => {
    try {
        const response = await instance.post<IProductDto[]>('/product/compare', { productId });
        return response.data.map(mapProduct);
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const orderProduct = async (body: IOrderProductBody) => {
    try {
        await instance.post('/buy', body);
    } catch (e) {
        console.error(e);
        throw new Error(`${e}`);
    }
};
