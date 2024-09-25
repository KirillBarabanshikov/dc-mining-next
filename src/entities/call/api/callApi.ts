import { instance } from '@/shared/api';

import { IOrderCallBody } from './types';

export const orderCall = async (body: IOrderCallBody) => {
    try {
        await instance.post('/forms', body);
    } catch (error) {
        console.error(error);
    }
};
