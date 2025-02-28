import { instance } from '@/shared/api';
import { IFormRequestData, IPostPDFRequest } from '@/widgets/Calculator/types';


export const sendBasketForm = async (body: IFormRequestData) => {
  try {
    await instance.post('/form_pdfs', body);
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

export const sendBasketPDF = async (data: IPostPDFRequest) => {
  try {
    const response = await instance.post('/calculating_export_pdfs', data, {
      responseType: 'blob',
    });
    return {
      file: response.data,
      pdfId: +response.headers['entity-id'] as number,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

export const getAsics = async () => {
  try {
    const response = await instance.get('/product/calculating', { params: {
        type: 'ASIC майнеры',
      }, method: 'GET'})
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error(`${error}`)
  }
}