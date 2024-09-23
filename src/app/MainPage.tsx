'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { getCategories } from '@/entities/category';
import { getProducts } from '@/entities/product';
import Background from '@/shared/assets/backgrounds/main-bg.svg';
import { Bestsellers, MainBannersList, Offers } from '@/widgets';

import styles from './MainPage.module.scss';

export const MainPage = () => {
    const { data: products } = useSuspenseQuery({
        queryKey: ['products'],
        queryFn: () => getProducts({ display: true }),
    });
    const { data: categories } = useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    return (
        <>
            <div className={clsx(styles.sections, 'sections')}>
                <MainBannersList />
                {categories && <Offers categories={categories} />}
                <div className={styles.bestsellersWrapper}>
                    {products && <Bestsellers products={products} />}
                    <Background className={styles.backgroundIcon} />
                </div>
            </div>
        </>
    );
};
