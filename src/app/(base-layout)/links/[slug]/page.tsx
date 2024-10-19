import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getLinkBySlug, ILink } from '@/entities/link';

import LinkDetailsPage from './LinkDetailsPage';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const link = await getLinkBySlug(params.slug);

    return {
        title: link?.title,
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['links', params.slug],
        queryFn: () => getLinkBySlug(params.slug),
    });

    const link = queryClient.getQueryData<ILink>(['links', params.slug]);

    if (!link) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LinkDetailsPage />
        </HydrationBoundary>
    );
}
