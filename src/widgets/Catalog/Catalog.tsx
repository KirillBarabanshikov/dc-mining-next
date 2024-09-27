'use client';

import { useCatalogStore } from '@/entities/catalog';
import { ProductsList } from '@/widgets';

import styles from './Catalog.module.scss';
import { CustomFilters, Filters, Sorting } from './ui';

export const Catalog = () => {
    const { viewMode, products } = useCatalogStore();

    return (
        <div className={styles.catalog}>
            <CustomFilters className={styles.customFilter} />
            <Filters className={styles.filters} />
            <Sorting className={styles.sorting} />
            <ProductsList products={products} viewMode={viewMode} className={styles.productList} />
        </div>
    );
};
