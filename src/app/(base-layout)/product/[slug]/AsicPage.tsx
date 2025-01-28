'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { getProductBySlug } from '@/entities/product';

import { Slider } from './ui';

export const AsicPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: product } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
  });

  if (!product) return;

  return (
    <div>
      <Slider product={product} />
    </div>
  );
};
