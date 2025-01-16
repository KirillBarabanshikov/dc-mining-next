import { instance } from '@/shared/api';
import { BASE_URL } from '@/shared/consts';

import { IPersonalData } from '../model';

export const getPersonalData = async (): Promise<IPersonalData | null> => {
  try {
    const response = await instance.get<IPersonalData>('/personal_datas');
    return { ...response.data, image: BASE_URL + response.data.image };
  } catch (error) {
    console.error(error);
    return null;
  }
};
