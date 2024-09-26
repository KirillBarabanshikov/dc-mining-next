'use client';

import { ProductCard, useFavoritesStore } from '@/entities/product';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery, useStore } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './FavoritesPage.module.scss';

const FavoritesPage = () => {
    const state = useStore(useFavoritesStore, (state) => state);
    const matches = useMediaQuery(MAX_WIDTH_MD);

    return (
        <section className={styles.favorites}>
            <div className={'container'}>
                <div className={styles.head}>
                    <h1 className={'section-title-secondary'}>Избранное</h1>
                    <Button variant={'outline'} size={matches ? 'sm' : 'md'} onClick={() => state?.clearFavorites()}>
                        Очистить
                    </Button>
                </div>
                <div className={styles.wrap}>
                    {state?.favorites.map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })}
                </div>
            </div>
        </section>
    );
};

export default FavoritesPage;
