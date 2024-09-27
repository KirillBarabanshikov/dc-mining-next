import { instance } from '@/shared/api';

import { mapFilter } from '../lib';
import { IFilter, IOffer } from '../model';
import { IFilterDto } from './types';

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
