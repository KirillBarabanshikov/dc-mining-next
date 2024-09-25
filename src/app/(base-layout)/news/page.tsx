import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getAboutInfo } from '@/entities/pageInfo';
import { getSeo } from '@/entities/seo';

import { NewsPage } from './NewsPage';

export async function generateMetadata() {
    const data = await getSeo('СМИ о нас');

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
            <NewsPage />
        </HydrationBoundary>
    );
}
