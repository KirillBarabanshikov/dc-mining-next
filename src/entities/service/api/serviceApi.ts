import { instance } from '@/shared/api';

import { IServiceFormBody } from './types';

export const sendServiceForm = async (body: IServiceFormBody) => {
  try {
    const response = await instance.post('/repair_and_services', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
