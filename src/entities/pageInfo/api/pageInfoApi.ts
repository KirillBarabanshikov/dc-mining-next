import { instance } from '@/shared/api';

import {
  IAboutInfo,
  IDataCenterInfo,
  IDeliveryAndPaymentInfo,
  ILeasingInfo,
  IMassMedia,
} from '../model';

export const getAboutInfo = async (): Promise<IAboutInfo | null> => {
  try {
    const response = await instance.get<IAboutInfo>('/about');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLeasingInfo = async (): Promise<ILeasingInfo | null> => {
  try {
    const response = await instance.get('/leasing');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getDataCenterInfo = async (): Promise<IDataCenterInfo | null> => {
  try {
    const response = await instance.get<IDataCenterInfo>('/data_centers');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPaymentInfo = async (): Promise<
  IDeliveryAndPaymentInfo[] | null
> => {
  try {
    const response = await instance.get('/payments');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getDeliveryInfo = async (): Promise<
  IDeliveryAndPaymentInfo[] | null
> => {
  try {
    const response = await instance.get('/deliveries');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMassMedia = async () => {
  try {
    const response = await instance.get<IMassMedia[]>(`/about/news`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMassMediaById = async (id: string | number) => {
  try {
    const response = await instance.get<IMassMedia>(`/about_mass_media/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMassMediaBySlug = async (slug: string) => {
  try {
    const response = await instance.get<IMassMedia>(`/about/slug?slug=${slug}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
