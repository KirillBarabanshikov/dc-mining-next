import { instance } from '@/shared/api';

import { IFaq } from '../model';

export const getFaq = async (): Promise<IFaq[] | undefined> => {
    try {
        const response = await instance.get('/faq');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};