import { instance } from '@/shared/api';
import { BASE_URL } from '@/shared/consts';

import { ISlide } from '../model';

export const getSlider = async (): Promise<ISlide[] | null> => {
    try {
        const response = await instance.get<ISlide[]>('/main_slider');

        return response.data.map((slide) => ({
            ...slide,
            media: BASE_URL + slide.media,
            image: BASE_URL + slide.image,
        }));
    } catch (error) {
        console.error(error);
        return null;
    }
};
