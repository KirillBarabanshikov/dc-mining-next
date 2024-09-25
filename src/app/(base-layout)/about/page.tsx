import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getAboutInfo } from '@/entities/pageInfo';
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

    await queryClient.prefetchQuery({
        queryKey: ['about'],
        queryFn: getAboutInfo,
        staleTime: Infinity,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AboutPage />
        </HydrationBoundary>
    );
}
