import { v4 as uuidv4 } from 'uuid';

import { instance } from '@/shared/api';

import { ICalculatorApi } from '../types';

// type QueryTypes = 'asicMiners' | 'readyBusiness';

class CalculatorApi {
  public getAsics = async () => {
    try {
      const response = await instance.get<ICalculatorApi>(
        '/product/calculating',
        {
          params: {
            type: 'asicMiners',
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
  public getBusiness = async () => {
    try {
      const response = await instance.get<ICalculatorApi>(
          '/product/calculating',
          {
            params: {
              type: 'readyBusiness',
            },
          },
      );
      // добавляю доп поля label value для dropdown
      // count для калькулятора
      // additionalId для возможности выбора и уникализации в dropdown
      const products = response.data.products.flatMap(product =>
          product.productAdd.map(add => {
            const productAsics = add.productAsics || {};
            console.log(add);
            return {
              id: productAsics.id,
              title: productAsics.title || '',
              price: productAsics.price,
              profitDayAll: productAsics.profitDayAll || 0,
              watt: productAsics.watt || 0,
              count: add.count,
              label: product.title,
              value: productAsics.id.toString(),
              additionalId: uuidv4(),
            };
          })
      );

      return { ...response.data, products };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

export const calculatorApi = new CalculatorApi();
