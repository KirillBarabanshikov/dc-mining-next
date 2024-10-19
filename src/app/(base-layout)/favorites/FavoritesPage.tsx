'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getProductsByIds, ProductCard, useFavoritesStore } from '@/entities/product';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './FavoritesPage.module.scss';

const FavoritesPage = () => {
    const { favorites, clearFavorites } = useFavoritesStore();
    const matches = useMediaQuery(MAX_WIDTH_MD);

    const { data: products } = useQuery({
        queryKey: ['favorites', favorites],
        queryFn: () => getProductsByIds(favorites),
        placeholderData: keepPreviousData,
    });

    return (
        <section className={styles.favorites}>
            <div className={'container'}>
                <div className={styles.head}>
                    <h1 className={'section-title-secondary'}>Избранное</h1>
                    <Button variant={'outline'} size={matches ? 'sm' : 'md'} onClick={clearFavorites}>
                        Очистить
                    </Button>
                </div>
                <div className={styles.wrap}>
                    {products?.map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export default FavoritesPage;
