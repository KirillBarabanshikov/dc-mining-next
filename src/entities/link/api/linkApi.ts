import { instance } from '@/shared/api';
import { BASE_URL } from '@/shared/consts';
import { createSlug } from '@/shared/lib';

import { ILink } from '../model';

export const getLinks = async (): Promise<ILink[] | undefined> => {
    try {
        const response = await instance.get<ILink[]>('/useful_links');
        return response.data.map((link) => ({
            ...link,
            media: BASE_URL + link.media,
            slug: createSlug(link.title),
        }));
    } catch (error) {
        console.log(error);
    }
};

export const getLinkById = async (id: string | number): Promise<ILink | undefined> => {
    try {
        const response = await instance.get<ILink>(`/useful_links/${id}`);
        return {
            ...response.data,
            media: BASE_URL + response.data.media,
            slug: createSlug(response.data.title),
        };
    } catch (error) {
        console.log(error);
    }
};
