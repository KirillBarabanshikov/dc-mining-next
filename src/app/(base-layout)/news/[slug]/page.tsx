import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getMassMediaBySlug, IMassMedia } from '@/entities/pageInfo';

import NewsDetailsPage from './NewsDetailsPage';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const media = await getMassMediaBySlug(params.slug);

    return {
        title: media?.title,
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['news', params.slug],
        queryFn: () => getMassMediaBySlug(params.slug),
    });

    const media = queryClient.getQueryData<IMassMedia>(['news', params.slug]);

    if (!media) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NewsDetailsPage />
        </HydrationBoundary>
    );
}
