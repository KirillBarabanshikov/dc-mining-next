import { v4 as uuidv4 } from 'uuid';

import { instance } from '@/shared/api';

import { ICalculatorApi, IPostPDFRequest } from '../types';

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

      const products = response.data.products.map((product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        productAdd: product.productAdd.map((add) => ({
          id: add.id,
          productAsics: {
            id: add.productAsics.id,
            title: add.productAsics.title,
            profitDayAll: add.productAsics.profitDayAll,
            price: add.productAsics.price,
            watt: add.productAsics.watt,
            count: add.count,
            hashrate: add.productAsics.hashrate,
            dimension: add.productAsics.dimension,
            additionalId: uuidv4(),
          },
        })),
      }));

      return products;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  public postPDF = async (data: IPostPDFRequest) => {
    try {
      const response = await instance.post('/product/calculatingExportPdf', data, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error("Error posting PDF data:", error);
      return null;
    }
  }
}

export const calculatorApi = new CalculatorApi();
