import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getContacts } from '@/entities/contacts';
import { getLeasingInfo } from '@/entities/pageInfo';
import { getSeo } from '@/entities/seo';

import LeasingPage from './LeasingPage';

export async function generateMetadata() {
    const data = await getSeo('Лизинг');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default async function Page() {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['leasing'],
            queryFn: getLeasingInfo,
            staleTime: Infinity,
        }),
        queryClient.prefetchQuery({
            queryKey: ['contacts'],
            queryFn: getContacts,
            staleTime: Infinity,
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LeasingPage />
        </HydrationBoundary>
    );
}
