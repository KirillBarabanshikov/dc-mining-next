import { instance } from '@/shared/api';
import { BASE_URL } from '@/shared/consts';

import { ILink } from '../model';

export const getLinks = async (): Promise<ILink[] | null> => {
    try {
        const response = await instance.get<ILink[]>('/useful_links');
        return response.data.map((link) => ({
            ...link,
            media: BASE_URL + link.media,
        }));
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getLinkById = async (id: string | number): Promise<ILink | null> => {
    try {
        const response = await instance.get<ILink>(`/useful_links/${id}`);
        return {
            ...response.data,
            media: BASE_URL + response.data.media,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getLinkBySlug = async (slug: string): Promise<ILink | null> => {
    try {
        const response = await instance.get<ILink>(`/useful_links/slug?slug=${slug}`);
        return {
            ...response.data,
            media: BASE_URL + response.data.media,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};
