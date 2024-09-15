import { BASE_URL } from '@/shared/consts';

import { ISlide } from '../model';

export const getSlider = async (): Promise<ISlide[]> => {
    try {
        const response = await fetch(`${BASE_URL}/api/main_slider`);
        const data = (await response.json()) as ISlide[];

        return data.map((slide) => ({
            ...slide,
            media: BASE_URL + slide.media,
            image: BASE_URL + slide.image,
        }));
    } catch (error) {
        console.error('Ошибка при загрузке слайдера:', error);
        return [];
    }
};
