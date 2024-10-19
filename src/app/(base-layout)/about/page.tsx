import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getAboutInfo, getMassMedia } from '@/entities/pageInfo';
import { getSeo } from '@/entities/seo';

import AboutPage from './AboutPage';

export async function generateMetadata(): Promise<Metadata> {
    const data = await getSeo('О компании');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default async function Page() {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['about'],
            queryFn: getAboutInfo,
        }),
        queryClient.prefetchQuery({
            queryKey: ['news'],
            queryFn: getMassMedia,
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AboutPage />
        </HydrationBoundary>
    );
}
