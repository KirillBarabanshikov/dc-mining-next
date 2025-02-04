import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { AsicPage } from '@/app/(base-layout)/product/[slug]/AsicPage';
import { getProductBySlug, IProduct } from '@/entities/product';

import ProductPage from './ProductPage';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  return {
    title: product?.seoTitle ? product?.seoTitle : product?.title,
    description: product?.seoDescription || '',
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['product', params.slug],
      queryFn: () => getProductBySlug(params.slug),
    }),
  ]);

  const product = queryClient.getQueryData<IProduct>(['product', params.slug]);

  if (!product) return notFound();

  if (product.category?.title === 'ASIC майнеры') {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AsicPage />
      </HydrationBoundary>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPage />
    </HydrationBoundary>
  );
}
