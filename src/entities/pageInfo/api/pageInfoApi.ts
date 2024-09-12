import { BASE_URL } from '@/shared/consts';

import { IDataCenterInfo } from '../model';

export const getDataCenterInfo = async (): Promise<IDataCenterInfo | undefined> => {
    try {
        const response = await fetch(`${BASE_URL}/api/dataCenters`);
        return (await response.json()) as IDataCenterInfo;
    } catch (error) {
        console.error('Ошибка при загрузке:', error);
    }
};

// import { baseApi } from '@/shared/api';
// import { IAboutInfo, IDataCenterInfo, IDeliveryAndPaymentInfo, ILeasingInfo } from '@/entities/pageInfo';

// const pageInfoApi = baseApi.injectEndpoints({
//     endpoints: (build) => ({
//         getAboutInfo: build.query<IAboutInfo, void>({
//             query: () => ({
//                 url: '/about',
//             }),
//         }),
//         getLeasingInfo: build.query<ILeasingInfo, void>({
//             query: () => ({
//                 url: '/leasing',
//             }),
//         }),
//         getDataCenterInfo: build.query<IDataCenterInfo, void>({
//             query: () => ({
//                 url: '/dataCenters',
//             }),
//         }),
//         getPaymentInfo: build.query<IDeliveryAndPaymentInfo[], void>({
//             query: () => ({
//                 url: '/payments',
//             }),
//         }),
//         getDeliveryInfo: build.query<IDeliveryAndPaymentInfo[], void>({
//             query: () => ({
//                 url: '/deliveries',
//             }),
//         }),
//     }),
// });

// export const {
//     useGetAboutInfoQuery,
//     useGetLeasingInfoQuery,
//     useGetDataCenterInfoQuery,
//     useGetPaymentInfoQuery,
//     useGetDeliveryInfoQuery,
// } = pageInfoApi;
