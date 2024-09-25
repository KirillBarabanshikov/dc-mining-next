import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getDataCenterInfo } from '@/entities/pageInfo';
import { getSeo } from '@/entities/seo';

import { DataCenterPage } from './DataCenterPage';

export async function generateMetadata(): Promise<Metadata> {
    const data = await getSeo('Размещение в дата центре');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default async function Page() {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['data-center'],
            queryFn: getDataCenterInfo,
            staleTime: Infinity,
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DataCenterPage />
        </HydrationBoundary>
    );
}
