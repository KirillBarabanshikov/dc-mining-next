import { instance } from '@/shared/api';

import { IFaq } from '../model';

export const getFaq = async (): Promise<IFaq[] | null> => {
  try {
    const response = await instance.get('/f_a_qs');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
