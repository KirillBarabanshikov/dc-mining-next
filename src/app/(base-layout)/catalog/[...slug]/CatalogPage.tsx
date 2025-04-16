'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';

import {
  getCatalogData,
  getCustomFilterBySlug,
  useCatalogFilters,
} from '@/entities/catalog';
import { getCategoryBySlug, getSubCategoryBySlug } from '@/entities/category';
import { getSeos } from '@/entities/seo';
import { OrderCallHelpBanner } from '@/features/call';
import { useMediaQuery } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';
import { Catalog, LivePhotos, Managers } from '@/widgets';

import styles from './CatalogPage.module.scss';

const paths = [{ name: 'Главная', path: '/' }];

const CatalogPage = () => {
  const { slug } = useParams<{ slug: string[] }>();
  const matches = useMediaQuery('(max-width: 855px)');
  const { getFilterBody } = useCatalogFilters();

  const { data: category } = useQuery({
    queryKey: ['category', slug[0]],
    queryFn: () => getCategoryBySlug(slug[0]),
  });

  const { data: subCategory } = useQuery({
    queryKey: ['subCategory', slug[1]],
    queryFn: () => getSubCategoryBySlug(slug[1]),
    enabled: !!slug[1],
  });

  const { data: customFilter } = useQuery({
    queryKey: ['customFilter', slug[1]],
    queryFn: () => getCustomFilterBySlug(slug[1]),
    enabled: !!slug[1],
  });

  const { data: seos } = useQuery({
    queryKey: ['seos'],
    queryFn: getSeos,
    staleTime: Infinity,
  });

  const { data: catalogData } = useSuspenseQuery({
    queryKey: ['catalog', category?.title, subCategory, slug[1], customFilter],
    queryFn: () =>
      getCatalogData({
        ...getFilterBody({
          type: category?.title ?? '',
          subCategory: subCategory ? slug[1] : undefined,
          customFilter: customFilter ? slug[1] : undefined,
        }),
      }),
    staleTime: 0,
  });

  const choose = slug.length === 1 ? category?.seoName : slug[1];
  const currentSeo = seos?.find((seo) => seo.choose === choose);
  const title = currentSeo?.hOne || customFilter?.hOne;

  return (
    <div className={styles.catalog}>
      <div className={'container'}>
        <Breadcrumbs
          paths={[
            ...paths,
            ...(category
              ? [{ name: category.title, path: `/catalog/${category.slug}` }]
              : []),
            ...(category && (subCategory || customFilter)
              ? [
                  {
                    name: subCategory?.title || customFilter?.title || '',
                    path: '',
                  },
                ]
              : []),
          ]}
        />
        <div className={styles.catalogTitle}>
          <h1>{title || category?.title}</h1>
          <span>{`${catalogData?.count} товаров`}</span>
        </div>
      </div>
      {category && catalogData && (
        <>
          <Catalog catalogData={catalogData} category={category} />
          {customFilter && customFilter.productText && (
            <div
              className={clsx(styles.productText, '_container')}
              dangerouslySetInnerHTML={{ __html: customFilter.productText }}
            />
          )}
          <LivePhotos
            media={category.images.map(({ image }) => image ?? '')}
            className={styles.livePhotos}
          />
        </>
      )}
      <div className={clsx(styles.banners, 'container')}>
        {matches && <OrderCallHelpBanner />}
        <Managers />
      </div>
    </div>
  );
};

export default CatalogPage;
