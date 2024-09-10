import { ISeo } from '@/entities/seo';
import { BASE_URL } from '@/shared/consts';

export const getSeo = async (choose: string): Promise<ISeo | undefined> => {
    try {
        const response = await fetch(`${BASE_URL}/api/seos`);
        const data = (await response.json()) as ISeo[];

        return data.find((seo) => seo.choose === choose);
    } catch (error) {
        console.error('Ошибка при загрузке seo:', error);
    }
};
