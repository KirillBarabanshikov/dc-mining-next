import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { AsicPage } from '@/app/(base-layout)/product/[slug]/AsicPage';
import { getProductBySlug, IProduct } from '@/entities/product';

import ProductPage from './ProductPage';

const noindexSlugs = [
  'blok-pitaniia-dlia-bitmain-antminer-l7',
  'blok-pitaniia-dlia-bitmain-antminer-s21',
  'blok-pitaniia-dlia-bitmain-antminer-s21-hydro',
  'blok-pitaniia-dlia-bitmain-antminer-t21',
  'kabel-pitaniia-antwire-bitmain-antminer-s19j-xps21',
  'kabel-pitaniia-antwire-bitmain-antminer-t21',
  'kuler-dlia-bitmain-antminer-s19',
  'kuler-dlia-bitmain-antminer-s21-t21-ks5',
  'plata-upravleniia-amlogic-v10010',
  'plata-upravleniia-bitmain-antminer-e9-pro',
  'signalnyi-kabel-18pin-120mm2mm',
  'signalnyi-kabel-18pin-170mm2mm',
];

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  return {
    title: product?.seoTitle ? product?.seoTitle : product?.title,
    description: product?.seoDescription || '',
    robots: noindexSlugs.includes(params.slug) ? 'noindex' : 'index, follow',
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
