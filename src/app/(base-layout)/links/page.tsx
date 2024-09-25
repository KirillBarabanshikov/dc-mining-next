import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getLinks } from '@/entities/link';
import { getSeo } from '@/entities/seo';

import LinksPage from './LinksPage';

export async function generateMetadata() {
    const data = await getSeo('Полезные ссылки');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default async function Page() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['links'],
        queryFn: getLinks,
        staleTime: Infinity,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LinksPage />
        </HydrationBoundary>
    );
}
