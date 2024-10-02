import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound, redirect } from 'next/navigation';

import { getProductById, IProduct } from '@/entities/product';

import ProductPage from './ProductPage';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);

    return {
        title: product?.seoTitle ? product?.seoTitle : product?.title,
        description: product?.seoDescription || '',
    };
}

export default async function Page({ params }: { params: { id: string; slug: string } }) {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['product', params.id],
            queryFn: () => getProductById(params.id),
        }),
    ]);

    const product = queryClient.getQueryData<IProduct>(['product', params.id]);

    if (!product) {
        return notFound();
    }

    if (params.slug !== product.slug) {
        return redirect(`/product/${product.id}/${product.slug}`);
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductPage />
        </HydrationBoundary>
    );
}
