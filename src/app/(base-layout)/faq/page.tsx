import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getFaq } from '@/entities/faq';
import { getSeo } from '@/entities/seo';

import FAQPage from './FAQPage';

export async function generateMetadata() {
    const data = await getSeo('FAQ');

    return {
        title: data?.title,
        description: data?.description,
    };
}

export default async function Page() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['faq'],
        queryFn: getFaq,
        staleTime: Infinity,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FAQPage />
        </HydrationBoundary>
    );
}
