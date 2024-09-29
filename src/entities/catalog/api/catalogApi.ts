import { IProductDto } from '@/entities/product/api';
import { mapProduct } from '@/entities/product/lib';
import { instance } from '@/shared/api';

import { mapFilter } from '../lib';
import { ICatalogData, ICustomFilter, IFilter, IOffer } from '../model';
import { ICatalogParams, IFilterDto } from './types';

export const getFilters = async (): Promise<IFilter[] | undefined> => {
    try {
        const response = await instance.get<IFilterDto[]>('/filters');
        return response.data.map(mapFilter);
    } catch (error) {
        console.error(error);
    }
};

export const getOffers = async (): Promise<IOffer[] | undefined> => {
    try {
        const response = await instance.get<IOffer[]>('/offers');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCustomFilters = async (): Promise<ICustomFilter[] | undefined> => {
    try {
        const response = await instance.get('/product_custom_filters');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getCatalogData = async (params: ICatalogParams): Promise<ICatalogData | undefined> => {
    try {
        const response = await instance.get<{ total_items: number; items: IProductDto[] }>('/filtersItems', {
            params: {
                ...params,
                limit: 12,
            },
        });
        return {
            count: response.data.total_items,
            products: response.data.items.map(mapProduct),
        };
    } catch (error) {
        console.error(error);
    }
};
