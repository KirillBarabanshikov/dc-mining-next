import { instance } from '@/shared/api';

import type { CalculatorData } from '../model/types.ts';
import type { CalculatorDataParams } from './types';

export const getCalculatorData = async (params: CalculatorDataParams = {}) => {
  const response = await instance.get<CalculatorData>('/product/calculating', {
    params: { ...params, type: 'ASIC майнеры', display: true },
  });
  return response.data;
};
