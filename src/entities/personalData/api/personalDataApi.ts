import { instance } from '@/shared/api';
import { BASE_URL } from '@/shared/consts';

import { IPersonalData } from '../model';

export const getPersonalData = async (): Promise<IPersonalData | null> => {
    try {
        const response = await instance.get<IPersonalData[]>('/personal_datas');
        if (response.data.length) return { ...response.data[0], image: BASE_URL + response.data[0].image };
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};
