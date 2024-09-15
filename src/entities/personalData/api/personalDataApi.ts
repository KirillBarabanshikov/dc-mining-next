import { BASE_URL } from '@/shared/consts';

import { IPersonalData } from '../model';

export const getPersonalData = async (): Promise<IPersonalData | undefined> => {
    try {
        const response = await fetch(`${BASE_URL}/api/personal_datas`);
        return (await response.json()) as IPersonalData;
    } catch (error) {
        console.error('Ошибка при запросе personal_datas:', error);
    }
};
