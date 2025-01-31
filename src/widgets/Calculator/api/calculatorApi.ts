import { v4 as uuidv4 } from 'uuid';

import { instance } from '@/shared/api';

import { ICalculatorApi, IFormRequestData, IPostPDFRequest } from '../types';

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
      const response = await instance.post('/calculating_export_pdfs', data, {
        responseType: 'blob',
      });
      return {
        file: response.data,
        pdfId: +response.headers['entity-id'] as number,
      };
    } catch (error) {
      console.error('Error posting PDF data:', error);
      return null;
    }
  };

  public sendFormRequest = async (data: IFormRequestData) => {
    try {
      const response = await instance.post('/form_pdfs', data);
      return response.data;
    } catch (error) {
      console.error('Error send form request', error);
      throw new Error('Error send form request');
    }
  };
}

export const calculatorApi = new CalculatorApi();
