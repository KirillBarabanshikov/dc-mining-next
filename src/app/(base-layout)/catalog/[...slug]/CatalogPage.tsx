'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { getCatalogData, useCatalogFilters } from '@/entities/catalog';
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
    const { getFilterBody, params } = useCatalogFilters();
    const state = useRef<string | null>(null);

    const { data: category } = useSuspenseQuery({
        queryKey: ['category', slug[0]],
        queryFn: () => getCategoryBySlug(slug[0]),
    });

    const { data: subCategory } = useQuery({
        queryKey: ['subCategory', slug[1]],
        queryFn: () => getSubCategoryBySlug(slug[1]),
        enabled: !!slug[1],
    });

    const { data: seos } = useSuspenseQuery({
        queryKey: ['seos'],
        queryFn: getSeos,
        staleTime: Infinity,
    });

    const { data: catalogData, refetch } = useSuspenseQuery({
        queryKey: ['catalog', category?.title, ...slug],
        queryFn: () =>
            getCatalogData({
                ...getFilterBody(category?.title ?? '', slug),
            }),
        staleTime: 0,
    });

    useEffect(() => {
        if (params.get('state') !== state.current) {
            state.current = params.get('state');
            refetch({ cancelRefetch: false });
        }
    }, [params, refetch]);

    const choose = slug.length === 1 ? category?.seoName : slug[1];
    const currentSeo = seos?.find((seo) => seo.choose === choose);

    return (
        <div className={styles.catalog}>
            <div className={'container'}>
                <Breadcrumbs
                    paths={[
                        ...paths,
                        ...(category ? [{ name: category.name, path: `/catalog/${category.slug}` }] : []),
                        ...(category && subCategory
                            ? [{ name: subCategory.title, path: `/catalog/${category.slug}/${subCategory.slug}` }]
                            : []),
                    ]}
                />
                <div className={styles.catalogTitle}>
                    <h1>{currentSeo?.hOne ? currentSeo.hOne : category?.name}</h1>
                    <span>{`${catalogData?.count} товаров`}</span>
                </div>
            </div>
            {category && (
                <>
                    <Catalog
                        products={catalogData?.products ?? []}
                        countProducts={catalogData?.count ?? 0}
                        category={category}
                    />
                    <LivePhotos
                        images={category.images.map(({ image }) => image ?? '')}
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
