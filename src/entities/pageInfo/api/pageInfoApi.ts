import { instance } from '@/shared/api';
import { BASE_URL } from '@/shared/consts';

import { IAboutInfo, IDataCenterInfo, IDeliveryAndPaymentInfo, ILeasingInfo, IMassMedia } from '../model';

export const getAboutInfo = async (): Promise<IAboutInfo | undefined> => {
    try {
        const response = await instance.get<IAboutInfo>('/about');
        return response.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const getLeasingInfo = async (): Promise<ILeasingInfo | undefined> => {
    try {
        const response = await fetch(`${BASE_URL}/api/leasing`);
        return (await response.json()) as ILeasingInfo;
    } catch (error) {
        console.error('Ошибка при загрузке leasing:', error);
    }
};

export const getDataCenterInfo = async (): Promise<IDataCenterInfo | undefined> => {
    try {
        const response = await instance.get<IDataCenterInfo>('/dataCenters');
        return response.data;
    } catch (error) {
        console.error(error);
        return;
    }
};

export const getPaymentInfo = async (): Promise<IDeliveryAndPaymentInfo[] | undefined> => {
    try {
        const response = await fetch(`${BASE_URL}/api/payments`);
        return (await response.json()) as IDeliveryAndPaymentInfo[];
    } catch (error) {
        console.error('Ошибка при загрузке payments:', error);
    }
};

export const getDeliveryInfo = async (): Promise<IDeliveryAndPaymentInfo[] | undefined> => {
    try {
        const response = await fetch(`${BASE_URL}/api/deliveries`);
        return (await response.json()) as IDeliveryAndPaymentInfo[];
    } catch (error) {
        console.error('Ошибка при загрузке payments:', error);
    }
};

export const getMassMediaById = async (id: string | number) => {
    try {
        const response = await instance.get<IMassMedia>(`/about_mass_media/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
