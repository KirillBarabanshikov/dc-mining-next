'use client';

import { useQueries, useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

import { getCustomFilterBySlug } from '@/entities/catalog';
import { getCatalog } from '@/entities/catalog/api';
import { getCategoryBySlug, getSubCategoryBySlug } from '@/entities/category';
import { getSeos } from '@/entities/seo';
import { OrderCallHelpBanner } from '@/features/call';
import { Breadcrumbs } from '@/shared/ui';
import { Catalog, LivePhotos, Managers } from '@/widgets';

import styles from './CatalogPage.module.scss';

const CatalogPage = () => {
  const { slug } = useParams<{ slug: string[] }>();

  const [categoryQuery, subCategoryQuery, customFilterQuery, seosQuery] =
    useQueries({
      queries: [
        {
          queryKey: ['category', slug[0]],
          queryFn: () => getCategoryBySlug(slug[0]),
        },
        {
          queryKey: ['subCategory', slug[1]],
          queryFn: () => getSubCategoryBySlug(slug[1]),
          enabled: !!slug[1],
        },
        {
          queryKey: ['customFilter', slug[1]],
          queryFn: () => getCustomFilterBySlug(slug[1]),
          enabled: !!slug[1],
        },
        {
          queryKey: ['seos'],
          queryFn: getSeos,
          staleTime: Infinity,
        },
      ],
    });

  const category = categoryQuery.data;
  const subCategory = subCategoryQuery.data;
  const customFilter = customFilterQuery.data;
  const seos = seosQuery.data;

  const { data: catalog } = useSuspenseQuery({
    queryKey: ['catalog', category?.title],
    queryFn: () => getCatalog({ type: category?.title || '' }),
  });

  const currentSeo = useMemo(() => {
    return seos?.find(
      (seo) => seo.choose === (slug.length === 1 ? category?.seoName : slug[1]),
    );
  }, [seos, slug, category]);

  const title = currentSeo?.hOne || customFilter?.hOne || category?.title;

  const breadcrumbs = useMemo(() => {
    const basePaths = [{ name: 'Главная', path: '/' }];
    if (category) {
      basePaths.push({
        name: category.title,
        path: `/catalog/${category.slug}`,
      });
      if (subCategory || customFilter) {
        basePaths.push({
          name: subCategory?.title || customFilter?.title || '',
          path: '',
        });
      }
    }
    return basePaths;
  }, [category, subCategory, customFilter]);

  return (
    <div className={styles.catalog}>
      <div className={'container'}>
        <Breadcrumbs paths={breadcrumbs} />
        <div className={styles.titleWrap}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {catalog && (
            <span className={styles.count}>{catalog.count} товаров</span>
          )}
        </div>
      </div>
      {category && (
        <>
          <Catalog category={category} catalogData={catalog} />
          <LivePhotos
            images={category.images.map(({ image }) => image ?? '')}
            className={styles.livePhotos}
          />
        </>
      )}
      <div className={clsx(styles.banners, 'container')}>
        <OrderCallHelpBanner className={styles.banner} />
        <Managers />
      </div>
    </div>
  );
};

export default CatalogPage;
