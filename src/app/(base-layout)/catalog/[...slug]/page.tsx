import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getCustomFilterBySlug } from '@/entities/catalog';
import { getCategoryBySlug, getSubCategoryBySlug, ICategory } from '@/entities/category';
import { getSeo, getSeos } from '@/entities/seo';

import CatalogPage from './CatalogPage';

interface IMetadata {
    title?: string;
    description?: string;
    alternates: { canonical: string };
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
    const metadata: IMetadata = {
        alternates: {
            canonical: `https://dc-mining.ru/catalog/${params.slug.join('/')}`,
        },
    };

    if (params.slug.length === 1) {
        const category = await getCategoryBySlug(params.slug[0]);
        const seo = await getSeo(category?.seoName || '');
        metadata.title = seo?.title;
        metadata.description = seo?.description;
    }

    if (params.slug.length === 2) {
        const seo = await getSeo(params.slug[1]);
        if (seo) {
            metadata.title = seo?.title;
            metadata.description = seo?.description;
        } else {
            const customFilter = await getCustomFilterBySlug(params.slug[1]);
            metadata.title = customFilter?.seoTitle;
            metadata.description = customFilter?.seoDescription;
        }
    }

    return metadata;
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['category', params.slug[0]],
            queryFn: () => getCategoryBySlug(params.slug[0]),
        }),
        queryClient.prefetchQuery({
            queryKey: ['seos'],
            queryFn: getSeos,
            staleTime: Infinity,
        }),
        queryClient.prefetchQuery({
            queryKey: ['subCategory', params.slug[1]],
            queryFn: () => getSubCategoryBySlug(params.slug[1]),
        }),
        queryClient.prefetchQuery({
            queryKey: ['customFilter', params.slug[1]],
            queryFn: () => getCustomFilterBySlug(params.slug[1]),
        }),
    ]);

    const category = queryClient.getQueryData<ICategory>(['category', params.slug[0]]);

    if (!category) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CatalogPage />
        </HydrationBoundary>
    );
}
