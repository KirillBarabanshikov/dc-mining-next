import { ISeo } from '@/entities/seo';
import { instance } from '@/shared/api';

export const getSeo = async (choose: string): Promise<ISeo | undefined> => {
    try {
        const response = await instance.get<ISeo[]>('/seos');
        return response.data.find((seo) => seo.choose === choose);
    } catch (error) {
        console.error(error);
    }
};

export const getSeos = async (): Promise<ISeo[] | undefined> => {
    try {
        const response = await instance.get<ISeo[]>('/seos');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
