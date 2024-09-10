import { BASE_URL } from '@/shared/consts';

import { IContacts } from '../model';

export const getContacts = async (): Promise<IContacts | undefined> => {
    try {
        const response = await fetch(`${BASE_URL}/api/contacts`);
        return (await response.json()) as IContacts;
    } catch (error) {
        console.error('Ошибка при загрузке контактов:', error);
    }
};
