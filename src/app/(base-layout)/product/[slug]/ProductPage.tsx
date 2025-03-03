'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { getAboutInfo } from '@/entities/pageInfo';
import { getProductBySlug } from '@/entities/product';
import { useRecentStore } from '@/entities/product/model';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';
import { AdvantagesDCMining, RecentProductsList } from '@/widgets';
import { CallMeBanner } from '@/widgets/CallMeBanner';
import { ProductDetails } from '@/widgets/ProductDetails';

import styles from './ProductPage.module.scss';

const paths = [{ name: 'Главная', path: '/' }];

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const matches = useMediaQuery(MAX_WIDTH_MD);
  const { addToRecent } = useRecentStore();

  const { data: product } = useSuspenseQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
  });
  const { data: info } = useQuery({
    queryKey: ['about'],
    queryFn: getAboutInfo,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!product) return;
    addToRecent(product.id);
  }, [addToRecent, product]);

  const breadcrumbsPaths = [
    ...paths,
    {
      name: product?.category?.title ?? '',
      path: product ? `/catalog/${product?.category?.slug}` : '',
    },
    { name: product?.title ?? '', path: `/product/${product?.slug}` },
  ];

  return (
    <div className={'container'}>
      {<Breadcrumbs paths={breadcrumbsPaths} className={styles.breadcrumbs} />}
      <div className={'sections'}>
        <ProductDetails product={product} />
        {info && <AdvantagesDCMining advantages={info.advantages} />}
        {!matches && <RecentProductsList />}
        <CallMeBanner />
      </div>
    </div>
  );
};

export default ProductPage;
