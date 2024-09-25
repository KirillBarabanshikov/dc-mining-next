import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound, redirect } from 'next/navigation';

import { getMassMediaById, IMassMedia } from '@/entities/pageInfo';
import { createSlug } from '@/shared/lib';

import NewsDetailsPage from './NewsDetailsPage';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const media = await getMassMediaById(params.id);

    return {
        title: media?.title,
    };
}

export default async function Page({ params }: { params: { id: string; slug: string } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['news', params.id],
        queryFn: () => getMassMediaById(params.id),
        staleTime: Infinity,
    });

    const media = queryClient.getQueryData<IMassMedia>(['news', params.id]);

    if (!media) {
        return notFound();
    }

    if (params.slug !== createSlug(media.title)) {
        return redirect(`/news/${media.id}/${createSlug(media.title)}`);
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NewsDetailsPage />
        </HydrationBoundary>
    );
}
