import { instance } from '@/shared/api';

import { CalculatorData, FinModelPdf } from '../model/types';
import type { CalculatorDataParams } from './types';

export const getCalculatorData = async (params: CalculatorDataParams = {}) => {
  const response = await instance.get<CalculatorData>('/product/calculating', {
    params: { ...params, type: 'ASIC майнеры', display: true },
  });
  return response.data;
};

export const generateFinModelPdf = async (data: FinModelPdf) => {
  const response = await instance.post('/calculating_export_pdfs', data, {
    responseType: 'blob',
  });
  return {
    file: response.data,
    pdfId: +response.headers['entity-id'] as number,
  };
};

export const getCalculatorInfo = async () => {
  const response = await instance.get<{ title: string; description: string }>(
    '/calculatings',
  );
  return response.data;
};
