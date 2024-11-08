import { v4 as uuidv4 } from 'uuid';

import { instance } from '@/shared/api';

import { ICalculatorApi } from '../types';

type QueryTypes = 'asicMiners' | 'readyBusiness';

class CalculatorApi {
  public getAsics = async (type: QueryTypes) => {
    try {
      const response = await instance.get<ICalculatorApi>(
        '/product/calculating',
        {
          params: {
            type,
          },
        },
      );
      // добавляю доп поля label value для dropdown
      // count для калькулятора
      // additionalId для возможности выбора и уникализации в dropdown
      const mutateData: ICalculatorApi = {
        ...response.data,
        products: response.data.products.map((item) => ({
          ...item,
          label: item.title,
          value: String(item.id),
          count: 1,
          additionalId: uuidv4(),
        })),
      };

      return mutateData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

export const calculatorApi = new CalculatorApi();
