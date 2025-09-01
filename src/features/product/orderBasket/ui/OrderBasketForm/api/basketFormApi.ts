import { instance } from '@/shared/api';

import { OrderBasketFormBody } from './types';

export const sendBasketForm = async (body: OrderBasketFormBody) => {
  try {
    await instance.post('/form_pdfs', body);
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
