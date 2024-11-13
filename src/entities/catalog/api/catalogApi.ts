import { IProductDto } from '@/entities/product/api';
import { mapProduct } from '@/entities/product/lib';
import { instance } from '@/shared/api';

import { mapFilter } from '../lib';
import { ICatalogData, ICustomFilter, IFilter, IOffer } from '../model';
import { ICatalogParams, IFilterDto } from './types';

export const getFilters = async (): Promise<IFilter[] | null> => {
    try {
        const response = await instance.get<IFilterDto[]>('/filters');
        return response.data.map(mapFilter);
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getOffers = async (): Promise<IOffer[] | null> => {
    try {
        const response = await instance.get<IOffer[]>('/offers');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getCustomFilters = async (): Promise<ICustomFilter[] | null> => {
    try {
        const response = await instance.get('/product_custom_filters');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getCatalogData = async (params: ICatalogParams): Promise<ICatalogData | null> => {
    try {
        const response = await instance.get<{
            total_items: number;
            items: IProductDto[];
            min_price?: number;
            max_price?: number;
        }>('/filtersItems', {
            params: {
                ...params,
                page: params.page || 1,
                limit: 12,
            },
        });
        return {
            count: response.data.total_items,
            products: response.data.items.map(mapProduct),
            minPrice: response.data.min_price ?? 0,
            maxPrice: response.data.max_price ?? 0,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};
