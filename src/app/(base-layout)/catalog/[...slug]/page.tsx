import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { getCategoryBySlug, getSubCategoryBySlug, ICategory } from '@/entities/category';
import { getSeo, getSeos } from '@/entities/seo';

import CatalogPage from './CatalogPage';

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
    let choose: string;
    if (params.slug.length === 1) {
        const category = await getCategoryBySlug(params.slug[0]);
        choose = category?.seoName || '';
    } else {
        choose = params.slug[params.slug.length - 1];
    }
    const seo = await getSeo(choose);

    return {
        title: seo?.title,
        description: seo?.description,
        alternates: {
            canonical: `https://dc-mining.ru/catalog/${params.slug.join('/')}`,
        },
    };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const queryClient = new QueryClient();
    const withSubCategory = params.slug.length > 1;

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
        withSubCategory &&
            queryClient.prefetchQuery({
                queryKey: ['subCategory', params.slug[1]],
                queryFn: () => getSubCategoryBySlug(params.slug[1]),
            }),
    ]);

    const category = queryClient.getQueryData<ICategory>(['category', params.slug[0]]);
    const subCategory = queryClient.getQueryData(['subCategory', params.slug[1]]);

    if (!category || (withSubCategory && !subCategory)) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CatalogPage />
        </HydrationBoundary>
    );
}
