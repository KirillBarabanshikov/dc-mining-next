'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';

import { getCategoryById } from '@/entities/category';
import { getSeos } from '@/entities/seo';
import { OrderCallHelpBanner } from '@/features/call';
import { useMediaQuery } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';
import { LivePhotos, Managers } from '@/widgets';

import styles from './CatalogPage.module.scss';

const paths = [{ name: 'Главная', path: '/' }];

const CatalogPage = () => {
    const { id } = useParams<{ id: string }>();
    const matches = useMediaQuery('(max-width: 855px)');

    const { data: category } = useSuspenseQuery({
        queryKey: ['category', id],
        queryFn: () => getCategoryById(id),
    });
    const { data: seos } = useSuspenseQuery({
        queryKey: ['seos'],
        queryFn: getSeos,
        staleTime: Infinity,
    });

    const currentSeo = seos?.find((seo) => seo.choose === category?.seoName);

    return (
        <div className={styles.catalog}>
            <div className={'container'}>
                <Breadcrumbs paths={[...paths, { name: category?.name ?? '', path: '' }]} />
                <div className={styles.catalogTitle}>
                    <h1>{currentSeo?.hOne ? currentSeo.hOne : category?.name}</h1>
                    {/*<span>{`${countProducts} товаров`}</span>*/}
                </div>
            </div>
            {/*<Catalog key={state} />*/}
            {category && (
                <LivePhotos images={category.images.map(({ image }) => image ?? '')} className={styles.livePhotos} />
            )}
            <div className={clsx(styles.banners, 'container')}>
                {matches && <OrderCallHelpBanner />}
                <Managers />
            </div>
        </div>
    );
};

export default CatalogPage;
