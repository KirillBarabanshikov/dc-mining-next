import { instance } from '@/shared/api';

import { IContacts } from '../model';

export const getContacts = async (): Promise<IContacts | null> => {
    try {
        const response = await instance.get('/contacts');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
