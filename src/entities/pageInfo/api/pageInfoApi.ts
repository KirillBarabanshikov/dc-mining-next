import { BASE_URL } from '@/shared/consts';

import { IAboutInfo, IDataCenterInfo, IDeliveryAndPaymentInfo, ILeasingInfo } from '../model';

export const getAboutInfo = async (): Promise<IAboutInfo | undefined> => {
    try {
        const response = await fetch(`${BASE_URL}/api/about`);
        return (await response.json()) as IAboutInfo;
    } catch (error) {
        console.error('Ошибка при загрузке about:', error);
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
        const response = await fetch(`${BASE_URL}/api/dataCenters`);
        return (await response.json()) as IDataCenterInfo;
    } catch (error) {
        console.error('Ошибка при загрузке data center:', error);
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
