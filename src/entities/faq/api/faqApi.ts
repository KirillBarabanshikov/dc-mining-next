import { instance } from '@/shared/api';

import { IFaq } from '../model';

export const getFaq = async (
  params: { type: 'Общий' | 'Калькулятор' } = { type: 'Общий' },
): Promise<IFaq[] | null> => {
  try {
    const response = await instance.get('/f_a_qs', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
