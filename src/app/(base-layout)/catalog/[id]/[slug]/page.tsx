import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound, redirect } from 'next/navigation';

import CatalogPage from '@/app/(base-layout)/catalog/[id]/[slug]/CatalogPage';
import { getCategoryById } from '@/entities/category';
import { ILink } from '@/entities/link';
import { getSeo, getSeos } from '@/entities/seo';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const category = await getCategoryById(params.id);
    const seo = await getSeo(category?.seoName ?? '');

    return {
        title: seo?.title,
        description: seo?.description,
    };
}

export default async function Page({ params }: { params: { id: string; slug: string } }) {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['category', params.id],
            queryFn: () => getCategoryById(params.id),
        }),
        queryClient.prefetchQuery({
            queryKey: ['seos'],
            queryFn: getSeos,
            staleTime: Infinity,
        }),
    ]);

    const category = queryClient.getQueryData<ILink>(['category', params.id]);

    if (!category) {
        return notFound();
    }

    if (params.slug !== category.slug) {
        return redirect(`/catalog/${category.id}/${category.slug}`);
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CatalogPage />
        </HydrationBoundary>
    );
}
